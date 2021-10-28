import itemsjs from "itemsjs";

import { adaptResponse } from "./adaptResponse";
import { adaptRequest } from "./adaptRequest";
import { MultipleQueriesResponse } from "@algolia/client-search";
import { MultipleQueriesQuery } from "@algolia/client-search";
import { SearchResponse } from "@algolia/client-search";
import { ItemsJsRequest } from "./itemsjsInterface";

let index;
export function createIndex(productsState: object): SearchResponse {
  index = itemsjs(productsState, {
    searchableFields: ["title"],
    sortings: {
      price_asc: {
        field: "price",
        order: "asc",
      },
      price_desc: {
        field: "price",
        order: "desc",
      },
    },
    aggregations: {
      category: {
        title: "category",
        size: 10,
      },
    },
    options: {
      page: 1,
      per_page: 20,
    },
    sort: "price_desc",
  });

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
