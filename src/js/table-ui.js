import { generateDirectionsUrl } from './process-centroid-coords';
import { testAddressText } from './process-address-text.js';

// populate data into a shell table
export const buildTable = (table,data, lat, long) => {
    for (const feature of data) {
        let newRow = table.insertRow(-1);
        // name of park
        addRow(newRow, feature.properties.PARK_NAME);
        // address of park
        addRow(newRow, testAddressText(feature.properties.PREMISE_ADDRESS, feature.properties.PREMISE_CITY, feature.properties.PREMISE_ZIP));
        // driving directions link
        addRow(newRow, generateDirectionsUrl(lat, long, feature.properties.Lat_Cen, feature.properties.Long_Cen), 'link');
    }
}

// insert a new row into table
const addRow = (row, value, type='text') => {
    let newCell = row.insertCell(-1);
    let div = document.createElement('div');
    // set content of cell
    if (type === 'link') {
        if (value === 'no centroid coordinates') {
            div.innerHTML = value;
        } else {
            const linkTag = document.createElement('a');
            linkTag.href = value;
            linkTag.target = '_blank';
            linkTag.rel = 'noopener noreferrer';
            linkTag.innerHTML = 'Driving Directions';
            div.appendChild(linkTag);
        }
    } else {
        div.innerHTML = value;
    }

    newCell.appendChild(div);
}

// delete rows from table
export const deleteRows = (table) => {
    while (table.lastElementChild) {
       table.removeChild(table.lastElementChild);
   }
}