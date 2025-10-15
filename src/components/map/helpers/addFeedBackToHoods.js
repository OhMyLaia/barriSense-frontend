export const addFeedbackToHoods = (geojson) => {
  const testData = {
    ...geojson,
    features: geojson.features.map((feature) => ({
      ...feature,
      properties: {
        ...feature.properties,
        // Asignar valores de prueba aleatorios
        feedBackNum: Math.floor(Math.random() * 10), // 0-9 quejas aleatorias
      },
    })),
  };
  return testData;
};
