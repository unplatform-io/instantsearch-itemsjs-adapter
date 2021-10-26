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
      page: 1,
      per_page: 20,
    },
    sort: "price_desc",
  });

  return adaptResponse(
    index.search({
      query: "Gold",
    })
  );
}

// interface Request {
//   params: any;
//   query: string;
// }

export function search(request) {
  const InstantSearchRequset = {
    query: request[0].params.query,
    hitsPerPage: 3,
    page: 1,
  };

  if (index) {
    const itemsjsRequest = adaptRequest(InstantSearchRequset);
    const itemsjsResponse: object = index.search(itemsjsRequest);

    const InstantSearchResponse = { results: [adaptResponse(itemsjsResponse)] };

    console.log("response", InstantSearchResponse);

    return InstantSearchResponse;
  }

  return null;
}
