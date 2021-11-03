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
    facets: {
      price: {
        "33.99": 10,
        "44.99": 100
      }
    },
    facets_stats: {
      price: {
        "min": minPrice(response.data.items),
        "max": maxPrice(response.data.items),
        "avg": 242.806,
        "sum": 5.21281e+06
      }
    }
  };
}

export function adaptHit(item): Hit<object> {
  return {
    objectID: item.id,
    ...item,
    _highlightResult: {}, // Highlighting not supported
  };
}

export function minPrice(items): number{
  const price = []

  items.map(item => {
    price.push(item.price)
  })

  return Math.min(...price) 
}

export function maxPrice(items): number{
  const price = []

  items.map(item => {
    price.push(item.price)
  })
  
  return Math.max(...price)
}
