import { adaptHit, adaptResponse } from "../src/adaptResponse";

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
    const timingTotal = 10;

    const response = {
      pagination: {
        per_page: itemsPerPage,
        total: total,
        page: page,
      },
      timings: {
        total: timingTotal,
      },
      data: {
        items: [{ id: 1 }, { id: 2 }],
      },
    };

    const newResponse = adaptResponse(response);

    expect(newResponse.page).toBe(page - 1);
    expect(newResponse.nbPages).toBe(totalPages);
    expect(newResponse.hitsPerPage).toBe(itemsPerPage);
    expect(newResponse.processingTimeMS).toBe(timingTotal);
    expect(newResponse.nbHits).toBe(total);
  });
});
