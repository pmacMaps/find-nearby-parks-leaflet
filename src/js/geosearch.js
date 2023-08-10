import { geosearch, arcgisOnlineProvider } from 'esri-leaflet-geocoder';
import { Popup, latLngBounds } from 'leaflet';
import { esriKey } from './apiKey.js';
import { webmap } from './map.js';

// create provider for Esri World Geocoding Service

export const SearchControl = geosearch({
    useMapBounds: false,
    providers: [
        arcgisOnlineProvider({
            apikey: esriKey
        })
    ],
    placeholder: 'Enter Street Address',
    title: 'Enter Street Address',
    expanded: true,
    collapseAfterResult: false,
    zoomToResult: false,
    searchBounds: latLngBounds([39.7198, -80.519891], [42.26986, -74.689516]) // verify these are good bounds
});

/*** Address search results event ***/
SearchControl.on('results', function(data) {  
    // make sure there is a result
    if (data.results.length > 0) {
        // set map view
        webmap.setView(data.results[0].latlng, 15);
        // open pop-up for location
        let popup = new Popup({closeOnClick: true}).setLatLng(data.results[0].latlng).setContent(data.results[0].text).openOn(webmap);
    } else {
        // open pop-up with no results message
        let popup = new Popup({closeOnClick: true}).setLatLng(map.getCenter()).setContent('No results were found. Please try a different address.').openOn(webmap);
    } 
});