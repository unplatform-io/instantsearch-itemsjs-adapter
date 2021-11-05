//Instantsearch request to itemsjs request
import { MultipleQueriesQuery } from "@algolia/client-search";
import { ItemsJsRequest } from "./itemsjsInterface";

export function adaptRequest(request: MultipleQueriesQuery[]): ItemsJsRequest {
  var numericFilters = <string> request[0].params.numericFilters  
  
  const response: ItemsJsRequest = { 
    query: request[0].params.query,
    per_page: request[0].params.hitsPerPage,
    page: adaptPage(request[0].params.page),
    indexName: "products",
   }

   if (numericFilters && numericFilters.length > 0) {
    var getPrices = adaptPriceRange(numericFilters)
    var minPrice = getPrices[0]
    var maxPrice = getPrices[1]
    response.filter = (item) => item.price >= minPrice && item.price <= maxPrice
  }

  return response
}

export function adaptPage(page: number): number {
  // ItemsJS pages start at 1 iso 0
  return page + 1;
}

function adaptPriceRange(priceRanges: string | string[] | readonly (readonly string[])[]): number[] {
  let prices = []

  for (let index = 0; index < priceRanges.length; index++) {
    var price = <string> priceRanges[index]
    var regexPriceMatch = price.match(new RegExp(/[.\d]+/)) // '/[.\d]+/' returns null 
    prices.push(regexPriceMatch)
  }
  
  return [prices[0] ,prices[1]]
}
