import {
  Hit,
  MultipleQueriesQuery,
  MultipleQueriesResponse,
} from "@algolia/client-search";

export interface SearchClient {
  search: (
    queries: MultipleQueriesQuery[]
  ) => Readonly<Promise<MultipleQueriesResponse<object>>>;
  searchForFacetValues: () => void;
}

export interface ItemsJsOptions {
  aggregations?: object;
  sortings?: object;
  searchableFields: string[];
  native_search_enabled?: boolean;
  query: string;
  per_page?: number;
  page?: number;
}

export interface ItemsJsRequest {
  query: string;
  per_page: number;
  page: number;
  indexName: string;
  filters?: object;
  aggregations?: string[];
  filter?: object;
  sort?: string;
}

export interface ItemsJsResponse {
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
    items: Array<Hit<object>>;
    aggregations: {
      category: {
        buckets: [
          {
            key: string;
            doc_count: number;
            selected: boolean;
          }
        ];
        name: string;
        posistion: number;
        title: string;
      };
    };
  };
}
