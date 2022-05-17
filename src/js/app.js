import 'bootstrap';
import { layerGroup } from 'leaflet';
import { getCurrentPosition, setQueryGeometry } from './process-user-location.js';
import { queryFeatures } from './query-layer.js';
import { webmap } from './map.js';
import { createUserMapMarker } from './user-map-marker.js';
import { deleteRows } from './table-ui.js';
import './modals.js';

// ui element > user's location
const locationEl = document.getElementById('userLocation');
// ui element > distance selected by user
const distanceEl = document.getElementById('userDistance');
// ui element > results from analysis
const resultCard = document.getElementById('resultsCard');
// ui element > container for error messages
const errorMsgEl = document.getElementById('errorMsg');
// button to close results card
const closeResultsBtn = document.getElementById('closeResults');
// button to run parks search
const searchBtn = document.getElementById('applySearch');
// user's latitude
let lat;
// user's longitude
let long;

// add error messages to ui element
export const addErrorMsg = (message) => {
  const pEl = document.createElement('p');
  pEl.innerHTML = message;
  errorMsgEl.append(pEl);
}

// layer group to hold queried parks
const parksLayerGroup = new layerGroup();

// layer group to hold user location marker
const userLocationLayerGroup = new layerGroup();

// add layer group to webmap
parksLayerGroup.addTo(webmap);
userLocationLayerGroup.addTo(webmap);

// create a function and import this function
const searchForParks = (distance) => {
  getCurrentPosition().then((position) => {
    // hide search modal
    $("#searchModal").modal('hide');

    // set user's latitude and longitude
    lat = position.coords.latitude;
    long = position.coords.longitude;

    // create geometry object from user's location
    const queryGeometry = setQueryGeometry(lat, long);

    // set UI element > distance used in analysis
    distanceEl.innerHTML = distance;
    // set UI element > user's latitude/longitude
    locationEl.innerHTML = `Latitude: ${lat.toFixed(3)}; Longitude: ${long.toFixed(3)}`;

    // remove existing parks from map
    parksLayerGroup.getLayers().forEach(element => {
      element.removeFrom(webmap);
    });

    // remove existing user marker from map
    userLocationLayerGroup.getLayers().forEach(element => {
      element.removeFrom(webmap);
    });

    // delete existing content from table
    deleteRows(document.getElementById('records'));

    // find parks located within a distance of user's location
    queryFeatures(queryGeometry, distance, webmap, parksLayerGroup, userLocationLayerGroup);

    // add map layer for user's location
    const userMarker = createUserMapMarker(lat, long);
    userLocationLayerGroup.addLayer(userMarker);

    // show UI element > results title and table
    resultCard.style.display = 'flex';
  }).catch((err) => {
    console.error(err.message);
    addErrorMsg(err.message);
  });
};

// Add event listeners
// search for parks near user's location when button is clicked
searchBtn.addEventListener('click', (e) => {
  searchForParks(document.getElementById('queryDistance').value);
});

// close results card
closeResultsBtn.addEventListener('click', (e) => {
  resultCard.style.display = 'none';
});