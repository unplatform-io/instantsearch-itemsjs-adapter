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
| ConfigureRelatedItems | ❌ |
| CurrentRefinements | ✔️ |
| DynamicWidgets | ❌ |
| HierarchicalMenu | ❌ | Is not supported by itemsjs |
| Highlight | ❌ | Is not supported by itemsjs |
| Hits | ✔️ |
| HitsPerPage| ✔️ |
| Index |  |
| InfiniteHits | ✔️ |
| InstantSearch | ✔️ |
| Menu | ✔️ |
| MenuSelect | ✔️ |
| NumericMenu |  |
| Pagination | ✔️ |
| Panel | ✔️ |
| PoweredBy | ✔️ |
| QueryRuleContext |  |
| QueryRuleCustomData |  |
| RangeInput | ✔️ |
| RangeSlider |  | Connector needed |
| RatingMenu |  | after expanding adapter it probably works |
| RefinementList | ✔️ |
| RelevantSort | ❌ | No response |
| ScrollTo | ✔️ |
| SearchBox | ✔️ |
| SearchState |  |
| Snippet | ❌ | Separator doesn't work |
| SortBy | ✔️ |
| StateResults |  |
| Stats | ✔️ |
| ToggleRefinement | ✔️ |
| VoiceSearch | ✔️ |
