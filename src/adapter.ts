import itemsjs from "itemsjs";

import { adaptResponse } from "./adaptResponse";
import { adaptRequest } from "./adaptRequest";
import { MultipleQueriesResponse } from "@algolia/client-search";
import { MultipleQueriesQuery } from "@algolia/client-search";
import { SearchResponse } from "@algolia/client-search";
import { ItemsJsRequest } from "./itemsjsInterface";
import { ItemsJsOptions } from "./itemsjsInterface";

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
