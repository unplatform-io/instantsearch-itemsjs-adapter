//Instantsearch request to itemsjs request


interface itemsjsReq {
  query: string;
  per_page: number;
  page: number;
}

interface Request {
  query: string;
  hitsPerPage: number;
  page: number;
}

export function adaptRequest(request: Request): object {
  const itemsjsReq: itemsjsReq = {
    query: request.query,
    per_page: request.hitsPerPage,
    page: adaptPage(request.page),
  };

  return itemsjsReq;
}

function adaptPage(page:number): number {
  // ItemsJS pages start at 1 iso 0
  return Number(page || 0) + 1;
}
