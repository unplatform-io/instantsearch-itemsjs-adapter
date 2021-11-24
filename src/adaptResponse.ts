//Itemsjs response to Instantsearch response

import { Hit, SearchResponse } from "@algolia/client-search";
import { ItemsJsResponse } from "./itemsjsInterface";

export function adaptResponse(
  response: ItemsJsResponse[],
  isNumeric: object,
): SearchResponse[] {
  
  console.log('isNumeric', isNumeric)

  var first = 0;
  const responses = response.map(res => {
    const totalNumberOfPages = Math.ceil(
      res.pagination.total / res.pagination.per_page
    );
    
    if(first == 0) {
      first++;
      return {
        hits: res.data.items.map(adaptHit),
        page: res.pagination.page - 1,
        nbPages: totalNumberOfPages,
        hitsPerPage: res.pagination.per_page,
        nbHits: res.pagination.total,
        processingTimeMS: res.timings.total,
        exhaustiveNbHits: true,
        exhaustiveFacetsCount: true,
        query: "",
        params: "",
        facets: adaptFacets(res.data.aggregations),
        facets_stats: adaptFacetsStats(res.data.aggregations),
      };
    } else if(first == 1){
      first++;
      return {
          hits: res.data.items.map(adaptHit),
          page: res.pagination.page - 1,
          nbPages: totalNumberOfPages,
          hitsPerPage: res.pagination.per_page,
          nbHits: res.pagination.total,
          processingTimeMS: res.timings.total,
          exhaustiveNbHits: true,
          exhaustiveFacetsCount: true,
          query: "",
          params: "",
          facets: {category: {
            "electronics": 6,
            "women's clothing": 6,
            "jewelery": 4,
            "men's clothing": 4
        }},
      };
    } else {
        return {
          hits: res.data.items.map(adaptHit),
          page: res.pagination.page - 1,
          nbPages: totalNumberOfPages,
          hitsPerPage: res.pagination.per_page,
          nbHits: res.pagination.total,
          processingTimeMS: res.timings.total,
          exhaustiveNbHits: true,
          exhaustiveFacetsCount: true,
          query: "",
          params: "",
          facets: adaptFacets(res.data.aggregations),
          facets_stats: adaptFacetsStats(res.data.aggregations),
      };
    }

    // return {
    //   hits: res.data.items.map(adaptHit),
    //   page: res.pagination.page - 1,
    //   nbPages: totalNumberOfPages,
    //   hitsPerPage: res.pagination.per_page,
    //   nbHits: res.pagination.total,
    //   processingTimeMS: res.timings.total,
    //   exhaustiveNbHits: true,
    //   exhaustiveFacetsCount: true,
    //   query: "",
    //   params: "",
    //   facets: adaptFacets(res.data.aggregations),
    //   facets_stats: adaptFacetsStats(res.data.aggregations),
    // };

  })
  
  return responses;
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
