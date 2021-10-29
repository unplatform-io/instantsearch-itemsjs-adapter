import { adaptPage, adaptRequest } from "../src/adaptRequest";

describe("adaptRequest tests", () => {
  it("adaptpage(0) should return 1", () => {
    expect(adaptPage(0)).toBe(1);
  });

  it("adaptRequest should convert request to ItemsJs request", () => {
    const query = "a";
    const page = 2;

    const request = [
      {
        params: {
          query: query,
          page: page,
        },
      },
    ];

    const itemsjsRequst = adaptRequest(request);

    expect(itemsjsRequst.query).toBe(query);
    expect(itemsjsRequst.page).toBe(page + 1);
  });
});
