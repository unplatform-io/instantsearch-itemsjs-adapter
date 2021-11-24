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
  ReturnAdaptRequest,
} from "./itemsjsInterface";

let index;
let option: ItemsJsOptions;

export function getSearchClient(): SearchClient {
  return {
    search: (queries: MultipleQueriesQuery[]) => performSearch(queries),
    searchForFacetValues: () => {
      throw new Error("Not implemented");
    },
  };
}

export function createIndex(data: object, options: ItemsJsOptions): void {
  option = options
  index = itemsjs(data, options);
}

export function performSearch(
  request: MultipleQueriesQuery[]
): Readonly<Promise<MultipleQueriesResponse<object>>> {
  if (index) {
    const itemsjsRequest: ReturnAdaptRequest = adaptRequest(request);

    const isNumeric = {};
    
    itemsjsRequest.facetorder.forEach(f => {
      isNumeric[f] = option.aggregations[f].show_facet_stats == true
    })
    
    const itemsjsResponse = itemsjsRequest.responses.map(req => {
      return index.search(req)
    })

    const InstantSearchResponse = Promise.resolve({
      results: adaptResponse(itemsjsResponse, isNumeric),
    });

    return InstantSearchResponse;
  }

  return null;
}
