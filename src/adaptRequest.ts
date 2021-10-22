//Instantsearch request to itemsjs request

export function adaptRequest(request) {
  const itemsjsReq = {
    query: request.query,
    per_page: request.hitsPerPage,
    page: adaptPage(request.page),
    // indexName, // Not needed by itemsjs, but handy for adaptations
  };

  console.log("instantsearch", request);

  return itemsjsReq;
}

function adaptPage(page) {
  // ItemsJS pages start at 1 iso 0
  return Number(page || 0) + 1;
}
