//Itemsjs response to Instantsearch response
import { SearchResponse } from "@algolia/client-search";
import { Hit } from "@algolia/client-search";
import { itemsjsRes } from "./itemsjsInterface";

export function adaptResponse(response: itemsjsRes): SearchResponse {
  console.log("itemsjs response", response);

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
  };
}

function adaptHit(item): Array<Hit<object>> {
  return {
    objectID: item.id,
    ...item,
    _highlightResult: {}, // Highlighting not supported
  };
}
