import { SearchResponse } from "@algolia/client-search";
import { adaptFacets, adaptHit, adaptResponse } from "../src/adaptResponse";
import { ItemsJsResponse } from "../src/itemsjsInterface";

describe("adaptResponse tests", () => {
  it("adaptResponse should convert response to Instantsearch response", () => {
    const itemsPerPage = 3;
    const total = 5;
    const page = 2;
    const totalPages = Math.ceil(total / itemsPerPage);

    const facets = 10;
    const search = 10;
    const sorting = 10;
    const timingTotal = facets + search + sorting;

    const key = "testKey 1";
    const docCount = 5;
    const selected = false;

    const itemsjsResponse: ItemsJsResponse = {
      pagination: {
        per_page: itemsPerPage,
        total: total,
        page: page,
      },
      timings: {
        facets: facets,
        search: search,
        sorting: sorting,
        total: timingTotal,
      },
      data: {
        items: [{ objectID: "" }, { objectID: "" }],
        aggregations: {
          category: {
            buckets: [
              {
                key: key,
                doc_count: docCount,
                selected: selected,
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

    expect(instantsearchResponse.page).toBe(page - 1);
    expect(instantsearchResponse.nbPages).toBe(totalPages);
    expect(instantsearchResponse.hitsPerPage).toBe(itemsPerPage);
    expect(instantsearchResponse.processingTimeMS).toBe(timingTotal);
    expect(instantsearchResponse.nbHits).toBe(total);
  });
});

describe("adaptHit tests", () => {
  it("adaptHit should convert item to hit", () => {
    const id = 3;
    const item = {
      id: id,
    };

    const adaptedItem = adaptHit(item);
    expect(adaptedItem.objectID).toBe(id);
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
