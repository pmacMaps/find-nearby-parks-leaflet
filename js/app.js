import { getCurrentPosition, setQueryGeometry } from './process-user-location.js';
import { queryFeatures } from './query-layer.js';
import { webmap } from './map.js';
import './modals.js';

// ui element
const locationEl = document.getElementById('userLocation');
// user's latitude
let lat;
// user's longitude
let long;

// create a function and import this function
const searchForParks = (distance) => {
  getCurrentPosition().then((position) => {
    // hide search modal
    $("#searchModal").modal('hide');
    console.log(position);
    // set user's latitude and longitude
    lat = position.coords.latitude;
    long = position.coords.longitude;
    // create geometry object from user's location
    const queryGeometry = setQueryGeometry(lat, long);
    // TODO: make this DOM EL a variable
    // set UI element > distance used in analysis
    document.getElementById('userDistance').innerHTML = distance;
    // TODO: make this DOM EL a variable
    // set UI element > user's latitude/longitude
    document.getElementById('userLocation').innerHTML = `Latitude: ${lat.toFixed(3)}; Longitude: ${long.toFixed(3)}`;
    // find parks located within a distance of user's location
    queryFeatures(queryGeometry, distance, webmap);
    // center map on user's location
    webmap.setView([lat, long], 14); // set arbitrary zoom
    // show UI element > results title and table
    $('#resultsModal').modal('show');
  }).catch((err) => {
    console.error(err.message);
  });
};

// wire up click event listener
const searchBtn = document.getElementById('applySearch');
//
searchBtn.addEventListener('click', (e) => {
  console.log(e);
  searchForParks(document.getElementById('queryDistance').value);
});
