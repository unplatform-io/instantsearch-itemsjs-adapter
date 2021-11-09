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

export function adaptFilters(facetFilters) {
  //get facet name
  const facetNames = [];
  facetFilters.forEach((facet) => {
    const regex = facet[0].match(new RegExp("(.*)(?=:)"));
    facetNames.push(<string>regex[0]);
  });

  //get selected facets
  const selectedFacets = [];
  for (let index = 0; index < facetNames.length; index++) {
    const selected = [];
    facetFilters[index].forEach((item) => {
      const regex2 = item.match(new RegExp("(?<=:)(.*)"));
      const select = <string>regex2[0];
      selected.push(select);
    });
    selectedFacets.push(selected);
  }

  //create itemsjs return
  const itemsJsFacets = {};
  for (let index = 0; index < facetNames.length; index++) {
    itemsJsFacets[facetNames[index]] = selectedFacets[index];
  }

  return itemsJsFacets;
}
