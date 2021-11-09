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
    facets: adaptFacets(response.data.aggregations),
  };
}

export function adaptHit(item): Hit<object> {
  return {
    objectID: item.id,
    ...item,
    _highlightResult: {}, // Highlighting not supported
  };
}

export function adaptFacets(
  aggregations
): Record<string, Record<string, number>> {
  //get facet name
  const facetNames = Object.keys(aggregations);

  //get facet options
  const facetKey = [];
  const facetDocCount = [];
  facetNames.forEach((name) => {
    const key = [];
    const docCount = [];
    aggregations[name].buckets.forEach((item) => {
      key.push(item.key);
      docCount.push(item.doc_count);
    });
    facetKey.push(key);
    facetDocCount.push(docCount);
  });

  //create instentsearch return
  const instentsearchFacets = {};
  for (let index = 0; index < facetNames.length; index++) {
    const obj = {};
    for (let index2 = 0; index2 < facetKey[index].length; index2++) {
      obj[facetKey[index][index2]] = facetDocCount[index][index2];
    }
    instentsearchFacets[facetNames[index]] = obj;
  }

  return instentsearchFacets;
}
