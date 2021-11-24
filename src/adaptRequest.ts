//Instantsearch request to itemsjs request
import { MultipleQueriesQuery } from "@algolia/client-search";
import { ItemsJsRequest, ReturnAdaptRequest } from "./itemsjsInterface";

export function adaptRequest(
  request: MultipleQueriesQuery[]
): ReturnAdaptRequest {
  const facetorder = [];
  let first = true;
  const responses = request.map((req) => {
    const numericFilters = <string[]>req.params.numericFilters;
    const facets = <string[]>req.params.facets;
    const facetFilters = req.params.facetFilters;
    const sort = req.indexName; // IndexName will be assigned the SortBy value if selected.

    if (first) {
      first = false;
    } else {
      facetorder.push(req.params.facets);
    }

    const response: ItemsJsRequest = {
      query: req.params.query,
      per_page: req.params.hitsPerPage,
      page: adaptPage(req.params.page),
      indexName: req.indexName,
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
      response.filters = adaptFilters(req.params.facetFilters);
    }

    return response;
  });

  return { responses: responses, facetorder: facetorder };
}

export function adaptPage(page: number): number {
  // ItemsJS pages start at 1 iso 0
  return page + 1;
}

export function adaptFilters(instantsearchFacets) {
  const itemsJsFacets = {};

  instantsearchFacets.forEach((facetList) => {
    facetList.forEach((facet) => {
      const facetRegex = new RegExp(/(.+)(:)(.+)/);
      const [, name, , value] = facet.match(facetRegex);
      if (itemsJsFacets[name]) {
        itemsJsFacets[name].push(value);
      } else {
        itemsJsFacets[name] = [value];
      }
    });
  });

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
