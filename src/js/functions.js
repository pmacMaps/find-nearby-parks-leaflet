// place layer control widget in modal accessed from navigation
export const changeLayerControlLocation = () => {
    // DOM element parent for layer control
    const layerControlParent = document.querySelectorAll('div.leaflet-top.leaflet-right')[0]
    // DOM element of layer control widget
    const layerControlUI = document.querySelectorAll('div.leaflet-control-layers.leaflet-control')[0];
    // DOM element to place layer control within
    const newLayerControlParent = document.getElementById('layerControlUI');
    // remove node layer control from original parent
    const removedLayerControlUI = layerControlParent.removeChild(layerControlUI);
    // add layer control widget in new DOM element
    newLayerControlParent.appendChild(removedLayerControlUI);
}