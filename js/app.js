import { getCurrentPosition,setQueryGeometry } from './process-user-location.js';
import { queryFeatures } from './query-layer.js';
import { webmap } from './map.js';

// open modal windows
// Open Search info window
$("#search-btn").click(function() {
  $('#searchModal').modal('show');
});

// Open About info window
$("#about-btn").click(function() {
  $('#aboutModal').modal('show');
});

// ui element
const locationEl = document.getElementById('userLocation');
// user's latitude
let lat;
// user's longitude
let long;

// create a function and import this function
const searchForParks = (distance) => {
  getCurrentPosition()
  .then((position) => {
    // hide search modal
    $("#searchModal").modal('hide');
    console.log(position);
    // set user's latitude and longitude
    lat = position.coords.latitude;
    long = position.coords.longitude;
    // create geometry object from user's location
    const queryGeometry = setQueryGeometry(lat, long);
    // set UI element > distance used in analysis
    document.getElementById('userDistance').innerHTML = distance;
    // show UI element > results title and table
    document.getElementById('resultsContainer').style.display = 'block';
    // find parks located within a distance of user's location
    queryFeatures(queryGeometry, distance);
  })
  .catch((err) => {
    console.error(err.message);
  });
};

// wire up click event listener
const searchBtn = document.getElementById('applySearch');
//
searchBtn.addEventListener('click', () => {
  searchForParks(document.getElementById('queryDistance').value);
});
