import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import feedbacks from "../../services/geojson.json";
import { addShapeLayer } from "./helpers/addShapeLayer";
import { addFeedbackToHoods } from "./helpers/addFeedBackToHoods";

const MapQuejas = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = import.meta.env.VITE_MAP_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [2.1759, 41.39003],
      zoom: 12,
    });

    const feedbacksWithFeedbacks = addFeedbackToHoods(feedbacks);

    map.on("load", () => {
      feedbacksWithFeedbacks.features.forEach((feature) =>
        addShapeLayer(map, feature)
      );
    });

    mapRef.current = map;
    return () => map.remove();
  }, []);

  return (
    <div className="w-full h-full">
      <div ref={mapContainerRef} style={{ width: "100%", height: "500px" }} />

      {/* Legend */}
      <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-md">
        <h4 className="font-semibold text-sm mb-2">Quejas por Distrito</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300"></div>
            <span>Sin quejas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-200"></div>
            <span>1-2 quejas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-400"></div>
            <span>3-4 quejas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-500"></div>
            <span>5-6 quejas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-600"></div>
            <span>7+ quejas</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapQuejas;
