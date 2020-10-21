import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import DataCard from './DataCard';
import webSocket from 'socket.io-client'

class IndividualDataPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: null,
            ws: null,
            data: []
        };
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.data = [];
    }

    initSocket() {
        this.state.ws.on('updateData', data => {
            this.setState((state) => {
                state.data.push({x: parseInt(data.x), y: data.y});
                //state.data.push(data);
                if(state.data.length > 100)
                    state.data = state.data.splice(1);
                console.log(state.data);
                return state;
            });
        });
    }

    componentDidMount() {
        this.setState({ ws: new webSocket() }, () => {
            this.initSocket();
            this.state.ws.emit('setUUID', '0');
        });
    }

    componentWillUnmount() {
        if(this.state.ws)
            this.state.ws.close();
    }

    handleMouseOver(index) {
        this.setState({index});
    }

    render() {
        return (
            <Container fluid>
                <Row lg={3} md={2} sm={1} >
                    <Col>
                        <DataCard title={'IMU'} data={this.state.data} index={this.state.index} linkFunction={this.handleMouseOver} />
                    </Col>
                    <Col>
                        <DataCard data={this.state.data} index={this.state.index} linkFunction={this.handleMouseOver} />
                    </Col>
                    <Col>
                        <DataCard data={this.state.data} index={this.state.index} linkFunction={this.handleMouseOver} />
                    </Col>
                    <Col>
                        <DataCard data={this.state.data} index={this.state.index} linkFunction={this.handleMouseOver} />
                    </Col>
                    <Col>
                        <DataCard data={this.state.data} index={this.state.index} linkFunction={this.handleMouseOver} />
                    </Col>
                    <Col>
                        <DataCard data={this.state.data} index={this.state.index} linkFunction={this.handleMouseOver} />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default IndividualDataPage;