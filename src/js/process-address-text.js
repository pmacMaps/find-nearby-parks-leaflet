export const testAddressText = (address='', city='', zip='') => {
    let addressTextBool;
    let addressText;
    let cityTextBool;
    let cityText;
    let zipTextBool;
    let zipText;

    // process street address component
    if (address === null || address === '' || address === ' ') {
        addressTextBool = false;
        addressText = '';
    } else {
        addressTextBool = true;
        addressText = address;
    }

    // process city component
    if (city === null || city === '' || city === ' ') {
        cityTextBool = false;
        cityText = '';
    } else {
        cityTextBool = true;
        cityText = city;
    }

    // process zip component
    if (zip === null || zip === '' || zip === ' ') {
        zipTextBool = false;
        zipText = '';
    } else {
        zipTextBool = true;
        zipText = zip;
    }

    if (addressTextBool && cityTextBool && zipTextBool) {
        return `${addressText}, ${cityText}, PA, ${zipText}`;
    } else if (cityTextBool && zipText) {
        return `${cityText}, PA ${zipText}`;
    } else if (cityTextBool) {
        return `${cityText}, PA`;
    } else {
        return 'No address data available';
    }
}