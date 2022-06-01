import { queryFeatures } from '@esri/arcgis-rest-feature-layer';
import { geoJSON } from 'leaflet';
import { buildTable } from './table-ui.js';
import { addErrorMsg } from './app.js';
import { browserSupportsPointerEvt } from './app.js';
import { generateDirectionsUrl, formatDirectionsUrl } from './process-centroid-coords.js';

// query Local Parks layer from PA DCNR within a distance of user's location
export const queryParks = (geometry, distance, webmap, layerGroup) => {
  queryFeatures({
          url: "https://www.gis.dcnr.state.pa.us/agsprod/rest/services/BRC/LocalParks/MapServer/1",
          f: "geojson",
          geometry: geometry,
          distance: distance,
          units: "esriSRUnit_StatuteMile",
          geometryType: "esriGeometryPoint",
          spatialRel: "esriSpatialRelIntersects",
          returnGeometry: true,
          orderByFields: 'PARK_NAME',
          outFields: ['PARK_NAME', 'PREMISE_ADDRESS', 'PREMISE_CITY', 'PREMISE_ZIP', 'Lat_Cen', 'Long_Cen']
        })
        .then((response) => {
          // local parks returned from spatial query
          const data = response.features;

          // set UI element > number of parks returned
          document.getElementById('numberParks').innerHTML = data.length;

          // if there are no returned local parks, add a message to the user, and exit out of the function
          if (data.length === 0) {
            // set message for user
            const noResultsMsg = `No parks are located within ${distance}-miles of your location`;
            addErrorMsg(noResultsMsg);
            console.warn(noResultsMsg);
            // exit from function
            return;
          }

          // build table of parks returned from spatial analysis
          buildTable(document.getElementById('records'), data, geometry.y, geometry.x);

          // create layer for queried parks
          const parksLayer = new geoJSON(response, {
            style: function(feature) {
              return {
                color: '#FFFF00',
                weight: 1.5,
                fillColor: '#c9f7c9',
                fillOpacity: 0.5
              }
            },
            onEachFeature: function(feature, layer) {
              if (browserSupportsPointerEvt) {
                layer.bindTooltip(feature.properties.PARK_NAME, {
                  direction: 'center',
                  className: 'parksLabel'
                });
              }
            }
          });

          // create popup for parks layer
          parksLayer.bindPopup(function(evt) {
            let popupContent = '<div class="feat-popup">';
            popupContent += '<h3>{PARK_NAME}</h3><hr />';
            popupContent += '<ul>';
            // TODO: control for missing info in address data
            popupContent += '<li>Address: {PREMISE_ADDRESS}, {PREMISE_CITY}, {PREMISE_ZIP}</li>';
            // control output for driving directions
            const directionsUrl = generateDirectionsUrl(geometry.y, geometry.x, evt.feature.properties.Lat_Cen, evt.feature.properties.Long_Cen);
            if (directionsUrl === 'no centroid coordinates') {
              popupContent += '<li>No driving directions available</li>';
            } else {
              popupContent += `<li>Driving Directions: <a href="${directionsUrl}" target="_blank" rel="noopener noreferrer">Google Maps</a></li>`;
            }
            popupContent += '</ul>';
            popupContent += '</div>';

            return L.Util.template(popupContent, evt.feature.properties);
          });

          // add queried parks to group layer
          layerGroup.addLayer(parksLayer);

          // set extent of map to queried parks
          webmap.fitBounds(parksLayer.getBounds());

          // test
          return data;
        })
        .catch(error => {
          console.log(`Error: ${error}`);
          addErrorMsg(`Error: ${error}`);
        });
}