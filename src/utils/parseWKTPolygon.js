/**
 * Parses a WKT POLYGON string to GeoJSON coordinates
 * @param {string} wkt - WKT POLYGON string (e.g., "POLYGON ((lng lat, lng lat, ...))")
 * @returns {Array} Array of [longitude, latitude] coordinates
 */
export const parseWKTPolygon = (wkt) => {
    if (!wkt || typeof wkt !== 'string') {
        throw new Error('Invalid WKT string provided');
    }

    // Remove "POLYGON ((" and "))" and split coordinates
    const coordinateString = wkt
        .replace(/POLYGON\s*\(\(/gi, '')
        .replace(/\)\)/g, '')
        .trim();
    
    if (!coordinateString) {
        throw new Error('No coordinates found in WKT string');
    }

    const pairs = coordinateString.split(',');
    
    return pairs.map(pair => {
        const coords = pair.trim().split(/\s+/);
        if (coords.length < 2) {
            throw new Error('Invalid coordinate pair found');
        }
        const [lng, lat] = coords.map(Number);
        
        if (isNaN(lng) || isNaN(lat)) {
            throw new Error('Invalid numeric coordinates found');
        }
        
        return [lng, lat];
    });
};

/**
 * Converts district data with WKT geometry to GeoJSON Feature
 * @param {Object} districtData - District data object
 * @param {string} districtData.geometria_wgs84 - WKT polygon string
 * @param {string} districtData.nom_barri - Neighborhood name
 * @param {string} districtData.nom_districte - District name
 * @param {string} districtData.codi_barri - Neighborhood code
 * @param {string} districtData.codi_districte - District code
 * @returns {Object} GeoJSON Feature object
 */
export const districtToGeoJSON = (districtData) => {
    if (!districtData || !districtData.geometria_wgs84) {
        throw new Error('District data must include geometria_wgs84 property');
    }

    const coordinates = parseWKTPolygon(districtData.geometria_wgs84);

    return {
        type: 'Feature',
        geometry: {
            type: 'Polygon',
            coordinates: [coordinates] // Note: array of arrays for polygon exterior ring
        },
        properties: {
            name: districtData.nom_barri,
            district: districtData.nom_districte,
            neighborhoodCode: districtData.codi_barri,
            districtCode: districtData.codi_districte,
            // Add any additional properties you might need
            id: `${districtData.codi_districte}-${districtData.codi_barri}`
        }
    };
};

/**
 * Converts an array of district data to a GeoJSON FeatureCollection
 * @param {Array} districtsArray - Array of district data objects
 * @returns {Object} GeoJSON FeatureCollection
 */
export const districtsToGeoJSONCollection = (districtsArray) => {
    if (!Array.isArray(districtsArray)) {
        throw new Error('Districts data must be an array');
    }

    const features = districtsArray.map(districtData => {
        try {
            return districtToGeoJSON(districtData);
        } catch (error) {
            console.warn(`Error processing district ${districtData?.nom_barri || 'unknown'}:`, error.message);
            return null;
        }
    }).filter(Boolean); // Remove null values

    return {
        type: 'FeatureCollection',
        features
    };
};