import { MultipleQueriesResponse, MultipleQueriesQuery } from "@algolia/client-search";
import { ItemsJsOptions, SearchClient } from "./itemsjsInterface";
export declare function getSearchClient(): SearchClient;
export declare function createIndex(data: object, options: ItemsJsOptions): void;
export declare function performSearch(request: MultipleQueriesQuery[]): Readonly<Promise<MultipleQueriesResponse<object>>>;
