import itemsjs from "itemsjs";

import { adaptResponse } from "./adaptResponse";
import { adaptRequest } from "./adaptRequest";
import { MultipleQueriesResponse } from "@algolia/client-search";
import { MultipleQueriesQuery } from "@algolia/client-search";
import { SearchResponse } from "@algolia/client-search";
import { ItemsJsRequest } from "./itemsjsInterface";
import { ItemsJsOptions } from "./itemsjsInterface";

interface Hit {
  readonly objectID: string;
}

interface SearchResponse {
  hits: Array<Hit>;
  page: number;
  nbHits: number;
  nbPages: number;
  hitsPerPage: number;
  processingTimeMS: number;
  exhaustiveNbHits: boolean;
  query: string;
  params: string;
}

interface MultipleQueriesResponse {
  results: Array<SearchResponse>;
}

let index;

export default function getSearchClient(
  productsState: object,
  options: ItemsJsOptions
) {
  createIndex(productsState, options);

  return {
    search: (queries: MultipleQueriesQuery[]) => search(queries),
    searchForFacetValues: () => {
      throw new Error("Not implemented");
    },
  };
}

export function createIndex(
  productsState: object,
  options: ItemsJsOptions
): SearchResponse {
  index = itemsjs(productsState, options);

  console.log("index", index);
  return adaptResponse(
    index.search({
      query: "",
    })
  );
}

export function search(
  request: MultipleQueriesQuery[]
): Readonly<Promise<MultipleQueriesResponse<object>>> {
  if (index) {
    const itemsjsRequest: ItemsJsRequest = adaptRequest(request);
    const itemsjsResponse = index.search(itemsjsRequest);
    const InstantSearchResponse = Promise.resolve({
      results: [adaptResponse(itemsjsResponse)],
    });

    return InstantSearchResponse;
  }
  return null;
}
