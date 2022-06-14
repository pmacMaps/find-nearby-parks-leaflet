import { tileLayer } from 'leaflet';
import { tiledMapLayer } from 'esri-leaflet';

// Open Street Map
export const osm = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
});

// PennDOT Basemap
const pennDOT = tiledMapLayer({
    url: 'https://gis.penndot.gov/arcgis/rest/services/basemaps/penndotbasemap/MapServer',
    attribution: 'PennDOT'
});

// Basemap options
export const basemapLayers = {
    "Open Street Map": osm,
    "Streets (PennDOT)": pennDOT
};