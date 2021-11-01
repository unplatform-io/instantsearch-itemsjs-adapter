import { SearchResponse } from "@algolia/client-search";
import { adaptHit, adaptResponse } from "../src/adaptResponse";
import { ItemsJsResponse } from "../src/itemsjsInterface";

describe("adaptResponse tests", () => {
  it("adaptHit should convert item to hit", () => {
    const id = 3;

    const item = {
      id: id,
    };

    const adaptedItem = adaptHit(item);

    expect(adaptedItem.objectID).toBe(id);
  });

  it("adaptResponse should convert response to Instantsearch response", () => {
    const itemsPerPage = 3;
    const total = 5;
    const page = 2;
    const totalPages = Math.ceil(total / itemsPerPage);
    const facets = 10;
    const search = 10;
    const sorting = 10;
    const timingTotal = facets + search + sorting;

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
            bucket: {
              key: null,
              doc_count: null,
              selected: false,
            },
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
