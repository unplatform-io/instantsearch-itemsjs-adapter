# Instantsearch-itemsjs-adapter
## Introduction
This repository contains an adapter to link [Itemsjs](https://www.npmjs.com/package/itemsjs) with Instantsearch.

### Demo
To see an implementation of this adapter go to [unplatform-io/clientside-instantsearch-demo](https://github.com/unplatform-io/clientside-instantsearch-demo).

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

## Features
### Supported Instantsearch components
| Component | Supported | Explanation |
| --- | :---: | --- |
| Autocomplete |  | Connector needed |
| Breadcrumb | ❌ | HierarchicalMenu is needed |
| ClearRefinements | ✔️ |
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
| RangeInput | ✔️ |
| RangeSlider | ✔️ |  |
| RatingMenu | ⚠️ | Works only with facet_stats (facet_stats WIP) |
| RefinementList | ✔️ |
| RelevantSort | ❌ | Is not supported by Itemsjs |
| ScrollTo | ✔️ |
| SearchBox | ✔️ |
| SearchState | ✔️ |
| Snippet |✔️ |  |
| SortBy | ✔️ |
| StateResults | ✔️ |
| Stats | ✔️ |
| ToggleRefinement | ✔️ |
| VoiceSearch | ✔️ |
