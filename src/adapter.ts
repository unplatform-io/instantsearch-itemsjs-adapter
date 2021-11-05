import itemsjs from "itemsjs";
import { adaptResponse } from "./adaptResponse";
import { adaptRequest } from "./adaptRequest";
import {
  MultipleQueriesResponse,
  MultipleQueriesQuery,
} from "@algolia/client-search";
import {
  ItemsJsRequest,
  ItemsJsOptions,
  SearchClient,
} from "./itemsjsInterface";

let index;

export function getSearchClient(): SearchClient {
  return {
    search: (queries: MultipleQueriesQuery[]) => performSearch(queries),
    searchForFacetValues: () => {
      throw new Error("Not implemented");
    },
  };
}

export function createIndex(data: object, options: ItemsJsOptions): void {
  index = itemsjs(data, options);
}

export function performSearch(
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
