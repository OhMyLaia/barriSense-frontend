import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const TouristMap = () => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);

    useEffect(() => {
        if (!mapContainerRef.current) return;

        mapboxgl.accessToken = import.meta.env.VITE_MAP_TOKEN;

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [2.1759, 41.39003],
            zoom: 12,
        });

        //data here
        map.on('load', () => {
            // Add districts layer with tourist data
            // Add colors based on tourist numbers red, yellow bla bla
        });

        mapRef.current = map;
        return () => map.remove();
    }, []);

    return (
        <div className="w-full h-full">
            <div ref={mapContainerRef} style={{ width: "100%", height: "500px" }} />
        </div>
    );
};

export default TouristMap;