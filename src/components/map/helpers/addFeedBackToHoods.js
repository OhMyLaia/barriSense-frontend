export const addFeedbackToHoods = (geojson,mappedFeedbacks) => {

  const hoodsWithFeedBacks = {
    ...geojson,
    features: geojson.features.map((feature) => ({
      ...feature,
      properties: {
        ...feature.properties,
        // Asignar valores de prueba aleatorios
        feedBackNum: mappedFeedbacks.filter(item => item.neighborhoodId===feature.codi_barri)[0].FeedbackCount, // 0-9 quejas aleatorias
      },
    })),
  };
  return hoodsWithFeedBacks;
};
