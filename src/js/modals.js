window.$ = require('jquery');

// Open Search window
$("#search-btn").click(function() {
    $('#searchModal').modal('show');
});

// Open Basemap Selector window
$("#basemap-btn").click(function() {
    $('#basemapModal').modal('show');
});

// Open About Info window
$("#about-btn").click(function() {
    $('#aboutModal').modal('show');
});