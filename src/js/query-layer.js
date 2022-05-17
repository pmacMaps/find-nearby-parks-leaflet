import { queryFeatures } from '@esri/arcgis-rest-feature-layer';
import { geoJSON } from 'leaflet';
import { buildTable } from './table-ui.js';
import { addErrorMsg } from './app.js';

// query Local Parks layer from PA DCNR within a distance of user's location
export const queryFeatures = (geometry, distance, webmap, layerGroup) => {
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
          outFields: ['PARK_NAME', 'PREMISE_ADDRESS', 'PREMISE_CITY', 'PREMISE_ZIP']
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
          buildTable(document.getElementById('records'), data);

          // create layer for queried parks
          const parksLayer = new geoJSON(response);

          // add queried parks to group layer
          layerGroup.addLayer(parksLayer);

          // set extent of map to queried parks
          webmap.fitBounds(parksLayer.getBounds());
        })
        .catch(error => {
          console.log(`Error: ${error}`);
          addErrorMsg(`Error: ${error}`);
        });
}