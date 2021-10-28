import { Hit } from "@algolia/client-search";

export interface ItemsJsRequest {
  query: string;
  per_page: number;
  page: number;
  indexName: string;
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
        bucket: {
          key: string;
          doc_count: number;
          selected: boolean;
        }
        name: string;
        posistion: number;
        title: string;
      }
    }
  };
}
