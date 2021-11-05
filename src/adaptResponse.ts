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
  var buckets = []
  facetNames.forEach(name =>{
    buckets.push(aggregations[name].buckets);
  })
  

  //create instentsearch return
  var instentsearchFacets = {}
  for (let index = 0; index < facetNames.length; index++) {
    let json = `{`;
    let first = true;
    buckets[index].forEach((item) => {
      if (first) {
        json = json + `"` + item.key + `": ` + item.doc_count;
        first = false;
      } else {
        json = json + `, "` + item.key + `": ` + item.doc_count;
      }
    });
    json = json + `}`;
    instentsearchFacets[facetNames[index]] = JSON.parse(json);
  }

  return instentsearchFacets;
}
