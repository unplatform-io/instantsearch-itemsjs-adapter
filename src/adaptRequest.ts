//Instantsearch request to itemsjs request

import { MultipleQueriesQuery } from "@algolia/client-search";
import { ItemsJsRequest } from "./itemsjsInterface";

export function adaptRequest(request: MultipleQueriesQuery[]): ItemsJsRequest {
  
  if(request[0].params.facetFilters){
    return {
      query: request[0].params.query,
      per_page: request[0].params.hitsPerPage,
      page: adaptPage(request[0].params.page),
      indexName: "products",
      filters: adaptFilters(request[0].params.facetFilters[0]),
    };
  }
  
  return {
    query: request[0].params.query,
    per_page: request[0].params.hitsPerPage,
    page: adaptPage(request[0].params.page),
    indexName: "products",
  };
}

export function adaptPage(page: number): number {
  // ItemsJS pages start at 1 iso 0
  return page + 1;
}

export function adaptFilters(fasetFilters){
  //static
  const returnfacet = {category: ['electronics']};
  return returnfacet;
}
