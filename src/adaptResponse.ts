//Itemsjs response to Instantsearch response

export function adaptResponse(response) {
  const totalNumberOfPages = Math.ceil(
    response.pagination.total / response.pagination.per_page
  );

  return {
    hits: response.data.items.map(adaptHit),
    page: response.pagination.page - 1,
    nbPages: totalNumberOfPages,
    hitsPerPage: response.pagination.per_page,
    index: "products",
  };
}

function adaptHit(item) {
  return {
    objectID: item.id,
    ...item,
    _highlightResult: {}, // Highlighting not supported
  };
}

//voorbeeld joost...

// export function adaptResponse(requestParams, indexName, response) {
//     const totalNumberOfPages = Math.ceil(
//       response.pagination.total / response.pagination.per_page,
//     );

//     return {
//       hits: response.data.items.map(adaptHit),
//       nbHits: response.pagination.total,
//       page: response.pagination.page - 1,
//       nbPages: totalNumberOfPages,
//       hitsPerPage: response.pagination.per_page,
//       facets: adaptResponseFacets(requestParams, response.data.aggregations),
//       // facets_stats: {}, //TODO:
//       query: requestParams.query,
//       processingTimeMS: response.timings.total,
//       index: indexName,
//       exhaustiveNbHits: true, // Always exact number of hits
//     };
//   }

//   function adaptHit(item) {
//     return {
//       objectID: item.id,
//       ...item,
//       _highlightResult: {}, // Highlighting not supported
//     };
//   }

//   function adaptResponseFacets(requestParams, aggregations) {
//     if (!requestParams.facets) {
//       return null;
//     }

//     let facets = {};
//     requestParams.facets.forEach((key) => {
//       const aggregation = aggregations[key];
//       if (!aggregation) {
//         return;
//       }

//       const buckets = aggregation.buckets.slice(
//         0,
//         requestParams.maxValuesPerFacet,
//       );

//       if (buckets) {
//         facets[key] = Object.assign(
//           // Flatten
//           ...buckets.map(({ key, doc_count }) => {
//             return { [key]: doc_count }; // Map to key:doc_count pair
//           }),
//         );
//       }
//     });

//     return facets;
//   }
