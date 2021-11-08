//Instantsearch request to itemsjs request
import { MultipleQueriesQuery } from "@algolia/client-search";
import { ItemsJsRequest } from "./itemsjsInterface";

export function adaptRequest(request: MultipleQueriesQuery[]): ItemsJsRequest {
  const numericFilters = <string[]> request[0].params.numericFilters;
  const facets = <string[]> request[0].params.facets;

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

export function adaptNumericFilters(priceRanges) {
  const filters = [];

  priceRanges.map((priceRange) => {
    // ['price<=10', 'price', '<=', '10']
    const [, field, operator, value] = priceRange.match(
      new RegExp("(.*)(<=|>=)(.*)")
    );

    // (item) => eval(item['price'] + <= + 10)
    const filter = (item) => eval(item[field] + operator + value);

    filters.push(filter);
  })

  return filters;
}
