// populate data into a shell table
export const buildTable = (table,data) => {
    for (const feature of data) {
        let newRow = table.insertRow(-1);
        addRow(newRow, feature.properties.PARK_NAME);
        if (feature.properties.PREMISE_ADDRESS === null || feature.properties.PREMISE_ADDRESS === '' || feature.properties.PREMISE_ADDRESS === ' ') {
            addRow(newRow, 'No address data available');
        } else {
            addRow(newRow, `${feature.properties.PREMISE_ADDRESS}, ${feature.properties.PREMISE_CITY}, PA ${feature.properties.PREMISE_ZIP}`);
        }
    }
}

// insert a new row into table
const addRow = (row,value) => {
    let newCell = row.insertCell(-1);
    let div = document.createElement('div');
    div.innerHTML = value;
    newCell.appendChild(div);
}

// delete rows from table
export const deleteRows = (table) => {
    while (table.lastElementChild) {
       table.removeChild(table.lastElementChild);
   }
}