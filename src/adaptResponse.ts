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
    facets: adaptFacets(response.data.aggregations)
  };
}

export function adaptHit(item): Hit<object> {
  return {
    objectID: item.id,
    ...item,
    _highlightResult: {}, // Highlighting not supported
  };
}

export function adaptFacets(aggregations): Record<string, Record<string, number>>{
  //aggregations
    // category:
    //  buckets: Array(4)
    //    0: {key: 'electronics', doc_count: 3, selected: false}
    //    1: {key: 'jewelery', doc_count: 1, selected: false}
    //    2: {key: "women's clothing", doc_count: 1, selected: false}
    //    3: {key: "men's clothing", doc_count: 0, selected: false}
    //    length: 4
    //  [[Prototype]]: Array(0)
    //  name: "category"
    //  position: 1
    //  title: "category"

  //static
  const facets = {
    category: {electronics: 3, jewelery: 1},
  };
  
  return facets;
}
