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

export function adaptFilters(facetFilters){  
  //get facet name
    const regex = facetFilters[0].match(new RegExp('(.*)(?=:)'));
    const facetName = <string>regex[0];

  //get selected facets
    var selected = [];  
    facetFilters.forEach(item => {
      const regex2 = item.match(new RegExp('(?<=:)(.*)'));
      const select = <string>regex2[0];
      selected.push(select);
    });

  //create itemsjs return
    var json = `{"${facetName}": [`;
    var first = true
    selected.forEach(item => {
      if(first){
        json = json + `"` + item + `"`;
        first = false;
      }else{
        json = json + `, "` + item + `"`;
      }
    })
    json = json + `]}`;
    const itemsJsFacets = JSON.parse(json);

  return itemsJsFacets;
}
