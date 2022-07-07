import { marker, icon } from 'leaflet';
const iconImage = require('../assets/map-marker.png');

const mapIcon = new icon({
    iconUrl: iconImage,
    iconSize: [30,30]
});

export const createUserMapMarker = (latitude, longitude) => {
    const markerSymbol = new marker([latitude, longitude], {
        icon: mapIcon,
        alt: "map marker for user's location"
    });

    return markerSymbol;
}