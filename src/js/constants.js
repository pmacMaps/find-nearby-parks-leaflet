// dcnr local parks
export const local_parks_service = "https://www.gis.dcnr.state.pa.us/agsprod/rest/services/BRC/LocalParks/MapServer/1";
export const local_parks_fields = ['PARK_NAME', 'PREMISE_ADDRESS', 'PREMISE_CITY', 'PREMISE_ZIP', 'Lat_Cen', 'Long_Cen'];

// dcnr state parks
export const state_parks_service = "https://www.gis.dcnr.state.pa.us/agsprod/rest/services/Parks/State_Parks/MapServer/9";
// point geometry: https://www.gis.dcnr.state.pa.us/agsprod/rest/services/Parks/State_Parks/MapServer/3
export const state_parks_fields = ['PARK_NAME'];
//export const state_parks_fields = ['PARK_NAME', 'ADDRESS', 'CITY', 'ZIP', 'NAVIGATION_LATITUDE', 'NAVIGATION_LONGITUDE'];
