import productsState from './products.json'
import {
    createIndex,
    performSearch
} from '../src/adapter'
import getSearchClient from '../src/adapter'
import adaptresponse from './adaptresponse.json'

const per_page = 4;
const query = "";
const page = 1;
const options = {
    searchableFields: ["title"],
    per_page: per_page,
    query: query,
    page: page,
};

const req = [{
    "indexName": "instant_search",
    "params": {
        "highlightPreTag": "<ais-highlight-0000000000>",
        "highlightPostTag": "</ais-highlight-0000000000>",
        "query": "",
        "maxValuesPerFacet": 10,
        "page": 0,
        "facets": ["category"],
        "tagFilters": ""
    }
}]

describe('createIndex', () => {
    it('Creates a itemsjs index', () => {
        const response = createIndex(productsState, options)

        const totalNumberOfPages = Math.ceil(response.nbHits / response.hitsPerPage)

        expect(response.hits.length).toBe(per_page)
        expect(response.hits[0].id).toBe(1)
        expect(response.hits[0].price).toBe(109.95)
        expect(response.hits[0].title).toBe("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops")

        expect(response.page).toBe(page - 1)
        expect(response.nbPages).toBe(totalNumberOfPages)
        expect(response.hitsPerPage).toBe(per_page)
        expect(response.nbHits).toBe(productsState.length)
        expect(typeof response.processingTimeMS).toEqual('number');
        expect(response.exhaustiveNbHits).toBe(true)
        expect(response.query).toBe("")
        expect(response.params).toBe("")
    });
});

describe('performSearch', () => {
    it('Performs a search', () => {
        const performsearch = performSearch(req)
        // If you exclude this return statement, your test will complete before the promise returned. 
        return expect(performsearch).resolves.toStrictEqual({
            results: [adaptresponse]
        })
    });
});

describe('getSearchClient', () => {
    it('Creates an Instantsearch searchclient', () => {
        const getsearchclient = getSearchClient(productsState, options)
        // const search = (queries) => performSearch(queries)
        // expect(abc.search).toBe(search) // TODO
        expect(getsearchclient.searchForFacetValues).toThrow('Not implemented');

    });
});
