// various locations across the state of Pennsylvania
const locations = [
    [40.302, -79.544],
    [41.095, -78.887],
    [41.5737, -75.501],
    [40.279, -75.299],
    [40.913, -77.764],
    [41.747, -77.302]
]

// return a random set of coordinates from list of locations in Pennsylvania
export const getPaCoordinates = () => {
    return locations[Math.floor(Math.random() * locations.length)];
}