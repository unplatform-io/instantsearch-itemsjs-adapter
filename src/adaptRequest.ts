//Instantsearch request to itemsjs request
import { MultipleQueriesQuery } from "@algolia/client-search";
import { ItemsJsRequest } from "./itemsjsInterface";

export function adaptRequest(request: MultipleQueriesQuery[]): ItemsJsRequest {
  const numericFilters = request[0].params.numericFilters;
  const facets = <string[]>request[0].params.facets;

  console.log(numericFilters);
  console.log("filters", request[0].params.filters);
  console.log("facetFilters", request[0].params.facetFilters);
  console.log("facets", request[0].params.facets);

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
    response.filter = (item) => filters.every((p) => p(item));
  }

  return response;
}

export function adaptPage(page: number): number {
  // ItemsJS pages start at 1 iso 0
  return page + 1;
}

function adaptNumericFilters(priceRanges) {
  const filters = [];

  for (let index = 0; index < priceRanges.length; index++) {
    const price: string = priceRanges[index];

    // ['price<=10', 'price', '<=', '10']
    const [, field, operator, value] = price.match(
      new RegExp("(.*)(<=|>=)(.*)")
    );

    // (item) => eval(item['price'] + <= + 10)
    const filter = (item) => eval(item[field] + operator + value);

    filters.push(filter);
  }
  // [(item) => eval(item['price'] + <= + 10), (item) => eval(item['price'] + <= + 10)]
  return filters;
}
