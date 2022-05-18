# Find Nearby Local Parks in Pennsylvania

This repo represents a demo web application that can locate nearby local parks based upon a user's location in the state of Pennsylvania.  For those outside of Pennsylvania, there is an option to use coordinates located in Pennsylvania.

The app works in the following way:
- The user's location is obtained using the `Geolocation API`
- A geometry object is constructed using the `latitude` and `longitude` from the user's location
- The Local Parks Esri REST service from the Pennsylvania Department of Conservation and Natural Resources is queried based upon a user-defined distance from the user's location using the `Esri REST JS` library
- A table is generated listing the name and address of the queried parks, sorted alphabetically
- A geoJSON layer of the queried parks is created and added to the map using `Leaflet.js`

The Local Parks dataset is incomplete, but is the best statewide parks layer available.  For more information, please visit the [Local parks website](https://www.dcnr.pa.gov/Communities/LocalParks/Pages/default.aspx).

Technology Stack:
- [Parcel.js](https://parceljs.org/)
- [ArcGIS REST JS](https://developers.arcgis.com/arcgis-rest-js/)
- [Leaflet.js](https://leafletjs.com/)
- [jQuery](https://jquery.com/)
- [Bootstrap](https://getbootstrap.com/)
