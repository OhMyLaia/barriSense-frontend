import { getColorByFeedback } from "./getColorByFeedBack.js";
import mapboxgl from "mapbox-gl";

/**
 * Adds a GeoJSON feature (polygon) to a Mapbox map.
 *
 * @param {object} map - Mapbox map instance
 * @param {object} feature - A GeoJSON Feature object (with geometry + properties)
 */
export function addShapeLayer(map, feature, onDistrictClick) {
  if (!map || !feature || !feature.geometry) {
    console.error("❌ Invalid map or feature object");
    return;
  }

  const { geometry, properties } = feature;

  // Construct a unique ID based on the feature (e.g. neighborhood name or code)
  const id =
    properties?.codi_barri ||
    properties?.nom_barri ||
    `shape-${Math.random().toString(36).substring(2, 8)}`;

  // Ensure previous layers with the same id are removed (avoid duplicates)
  if (map.getLayer(`${id}-fill`)) map.removeLayer(`${id}-fill`);
  if (map.getLayer(`${id}-border`)) map.removeLayer(`${id}-border`);
  if (map.getSource(id)) map.removeSource(id);

  // Add GeoJSON source
  map.addSource(id, {
    type: "geojson",
    data: feature,
  });

  console.log(properties?.feedBackNum);

  const color = getColorByFeedback(properties?.feedBackNum || 0);
  // Fill layer
  map.addLayer({
    id: `${id}-fill`,
    type: "fill",
    source: id,
    paint: {
      "fill-color": color, // blue
      "fill-opacity": 0.4,
    },
  });

  // Border layer
  map.addLayer({
    id: `${id}-border`,
    type: "line",
    source: id,
    paint: {
      "line-color": color,
      "line-opacity": 0.6,
    },
  });

  // Create popup instance (reuse for better performance)
  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });

  // Popup on hover
  map.on("mouseenter", `${id}-fill`, (e) => {
    const props = e.features?.[0]?.properties;
    if (!props) return;

    // Change cursor
    map.getCanvas().style.cursor = "pointer";

    // Copy coordinates and show popup
    const coordinates = e.lngLat;

    popup
      .setLngLat(coordinates)
      .setHTML(
        `
        <div style="padding:8px; font-family:sans-serif;">
          <h3 style="margin:0; font-weight:600;">
            ${props.nom_barri || props.codi_barri || "Zona"}
          </h3>
          <p style="margin:4px 0 0; font-size:14px;">
            Feedback: ${props.numFeedBack || 0}
          </p>
        </div>
        `
      )
      .addTo(map);
  });

  // Remove popup on mouse leave
  map.on("mouseleave", `${id}-fill`, () => {
    map.getCanvas().style.cursor = "";
    popup.remove();
  });

  // Add click event
  map.on("click", `${id}-fill`, (e) => {
    const props = e.features?.[0]?.properties;
    if (!props || !onDistrictClick) return;

    console.log("🔍 District clicked:", props); // Add this debug log

    // Call the callback function with district data
    onDistrictClick({
      neighborhoodName: props.nom_barri || "Zona Desconocida",
      neighborhoodId: props.codi_barri || "Id desconocido",
      feedbackCount: props.feedBackNum || 0,
    });
  });
  console.info(`✅ Added layer for ${properties?.nom_barri || id}`);
}
