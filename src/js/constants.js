// esri api key
export const esriKey = 'AAPK56c13fae1a6d4407a5d392981b9b50d2kwxUZMYHbCl1MyifP-JufC7lrC9K2TvvL93oR25h20j0cjvoAro30x-p0O27jPwS';

// dcnr local parks
export const local_parks_service = "https://www.gis.dcnr.state.pa.us/agsprod/rest/services/BRC/LocalParks/MapServer/1";
export const local_parks_fields = ['PARK_NAME', 'PREMISE_ADDRESS', 'PREMISE_CITY', 'PREMISE_ZIP', 'Lat_Cen', 'Long_Cen'];

// dcnr state parks
export const state_parks_service = "https://www.gis.dcnr.state.pa.us/agsprod/rest/services/Parks/State_Parks/MapServer/9";
// point geometry: https://www.gis.dcnr.state.pa.us/agsprod/rest/services/Parks/State_Parks/MapServer/3
export const state_parks_fields = ['PARK_NAME'];
//export const state_parks_fields = ['PARK_NAME', 'ADDRESS', 'CITY', 'ZIP', 'NAVIGATION_LATITUDE', 'NAVIGATION_LONGITUDE'];