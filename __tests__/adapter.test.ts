import products from "./products.json";
import { createIndex, performSearch } from "../src/adapter";
import getSearchClient from "../src/adapter";
import adaptresponse from "./adaptresponse.json";
import { SearchResponse } from "@algolia/client-search";
import { MultipleQueriesResponse } from "@algolia/client-search";
import { MultipleQueriesQuery } from "@algolia/client-search";
import { ItemsJsOptions } from "../src/itemsjsInterface";

const per_page = 4;
const query = "";
const page = 1;

const options: ItemsJsOptions = {
  searchableFields: ["title"],
  per_page: per_page,
  query: query,
  page: page,
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

describe("createIndex", () => {
  it("Creates an Itemsjs index", () => {
    const response: SearchResponse = createIndex(products, options);

    const totalNumberOfPages: number = Math.ceil(products.length / per_page);

    expect(response.hits[0].objectID).toBe(1);
    expect(response.hits.length).toBe(per_page);
    expect(response.page).toBe(page - 1);
    expect(response.nbPages).toBe(totalNumberOfPages);
    expect(response.hitsPerPage).toBe(per_page);
    expect(response.nbHits).toBe(products.length);
    expect(response.processingTimeMS).toBeGreaterThanOrEqual(0);
    expect(response.exhaustiveNbHits).toBe(true);
    expect(response.query).toBe("");
    expect(response.params).toBe("");
  });
});

describe("performSearch", () => {
  it("Performs a search", async () => {
    const performsearch: Readonly<Promise<MultipleQueriesResponse<object>>> =
      performSearch(request);

    await expect(performsearch).resolves.toStrictEqual({
      results: [adaptresponse],
    });
  });
});

describe("getSearchClient", () => {
  it("Creates an Instantsearch searchclient", () => {
    const getsearchclient = getSearchClient(products, options);

    // const search = (queries) => performSearch(queries)
    // expect(getsearchclient.search).toBe(search) // TODO
    expect(getsearchclient.searchForFacetValues).toThrow("Not implemented");
  });
});
