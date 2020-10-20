import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import DataCard from './DataCard';

class IndividualDataPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: null
        };
        this.handleMouseOver = this.handleMouseOver.bind(this);
    }

    handleMouseOver(index) {
        this.setState({index});
    }

    render() {
        return (
            <Container fluid>
                <Row style={{ padding: '8px' }}>
                    <Col>
                        <DataCard title={'IMU'} index={this.state.index} linkFunction={this.handleMouseOver} />
                    </Col>
                    <Col>
                        <DataCard index={this.state.index} linkFunction={this.handleMouseOver} />
                    </Col>
                    <Col>
                        <DataCard index={this.state.index} linkFunction={this.handleMouseOver} />
                    </Col>
                </Row>
                <Row style={{ padding: '8px' }}>
                    <Col>
                        <DataCard index={this.state.index} linkFunction={this.handleMouseOver} />
                    </Col>
                    <Col>
                        <DataCard index={this.state.index} linkFunction={this.handleMouseOver} />
                    </Col>
                    <Col>
                        <DataCard index={this.state.index} linkFunction={this.handleMouseOver} />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default IndividualDataPage;