import { geoJSON } from 'leaflet';

// create layer for queried parks
export const parksLayer = new geoJSON(response, {
    style: function(feature) {
      return {
        color: '#FFFF00',
        weight: 1.5,
        fillColor: '#c9f7c9',
        fillOpacity: 0.5
      }
    },
    /* TODO: create parameter for this
    onEachFeature: function(feature, layer) {
      if (browserSupportsPointerEvt) {
        layer.bindTooltip(feature.properties.PARK_NAME, {
          direction: 'center',
          className: 'parksLabel'
        });
      }
    }
    */
});
