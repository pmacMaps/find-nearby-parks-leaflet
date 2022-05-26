import { queryFeatures } from '@esri/arcgis-rest-feature-layer';
import { geoJSON } from 'leaflet';
import { buildTable } from './table-ui.js';
import { addErrorMsg } from './app.js';
import { generateDirectionsUrl } from './process-centroid-coords';

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
          // print response.features
          console.log(data);

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
          buildTable(document.getElementById('records'), data);

         for (const feature of data) {
          console.log(generateDirectionsUrl(geometry.y, geometry.x, feature.properties.Lat_Cen, feature.properties.Long_Cen));
          };

          // TODO: incorporate driving directions url into display table or park tooltip

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
              layer.bindTooltip(feature.properties.PARK_NAME, {
                direction: 'center',
                className: 'parksLabel'
              });
            }
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