import { MultipleQueriesQuery } from "@algolia/client-search";
import { adaptPage, adaptRequest } from "../src/adaptRequest";
import { ItemsJsRequest } from "../src/itemsjsInterface";

describe("adaptPage tests", () => {
  it("adaptpage(0) should return 1", () => {
    expect(adaptPage(0)).toBe(1);
  });

  it("adaptpage(null) should return 1", () => {
    expect(adaptPage(null)).toBe(1);
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
