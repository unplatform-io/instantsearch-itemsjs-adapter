//Instantsearch request to itemsjs request
import { MultipleQueriesQuery } from "@algolia/client-search";
import { ItemsJsRequest } from "./itemsjsInterface";

export function adaptRequest(request: MultipleQueriesQuery): ItemsJsRequest {
  const numericFilters = <string[]>request.params.numericFilters;
  const facets = <string[]>request.params.facets;
  const facetFilters = request.params.facetFilters;
  const sort = request.indexName; // IndexName will be assigned the SortBy value if selected.

  const response: ItemsJsRequest = {
    query: request.params.query,
    per_page: request.params.hitsPerPage,
    page: adaptPage(request.params.page),
    indexName: request.indexName,
    sort: sort,
  };

  if (facets) {
    response.aggregations = facets;
  }

  if (numericFilters && numericFilters.length > 0) {
    const filters = adaptNumericFilters(numericFilters);
    response.filter = (item) => filters.every((filter) => filter(item));
  }

  if (facetFilters && facetFilters.length > 0) {
    response.filters = adaptFilters(facetFilters);
  }

  return response;
}

export function adaptPage(page: number): number {
  // ItemsJS pages start at 1 iso 0
  return page + 1;
}

export function adaptFilters(instantsearchFacets) {
  let itemsJsFacets = {};
  if (Array.isArray(instantsearchFacets)) {
    instantsearchFacets.forEach((facets) => {
      if (Array.isArray(facets)) {
        facets.forEach((facet) => {
          itemsJsFacets = filterRegex(itemsJsFacets, facet);
        });
      } else {
        itemsJsFacets = filterRegex(itemsJsFacets, facets);
      }
    });
  } else {
    throw Error("request.params.facetFilters does not contain an array");
  }

  return itemsJsFacets;
}

export function filterRegex(itemsJsFacets, facet) {
  const facetRegex = new RegExp(/(.+)(:)(.+)/);
  const [, name, , value] = facet.match(facetRegex);
  if (itemsJsFacets[name]) {
    itemsJsFacets[name].push(value);
  } else {
    itemsJsFacets[name] = [value];
  }
  return itemsJsFacets;
}

export function parseRange(range) {
  /*
   * Group 1: Find chars, one or more, except values: "<, =, !, >".
   * Group 2: Find operator
   * Group 3: Find digits, one or more.
   */
  return range.match(new RegExp(/([^<=!>]+)(<|<=|=|!=|>|>=)(\d+)/));
}

export function adaptNumericFilters(ranges) {
  const filters = [];

  ranges.map((range) => {
    // ['price<=10', 'price', '<=', '10']
    const [, field, operator, value] = parseRange(range);

    switch (operator) {
      case "<":
        filters.push((item) => item[field] < value);
        break;
      case "<=":
        filters.push((item) => item[field] <= value);
        break;
      case "=":
        filters.push((item) => item[field] == value); // Needs to be comparison operator "=="
        break;
      case "!=":
        filters.push((item) => item[field] != value);
        break;
      case ">":
        filters.push((item) => item[field] > value);
        break;
      case ">=":
        filters.push((item) => item[field] >= value);
        break;
    }
  });

  return filters;
}
