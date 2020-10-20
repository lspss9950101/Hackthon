import React from 'react';
import { Button, Container } from 'react-bootstrap';
import GoogleMap from './GoogleMap';

class PublicDataPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLocation: {
                lat: 59.95,
                lng: 30.33
            },
            heatmapMarkers: [],
            zoom: 15
        };

        if (navigator.geolocation)
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState((state) => {
                    state.currentLocation = {lat: position.coords.latitude, lng: position.coords.longitude}
                    return state;
                });
            });
        
        this.fetchHeatmapData();
    }

    fetchHeatmapData = () => {
        fetch('api/getMarkers')
        .then(response => response.json())
        .then(markers => markers.map(marker => ({lat: marker.lat, lng: marker.lng})))
        .then(markers => {
            this.setState((state) => {
                state.heatmapMarkers = markers;
                return state;
            });
        });
    };

    addRandomData = () => {
        fetch('/api/uploadMarker', {
            body: JSON.stringify(
                {
                    lat: this.state.currentLocation.lat + Math.random() * 0.01 - 0.005,
                    lng: this.state.currentLocation.lng + Math.random() * 0.01 - 0.005,
                }
            ),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        })
        .then(() => {
            this.fetchHeatmapData();
        });
    };

    render() {
        return (
            <Container fluid style={{ height: '70%', padding: '25px'}}>
                <GoogleMap center={this.state.currentLocation} heatmapMarkers={this.state.heatmapMarkers} />
                <Button onClick={this.addRandomData}>Add Sample Data</Button>
            </Container>
        );
    }
}

export default PublicDataPage;