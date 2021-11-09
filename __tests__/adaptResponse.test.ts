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
    const facet1 = "category";
    const facet1Options = [
      "electronics",
      "women's clothing",
      "jewelery",
      "men's clothing",
    ];
    const facet1Count = [2, 6, 7, 3];
    const facet2 = "color";
    const facet2Options = ["red", "blue", "green"];
    const facet2Count = [6, 7, 3];

    const itemsJsFacets = {
      [facet1]: {
        buckets: [
          { key: facet1Options[0], doc_count: facet1Count[0], selected: false },
          { key: facet1Options[1], doc_count: facet1Count[1], selected: false },
          { key: facet1Options[2], doc_count: facet1Count[2], selected: true },
          { key: facet1Options[3], doc_count: facet1Count[3], selected: false },
        ],
        name: facet1,
        position: 1,
        title: facet1,
      },
      [facet2]: {
        buckets: [
          { key: facet2Options[0], doc_count: facet2Count[0], selected: false },
          { key: facet2Options[1], doc_count: facet2Count[1], selected: false },
          { key: facet2Options[2], doc_count: facet2Count[2], selected: true },
        ],
        name: facet2,
        position: 2,
        title: facet2,
      },
    };

    const instentsearchFacets = {
      [facet1]: {
        [facet1Options[0]]: facet1Count[0],
        [facet1Options[1]]: facet1Count[1],
        [facet1Options[2]]: facet1Count[2],
        [facet1Options[3]]: facet1Count[3],
      },
      [facet2]: {
        [facet2Options[0]]: facet2Count[0],
        [facet2Options[1]]: facet2Count[1],
        [facet2Options[2]]: facet2Count[2],
      },
    };

    const adaptedReslult = adaptFacets(itemsJsFacets);
    expect(adaptedReslult).toMatchObject(instentsearchFacets);
  });
});
