//Itemsjs response to Instantsearch response
// export declare type Hit<THit> = THit & {
//   readonly objectID: string;
// };

// export declare type MultipleQueriesResponse<TObject> = {
//   /**
//    * The list of results.
//    */
//   results: Array<SearchResponse<TObject>>;
// };

// export declare type SearchResponse<TObject = {}> = {
//   /**
//    * The hits returned by the search.
//    *
//    * Hits are ordered according to the ranking or sorting of the index being queried.
//    */
//   hits: Array<Hit<TObject>>;
//   /**
//    * Index of the current page (zero-based).
//    */
//   page: number;
//   /**
//    * Number of hits matched by the query.
//    */
//   nbHits: number;
//   /**
//    * Number of pages returned.
//    *
//    * Calculation is based on the total number of hits (nbHits) divided by the
//    * number of hits per page (hitsPerPage), rounded up to the nearest integer.
//    */
//   nbPages: number;
//   /**
//    * Maximum number of hits returned per page.
//    */
//   hitsPerPage: number;
//   /**
//    * Time the server took to process the request, in milliseconds. This does not include network time.
//    */
//   processingTimeMS: number;
//   /**
//    * Whether the nbHits is exhaustive (true) or approximate (false).
//    *
//    * An approximation is done when the query takes more than 50ms to be
//    * processed (this can happen when using complex filters on millions on records).
//    */
//   exhaustiveNbHits: boolean;
//   /**
//    * The query used to search. Accepts every character, and every character entered will be used in the search.
//    *
//    * An empty query can be used to fetch all records.
//    */
//   query: string;
//   /**
//    * A url-encoded string of all search parameters.
//    */
//   params: string;
// };

// Readonly<Promise<MultipleQueriesResponse<TObject>>>

export function adaptResponse(response) {
  const totalNumberOfPages = Math.ceil(
    response.pagination.total / response.pagination.per_page
  );

  return {
    hits: response.data.items.map(adaptHit),
    page: response.pagination.page - 1,
    nbPages: totalNumberOfPages,
    hitsPerPage: response.pagination.per_page,
    index: "products",
    nbHits: response.pagination.total,
    processingTimeMS: response.timings.total,
    exhaustiveNbHits: true,
    query: "gold",
    params: null,
  };
}

function adaptHit(item) {
  return {
    objectID: item.id,
    ...item,
    _highlightResult: {}, // Highlighting not supported
  };
}
