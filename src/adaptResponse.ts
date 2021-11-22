//Itemsjs response to Instantsearch response

import { Hit, SearchResponse } from "@algolia/client-search";
import { ItemsJsResponse } from "./itemsjsInterface";

export function adaptResponse(response: ItemsJsResponse): SearchResponse {
  const totalNumberOfPages = Math.ceil(
    response.pagination.total / response.pagination.per_page
  );

  console.log('res', response.data.aggregations)

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
    facets_stats: {
      rate: {
        min: 1,
        max: 5,
        avg: 100,
        sum: 200,
      }
    }
    /**
     * Statistics for numerical facets.
     *
     * Itemsjs doens't return information that can be used to find the statistics: min, max, avg, and sum value needed for numerical facets.
     *
     */
    // facets_stats: {}
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

const object = {
  "category": {
      "name": "category",
      "title": "category",
  },
  "color": {
      "name": "color",
      "title": "color",
  },
  "rate": {
      "name": "rate",
      "title": "rate",
  },
  "price": {
      "name": "price",
      "title": "Price",
      "facet_stats": {
          "min": 7,
          "max": 999,
          "avg": 161.45,
          "sum": 3229
      }
  }
}

export function adaptFacetsStats(object) {
  return {
    price: {
      min: 0,
      max: 0,
      avg: 0,
      sum: 0,
    }
  }
}
