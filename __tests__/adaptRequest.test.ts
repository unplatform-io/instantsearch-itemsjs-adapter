import { MultipleQueriesQuery } from "@algolia/client-search";
import { adaptPage, adaptRequest } from "../src/adaptRequest";
import { adaptFilters } from "../src/adaptRequest";
import { ItemsJsRequest } from "../src/itemsjsInterface";

describe("adaptPage tests", () => {
  it("adaptpage(x) should return x+1", () => {
    expect(adaptPage(0)).toBe(1);
    expect(adaptPage(3)).toBe(4);
    expect(adaptPage(12)).toBe(13);
  });
});

describe("adaptRequest tests", () => {
  it("adaptRequest should convert request to ItemsJs request", () => {
    const query = "a";
    const page = 2;
    const hitsPerPage = 5;

    const instantsearchRequest: MultipleQueriesQuery[] = [
      {
        indexName: "products",
        params: {
          query: query,
          page: page,
          hitsPerPage: hitsPerPage,
        },
      },
    ];

    const itemsjsRequest: ItemsJsRequest = adaptRequest(instantsearchRequest);

    expect(itemsjsRequest.query).toBe(query);
    expect(itemsjsRequest.page).toBe(page + 1);
    expect(itemsjsRequest.per_page).toBe(hitsPerPage);
  });
});

describe("adaptFacets tests", () => {
  it("adaptFacets should convert instantsearch facets to itemsJs aggregations", () => {
    const instentsearchFacets = [
      ['category:electronics', "category:men's clothing"],
      ['color:blue'],
    ];

    const itemsJsFacets = {
      category: ['electronics', "men's clothing"],
      color: ['blue']
    };

    const adaptedReslult = adaptFilters(instentsearchFacets);
    expect(adaptedReslult).toMatchObject(itemsJsFacets);
  });
});