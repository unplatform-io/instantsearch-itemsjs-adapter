import { SearchResponse } from "@algolia/client-search";
import {
  adaptFacets,
  adaptHit,
  adaptResponse,
  adaptFacetsStats,
} from "../src/adaptResponse";
import { ItemsJsResponse } from "../src/itemsjsInterface";

describe("adaptResponse tests", () => {
  it("adaptResponse should convert response to Instantsearch response", () => {
    const itemsjsResponse: ItemsJsResponse = {
      pagination: {
        per_page: 3,
        total: 5,
        page: 2,
      },
      timings: {
        facets: 10,
        search: 10,
        sorting: 10,
        total: 30,
      },
      data: {
        items: [{ objectID: "" }, { objectID: "" }],
        aggregations: {
          category: {
            buckets: [
              {
                key: "testKey 1",
                doc_count: 5,
                selected: false,
              },
            ],
            name: null,
            posistion: null,
            title: null,
          },
        },
      },
    };

    const instantsearchResponse: SearchResponse =
      adaptResponse(itemsjsResponse);

    expect(instantsearchResponse.page).toBe(1);
    expect(instantsearchResponse.nbPages).toBe(Math.ceil(5 / 3));
    expect(instantsearchResponse.hitsPerPage).toBe(3);
    expect(instantsearchResponse.processingTimeMS).toBe(30);
    expect(instantsearchResponse.nbHits).toBe(5);
  });
});

describe("adaptHit tests", () => {
  it("adaptHit should convert item to hit", () => {
    const item = {
      id: 3,
    };

    const adaptedItem = adaptHit(item);
    expect(adaptedItem.objectID).toBe(3);
    expect(adaptedItem._highlightResult).toMatchObject({});
  });
});

describe("adaptFacets tests", () => {
  it("adaptFacets should convert itemsJs aggregations to instantsearch facets", () => {
    const itemsJsFacets = {
      category: {
        buckets: [
          { key: "electronics", doc_count: 3, selected: false },
          { key: "women's clothing", doc_count: 2, selected: false },
          { key: "jewelery", doc_count: 5, selected: true },
          { key: "men's clothing", doc_count: 7, selected: false },
        ],
        name: "category",
        position: 1,
        title: "category",
      },
      color: {
        buckets: [
          { key: "red", doc_count: 3, selected: false },
          { key: "blue", doc_count: 2, selected: false },
          { key: "green", doc_count: 5, selected: true },
        ],
        name: "color",
        position: 2,
        title: "color",
      },
    };

    const instantsearchFacets = {
      category: {
        electronics: 3,
        "women's clothing": 2,
        jewelery: 5,
        "men's clothing": 7,
      },
      color: {
        red: 3,
        blue: 2,
        green: 5,
      },
    };

    const adaptResult = adaptFacets(itemsJsFacets);
    expect(adaptResult).toMatchObject(instantsearchFacets);
  });
});

describe("adaptFacetsStats tests", () => {
  it("adaptFacetsStats should only take the facet_stats from the aggregation object", () => {
    const aggregation = {
      category: {
        name: "category",
        title: "category",
      },
      price: {
        name: "price",
        title: "Price",
        facet_stats: {
          min: 7,
          max: 999,
          avg: 161.45,
          sum: 3229,
        },
      },
      rate: {
        name: "price",
        title: "Price",
        facet_stats: {
          min: 1,
          max: 5,
          avg: 3,
          sum: 26,
        },
      },
    };

    const result = {
      price: {
        min: 7,
        max: 999,
        avg: 161.45,
        sum: 3229,
      },
      rate: {
        min: 1,
        max: 5,
        avg: 3,
        sum: 26,
      },
    };

    const facetStats = adaptFacetsStats(aggregation);
    expect(facetStats).toStrictEqual(result);
  });
});
