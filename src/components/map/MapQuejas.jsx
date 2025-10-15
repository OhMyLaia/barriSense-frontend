import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mockQuejas from "./mockQuejas.json";

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

        map.on('load', () => {
            // Count complaints by district
            const complaintCounts = mockQuejas.quejas.reduce((acc, queja) => {
                acc[queja.barrio] = (acc[queja.barrio] || 0) + 1;
                return acc;
            }, {});

            map.addSource('barcelona-districts', {
                url: 'mapbox://mapbox.boundaries-adm3-v3',
                type: 'vector'
            });

            map.addLayer({
                id: 'districts-fill',
                type: 'fill',
                source: 'barcelona-districts',
                'source-layer': 'boundaries_admin_3',
                filter: ['==', ['get', 'iso_3166_1'], 'ES'], // Filter for Spain
                paint: {
                    'fill-color': [
                        'case',
                        ['has', ['get', 'name'], ['literal', complaintCounts]],
                        [
                            'case',
                            ['<=', ['get', ['get', 'name'], ['literal', complaintCounts]], 2], '#FEF3C7',
                            ['<=', ['get', ['get', 'name'], ['literal', complaintCounts]], 4], '#FCD34D',
                            ['<=', ['get', ['get', 'name'], ['literal', complaintCounts]], 6], '#F59E0B',
                            '#DC2626'
                        ],
                        '#E5E7EB'
                    ],
                    'fill-opacity': 0.7
                }
            });

            // Add border layer for districts
            map.addLayer({
                id: 'districts-border',
                type: 'line',
                source: 'districts',
                paint: {
                    'line-color': '#374151',
                    'line-width': 2
                }
            });

            // Add click event to show district info
            map.on('click', 'districts-fill', (e) => {
                if (e.features && e.features[0]) {
                    const feature = e.features[0];
                    const properties = feature.properties;

                    new mapboxgl.Popup()
                        .setLngLat(e.lngLat)
                        .setHTML(`
                            <div class="p-3">
                                <h3 class="font-bold text-lg">${properties?.name}</h3>
                                <p class="text-sm">Quejas: ${properties?.complaints}</p>
                            </div>
                        `)
                        .addTo(map);
                }
            });

            // Change cursor on hover
            map.on('mouseenter', 'districts-fill', () => {
                map.getCanvas().style.cursor = 'pointer';
            });

            map.on('mouseleave', 'districts-fill', () => {
                map.getCanvas().style.cursor = '';
            });
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