0; //Itemsjs response to Instantsearch response

import { Hit, SearchResponse } from "@algolia/client-search";
import { ItemsJsResponse } from "./itemsjsInterface";

export function adaptResponse(
  response: ItemsJsResponse[],
  isNumeric: object
): SearchResponse[] {
  let processingTimeMS = 0;
  const responses = response.map((res, index) => {
    const totalNumberOfPages = Math.ceil(
      res.pagination.total / res.pagination.per_page
    );

    const response = {
      hits: res.data.items.map(adaptHit),
      page: res.pagination.page - 1,
      nbPages: totalNumberOfPages,
      hitsPerPage: res.pagination.per_page,
      nbHits: res.pagination.total,
      processingTimeMS: (processingTimeMS =
        processingTimeMS + res.timings.total),
      exhaustiveNbHits: true,
      exhaustiveFacetsCount: true,
      query: "",
      params: "",
    };

    if (index == 0) {
      (response["facets"] = adaptFacets(res.data.aggregations)),
        (response["facets_stats"] = adaptFacetsStats(res.data.aggregations));
    } else {
      const facet = isNumeric[index - 1];
      const key = Object.keys(facet)[0];
      const value = Object.values(facet)[0];

      response["facets"] = adaptSingleFacet(res.data.aggregations, key);

      if (value) {
        response["facets_stats"] = adaptSingleFacetStats(
          res.data.aggregations,
          key
        );
      }
    }

    return response;
  });

  return responses;
}

export function adaptSingleFacet(itemsJsFacets, name) {
  const instantsearchFacets = {};
  instantsearchFacets[name] = {};

  itemsJsFacets[name].buckets.forEach(({ key, doc_count }) => {
    instantsearchFacets[name][key] = doc_count;
  });

  return instantsearchFacets;
}

export function adaptSingleFacetStats(itemsJsFacets, name) {
  const instantsearchFacetsStats = {};

  if (itemsJsFacets[name].facet_stats) {
    instantsearchFacetsStats[name] = itemsJsFacets[name].facet_stats;
  }

  return instantsearchFacetsStats;
}

export function adaptHit(item): Hit<object> {
  return {
    objectID: item.id,
    ...item,
    _highlightResult: {}, // Highlighting not supported
  };
}

export function adaptFacets(
  itemsJsFacets
): Record<string, Record<string, number>> {
  const facetNames = Object.keys(itemsJsFacets);

  const instantsearchFacets = {};
  facetNames.forEach((name) => {
    instantsearchFacets[name] = {};

    itemsJsFacets[name].buckets.forEach(({ key, doc_count }) => {
      instantsearchFacets[name][key] = doc_count;
    });
  });

  return instantsearchFacets;
}

export function adaptFacetsStats(
  itemsJsFacetsStats: object
): Record<string, { min: number; max: number; avg: number; sum: number }> {
  const facetNames = Object.keys(itemsJsFacetsStats);
  const instantsearchFacetsStats = {};

  facetNames.forEach((name) => {
    if (itemsJsFacetsStats[name].facet_stats) {
      instantsearchFacetsStats[name] = itemsJsFacetsStats[name].facet_stats;
    }
  });

  return instantsearchFacetsStats;
}
