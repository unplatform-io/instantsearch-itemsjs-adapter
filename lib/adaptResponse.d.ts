import { Hit, SearchResponse } from "@algolia/client-search";
import { ItemsJsResponse } from "./itemsjsInterface";
export declare function adaptResponse(response: ItemsJsResponse): SearchResponse;
export declare function adaptHit(item: any): Hit<object>;
export declare function adaptFacets(itemsJsFacets: any): Record<string, Record<string, number>>;
export declare function adaptFacetsStats(object: any): {
    price: {
        min: number;
        max: number;
        avg: number;
        sum: number;
    };
};
