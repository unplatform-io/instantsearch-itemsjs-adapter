
# Instantsearch-itemsjs-adapter

This library is an adapter that connects the search engine [Itemsjs](https://github.com/itemsapi/itemsjs) with the opensource tool [Instantsearch](https://github.com/algolia/instantsearch.js/) (powered by [Algolia](https://www.algolia.com/)) that lets you quickly build a search interface in your front-end application.

## Table of Content

- [Installation](#installation)
- [Usage](#usage)
- [Demo]( #demo)
- [Features](#features)
- [Tests](#tests)

## Installation
Use  `npm`  or  `yarn`  to install  `itemsjs-instantsearch-adapter`:
```
npm install ...

yarn add ..
```

Instantsearch-itemsjs-adapter does not create any UI component by itself.  
To be able to create a search interface, you'll need to  [install  `Instantsearch`](https://www.algolia.com/doc/guides/building-search-ui/installation/js/) as well.

## Usage

```js
import { createIndex, getSearchClient } from  "...";

const data = [{ "id":1,"title": "Iphone 7", "category":"Apple","price":109.95 },
{"id":1,"title": "Samsung notce 10","category":"Samsung","price":109.95 }]

const  options = {
	searchableFields: ["title"],
	query:  "",
	aggregations: {
		category: {
			title:  "category",
			size:  10,
			conjunction:  false,
		},
	},
	sortings: {
		price_asc: {
			field:  "price",
			order:  "asc",
		},
		price_desc: {
			field:  "price",
			order:  "desc",
		},
	},
};

createIndex(data, options);

const searchClient = getSearchClient();
```
`options` Options are from the Itemsjs API found here: [Itemsjs](https://github.com/itemsapi/itemsjs)

## Demo

To see an implementation of this adater go to [unplatform-io/clientside-instantsearch-demo](https://github.com/unplatform-io/clientside-instantsearch-demo).

## Features

### Supported Instantsearch components
| Component |  | Explanation |
| --- | :---: | --- |
| Autocomplete | ❌ | Connector needed |
| Breadcrumb | ❌ | HierarchicalMenu is needed |
| [ClearRefinements](#--clearrefinements) | ✔️ |
| Configure | ✔️ |
| ConfigureRelatedItems | ❌ | Is not supported by Itemsjs |
| CurrentRefinements | ✔️ |
| DynamicWidgets | ❌ | Cannot be imported from react-instanstsearch-dom (version 6.12.1) |
| HierarchicalMenu | ❌ | Is not supported by Itemsjs |
| Highlight | ❌ | Is not supported by Itemsjs |
| Hits | ✔️ |
| HitsPerPage| ✔️ |
| Index | ❌ | Is not supported by Itemsjs |
| InfiniteHits | ✔️ |
| InstantSearch | ✔️ |
| Menu | ✔️ |
| MenuSelect | ✔️ |
| NumericMenu | ⚠️ | Works only with facet_stats (facet_stats WIP) |
| Pagination | ✔️ |
| Panel | ✔️ |
| PoweredBy | ✔️ |
| QueryRuleContext |  |
| QueryRuleCustomData |  |
| [RangeInput](#RangeInput) | ✔️ |
| RangeSlider | ✔️ |  |
| RatingMenu | ⚠️ | Works only with facet_stats (facet_stats WIP) |
| RefinementList | ✔️ |
| RelevantSort | ❌ | Is not supported by Itemsjs |
| ScrollTo | ✔️ |
| SearchBox | ✔️ |
| SearchState | ✔️ |
| Snippet |✔️ |  |
| [SortBy](#sortby) | ✔️ |
| StateResults | ✔️ |
| Stats | ✔️ |
| ToggleRefinement | ✔️ |
| VoiceSearch | ✔️ |


### ✔️ ClearRefinements
[ClearRefinements Instantsearch](https://www.algolia.com/doc/api-reference/widgets/clear-refinements/react/)

The `ClearRefinements` widget allows a user to delete all applied filters.

| Parameter |  | Explanation |
| --- | :---: | --- |
| clearsQuery | ✔️ |
| translations | ✔️ |
| transformItems | ⚠️ | there is no proof that this parameter works


### RangeInput
[RangeInput Instantsearch](https://www.algolia.com/doc/api-reference/widgets/range-input/js/)

The `rangeInput` widget allows a user to select a numeric range using a minimum and/or maximum input.

The values inside the attribute must be numbers, not strings.

With Instantsearch-Itemsjs-adapter you have to define the numericFilter field in `aggregation`. Otherwise, Itemsjs doesn't return the neceassry field for Instantsearch to use, the field in `aggregation` can be left empty.
Itemsjs documentation for the configuration and searching can be found here [Itemsjs configuration](https://github.com/itemsapi/itemsjs/blob/master/docs/configuration.md)

```js
aggregations: {
    price: { }, 
},

<RangeInput attribute="price" />
```


### SortBy
[Sortby Instantsearch](https://www.algolia.com/doc/api-reference/widgets/sort-by/js/)

The `sortBy`  allows a user to change the way hits are sorted. 

The usage of the `sortBy` widget differs from the one found in Aloglia's documentation.
Instantsearch-itemsjs-adapter does not make use of a [replica indices](https://www.algolia.com/doc/guides/sending-and-managing-data/manage-your-indices/#replicating-an-index) 

With Instantsearch-Itemsjs-adapter you have to define the same key from your configuration `sorting` for the sortBy value.
Itemsjs documentation for the configuration and searching can be found here [Itemsjs configuration](https://github.com/itemsapi/itemsjs/blob/master/docs/configuration.md)

```js
sortings:  { 
	price_asc:  { field:  "price", order:  "asc",  }, 
	price_desc:  { field:  "price", order:  "desc", },  
},

<SortBy
	defaultRefinement=""
	items={[
		{ value:  "price_desc", label:  "High to low" },
		{ value:  "price_asc", label:  "Low to high" },
	]} 
/>
```


## Tests

### [Jest](https://jestjs.io/)

To run Jest tests

```bash

npm run test

```

### [ESlint](https://eslint.org/)

To run ESlint

```bash

npm run eslint

```
