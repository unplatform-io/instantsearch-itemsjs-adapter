"use strict";
//Itemsjs response to Instantsearch response
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adaptFacetsStats = exports.adaptFacets = exports.adaptHit = exports.adaptResponse = void 0;
function adaptResponse(response) {
    var totalNumberOfPages = Math.ceil(response.pagination.total / response.pagination.per_page);
    console.log('res', response.data.aggregations);
    return {
        hits: response.data.items.map(adaptHit),
        page: response.pagination.page - 1,
        nbPages: totalNumberOfPages,
        hitsPerPage: response.pagination.per_page,
        nbHits: response.pagination.total,
        processingTimeMS: response.timings.total,
        exhaustiveNbHits: true,
        query: "",
        params: "",
        facets: adaptFacets(response.data.aggregations),
        facets_stats: {
            rate: {
                min: 1,
                max: 5,
                avg: 100,
                sum: 200,
            }
        }
        /**
         * Statistics for numerical facets.
         *
         * Itemsjs doens't return information that can be used to find the statistics: min, max, avg, and sum value needed for numerical facets.
         *
         */
        // facets_stats: {}
    };
}
exports.adaptResponse = adaptResponse;
function adaptHit(item) {
    return __assign(__assign({ objectID: item.id }, item), { _highlightResult: {} });
}
exports.adaptHit = adaptHit;
function adaptFacets(itemsJsFacets) {
    var facetNames = Object.keys(itemsJsFacets);
    var instantsearchFacets = {};
    facetNames.forEach(function (name) {
        instantsearchFacets[name] = {};
        itemsJsFacets[name].buckets.forEach(function (_a) {
            var key = _a.key, doc_count = _a.doc_count;
            instantsearchFacets[name][key] = doc_count;
        });
    });
    return instantsearchFacets;
}
exports.adaptFacets = adaptFacets;
var object = {
    "category": {
        "name": "category",
        "title": "category",
    },
    "color": {
        "name": "color",
        "title": "color",
    },
    "rate": {
        "name": "rate",
        "title": "rate",
    },
    "price": {
        "name": "price",
        "title": "Price",
        "facet_stats": {
            "min": 7,
            "max": 999,
            "avg": 161.45,
            "sum": 3229
        }
    }
};
function adaptFacetsStats(object) {
    return {
        price: {
            min: 0,
            max: 0,
            avg: 0,
            sum: 0,
        }
    };
}
exports.adaptFacetsStats = adaptFacetsStats;
