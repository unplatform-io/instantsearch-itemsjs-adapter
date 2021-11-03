//Instantsearch request to itemsjs request

import { MultipleQueriesQuery } from "@algolia/client-search";
import { ItemsJsRequest } from "./itemsjsInterface";

// Wat binnen komt van Instantsearch
export function adaptRequest(request: MultipleQueriesQuery[]): ItemsJsRequest {

  const princeRange = adaptPriceRange(request[0].params.numericFilters)
  
  console.log('facets', request[0].params.facets)
  
  console.log(princeRange)

  return {
    query: request[0].params.query,
    per_page: request[0].params.hitsPerPage, // on default value
    page: adaptPage(request[0].params.page),
    indexName: "products",
    filter: function(item) {
      return item.price > princeRange
    }
  }
}

export function adaptPage(page: number): number {
  // ItemsJS pages start at 1 iso 0
  return page + 1;
}

function adaptPriceRange(priceRanges: string | readonly string[] | ReadonlyArray<readonly string[]>): number{
  console.log(priceRanges)

  // TODO: Convert: ['price>=250', 'price<=500'] ===> [250, 500]

  return Math.floor(Math.random() * 100);
}
