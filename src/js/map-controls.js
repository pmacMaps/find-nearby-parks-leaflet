import { basemapLayers} from './basemaps.js';

// Layer Control
export const layerControlUI = L.control.layers(basemapLayers, null, {
    collapsed: false
});