import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';

class GoogleMap extends Component {
    static defaultProps = {
        center: {
            lat: 24.765540276169514,
            lng: 120.97428388123206
        },
        heatmapMarkers: [],
        zoom: 15
    };

    handleApiLoaded = (map) => {
        this.map = map;
    }

    render() {
        return (
            <div style={{ height: '100%', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyAsG9QMB5-0Wak0u2F3c9CLF0kYQyyKHH0', libraries: ['visualization'] }}
                    center={ this.props.center }
                    zoom={ this.props.zoom }
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({map, maps}) => this.handleApiLoaded(map)}
                    heatmap={{
                        positions: this.props.heatmapMarkers,
                        options: {
                            radius: 20
                        }
                    }}
                >
                    
                </GoogleMapReact>
            </div>
        );
    }
}

export default GoogleMap;