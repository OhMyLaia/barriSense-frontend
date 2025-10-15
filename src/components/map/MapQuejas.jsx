import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import feedbacks from "../../services/geojson.json";
import { addShapeLayer } from "./helpers/addShapeLayer";
import { addFeedbackToHoods } from "./helpers/addFeedBackToHoods";
import FeedbackList from "../FeedbackList";

const MapQuejas = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [districtFeedbacks, setDistrictFeedbacks] = useState([]);

  // Mock function to get feedbacks for a district
  const getFeedbacksForDistrict = (districtCode) => {
    // Aquí podrías hacer una llamada a tu API real
    // Por ahora, generamos datos de ejemplo
    const mockFeedbacks = [];
    const feedbackCount = Math.floor(Math.random() * 5) + 1;
    
    for (let i = 0; i < feedbackCount; i++) {
      mockFeedbacks.push({
        id: `${districtCode}-${i}`,
        content: `Queja ${i + 1} del distrito ${districtCode}: ${getRandomComplaint()}`,
        date: new Date().toLocaleDateString(),
        status: "pending"
      });
    }
    
    return mockFeedbacks;
  };

  const getRandomComplaint = () => {
    const complaints = [
      "Ruido excesivo en las noches",
      "Basura acumulada en las calles",
      "Falta de iluminación pública",
      "Problemas con el transporte público",
      "Espacios verdes en mal estado",
      "Tráfico intenso en horas pico"
    ];
    return complaints[Math.floor(Math.random() * complaints.length)];
  };

  const handleDistrictClick = (districtData) => {
    setSelectedDistrict(districtData);
    // Obtener feedbacks para este distrito
    const feedbacks = getFeedbacksForDistrict(districtData.districtCode);
    setDistrictFeedbacks(feedbacks);
  };
  

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
        addShapeLayer(map, feature, handleDistrictClick)
      );
    });

    mapRef.current = map;
    return () => map.remove();
  }, []);

  return (
    <div className="w-full h-full">
      <div ref={mapContainerRef} style={{ width: "100%", height: "500px" }} />

      {/* Legend */}
      <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-md mt-30">
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
      {selectedDistrict && (
        <div className="mt-6 bg-white border-t border-gray-200 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              Quejas del distrito: {selectedDistrict.neighborhoodName}
            </h3>
            <button
              onClick={() => setSelectedDistrict(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕ Cerrar
            </button>
          </div>
          <FeedbackList
            neighborhoodName={selectedDistrict.neighborhoodName}
            feedback={districtFeedbacks}
          />
        </div>
      )}
      
    </div>
  );
};

export default MapQuejas;
