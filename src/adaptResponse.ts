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
  const facetNames = Object.keys(aggregations);

  const selectedFacets = facetNames.map((name) => {
    return aggregations[name].buckets.map((item) => {
      return { key: item.key, docCount: item.doc_count };
    });
  });

  const instantsearchFacets = {};
  facetNames.map(function (name, index) {
    instantsearchFacets[name] = {};
    selectedFacets[index].map((facet) => {
      instantsearchFacets[name][facet.key] = facet.docCount;
    });
  });

  return instantsearchFacets;
}
