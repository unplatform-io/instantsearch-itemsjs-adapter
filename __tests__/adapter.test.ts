import products from "./products.json";
import { performSearch, createIndex } from "../src/adapter";
import {
  MultipleQueriesQuery,
  MultipleQueriesResponse,
} from "@algolia/client-search";
import { ItemsJsOptions } from "../src/itemsjsInterface";

const per_page = 4;
const query = "";
const page = 1;
const totalNumberOfPages: number = Math.ceil(products.length / per_page);

const options: ItemsJsOptions = {
  searchableFields: ["title"],
  query: "",
  aggregations: {
    "category.lvl0": {},
    "category.lvl1": {},
    price: {
      show_facet_stats: true,
    },
  },
};

const requests: MultipleQueriesQuery[] = [
  {
    indexName: "instant_search",
    params: {
      highlightPreTag: "<ais-highlight-0000000000>",
      highlightPostTag: "</ais-highlight-0000000000>",
      query: "",
      maxValuesPerFacet: 10,
      page: 0,
      hitsPerPage: per_page,
      facets: ["category.lvl0"],
      tagFilters: "",
    },
  },
  {
    indexName: "instant_search",
    params: {
      highlightPreTag: "<ais-highlight-0000000000>",
      highlightPostTag: "</ais-highlight-0000000000>",
      query: "",
      maxValuesPerFacet: 10,
      page: 0,
      hitsPerPage: per_page,
      facets: ["price"],
      tagFilters: "",
    },
  },
];

describe("performSearch", () => {
  it("Performs a search", async () => {
    createIndex(products, options);

    const response: Readonly<MultipleQueriesResponse<object>> =
      await performSearch(requests);

    expect(response.results[0].hits.length).toBe(per_page || products.length);
    expect(response.results[0].page).toBe(page - 1);
    expect(response.results[0].nbPages).toBe(totalNumberOfPages);
    expect(response.results[0].hitsPerPage).toBe(per_page);
    expect(response.results[0].nbHits).toBe(products.length);
    expect(response.results[0].processingTimeMS).toBeGreaterThanOrEqual(0);
    expect(response.results[0].exhaustiveNbHits).toBe(true);
    expect(response.results[0].query).toBe(query);
    expect(response.results[0].params).toBe("");
    expect(response.results[0].facets).toStrictEqual({
      "category.lvl0": {
        electronics: 6,
        jewelery: 4,
        "men's clothing": 4,
        "women's clothing": 6,
      },
    });
    expect(response.results[0].facets_stats).toStrictEqual({});

    expect(response.results[1].hits.length).toBe(per_page || products.length);
    expect(response.results[1].page).toBe(page - 1);
    expect(response.results[1].nbPages).toBe(totalNumberOfPages);
    expect(response.results[1].hitsPerPage).toBe(per_page);
    expect(response.results[1].nbHits).toBe(products.length);
    expect(response.results[1].processingTimeMS).toBeGreaterThanOrEqual(0);
    expect(response.results[1].exhaustiveNbHits).toBe(true);
    expect(response.results[1].query).toBe(query);
    expect(response.results[1].params).toBe("");
    expect(response.results[1].facets).toStrictEqual({
      price: {
        "109": 2,
        "114": 1,
        "168": 1,
        "10.99": 1,
        "109.95": 1,
        "12.99": 1,
        "15.99": 1,
        "22.3": 1,
        "29.95": 1,
        "39.99": 1,
      },
    });
    expect(response.results[1].facets_stats).toStrictEqual({
      price: { min: 7, max: 999, avg: 161.45, sum: 3229 },
    });
  });
});
