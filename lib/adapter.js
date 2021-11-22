"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.performSearch = exports.createIndex = exports.getSearchClient = void 0;
var itemsjs_1 = __importDefault(require("itemsjs"));
var adaptResponse_1 = require("./adaptResponse");
var adaptRequest_1 = require("./adaptRequest");
var index;
function getSearchClient() {
    return {
        search: function (queries) { return performSearch(queries); },
        searchForFacetValues: function () {
            throw new Error("Not implemented");
        },
    };
}
exports.getSearchClient = getSearchClient;
function createIndex(data, options) {
    index = (0, itemsjs_1.default)(data, options);
}
exports.createIndex = createIndex;
function performSearch(request) {
    if (index) {
        var itemsjsRequest = (0, adaptRequest_1.adaptRequest)(request);
        var itemsjsResponse = index.search(itemsjsRequest);
        var InstantSearchResponse = Promise.resolve({
            results: [(0, adaptResponse_1.adaptResponse)(itemsjsResponse)],
        });
        return InstantSearchResponse;
    }
    return null;
}
exports.performSearch = performSearch;
