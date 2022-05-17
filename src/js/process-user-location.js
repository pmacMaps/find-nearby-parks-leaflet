// function to get user's current location
export const getCurrentPosition = (options) => {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

// function creates a geometry object in WGS 1984 CRS with passed in latitude and longitude
export const setQueryGeometry = (lat, long) => {
  return {
      x: long,
      y: lat,
      spatialReference: {
      wkid: 4326
      }
  }
};