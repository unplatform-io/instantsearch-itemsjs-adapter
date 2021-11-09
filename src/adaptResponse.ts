//Itemsjs response to Instantsearch response

import { Hit, SearchResponse } from "@algolia/client-search";
import { ItemsJsResponse } from "./itemsjsInterface";

export function adaptResponse(response: ItemsJsResponse): SearchResponse {
  const totalNumberOfPages = Math.ceil(
    response.pagination.total / response.pagination.per_page
  );

  return {
    hits: response.data.items.map(adaptHit),
    page: response.pagination.page - 1,
    nbPages: totalNumberOfPages,
    hitsPerPage: response.pagination.per_page,
    nbHits: response.pagination.total,
    processingTimeMS: response.timings.total,
    exhaustiveNbHits: true,
    query: "",
    params: "",
    //TODO: Static -> Dynamic (see code feature/filters)
    facets: {
      price: {
        "00.00": 0,
      },
      id: {
        "0": 0,
      },
      rate: {
        "1": 0,
        "2": 1,
        "3": 1,
        "4": 1,
        "5": 1,
      },
    },
    // facets_stats: {}, not supported by Itemsjs
  };
}

export function adaptHit(item): Hit<object> {
  return {
    objectID: item.id,
    ...item,
    _highlightResult: {}, // Highlighting not supported
  };
}
