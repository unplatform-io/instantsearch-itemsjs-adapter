import itemsjs from "itemsjs";

import { adaptResponse } from "./adaptResponse";
import { adaptRequest } from "./adaptRequest";

let index;

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
  const InstantSearchRequset = {
    query: request[0].params.query,
  };

  if (index) {
    const itemsjsRequest = adaptRequest(InstantSearchRequset);
    const itemsjsResponse = index.search(itemsjsRequest);
    console.log("response", adaptResponse(itemsjsResponse));
    return JSON.stringify(adaptResponse(itemsjsResponse));
  }
  return null;
}
