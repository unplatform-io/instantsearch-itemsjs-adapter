
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
| Component | | Explanation |
| --- | :---: | --- |
| Autocomplete | ❌ | Connector needed |
| Breadcrumb | ❌ | HierarchicalMenu is needed |
| [ClearRefinements](#%EF%B8%8F-clearrefinements) | ✔️ |
| [Configure](#%EF%B8%8F-configure) | ✔️ |
| ConfigureRelatedItems | ❌ | Is not supported by Itemsjs |
| [CurrentRefinements](#%EF%B8%8F-currentrefinements) | ✔️ |
| DynamicWidgets | ❌ | Cannot be imported from react-instanstsearch-dom (version 6.12.1) |
| HierarchicalMenu | ❌ | Is not supported by Itemsjs |
| Highlight | ❌ | Is not supported by Itemsjs |
| [Hits](#%EF%B8%8F-hits) | ✔️ |
| [HitsPerPage](#%EF%B8%8F-hitsperpage) | ✔️ |
| Index | ❌ | Is not supported by Itemsjs |
| [InfiniteHits](#%EF%B8%8F-infinitehits) | ✔️ |
| [InstantSearch](#%EF%B8%8F-instantsearch) | ✔️ |
| [Menu](#%EF%B8%8F-menu) | ✔️ |
| [MenuSelect](#%EF%B8%8F-menuselect) | ✔️ |
| [NumericMenu](#%EF%B8%8F-numericmenu) | ✔️ | Works only with facet_stats (facet_stats WIP) |
| [Pagination](#%EF%B8%8F-pagination) | ✔️ |
| [Panel](#%EF%B8%8F-panel) | ✔️ |
| [PoweredBy](#%EF%B8%8F-poweredby) | ✔️ |
| QueryRuleContext | |
| QueryRuleCustomData | |
| [RangeInput](#%EF%B8%8F-rangeinput) | ✔️ |
| [RangeSlider](#%EF%B8%8F-rangeslider) | ✔️ | |
| [RatingMenu](#%EF%B8%8F-ratingmenu) | ✔️ | Works only with facet_stats (facet_stats WIP) |
| [RefinementList](#%EF%B8%8F-refinementlist) | ✔️ |
| RelevantSort | ❌ | Is not supported by Itemsjs |
| [ScrollTo](#%EF%B8%8F-scrollto) | ✔️ |
| [SearchBox](#%EF%B8%8F-searchbox)| ✔️ |
| [SearchState](#%EF%B8%8F-searchstate) | ✔️ |
| [Snippet](#%EF%B8%8F-snippet) |✔️ | |
| [SortBy](#%EF%B8%8F-sortby) | ✔️ |
| [StateResults](#%EF%B8%8F-stateresults) | ✔️ |
| [Stats](#%EF%B8%8F-stats) | ✔️ |
| [ToggleRefinement](#%EF%B8%8F-togglerefinement) | ✔️ |
| [VoiceSearch](#%EF%B8%8F-voicesearch) | ✔️ |


### ✔️ ClearRefinements
[ClearRefinements Instantsearch](https://www.algolia.com/doc/api-reference/widgets/clear-refinements/react/)

The `ClearRefinements` widget allows a user to delete all applied filters.

| Parameter |  | Explanation |
| --- | :---: | --- |
| clearsQuery | ✔️ |
| translations | ✔️ |
| transformItems | ⚠️ | there is no proof that this parameter works |

### ✔️ Configure
[Configure Instantsearch](https://www.algolia.com/doc/api-reference/widgets/configure/react/)

The `Configure` widget allows a user to set fixed search parameters.

This widget can contain all [Search Parameters](https://www.algolia.com/doc/api-reference/search-api-parameters/), see this site for more information. ⚠️ Pay attention, not all parameters will work with this adapter.

### ✔️ CurrentRefinements
[CurrentRefinements Instantsearch](https://www.algolia.com/doc/api-reference/widgets/current-refinements/react/)

The `CurrentRefinements` widget allows a user to see witch filters are apllied.

| Parameter |  | Explanation |
| --- | :---: | --- |
| clearsQuery | ⚠️ | do not set this to true, the program will no longer work properly |
| transformItems | ⚠️ | there is no proof that this parameter works |

### ✔️ Hits
[Hits Instantsearch](https://www.algolia.com/doc/api-reference/widgets/hits/react/)

The `Hits` widget allows a user to see the result of their search.

| Parameter |  | Explanation |
| --- | :---: | --- |
| hitComponent | ✔️ |

### ✔️ HitsPerPage
[HitsPerPage Instantsearch](https://www.algolia.com/doc/api-reference/widgets/hits-per-page/react/)

The `HitsPerPage` widget allows a user to select how many hits wil appear on a page.

| Parameter |  | Explanation |
| --- | :---: | --- |
| items | ✔️ |
| defaultRefinement | ✔️ |
| transformItems | ⚠️ | there is no proof that this parameter works |

### ✔️ InfiniteHits
[InfiniteHits Instantsearch](https://www.algolia.com/doc/api-reference/widgets/infinite-hits/react/)

The `InfiniteHits` widget allows a user to see the result of their search.

| Parameter |  | Explanation |
| --- | :---: | --- |
| showPrevious | ⚠️ | can only be used if URL Sync is implemented |
| hitComponent | ✔️ |
| translations | ✔️ |
| cache | ⚠️ | there is no proof that this parameter works |

### ✔️ InstantSearch
[InstantSearch Instantsearch](https://www.algolia.com/doc/api-reference/widgets/instantsearch/react/)

The `InstantSearch` widget allows a user to let all connected comonents (or widgets) inveract with the searchState.

| Parameter |  | Explanation |
| --- | :---: | --- |
| indexName | ✔️ |
| searchClient | ✔️ |
| searchState | ✔️ |
| resultsState |  |
| createURL | ❌ |
| onSearchStateChange | ✔️ |
| onSearchParameters | ❌ |
| refresh | ⚠️ | there is no proof that this parameter works |
| stalledSearchDelay | ⚠️ | there is no proof that this parameter works |

### ✔️ Menu
[Menu Instantsearch](https://www.algolia.com/doc/api-reference/widgets/menu/react/)

The `Menu` widget allows a user to filter on a single value for an attribute.

| Parameter |  | Explanation |
| --- | :---: | --- |
| attribute | ✔️ |
| defaultRefinement | ✔️ |
| facetOrdering | ❌ | Is not supported by Itemsjs |
| limit | ✔️ |
| showMore | ✔️ |
| showMoreLimit | ✔️ |
| searchable | ❌ | Is not supported by Itemsjs, ⚠️Warning: when set true UI will change but throws error when used |
| transformItems | ✔️ |
| translations | ✔️ |

### ✔️ MenuSelect
[MenuSelect Instantsearch](https://www.algolia.com/doc/api-reference/widgets/menu-select/react/)

The `MenuSelect` widget allows a user to filter on a single value for an attribute.

| Parameter |  | Explanation |
| --- | :---: | --- |
| attribute | ✔️ |
| defaultRefinement | ✔️ |
| facetOrdering | ❌ | Is not supported by Itemsjs |
| limit | ✔️ |
| transformItems | ✔️ |
| translations | ✔️ |

### ✔️ Pagination
[Pagination Instantsearch](https://www.algolia.com/doc/api-reference/widgets/pagination/react/)

The `Pagination` widget allows a user to change the current page.

| Parameter |  | Explanation |
| --- | :---: | --- |
| defaultRefinement | ✔️ |
| showFirst | ✔️ |
| showPrevious | ✔️ |
| showNext | ✔️ |
| showLast | ✔️ |
| padding | ✔️ |
| totalPages | ✔️ |
| translations | ✔️ |

### ✔️ Panel
[Panel Instantsearch](https://www.algolia.com/doc/api-reference/widgets/panel/react/)

The `Panel` widget allows a user to wrap other widgets in a consistent design.

| Parameter |  | Explanation |
| --- | :---: | --- |
| className | ✔️ |
| header | ✔️ |
| footer | ✔️ |

### ✔️ PoweredBy
[PoweredBy Instantsearch](https://www.algolia.com/doc/api-reference/widgets/powered-by/react/)

The `PoweredBy` widget allows a user to display the Algolia logo redirecting to the website.

| Parameter |  | Explanation |
| --- | :---: | --- |
| translations | ✔️ |

### ✔️ RangeInput
[RangeInput Instantsearch](https://www.algolia.com/doc/api-reference/widgets/range-input/js/)

The `rangeInput` widget allows a user to filter on a numeric field using a minimum and/or maximum input.

| Parameter |  | Explanation |
| --- | :---: | --- |
| attribute | ✔️ |
| defaultRefinement | ✔️ |
| min | ✔️ |
| max | ✔️ |
| precision | ✔️ |
| translations | ✔️ |

With Instantsearch-Itemsjs-adapter you have to define the numericFilter field in `aggregation`. Otherwise, Itemsjs doesn't return the neceassry field for Instantsearch to use, the field in `aggregation` can be left empty.
Itemsjs documentation for the configuration and searching can be found here [Itemsjs configuration](https://github.com/itemsapi/itemsjs/blob/master/docs/configuration.md)

```js
aggregations: {
    price: { }, 
},

<RangeInput attribute="price" />
```

### ✔️ RangeSlider
[RangeSlider Instantsearch](https://www.algolia.com/doc/api-reference/widgets/range-slider/react/)

The `RangeSlider` widget allows a user to filter on a numeric field using a minimum and/or maximum input.

| Parameter |  | Explanation |
| --- | :---: | --- |
| attribute | ✔️ |
| defaultRefinement | ✔️ |
| min | ✔️ |
| max | ✔️ |

### ✔️ RatingMenu
[RatingMenu Instantsearch](https://www.algolia.com/doc/api-reference/widgets/rating-menu/react/)

The `RatingMenu` widget allows a user to filter on a numeric field by clicking on stars.

| Parameter |  | Explanation |
| --- | :---: | --- |
| attribute | ✔️ |
| defaultRefinement | ✔️ |
| min | ✔️ |
| max | ✔️ |
| translations | ✔️ |

### ✔️ RefinementList
[RefinementList Instantsearch](https://www.algolia.com/doc/api-reference/widgets/refinement-list/react/)

The `RefinementList` widget allows a user to filter on a facet/field.

| Parameter |  | Explanation |
| --- | :---: | --- |
| attribute | ✔️ |
| defaultRefinement | ✔️ |
| facetOrdering | ❌ | Is not supported by Itemsjs |
| operator | ❌ | ✔️is possible: can be passed to itemsjs when indexing |
| limit | ✔️ |
| showMore | ✔️ |
| showMoreLimit | ✔️ |
| searchable | ❌ | Is not supported by Itemsjs, ⚠️Warning: when set true UI will change but throws error when used |
| transformItems | ✔️ |
| translations | ✔️ |

✔️operator workaround: set `conjunction` to false=and or true=or
```js
aggregations: {
    category: {
      title: "category",
      conjunction: false,
    }
}
```

### ✔️ ScrollTo
[ScrollTo Instantsearch](https://www.algolia.com/doc/api-reference/widgets/scroll-to/react/)

The `ScrollTo` widget allows a user to automatically scroll to an object when the searchState is adjusted.

| Parameter |  | Explanation |
| --- | :---: | --- |
| scrollOn | ✔️ |

### ✔️ SearchBox
[SearchBox Instantsearch](https://www.algolia.com/doc/api-reference/widgets/search-box/react/)

The `SearchBox` widget allows a user to search text based.

| Parameter |  | Explanation |
| --- | :---: | --- |
| defaultRefinement | ⚠️ | text appears in the search box but the dataset is not searched |
| autoFocus |  |
| searchAsYouType | ✔️ |
| showLoadingIndicator |  |
| submit |  |
| reset |  |
| loadingIndicator |  |
| focusShortcuts |  |
| onSubmit |  |
| onReset |  |
| on* |  |
| translations | ✔️ |

### ✔️ SearchState
[SearchState Instantsearch](https://www.algolia.com/doc/api-reference/widgets/ui-state/react/)

The `SearchBox` widget allows a user to update their search parameters.

### ✔️ Snippet
[SearchBox Instantsearch](https://www.algolia.com/doc/api-reference/widgets/search-box/react/)

The `Snippet` widget allows a user to displays snippeted attributes of the search results.

### ✔️ SortBy
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

### ✔️ StateResults
[StateResults Instantsearch](https://www.algolia.com/doc/api-reference/widgets/state-results/react/)

The `StateResults` widget allows a user to ...

### ✔️ Stats
[Stats Instantsearch](https://www.algolia.com/doc/api-reference/widgets/stats/react/)

The `Stats` widget allows a user to ...

### ✔️ ToggleRefinement
[ToggleRefinement Instantsearch](https://www.algolia.com/doc/api-reference/widgets/toggle-refinement/react/)

The `ToggleRefinement` widget allows a user to ...

### ✔️ VoiceSearch
[VoiceSearch Instantsearch](https://www.algolia.com/doc/api-reference/widgets/voice-search/react/)

The `VoiceSearch` widget allows a user to perform a voice-based query.

| Parameter | | Explanation |
| --- | :---: | --- |
| searchAsYouSpeak | ✔️ | |
| buttonTextComponent | ✔️ |
| statusComponent | ✔️ |
| translations | ✔️ | |

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
