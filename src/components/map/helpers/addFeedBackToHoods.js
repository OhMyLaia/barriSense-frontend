export const addFeedbackToHoods = (geojson, mappedFeedbacks) => {
  console.log("Mapped Feedbacks in addFeedbackToHoods:", mappedFeedbacks);
  console.log("codi", geojson.features[0].properties.codi_barri);
  console.log(
    mappedFeedbacks.filter(
      (item) =>
        item.neighborhoodId ===
        parseNumber(geojson.features[0].properties.codi_barri)
    )
  );
  const hoodsWithFeedBacks = {
    ...geojson,
    features: geojson.features.map((feature) => ({
      ...feature,
      properties: {
        ...feature.properties,
        // Asignar valores de prueba aleatorios
        feedBackNum: mappedFeedbacks.filter(
          (item) =>
            item.neighborhoodId === parseNumber(feature.properties.codi_barri)
        )[0]?.FeedbackCount, // 0-9 quejas aleatorias
      },
    })),
  };
  return hoodsWithFeedBacks;
};

function parseNumber(str) {
  return Number(str.replace(/^0+/, "")) || 0;
}
