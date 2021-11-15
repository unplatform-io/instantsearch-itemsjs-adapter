
# Instantsearch-itemsjs-adapter

This library is an adapter that connects the search engine [Itemsjs](https://github.com/itemsapi/itemsjs) with the opensource tool [Instantsearch](https://github.com/algolia/instantsearch.js/) (powered by [Algolia](https://www.algolia.com/)) that lets you quickly build a search interface in your front-end application.

## Table of Content

- [Installation](#installation)
- [Usage](#usage)
- [Demo]( #demo)
- [Features](#features)
- [Compatibility](https://github.com/meilisearch/instant-meilisearch#-compatibility-with-meilisearch-and-instantsearch)
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

| Component | Supported |
| --- | :---: |
| CurrentRefinements | ✔️ |
| Hits | coming soon |
| HitsPerPage| ✔️ |
| Menu | ✔️ |
| MenuSelect | ✔️ |
| Pagination | ✔️ |
| RangeInput | ✔️ |
| RefinementList | ✔️ |
| SearchBox | ✔️ |
| [SortBy](#sortby) | ✔️ |
| Stats | ✔️ |


### SortBy
[Sortby Instantsearch](https://www.algolia.com/doc/api-reference/widgets/sort-by/js/)

The `sortBy`  allows a user to change the way hits are sorted. 

The useage of the `sortBy` widget differs from the one found in Aloglia's documentation.
Instantsearch-itemsjs-adapter does not make use of a [replica indices](https://www.algolia.com/doc/guides/sending-and-managing-data/manage-your-indices/#replicating-an-index) 

With Instantsearch-Itemsjs-adapter you have to define the same key to the sortyBy value, that you used for the configuration `sortings`. 

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
