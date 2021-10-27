export interface itemsjsReq {
  query: string;
  per_page: number;
  page: number;
  indexName: string;
}

export interface itemsjsRes {
  pagination: {
    per_page: number;
    total: number;
    page: number;
  };
  timings: {
    total: number;
    facets: number;
    search: number;
    sorting: number;
  };
  data: {
    items: any; //Array<Hit<object>>;
    aggregations: object;
  };
}
