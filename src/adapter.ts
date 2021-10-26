import itemsjs from "itemsjs";

import { adaptResponse } from "./adaptResponse";
import { adaptRequest } from "./adaptRequest";

let index;

export function createIndex(productsState) {
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

interface Request {
  params: {
    query: string;
    hitsPerPage: number;
    page: number;
  }
}

interface InstantSearchRequest {
  query: string;
  hitsPerPage: number;
  page: number;
}

// Readonly<Promise<MultipleQueriesResponse<TObject>>>;

export function search(request:Request): object {
  console.log('Instantsearch incoming request', request)

  const instantSearchRequest: InstantSearchRequest = {
    query: request[0].params.query,
    hitsPerPage: 10,
    page: request[0].params.page,
  };

  if (index) {
    const itemsjsRequest: object = adaptRequest(instantSearchRequest);
    const itemsjsResponse: object = index.search(itemsjsRequest);

    const InstantSearchResponse: object = { results: [adaptResponse(itemsjsResponse)] };
    console.log(InstantSearchResponse)
    return Promise.resolve(InstantSearchResponse);
  }

  return null;
}
