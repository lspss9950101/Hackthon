function initMap() {
    const uluru = { lat: 43.111, lng: 20.123 };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: uluru,
    });

    fetch('api/getMarkers')
    .then(response => response.json())
    .then(markers => markers.map(marker => new google.maps.LatLng(marker.lat, marker.lng)))
    .then(markers => {
        let heatmap = new google.maps.visualization.HeatmapLayer({data: markers});
        heatmap.setMap(map);
        heatmap.set('radius', 20);
    });
}

function post() {
    fetch('/api/uploadMarker', {
        body: JSON.stringify(
            {
                lat: 43.111 + Math.random() * 0.01 - 0.005,
                lng: 20.123 + Math.random() * 0.01 - 0.005,
            }
        ),
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST'
    });
}