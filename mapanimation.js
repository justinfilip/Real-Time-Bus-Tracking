// GLOBALS
var updatesAvailable = 0;
var busLocations = {};

// FUNCTION
// Request bus data from MBTA
async function getBusLocations(){
    const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
    const response = await fetch(url);
    const json = await response.json();
    
    return json.data;
}

async function refreshBusData(){
    // get bus data    
    const locations = await getBusLocations();

    // store location data in an array
    for (i=0; i<locations.length; i++) {
        console.log(locations[i])
        busLocations[locations[i].id] = [locations[i].attributes.longitude, locations[i].attributes.latitude];
    }

    // indicate that there is updated data available
    updatesAvailable = 1;

    // loop retrieving bus data using setTimeout so that it can fire right away and only run again if the function has completed
    setTimeout(() => {refreshBusData();}, 5000);
}

// FUNCTION
// Initialize the map
let map;
var mapMarkers = [];

async function initMap() {
    const position = { lat: 42.365554, lng: -71.104081 };
    const { Map } = await google.maps.importLibrary("maps");
    
    map = new Map(document.getElementById("map"), {
        zoom: 13,
        center: position,
        mapId: "MBTA Bus Locations",
    });
  }

  initMap();

// FUNCTION
// Update bus locations on the map
function checkUpdateMarkers() {

    async function markerManage() {
        for (i=0; i<Object.keys(busLocations).length; i++) {
            const busId = Object.keys(busLocations)[i];
            const position = { lat: busLocations[busId][1], lng: busLocations[busId][0] };
            let updated = 0;

            // check if this marker exists on the map, if so, update its position
            for (j=0; j<mapMarkers.length; j++) {
                if (mapMarkers[j][0] == busId) {
                    mapMarkers[j][1].position = position;
                    updated = 1;
                }
            }

            // if the marker existed and was updated, move on to the next datapoint in busLocations
            if (updated == 1) {
                // pass

            // marker did not exist, create one and place it on the map
            } else {
                const markerImg = document.createElement("img");
                markerImg.src = "data:image/png;base64,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";

                const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
                const marker = new AdvancedMarkerElement({
                    map: map,
                    position: position,
                    content: markerImg
                });
                mapMarkers.push([busId, marker]);
            }
        }
        updatesAvailable = 0;

        // loop updating markers with setTimeout so that it will only run again if the checkUpdateMarkers function has completed
        setTimeout(() => {checkUpdateMarkers();}, 1000);
    }


    // only try to update bus locations if updated data has been retrieved
    if (updatesAvailable == 1) {

        // update markers
        markerManage();

    } else {

        // loop updating markers with setTimeout so that it will only run again if the checkUpdateMarkers function has completed
        setTimeout(() => {checkUpdateMarkers();}, 1000);
    }
}

// MAIN
// Start loading data and markers
refreshBusData();

// Wait 1 second to allow time for inital data retrieval to be completed
setTimeout(() => {checkUpdateMarkers();}, 1000);