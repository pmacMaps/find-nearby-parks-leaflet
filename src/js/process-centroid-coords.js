
// create driving directions to park's centroid
// need to test that centroid coords are not null
// if null, return nothing or default text
export const generateDirectionsUrl = (lat, long) => {
    // test that lat and long are not null or 0
    if (lat === null || long === null || lat === 0 || long === 0) {
        return 'no centroid coordinates';
    }

    // generate driving directions url

}

// calculate distance between user location and park centroids
