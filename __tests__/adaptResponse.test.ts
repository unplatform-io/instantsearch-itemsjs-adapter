import { SearchResponse } from "@algolia/client-search";
import { adaptFacets, adaptHit, adaptResponse } from "../src/adaptResponse";
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

    const adaptReslut = adaptFacets(itemsJsFacets);
    expect(adaptReslut).toMatchObject(instantsearchFacets);
  });
});
