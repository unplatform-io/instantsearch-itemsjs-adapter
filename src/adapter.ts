import itemsjs from "itemsjs";

import { adaptResponse } from "./adaptResponse";
import { adaptRequest } from "./adaptRequest";

interface Hit {
  readonly objectID: string;
}

interface SearchResponse {
  hits: Array<Hit>;
  page: number;
  nbHits: number;
  nbPages: number;
  hitsPerPage: number;
  processingTimeMS: number;
  exhaustiveNbHits: boolean;
  query: string;
  params: string;
}

interface MultipleQueriesResponse {
  results: Array<SearchResponse>;
}

let index;

export function createIndex(productsState): SearchResponse {
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

export function search(request): Promise<MultipleQueriesResponse> {
  const instantSearchRequest = {
    query: request[0].params.query,
    hitsPerPage: 10,
    page: request[0].params.page,
  };

  if (index) {
    const itemsjsRequest: object = adaptRequest(instantSearchRequest);
    const itemsjsResponse: object = index.search(itemsjsRequest);

    const InstantSearchResponse = { results: [adaptResponse(itemsjsResponse)] };
    console.log("Search Response", InstantSearchResponse);

    return Promise.resolve(InstantSearchResponse);
  }
  return null;
}
