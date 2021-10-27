//Itemsjs response to Instantsearch response

interface Hit {
  readonly objectID: string;
}

interface SearchResponse {
  hits: Array<Hit>;
  page: number;
  nbHits: number;
  nbPages: number;
  hitsPerPage: number;
  processingTimeMS: number;
  exhaustiveNbHits: boolean;
  query: string;
  params: string;
}

export function adaptResponse(response): SearchResponse {
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
    query: "gold",
    params: '',
  };
}

function adaptHit(item) {
  return {
    objectID: item.id,
    ...item,
    _highlightResult: {}, // Highlighting not supported
  };
}
