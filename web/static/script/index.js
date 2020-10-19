import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { HashRouter, NavLink, Redirect, Route } from 'react-router-dom';
import PublicDataPage from './Components/PublicDataPage';


class App extends React.Component {
    /*constructor(props) {
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

    addRandomData = (position) => {
        fetch('/api/uploadMarker', {
            body: JSON.stringify(
                {
                    lat: position.lat + Math.random() * 0.01 - 0.005,
                    lng: position.lng + Math.random() * 0.01 - 0.005,
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

    clearHeatmapData = () => {
        fetch('api/clear')
        .then(_ => this.fetchHeatmapData());
    };

    render() {
        return (
            <div>
                <GoogleMap center={this.state.currentLocation} zoom={this.state.zoom} heatmapMarkers={this.state.heatmapMarkers}/>
                <button onClick={() => {this.addRandomData(this.state.currentLocation);}}>Add Random Data</button>
                <button onClick={() => {this.clearHeatmapData();}}>Clear Data</button>
            </div>
        );
    }*/
    render() {
        return (
            <React.Fragment>
                <HashRouter>
                    <Navbar bg="dark" variant="dark" >
                        <Nav className="mr-auto">
                            <Nav.Link active href="#publics">Public Data</Nav.Link>
                            <Nav.Link href="#individuals">Individual Data</Nav.Link>
                        </Nav>
                    </Navbar>
                    <Redirect from="/" to="publics"/>
                    <Route path="/" component={PublicDataPage} />
                </HashRouter>
            </React.Fragment>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));