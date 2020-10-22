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
            data: {
                gyro_x: [],
                gyro_y: [],
                gyro_z: [],
                acc_x: [],
                acc_y: [],
                acc_z: []
            }
        };
        this.handleMouseOver = this.handleMouseOver.bind(this);
    }

    initSocket() {
        this.state.ws.on('updateData', data => {
            this.setState((state) => {
                let time = data['timestamp'];
                state.data.gyro_x.push({ x: time, y: data['gyro_x'], y0: 0 });
                state.data.gyro_y.push({ x: time, y: data['gyro_y'], y0: 0 });
                state.data.gyro_z.push({ x: time, y: data['gyro_z'], y0: 0 });
                state.data.acc_x.push({ x: time, y: data['acc_x'], y0: 0 });
                state.data.acc_y.push({ x: time, y: data['acc_y'], y0: 0 });
                state.data.acc_z.push({ x: time, y: data['acc_z'], y0: 0 });

                if (state.data.gyro_x.length > 100)
                    state.data.gyro_x = state.data.gyro_x.splice(1);
                if (state.data.gyro_y.length > 100)
                    state.data.gyro_y = state.data.gyro_y.splice(1);
                if (state.data.gyro_z.length > 100)
                    state.data.gyro_z = state.data.gyro_z.splice(1);
                if (state.data.acc_x.length > 100)
                    state.data.acc_x = state.data.acc_x.splice(1);
                if (state.data.acc_y.length > 100)
                    state.data.acc_y = state.data.acc_y.splice(1);
                if (state.data.acc_z.length > 100)
                    state.data.acc_z = state.data.acc_z.splice(1);
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
        if (this.state.ws)
            this.state.ws.close();
    }

    handleMouseOver(index) {
        this.setState({ index });
    }

    render() {
        return (
            <Container fluid>
                <Row lg={3} md={2} sm={1} >
                    <Col>
                        <DataCard title={'Gyro X'} color={'#4FC3F7'} stroke={'#4DD0E1'} data={this.state.data.gyro_x} index={this.state.index} linkFunction={this.handleMouseOver} />
                    </Col>
                    <Col>
                        <DataCard title={'Gyro Y'} color={'#64B5F6'} stroke={'#4FC3F7'} data={this.state.data.gyro_y} index={this.state.index} linkFunction={this.handleMouseOver} />
                    </Col>
                    <Col>
                        <DataCard title={'Gyro Z'} color={'#7986CB'} stroke={'#64B5F6'} data={this.state.data.gyro_z} index={this.state.index} linkFunction={this.handleMouseOver} />
                    </Col>
                    <Col>
                        <DataCard title={'Acc X'} color={'#BA68C8'} stroke={'#7986CB'} data={this.state.data.acc_x} index={this.state.index} linkFunction={this.handleMouseOver} />
                    </Col>
                    <Col>
                        <DataCard title={'Acc Y'} color={'#9575CD'} stroke={'#BA68C8'} data={this.state.data.acc_y} index={this.state.index} linkFunction={this.handleMouseOver} />
                    </Col>
                    <Col>
                        <DataCard title={'Acc Z'} color={'#F06292'} stroke={'#9575CD'} data={this.state.data.acc_z} index={this.state.index} linkFunction={this.handleMouseOver} />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default IndividualDataPage;