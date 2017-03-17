// function handle_map(center=[44.5, -123.6],zoom=10){
function handle_map(center=[23.973875, 120.982024],zoom=7){
    // Setup leaflet map
    var map = new L.Map('map');

    var basemapLayer = new L.TileLayer('http://{s}.tiles.mapbox.com/v3/github.map-xgq2svrz/{z}/{x}/{y}.png');

    // Center map and default zoom level
    map.setView(center,zoom);

    // Adds the background layer to the map
    map.addLayer(basemapLayer);
    return map;
}
