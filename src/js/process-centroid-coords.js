// create driving directions to park's centroid
// need to test that centroid coords are not null
// if null, return nothing or default text
// userLat and userLong are latitude and longitude coordinates of user
// parklat and parkLong are latitude and longitude coordinates of par centroid
export const generateDirectionsUrl = (userLat, userLong, parkLat, parkLong) => {
    // add test for user latitude and longitude?
    // test that lat and long are not null or 0
    if (parkLat === null || parkLong === null || parkLat === 0 || parkLat === 0) {
        return 'no centroid coordinates';
    }

    // generate driving directions url for google maps
    return `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLong}&destination=${parkLat},${parkLong}`;
}

// create anchor tag or generic text for driving directions
export const formatDirectionsUrl = (str) => {
    if (str === 'no centroid coordinates') {
        return str
    } else {
        const linkTag = document.createElement('a');
        linkTag.href = str;
        linkTag.target = '_blank';
        linkTag.rel = 'noopener noreferrer';
        linkTag.innerHTML = 'Driving Directions';
        return linkTag;
    }
}

// calculate distance between user location and park centroids
