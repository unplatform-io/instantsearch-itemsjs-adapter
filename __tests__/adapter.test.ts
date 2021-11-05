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
  per_page: per_page,
  query: query,
  page: page,
  aggregations: {
    category: {
      title: "category",
      size: 10,
      conjunction: false,
    },
  },
};

const request: MultipleQueriesQuery[] = [
  {
    indexName: "instant_search",
    params: {
      highlightPreTag: "<ais-highlight-0000000000>",
      highlightPostTag: "</ais-highlight-0000000000>",
      query: "",
      maxValuesPerFacet: 10,
      page: 0,
      hitsPerPage: per_page,
      facets: ["category"],
      tagFilters: "",
    },
  },
];

describe("performSearch", () => {
  it("Performs a search", async () => {
    createIndex(products, options);

    const response: Readonly<MultipleQueriesResponse<object>> =
      await performSearch(request);

    expect(response.results[0].hits.length).toBe(per_page || products.length);
    expect(response.results[0].page).toBe(page - 1);
    expect(response.results[0].nbPages).toBe(totalNumberOfPages);
    expect(response.results[0].hitsPerPage).toBe(per_page);
    expect(response.results[0].nbHits).toBe(products.length);
    expect(response.results[0].processingTimeMS).toBeGreaterThanOrEqual(0);
    expect(response.results[0].exhaustiveNbHits).toBe(true);
    expect(response.results[0].query).toBe(query);
    expect(response.results[0].params).toBe("");
  });
});
