//Instantsearch request to itemsjs request
import { MultipleQueriesQuery } from "@algolia/client-search";
import { ItemsJsRequest } from "./itemsjsInterface";

export function adaptRequest(request: MultipleQueriesQuery[]): ItemsJsRequest {
  return {
    query: request[0].params.query,
    per_page: 10,
    page: adaptPage(request[0].params.page),
    indexName: "products",
  };
}

function adaptPage(page: number): number {
  // ItemsJS pages start at 1 iso 0
  return Number(page || 0) + 1;
}
