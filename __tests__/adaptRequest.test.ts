import { MultipleQueriesQuery } from "@algolia/client-search";
import {
  adaptPage,
  adaptFilters,
  adaptRequest,
  adaptNumericFilters,
  parseRange,
} from "../src/adaptRequest";
import { ItemsJsRequest } from "../src/itemsjsInterface";

describe("adaptPage tests", () => {
  it("adaptpage(x) should return x+1", () => {
    expect(adaptPage(0)).toBe(1);
    expect(adaptPage(3)).toBe(4);
    expect(adaptPage(12)).toBe(13);
  });
});

describe("adaptRequest tests", () => {
  it("adaptRequest should convert request to ItemsJs request", () => {
    const instantsearchRequest: MultipleQueriesQuery[] = [
      {
        indexName: "products",
        params: {
          query: "a",
          page: 2,
          hitsPerPage: 5,
          facets: ["price", "in_stock"],
          numericFilters: ["price>=10", "price<=100"],
        },
      },
    ];

    const itemsjsRequest: ItemsJsRequest = adaptRequest(instantsearchRequest);

    expect(itemsjsRequest.query).toBe("a");
    expect(itemsjsRequest.page).toBe(3);
    expect(itemsjsRequest.per_page).toBe(5);
    expect(itemsjsRequest.aggregations).toMatchObject(["price", "in_stock"]);
    expect(itemsjsRequest.filter).toBeDefined(); // Returns native javascript .filter() function
  });
});

describe("adaptNumericFilters tests", () => {
  const items = [
    { price: 10, in_stock: 1 },
    { price: 15, in_stock: 0 },
    { price: 28, in_stock: 0 },
    { price: 37, in_stock: 1 },
  ];

  /*
   * adaptRequest returns an array of functions that will be used for the native javascript funtion .filter().
   * Using the same native javascript function .filter() to loop trough the function results
   */

  it("Test the 'greater than' and 'less than' comparison operators", () => {
    const priceRanges = adaptNumericFilters(["price>15", "price<37"]);
    const res = items.filter((item) =>
      priceRanges.every((priceRange) => priceRange(item))
    );
    expect(res).toStrictEqual([{ price: 28, in_stock: 0 }]);
  });

  it("Test the 'greater than or equal to' and 'less than or equal to' comparison operators.", () => {
    const priceRanges2 = adaptNumericFilters(["price>=15", "price<=20"]);
    const res2 = items.filter((item) =>
      priceRanges2.every((priceRange) => priceRange(item))
    );
    expect(res2).toStrictEqual([{ price: 15, in_stock: 0 }]);
  });

  it("Test the 'equal to' comparison operators with a in_stock field.", () => {
    const priceRanges3 = adaptNumericFilters(["price>25", "in_stock=1"]);
    const res3 = items.filter((item) =>
      priceRanges3.every((priceRange) => priceRange(item))
    );
    expect(res3).toStrictEqual([{ price: 37, in_stock: 1 }]);
  });

  it("Test the 'not equal' comparison operators with a in_stock field.", () => {
    const priceRanges4 = adaptNumericFilters(["price<20", "in_stock!=1"]);
    const res4 = items.filter((item) =>
      priceRanges4.every((priceRange) => priceRange(item))
    );
    expect(res4).toStrictEqual([{ price: 15, in_stock: 0 }]);
  });
});

describe("regexInput tests group in three", () => {
  it("greater than", () => {
    const [, field, operator, value] = parseRange("price>50");

    expect(field).toStrictEqual("price");
    expect(operator).toStrictEqual(">");
    expect(value).toStrictEqual("50");
  });

  it("greater than or equal to", () => {
    const [, field2, operator2, value2] = parseRange("price>=50");

    expect(field2).toStrictEqual("price");
    expect(operator2).toStrictEqual(">=");
    expect(value2).toStrictEqual("50");
  });

  it("equal to", () => {
    const [, field3, operator3, value3] = parseRange("price=50");

    expect(field3).toStrictEqual("price");
    expect(operator3).toStrictEqual("=");
    expect(value3).toStrictEqual("50");
  });

  it("not equal to", () => {
    const [, field4, operator4, value4] = parseRange("price!=50");

    expect(field4).toStrictEqual("price");
    expect(operator4).toStrictEqual("!=");
    expect(value4).toStrictEqual("50");
  });

  it("less than", () => {
    const [, field5, operator5, value5] = parseRange("price<50");

    expect(field5).toStrictEqual("price");
    expect(operator5).toStrictEqual("<");
    expect(value5).toStrictEqual("50");
  });

  it("less than or equal to", () => {
    const [, field6, operator6, value6] = parseRange("price<=50");

    expect(field6).toStrictEqual("price");
    expect(operator6).toStrictEqual("<=");
    expect(value6).toStrictEqual("50");
  });
});

describe("adaptFacets tests", () => {
  it("adaptFacets should convert nested arrays to Itemsjs format", () => {
    const instantsearchFacets = [
      ["category:electronics", "category:men's clothing"],
      ["color:blue"],
    ];

    const itemsJsFacets = {
      category: ["electronics", "men's clothing"],
      color: ["blue"],
    };

    const adaptedResult = adaptFilters(instantsearchFacets);
    expect(adaptedResult).toMatchObject(itemsJsFacets);
  });

  it("adaptFacets should convert a single array to Itemsjs format", () => {
    const instantsearchFacets = [
      "category:electronics",
      "category:men's clothing",
    ];

    const itemsJsFacets = {
      category: ["electronics", "men's clothing"],
    };

    const adaptedResult = adaptFilters(instantsearchFacets);
    expect(adaptedResult).toMatchObject(itemsJsFacets);
  });
});
