//Instantsearch request to itemsjs request
import { MultipleQueriesQuery } from "@algolia/client-search";
import { ItemsJsRequest } from "./itemsjsInterface";

export function adaptRequest(request: MultipleQueriesQuery[]): ItemsJsRequest {
  var numericFilters = <string> request[0].params.numericFilters  
  var facets = <string[]> request[0].params.facets  

  console.log(numericFilters)
  
  console.log('filters', request[0].params.filters)
  console.log('facetFilters', request[0].params.facetFilters)
  console.log('facets', request[0].params.facets)


  const response: ItemsJsRequest = { 
    query: request[0].params.query,
    per_page: request[0].params.hitsPerPage,
    page: adaptPage(request[0].params.page),
    indexName: "products",
   }
   
  if(facets) {
    response.aggregations = facets
  }

   if (numericFilters && numericFilters.length > 0) {
    // var getPrices = adaptPriceRange(numericFilters) 
    // var minPrice = getPrices[0]
    // var maxPrice = getPrices[1]
    // response.filter = (item) => item.price >= minPrice && item.price <= maxPrice  // >= | <= | >= && <= 

    var getPrices = adaptNumericFilters(numericFilters)
  //   [
  //     [
  //         "price", [0][0]
  //         "price"  [0][1]
  //     ],
  //     [
  //         ">=",    [1][0]
  //         "<="     [1][1]
  //     ],
  //     [
  //         "10",    [2][0]
  //         "50"     [2][1]
  //     ]
  // ]

  console.log('getPrices', getPrices); // 3


    const field = getPrices[0][0];
    const operator = getPrices[1][0];
    const value = getPrices[2][0];

    console.log('field', field); // price 
    console.log('operator', operator); // ">="
    console.log('value', value); // 50

    const idk = [];
    for (let index = 0; index < getPrices[0].length; index++) {
      console.log('index', index)
      const naam = (item) => eval(item[getPrices[0][index]] + getPrices[1][index] + getPrices[2][index])
      idk.push(naam);
    }

    // (item) => eval(item['price'] >= 500)
    response.filter = (item) => idk.every((p) => p(item));

  }

  return response
}

export function adaptPage(page: number): number {
  // ItemsJS pages start at 1 iso 0
  return page + 1;
}

function adaptNumericFilters(priceRanges) {
  const filterPredicates = [];
  const f = []
  const o = []
  const v = []

  for (let index = 0; index < priceRanges.length; index++) {
    var price = <string> priceRanges[index]

    const [, field, operator, value] = price.match(
      new RegExp('(.*)(<=|>=|>|<|:)(.*)'),
    );

    f.push(field)
    o.push(operator)
    v.push(value)    
    // var regexPriceMatch = price.match(new RegExp(/(.*)(<=|>=|>|<|:)(.*)/)) // '/[.\d]+/' returns null 
    // console.log('regexPriceMatch', regexPriceMatch)
    // filterPredicates.push(regexPriceMatch)
  }
  return [f,o,v];
}

function adaptPriceRange(priceRanges: string | string[] | readonly (readonly string[])[]): number[] {
  let prices = []

  console.log(priceRanges)

  for (let index = 0; index < priceRanges.length; index++) {
    var price = <string> priceRanges[index]
    var regexPriceMatch = price.match(new RegExp(/[.\d]+/)) // '/[.\d]+/' returns null 
    // var regexPriceMatch = price.match(new RegExp(/(.*)(<=|>=|>|<|:)(.*)/)) // '/[.\d]+/' returns null 

    console.log('regexPriceMatch', regexPriceMatch)
    prices.push(regexPriceMatch)
  }
  
  return [prices[0] ,prices[1]]
}



 