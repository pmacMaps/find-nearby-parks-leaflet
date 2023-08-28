import { geosearch, arcgisOnlineProvider } from 'esri-leaflet-geocoder';
import { latLngBounds } from 'leaflet';
import { esriKey } from './apiKey.js';

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