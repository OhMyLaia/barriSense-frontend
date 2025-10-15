import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import hoods from "../../services/geojson.json";
import { addShapeLayer } from "./helpers/addShapeLayer";
import { addFeedbackToHoods } from "./helpers/addFeedBackToHoods";
import FeedbackList from "../FeedbackList";
import { api } from "../../config/api-connection-config";
import { axiosRequest } from "../../config/axiosCrud";
import { useMappedFeedbacks } from "../../hooks/useMappedFeedbacks";

const MapQuejas = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [feedbackList, setFeedbackList] = useState([]);

  const { mappedFeedbacks } = useMappedFeedbacks();

  const fetchFeedBackByDistrict = async (districtId) => {
    const url = `/feedbacks/by-neighborhood/${districtId}`;
    const { data } = await axiosRequest(api, url);
    console.log("Feedbacks per hood", data);
    return data;
  };

  useEffect(() => {
    if (!selectedDistrict) return;

    const fetchData = async () => {
      try {
        const feedbacks = await fetchFeedBackByDistrict(selectedDistrict);
        console.log(feedbacks);
        setFeedbackList(feedbacks);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchData();
  }, [selectedDistrict]);

  const handleDistrictClick = (districtData) => {
    setSelectedDistrict(districtData);
  };

  useEffect(() => {
    if (mappedFeedbacks.length > 0) {
      if (!mapContainerRef.current) return;

      mapboxgl.accessToken = import.meta.env.VITE_MAP_TOKEN;

      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [2.1759, 41.39003],
        zoom: 12,
      });

      const hoodsWithFeedbacks = addFeedbackToHoods(hoods, mappedFeedbacks);

      map.on("load", () => {
        hoodsWithFeedbacks.features.forEach((feature) =>
          addShapeLayer(map, feature, handleDistrictClick)
        );
      });

      mapRef.current = map;
      return () => map.remove();
    }
  }, [mappedFeedbacks]);

  return (
    <div className="w-full h-full">
      <div ref={mapContainerRef} style={{ width: "100%", height: "500px" }} />

      {/* Legend */}
      <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-md mt-30">
        <h4 className="font-semibold text-sm mb-2">Quejas por Distrito</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4" style={{ backgroundColor: "#D1D5DB" }}></div>
            <span>Sin quejas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4" style={{ backgroundColor: "#FEF08A" }}></div>
            <span>1-2 quejas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4" style={{ backgroundColor: "#FACC15" }}></div>
            <span>3-4 quejas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4" style={{ backgroundColor: "#F97316" }}></div>
            <span>5-6 quejas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4" style={{ backgroundColor: "#DC2626" }}></div>
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
            feedback={feedbackList}
          />
        </div>
      )}
    </div>
  );
};

export default MapQuejas;
