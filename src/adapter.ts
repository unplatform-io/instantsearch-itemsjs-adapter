import itemsjs from "itemsjs";

import { adaptResponse } from "./adaptResponse";
import { adaptRequest } from "./adaptRequest";

var index;

export function getSearchClient(productsState: object) {
  return {
    // search: (queries) => (result),
    search: (requests: any) => search(requests),
    searchForFacetValues: () => {
      throw new Error("Not implemented");
    },
  };
}

export function createIndex(productsState: object) {
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
      page: 2,
      per_page: 4,
    },
    sort: "price_desc",
  });

  return adaptResponse(
    index.search({
      query: "Gold",
    })
  );
}

export function search(request) {
  if (index) {
    //request omzetten (adaptsRequest.ts)
    const itemsjsRequest = adaptRequest(request);

    //zoeken in index (index.search(req))
    const itemsjsResponse = index.search(itemsjsRequest);

    //omgezet resultaat teruggeven
    console.log("response", adaptResponse(itemsjsResponse));
    return adaptResponse(itemsjsResponse);
  }
  return null;
}
