// Creating map object
var basemapId = 'map'
var basemapOptions = {center: [40.7128, -74.0059],
                      zoom: 11}
var myMap = L.map(basemapId, basemapOptions);

// Adding tile layer
var tileLayerUrlTemplate = "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
var tileLayerOptions = {attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
                        maxZoom: 18,
                        id: "light-v10",
                        accessToken: API_KEY}
L.tileLayer(tileLayerUrlTemplate, tileLayerOptions).addTo(myMap);

// Use this link to get the geojson data.
var geojsonPath = "static/data/GeoJSON.json";

// Function that will determine the color of a neighborhood based on the borough it belongs to
function chooseColor(borough) {
  color = "yellow"
  switch (borough) {
    case "Brooklyn":
      color = "yellow";
      break;
    case "Bronx":
      color = "red";
      break;
    case "Manhattan":
      color = "orange";
      break;
    case "Queens":
      color = "green";
      break;
    case "Staten Island":
      color = "purple";
      break;
    default:
      break;
    }
  return color
}

// Grabbing our GeoJSON data..
d3.json(geojsonPath).then(function(geojsonData) {
    console.log(geojsonData);
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(geojsonData, {
      // Style each feature (in this case a neighborhood)
      style: (feature) => ({color: "white",
                            fillColor: "blue", // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
                            fillOpacity: 0.5,
                            weight: 1.5})
    //   // Called on each feature
    //   onEachFeature: (feature, layer) => {
    //     layer.on({
    //               mouseover: (event) => {layer = event.target;
    //                                     layer.setStyle({fillOpacity: 0.9})},
    //               mouseout: (event) => {layer = event.target;
    //                                     layer.setStyle({fillOpacity: 0.5})},
    //               click: (event) => {myMap.fitBounds(event.target.getBounds())}
    //             })
    //           .bindPopup(`<h1>${feature.properties.neighborhood}</h1> 
    //                       <hr> 
    //                       <h2>${feature.properties.borough}</h2>`);

    })
    .addTo(myMap);
});
