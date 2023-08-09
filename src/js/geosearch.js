import { geosearch } from 'esri-leaflet-geocoder';
import { popup } from 'leaflet';

// create provider for Esri World Geocoding Service

export const SearchControl = geosearch({
    useMapBounds: false,
    providers: [],
    placeholder: 'Enter Street Address',
    title: 'Enter Street Address',
    expanded: true,
    collapseAfterResult: false,
    zoomToResult: false
});

/*** Address search results event ***/
SearchControl.on('results', function(data) {  
    // make sure there is a result
    if (data.results.length > 0) {
        // set map view
        map.setView(data.results[0].latlng, 7);
        // open pop-up for location
        const popup = popup({closeOnClick: true}).setLatLng(data.results[0].latlng).setContent(data.results[0].text).openOn(map);
    } else {
        // open pop-up with no results message
        const popup = popup({closeOnClick: true}).setLatLng(map.getCenter()).setContent('No results were found. Please try a different address.').openOn(map);
    } 
});