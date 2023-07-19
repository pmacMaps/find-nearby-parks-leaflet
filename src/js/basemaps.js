import { tileLayer, layerGroup } from 'leaflet';
import { tiledMapLayer } from 'esri-leaflet';
import { vectorBasemapLayer } from 'esri-leaflet-vector';
import { esriKey } from './apiKey.js';

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

// PEMA Imagery
const pemaImagery = tiledMapLayer({
    url: ' https://imagery.pasda.psu.edu/arcgis/rest/services/pasda/PEMAImagery2018_2020/MapServer',
    detectRetina: true,
    attribution: 'Pennsylvania Emergency Management Agency'
});

// Labels layer from Esri
const esriLabels = vectorBasemapLayer('ArcGIS:Imagery:Labels', {
    apikey: esriKey
 });

// Group layer combing PEMA imagery and Esri labels
const imageryWithLabels = layerGroup([pemaImagery, esriLabels]);

// Basemap options
export const basemapLayers = {
    "Open Street Map": osm,
    "Streets (PennDOT)": pennDOT,
    "Satellite (PEMA)": imageryWithLabels
};