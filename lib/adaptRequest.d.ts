import { MultipleQueriesQuery } from "@algolia/client-search";
import { ItemsJsRequest } from "./itemsjsInterface";
export declare function adaptRequest(request: MultipleQueriesQuery[]): ItemsJsRequest;
export declare function adaptPage(page: number): number;
export declare function adaptFilters(instantsearchFacets: any): {};
export declare function parseRange(range: any): any;
export declare function adaptNumericFilters(ranges: any): any[];
