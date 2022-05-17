import { osm } from './basemaps.js';

// create webmap
export const webmap = L.map('webmap', {
    center: [40.79, -77.86],
    zoom: 7,
    layers: [osm]
});