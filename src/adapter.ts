import itemsjs from "itemsjs";
import { adaptResponse } from "./adaptResponse";
import { adaptRequest } from "./adaptRequest";
import {
  MultipleQueriesResponse,
  MultipleQueriesQuery,
} from "@algolia/client-search";
import { ItemsJsOptions, SearchClient } from "./itemsjsInterface";

let index;

export function getSearchClient(newIndex?: any): SearchClient {
  return {
    search: (queries: MultipleQueriesQuery[]) =>
      performSearch(queries, index || newIndex),
    searchForFacetValues: () => {
      throw new Error("Not implemented");
    },
  };
}

export function createIndex(data: object, options: ItemsJsOptions): any {
  index = itemsjs(data, options);
  return index;
}

export function performSearch(
  requests: MultipleQueriesQuery[],
  index: any
): Readonly<Promise<MultipleQueriesResponse<object>>> {
  if (index) {
    let processingTimeMS = 0;
    const responses = requests.map((request) => {
      const adaptedRequest = adaptRequest(request);
      const itemsJsRes = index.search(adaptedRequest);

      processingTimeMS = processingTimeMS + itemsJsRes.timings.total;

      // Are there any aggregations?
      if (itemsJsRes.data.aggregations) {
        // Only copy the requested aggregations
        const filteredAggregations = {};
        Object.keys(itemsJsRes.data.aggregations).forEach((aggregationName) => {
          if (request.params.facets.includes(aggregationName)) {
            filteredAggregations[aggregationName] =
              itemsJsRes.data.aggregations[aggregationName];
          }
        });

        itemsJsRes.data.aggregations = filteredAggregations;
      }

      return adaptResponse(itemsJsRes, request.params.query, processingTimeMS);
    });

    return Promise.resolve({ results: responses });
  }

  return null;
}
