import React from 'react';
import { Container } from 'react-bootstrap';
import GoogleMap from './GoogleMap';

class PublicDataPage extends React.Component {
    render() {
        return (
            <Container>
                <GoogleMap />
            </Container>
        );
    }
}

export default PublicDataPage;