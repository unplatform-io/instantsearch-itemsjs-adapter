import { MultipleQueriesQuery } from "@algolia/client-search";
import {
  adaptPage,
  adaptRequest,
  adaptNumericFilters,
  regexInput,
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
    const query = "a";
    const page = 2;
    const hitsPerPage = 5;
    const facets = ["price", "id"];
    const numericFilters = ["price>=10", "price<=100", "id>=1", "id<=5"];

    const instantsearchRequest: MultipleQueriesQuery[] = [
      {
        indexName: "products",
        params: {
          query: query,
          page: page,
          hitsPerPage: hitsPerPage,
          facets: facets,
          numericFilters: numericFilters,
        },
      },
    ];

    const itemsjsRequest: ItemsJsRequest = adaptRequest(instantsearchRequest);

    expect(itemsjsRequest.query).toBe(query);
    expect(itemsjsRequest.page).toBe(page + 1);
    expect(itemsjsRequest.per_page).toBe(hitsPerPage);
    expect(itemsjsRequest.aggregations).toMatchObject(facets);
    expect(itemsjsRequest.filter).toBeDefined();
  });
});

describe("adaptNumericFilters tests", () => {
  it("adaptNumericFilters return filter format", () => {
    const items = [
      { price: 10, in_stock: 1 },
      { price: 15, in_stock: 0 },
      { price: 28, in_stock: 0 },
      { price: 37, in_stock: 1 },
    ];

    // Used the same code as in adaptRequest. Otherwise, I can't test the function because it returns an array of functions.
    // Test the "greater than" and "less than" comparison operators.
    const priceRanges = adaptNumericFilters(["price>15", "price<37"]);
    const res = items.filter((item) =>
      priceRanges.every((priceRange) => priceRange(item))
    );
    expect(res).toStrictEqual([{ price: 28, in_stock: 0 }]);

    // Test the "greater than or equal to" and "less than or equal to" comparison operators.
    const priceRanges2 = adaptNumericFilters(["price>=15", "price<=20"]);
    const res2 = items.filter((item) =>
      priceRanges2.every((priceRange) => priceRange(item))
    );
    expect(res2).toStrictEqual([{ price: 15, in_stock: 0 }]);

    // Test the "equal to" comparison operators with a price field.
    const priceRanges3 = adaptNumericFilters(["price>25", "in_stock=1"]);
    const res3 = items.filter((item) =>
      priceRanges3.every((priceRange) => priceRange(item))
    );
    expect(res3).toStrictEqual([{ price: 37, in_stock: 1 }]);

    // Test the  "not equal" comparison operators with a price field.
    const priceRanges4 = adaptNumericFilters(["price<20", "in_stock!=1"]);
    const res4 = items.filter((item) =>
      priceRanges4.every((priceRange) => priceRange(item))
    );
    expect(res4).toStrictEqual([{ price: 15, in_stock: 0 }]);
  });
});

describe("regexInput tests", () => {
  it("regexInput should group the input in three groups", () => {
    const [, field, operator, value] = regexInput("price>50");
    const [, field2, operator2, value2] = regexInput("price>=50");
    const [, field3, operator3, value3] = regexInput("price=50");
    const [, field4, operator4, value4] = regexInput("price!=50");
    const [, field5, operator5, value5] = regexInput("price<50");
    const [, field6, operator6, value6] = regexInput("price<=50");

    // greater than
    expect(field).toStrictEqual("price");
    expect(operator).toStrictEqual(">");
    expect(value).toStrictEqual("50");

    // greater than or equal to
    expect(field2).toStrictEqual("price");
    expect(operator2).toStrictEqual(">=");
    expect(value2).toStrictEqual("50");

    // equal to
    expect(field3).toStrictEqual("price");
    expect(operator3).toStrictEqual("=");
    expect(value3).toStrictEqual("50");

    // not equal
    expect(field4).toStrictEqual("price");
    expect(operator4).toStrictEqual("!=");
    expect(value4).toStrictEqual("50");

    // less than
    expect(field5).toStrictEqual("price");
    expect(operator5).toStrictEqual("<");
    expect(value5).toStrictEqual("50");

    // less than or equal to
    expect(field6).toStrictEqual("price");
    expect(operator6).toStrictEqual("<=");
    expect(value6).toStrictEqual("50");
  });
});
