import itemsjs from "itemsjs";
import { adaptResponse } from "./adaptResponse";
import { adaptRequest } from "./adaptRequest";
import {
  MultipleQueriesResponse,
  MultipleQueriesQuery,
} from "@algolia/client-search";
import { ItemsJsOptions, SearchClient } from "./itemsjsInterface";

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
  requests: MultipleQueriesQuery[]
): Readonly<Promise<MultipleQueriesResponse<object>>> {
  if (index) {
    const responses = requests.map((request) => {
      const adaptedRequest = adaptRequest(request);
      const itemsJsRes = index.search(adaptedRequest);

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

      return adaptResponse(itemsJsRes);
    });

    return Promise.resolve({ results: responses });
  }
  return null;
}
