"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adaptNumericFilters = exports.parseRange = exports.adaptFilters = exports.adaptPage = exports.adaptRequest = void 0;
function adaptRequest(request) {
    var numericFilters = request[0].params.numericFilters;
    var facets = request[0].params.facets;
    var facetFilters = request[0].params.facetFilters;
    var sort = request[0].indexName; // IndexName will be assigned the SortBy value if selected.
    var response = {
        query: request[0].params.query,
        per_page: request[0].params.hitsPerPage,
        page: adaptPage(request[0].params.page),
        indexName: request[0].indexName,
        sort: sort,
    };
    if (facets) {
        response.aggregations = facets;
    }
    if (numericFilters && numericFilters.length > 0) {
        console.log(numericFilters);
        var filters_1 = adaptNumericFilters(numericFilters);
        response.filter = function (item) { return filters_1.every(function (filter) { return filter(item); }); };
    }
    if (facetFilters && facetFilters.length > 0) {
        console.log(facetFilters);
        response.filters = adaptFilters(request[0].params.facetFilters);
    }
    return response;
}
exports.adaptRequest = adaptRequest;
function adaptPage(page) {
    // ItemsJS pages start at 1 iso 0
    return page + 1;
}
exports.adaptPage = adaptPage;
function adaptFilters(instantsearchFacets) {
    var itemsJsFacets = {};
    instantsearchFacets.forEach(function (facetList) {
        facetList.forEach(function (facet) {
            var facetRegex = new RegExp(/(.+)(:)(.+)/);
            var _a = facet.match(facetRegex), name = _a[1], value = _a[3];
            if (itemsJsFacets[name]) {
                itemsJsFacets[name].push(value);
            }
            else {
                itemsJsFacets[name] = [value];
            }
        });
    });
    return itemsJsFacets;
}
exports.adaptFilters = adaptFilters;
function parseRange(range) {
    /*
     * Group 1: Find chars, one or more, except values: "<, =, !, >".
     * Group 2: Find operator
     * Group 3: Find digits, one or more.
     */
    return range.match(new RegExp(/([^<=!>]+)(<|<=|=|!=|>|>=)(\d+)/));
}
exports.parseRange = parseRange;
function adaptNumericFilters(ranges) {
    var filters = [];
    ranges.map(function (range) {
        // ['price<=10', 'price', '<=', '10']
        var _a = parseRange(range), field = _a[1], operator = _a[2], value = _a[3];
        switch (operator) {
            case "<":
                filters.push(function (item) { return item[field] < value; });
                break;
            case "<=":
                filters.push(function (item) { return item[field] <= value; });
                break;
            case "=":
                filters.push(function (item) { return item[field] == value; }); // Needs to be comparison operator "=="
                break;
            case "!=":
                filters.push(function (item) { return item[field] != value; });
                break;
            case ">":
                filters.push(function (item) { return item[field] > value; });
                break;
            case ">=":
                filters.push(function (item) { return item[field] >= value; });
                break;
        }
    });
    return filters;
}
exports.adaptNumericFilters = adaptNumericFilters;
