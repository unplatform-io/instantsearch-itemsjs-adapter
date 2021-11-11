//Instantsearch request to itemsjs request

import { MultipleQueriesQuery } from "@algolia/client-search";
import { ItemsJsRequest } from "./itemsjsInterface";

export function adaptRequest(request: MultipleQueriesQuery[]): ItemsJsRequest {
  if (request[0].params.facetFilters) {
    return {
      query: request[0].params.query,
      per_page: request[0].params.hitsPerPage,
      page: adaptPage(request[0].params.page),
      indexName: "products",
      filters: adaptFilters(request[0].params.facetFilters),
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

export function adaptFilters(instantsearchFacets) {
  const itemsJsFacets = {};

  instantsearchFacets.forEach((facetList) => {
    facetList.map((facet) => {
      const facetRegex = new RegExp(/(.+)(:)(.+)/);
      const [, name, , value] = facet.match(facetRegex);
      if (itemsJsFacets[name]) {
        itemsJsFacets[name].push(value);
      } else {
        itemsJsFacets[name] = [value];
      }
    });
  });

  return itemsJsFacets;
}
