//Instantsearch request to itemsjs request

interface Request {
  query: string;
  hitsPerPage: number;
  page: number;
}

export function adaptRequest(request: Request) {
  const itemsjsReq = {
    query: request.query,
    per_page: request.hitsPerPage,
    page: adaptPage(request.page),
  };

  return itemsjsReq;
}

function adaptPage(page: number) {
  // ItemsJS pages start at 1 iso 0
  return Number(page || 0) + 1;
}
