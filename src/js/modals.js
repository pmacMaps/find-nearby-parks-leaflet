window.$ = require('jquery');

// open modal windows
// Open Search info window
$("#search-btn").click(function() {
    $('#searchModal').modal('show');
});

// Open About info window
$("#about-btn").click(function() {
    $('#aboutModal').modal('show');
});