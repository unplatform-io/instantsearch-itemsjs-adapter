import { MultipleQueriesQuery } from "@algolia/client-search";
import { adaptPage, adaptRequest } from "../src/adaptRequest";
import { ItemsJsRequest } from "../src/itemsjsInterface";

describe("adaptRequest tests", () => {
  it("adaptpage(0) should return 1", () => {
    expect(adaptPage(0)).toBe(1);
  });

  it("adaptRequest should convert request to ItemsJs request", () => {
    const query = "a";
    const page = 2;

    const instantsearchRequest: MultipleQueriesQuery[] = [
      {
        indexName: "products",
        params: {
          query: query,
          page: page,
        },
      },
    ];

    const itemsjsRequst: ItemsJsRequest = adaptRequest(instantsearchRequest);

    expect(itemsjsRequst.query).toBe(query);
    expect(itemsjsRequst.page).toBe(page + 1);
  });
});
