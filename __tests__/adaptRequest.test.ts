import { MultipleQueriesQuery } from "@algolia/client-search";
import { adaptPage, adaptRequest, adaptNumericFilters } from "../src/adaptRequest";
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
    const facets = ['price', 'id']
    const numericFilters = ['price>=10', 'price<=100', 'id>=1', 'id<=5']

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
    expect(itemsjsRequest.filter).toBeDefined()
  });
});

describe("adaptNumericFilters tests", () => {
  it("adaptNumericFilters return filter format", () => {
    const items = [
      { "id": 1, "price": 10 },
      { "id": 2, "price": 19 },
      { "id": 3, "price": 28 },
      { "id": 4, "price": 37 },
    ];
    
    // Return all items
    const priceRanges = adaptNumericFilters(['price<=100']);    
    const res = items.filter((item) => priceRanges.every((p) => p(item)));
    expect(res).toStrictEqual(items);

    // Return a the filterted results
    const priceRanges2 = adaptNumericFilters(['price>=15', 'price<=30', 'id>=2', 'id<=2']);
    const res2 = items.filter((item) => priceRanges2.every((p) => p(item)));
    expect(res2).toStrictEqual([{ "id": 2, "price": 19 }]);

    // Return all results
    const priceRanges3 = adaptNumericFilters(['price>=30', 'price<=100', 'id>=5', 'id<=10']);
    const res3 = items.filter((item) => priceRanges3.every((p) => p(item)));
    expect(res3).toStrictEqual([]);
  });
});
