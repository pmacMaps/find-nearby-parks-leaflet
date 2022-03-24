import { buildTable } from './table-ui.js';

// define this
export const queryFeatures = (geometry, distance) => {
    arcgisRest
        .queryFeatures({
          url: "https://www.gis.dcnr.state.pa.us/agsprod/rest/services/BRC/LocalParks/MapServer/1", // PA local parks from DCNR
          f: "json", // response format
          geometry: geometry, // geometry object to use in spatial query
          distance: distance, // distance to use in spatial query
          units: "esriSRUnit_StatuteMile", // units to use in spatial query
          geometryType: "esriGeometryPoint", // geometry type of geometry parameter
          spatialRel: "esriSpatialRelIntersects", // type of spatial query to use
          returnGeometry: false, // do not return geometry of returned features,
          orderByFields: 'PARK_NAME', // sort fields by park name
          outFields: ['PARK_NAME', 'PREMISE_ADDRESS', 'PREMISE_CITY', 'PREMISE_ZIP', 'URL'] // best practice to return only needed fields
        })
        .then((response) => {
          // local parks returned from spatial query
          const data = response.features;
          // comment or remove in production
          console.log(data); //response.features

          // if there are no returned local parks, add a message to the user, and exit out of the function
          if (data.length === 0) {
            // set message for user
            element.innerHTML = `No parks are located within ${distance}-miles of your location`;
            // exit from function
            return;
          }

          // build table of parks returned from spatial analysis
          buildTable(document.getElementById('records'), data);
        })
        .catch(error => {
          console.log(`Error fetching service: ${error}`);
        }); // add error handling
}