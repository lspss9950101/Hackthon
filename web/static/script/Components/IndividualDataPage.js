import React from 'react';
import { Button, Container, Col, Form, Modal, Row } from 'react-bootstrap';
import DataCard from './DataCard';
import webSocket from 'socket.io-client'
import LargeGraph from './LargeGraph';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class IndividualDataPage extends React.Component {
    constructor(props) {
        super(props);
        let time = Date.now();
        let defaultData = [];
        for (let i = time - 120 * 1000; i <= time; i += 1000)
            defaultData.push({ x: i, y: 0, y0: 0 });
        this.state = {
            index: null,
            ws: null,
            data: {
                roll: [...defaultData],
                pitch: [...defaultData],
                yaw: [...defaultData],
                gyro_x: [...defaultData],
                gyro_y: [...defaultData],
                gyro_z: [...defaultData],
                acc_x: [...defaultData],
                acc_y: [...defaultData],
                acc_z: [...defaultData],
                air_quality: [...defaultData],
                temp: [...defaultData],
                pressure: [...defaultData],
                attitude: [...defaultData]
            },
            hasLoggedIn: false,
            uuidInputRef: React.createRef(),
            uuid: null,
            detailPanel: null,
            detailPanelDate: Date.now()
        };
        this.handleMouseOver = this.handleMouseOver.bind(this);
    }

    initSocket() {
        this.state.ws.on('updateData', data => {
            this.setState((state) => {
                let time = data['timestamp'];
                let last = state.data.gyro_x[state.data.gyro_x.length - 1].x;
                if (time - last > 3 * 1000) {
                    Object.values(this.state.data).forEach(d => {
                        d.push({ x: last, y: 0, y0: 0 });
                        d.push({ x: time, y: 0, y0: 0 });
                    });
                }
                Object.keys(this.state.data).forEach(k => {
                    state.data[k].push({ x: time, y: data[k], y0: 0 });
                    state.data[k] = state.data[k].filter(d => time - 120*1000 <= d.x);
                });
                return state;
            });
        });
    }

    componentDidMount() {
        this.setState({ ws: new webSocket() }, () => {
            this.initSocket();
        });
    }

    componentWillUnmount() {
        if (this.state.ws)
            this.state.ws.close();
    }

    handleMouseOver(index) {
        this.setState({ index });
    }

    logIn() {
        this.state.ws.emit('setUUID', this.state.uuidInputRef.current.value);
        this.setState({ hasLoggedIn: true, uuid: this.state.uuidInputRef.current.value });
    }

    render() {
        let panels = [
            {
                title: 'Roll',
                color: '#F06292',
                stroke: '#9575CD',
                data: this.state.data.roll
            },
            {
                title: 'Pitch',
                color: '#F06292',
                stroke: '#9575CD',
                data: this.state.data.pitch
            },
            {
                title: 'Yaw',
                color: '#F06292',
                stroke: '#9575CD',
                data: this.state.data.yaw
            },
            {
                title: 'Gyro X',
                color: '#4FC3F7',
                stroke: '#4DD0E1',
                data: this.state.data.gyro_x
            },
            {
                title: 'Gyro Y',
                color: '#64B5F6',
                stroke: '#4FC3F7',
                data: this.state.data.gyro_y
            },
            {
                title: 'Gyro Z',
                color: '#7986CB',
                stroke: '#64B5F6',
                data: this.state.data.gyro_z
            },
            {
                title: 'Acc X',
                color: '#BA68C8',
                stroke: '#7986CB',
                data: this.state.data.acc_x
            },
            {
                title: 'Acc Y',
                color: '#9575CD',
                stroke: '#BA68C8',
                data: this.state.data.acc_y
            },
            {
                title: 'Acc Z',
                color: '#F06292',
                stroke: '#9575CD',
                data: this.state.data.acc_z
            },
            {
                title: 'Air Quality',
                color: '#F06292',
                stroke: '#9575CD',
                data: this.state.data.air_quality
            },
            {
                title: 'Temperature',
                color: '#F06292',
                stroke: '#9575CD',
                data: this.state.data.temp
            },
            {
                title: 'Pressure',
                color: '#F06292',
                stroke: '#9575CD',
                data: this.state.data.pressure
            },
            {
                title: 'Attitude',
                color: '#F06292',
                stroke: '#9575CD',
                data: this.state.data.attitude
            },
        ];
        panels = panels.map(panel => (
            <Col key={panel.title} onClick={() => { this.setState({ detailPanel: panel.title }); }}>
                <DataCard title={ panel.title } color={ panel.color } stroke={ panel.stroke } data={ panel.data } index={this.state.index} linkFunction={this.handleMouseOver} />
            </Col>
        ));
        return (
            <React.Fragment>
                <Container fluid>
                    <Row xl={3} lg={2} md={1} sm={1} >
                        {panels}
                    </Row>
                </Container>

                <Modal dialogClassName='fullScreen' show={this.state.detailPanel != null} onHide={() => { this.setState({ detailPanel: null }); }}>
                    <Modal.Header closeButton>
                        <h3>{this.state.detailPanel}</h3>
                    </Modal.Header>
                    <Modal.Body style={{ height: '70vh' }}>
                        <LargeGraph uuid={this.state.uuid} date={this.state.detailPanelDate} title={this.state.detailPanel} />
                    </Modal.Body>
                    <Modal.Footer>
                        <DatePicker selected={new Date(this.state.detailPanelDate)} onChange={date => this.setState({ detailPanelDate: (new Date(date)).getTime() })} /> 
                    </Modal.Footer>
                </Modal>

                <Modal show={!this.state.hasLoggedIn} onHide={() => { }}>
                    <Modal.Header>
                        <Modal.Title>Log In</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formGroupUUID">
                                <Form.Label>UUID</Form.Label>
                                <Form.Control type="username" placeholder="Enter UUID"
                                    ref={this.state.uuidInputRef}
                                    onKeyPress={() => {
                                        if (event.keyCode == 13) {
                                            this.logIn();
                                            return false;
                                        }
                                    }} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => { this.logIn(); }}>
                            Log In
                        </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
}

export default IndividualDataPage;