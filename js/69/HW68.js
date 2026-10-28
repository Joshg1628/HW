//http://api.geonames.org/wikipediaSearch?q=SEARCH_TERM&maxRows=10&username=joshgrosinger&type=json
/*global google*/

const placesList = document.querySelector('#places');
const searchInput = document.querySelector('#search');

let loadedPlaces = null; // we will store the loaded places from the API response here, avoiding the need to fetch againe


const [{ Map, InfoWindow }, { AdvancedMarkerElement }] = await Promise.all([
    google.maps.importLibrary('maps'),
    google.maps.importLibrary('marker'),
]);

const map = new Map(document.querySelector('#map'), {
    center: { lat: 40.09543950426593, lng: -74.2221793333354 }, // points to bmg near 6th street 
    zoom: 18,
    mapId: 'DEMO_MAP_ID'
});

const infoWindow = new InfoWindow(); // create a popup window for displaying place information

document.querySelector('#searchForm').addEventListener('submit', async e => {
    e.preventDefault(); // wont subit the form, we add custom handling

    try {
        const response = await fetch(`http://api.geonames.org/wikipediaSearch?q=${searchInput.value}&maxRows=20&username=joshgrosinger&type=json`);

        if (!response.ok) {
            throw new Error(`${response.status}  ${response.statusText}`); // handle non catastrophic response errors
        }

        const { geonames } = await response.json(); // get the list of places from the API response
        console.log(geonames); // log to console for debugging

        const bounds = new google.maps.LatLngBounds(); // this is for stretching the map to include all markers

        geonames.forEach(place => {
            const loc = { lat: place.lat, lng: place.lng }; // loop through each place from the geonames API response

            const img = document.createElement('img'); // create an image element for each marker content
            img.src = './icon.svg';
            img.alt = place.title; // alternative text for the image
            img.className = 'marker-image'; // class for styling the marker image

            const marker = new AdvancedMarkerElement({ // creates a new marker on the map for each place
                map,
                position: loc, // loc provided from the geonames API response
                title: place.title,
                content: img // our custom icon (icon.svg)
            });
            bounds.extend(loc); // extend the map bounds to includes this marker's location
            marker.addListener('click', () => {
                infoWindow.setContent(`<div><h5>${place.title}</h5>${place.summary}<a target="_blank" href="https://${place.wikipediaUrl}">more info</a></div>`);
                infoWindow.open({ // when clicked open 
                    anchor: marker
                });

            });

            loadedPlaces = geonames; // store the loaded places for future use




            const placeLi = document.createElement('li'); // create list of returned places and display on soidebar
            placeLi.innerHTML = `
  <div class="info">
    <span>${place.title}</span>
    <img src="./icon.svg" alt="${place.title}" />
  </div>`;
            placesList.append(placeLi);

            placeLi.addEventListener('click', () => {
                map.panTo(loc);   // move the map to this place
                map.setZoom(15);  // zoom in on it
            });
        });
        map.fitBounds(bounds); // adjust the map view to fit all markers within the bounds
    } catch (error) {
        console.error('Error when fetching data:', error);
    }
});

