import 'leaflet-betterscale/L.Control.BetterScale.js';
import { basemapLayers} from './basemaps.js';

// Layer Control
export const layerControlUI = L.control.layers(basemapLayers, null, {
    collapsed: false
});

// scale bar control
export const scaleBarControl = L.control.betterscale({
    maxWidth: 200,
    metric: false,
    imperial: true,
    updateWhenIdle: true,
    position: 'bottomleft'
});