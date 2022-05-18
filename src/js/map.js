import { map } from 'leaflet';
import { osm } from './basemaps.js';

// create webmap
export const webmap = new map('webmap', {
    center: [40.79, -77.86],
    zoom: 7,
    layers: [osm]
});

// add attribution for PA DCNR
webmap.attributionControl.addAttribution('PA Dept. Conservation & Natural Resources');