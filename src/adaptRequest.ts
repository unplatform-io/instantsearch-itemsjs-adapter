//Instantsearch request to itemsjs request
import { MultipleQueriesQuery } from "@algolia/client-search";
import { ItemsJsRequest } from "./itemsjsInterface";

export function adaptRequest(request: MultipleQueriesQuery[]): ItemsJsRequest {
  const numericFilters = <string[]>request[0].params.numericFilters;
  const facets = <string[]>request[0].params.facets;

  const response: ItemsJsRequest = {
    query: request[0].params.query,
    per_page: request[0].params.hitsPerPage,
    page: adaptPage(request[0].params.page),
    indexName: "products",
  };

  if (facets) {
    response.aggregations = facets;
  }

  if (numericFilters && numericFilters.length > 0) {
    const filters = adaptNumericFilters(numericFilters);
    response.filter = (item) => filters.every((filter) => filter(item));
  }

  return response;
}

export function adaptPage(page: number): number {
  // ItemsJS pages start at 1 iso 0
  return page + 1;
}

export function regexInput(priceRange) {
  /*
   * Group 1: Find chars, one or more, except values: "<, =, !, >".
   * Group 2: Find operator
   * Group 3: Find digits, one or more.
   */
  return priceRange.match(new RegExp(/([^<=!>]+)(<|<=|=|!=|>|>=)(\d+)/));
}

export function adaptNumericFilters(priceRanges) {
  const filters = [];

  priceRanges.map((priceRange) => {
    // ['price<=10', 'price', '<=', '10']
    const [, field, operator, value] = regexInput(priceRange);

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
