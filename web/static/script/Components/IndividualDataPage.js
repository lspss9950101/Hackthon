import React from 'react';
import { Button, Container, Col, Form, Modal, Row } from 'react-bootstrap';
import DataCard from './DataCard';
import webSocket from 'socket.io-client'

class IndividualDataPage extends React.Component {
    constructor(props) {
        super(props);
        let time = Date.now();
        let defaultData = [];
        for(let i = time - 120*1000; i <= time; i+=1000)
            defaultData.push({x: i, y: 0, y0: 0});
        this.state = {
            index: null,
            ws: null,
            data: {
                gyro_x: [...defaultData],
                gyro_y: [...defaultData],
                gyro_z: [...defaultData],
                acc_x: [...defaultData],
                acc_y: [...defaultData],
                acc_z: [...defaultData]
            },
            hasLoggedIn: false,
            uuidInputRef: React.createRef(),
            detailPanel: false
        };
        this.handleMouseOver = this.handleMouseOver.bind(this);
    }

    initSocket() {
        this.state.ws.on('updateData', data => {
            this.setState((state) => {
                let time = data['timestamp'];
                let last = state.data.gyro_x[state.data.gyro_x.length-1].x;
                if(time - last > 3 * 1000) {
                    state.data.gyro_x.push({ x: last, y: 0, y0: 0});
                    state.data.gyro_x.push({ x: time, y: 0, y0: 0});
                }
                state.data.gyro_x.push({ x: time, y: data['gyro_x'], y0: 0 });
                state.data.gyro_y.push({ x: time, y: data['gyro_y'], y0: 0 });
                state.data.gyro_z.push({ x: time, y: data['gyro_z'], y0: 0 });
                state.data.acc_x.push({ x: time, y: data['acc_x'], y0: 0 });
                state.data.acc_y.push({ x: time, y: data['acc_y'], y0: 0 });
                state.data.acc_z.push({ x: time, y: data['acc_z'], y0: 0 });

                time = time - 120 * 1000;
                state.data.gyro_x = state.data.gyro_x.filter(d => time <= d.x);
                state.data.gyro_y = state.data.gyro_y.filter(d => time <= d.x);
                state.data.gyro_z = state.data.gyro_z.filter(d => time <= d.x);
                state.data.acc_x = state.data.acc_x.filter(d => time <= d.x);
                state.data.acc_y = state.data.acc_y.filter(d => time <= d.x);
                state.data.acc_z = state.data.acc_z.filter(d => time <= d.x);

                return state;
            });
        });
    }

    componentDidMount() {
        this.setState({ ws: new webSocket() }, () => {
            this.initSocket();
            //this.state.ws.emit('setUUID', '0');
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
        this.setState({ hasLoggedIn: true });
    }

    render() {
        return (
            <React.Fragment>
                <Container fluid>
                    <Row xl={3} lg={2} md={1} sm={1} >
                        <Col onClick={() => { this.setState({ detailPanel: true }); }}>
                            <DataCard title={'Gyro X'} color={'#4FC3F7'} stroke={'#4DD0E1'} data={this.state.data.gyro_x} index={this.state.index} linkFunction={this.handleMouseOver} />
                        </Col>
                        <Col onClick={() => { this.setState({ detailPanel: true }); }}>
                            <DataCard title={'Gyro Y'} color={'#64B5F6'} stroke={'#4FC3F7'} data={this.state.data.gyro_y} index={this.state.index} linkFunction={this.handleMouseOver} />
                        </Col>
                        <Col onClick={() => { this.setState({ detailPanel: true }); }}>
                            <DataCard title={'Gyro Z'} color={'#7986CB'} stroke={'#64B5F6'} data={this.state.data.gyro_z} index={this.state.index} linkFunction={this.handleMouseOver} />
                        </Col>
                        <Col onClick={() => { this.setState({ detailPanel: true }); }}>
                            <DataCard title={'Acc X'} color={'#BA68C8'} stroke={'#7986CB'} data={this.state.data.acc_x} index={this.state.index} linkFunction={this.handleMouseOver} />
                        </Col>
                        <Col onClick={() => { this.setState({ detailPanel: true }); }}>
                            <DataCard title={'Acc Y'} color={'#9575CD'} stroke={'#BA68C8'} data={this.state.data.acc_y} index={this.state.index} linkFunction={this.handleMouseOver} />
                        </Col>
                        <Col onClick={() => { this.setState({ detailPanel: true }); }}>
                            <DataCard title={'Acc Z'} color={'#F06292'} stroke={'#9575CD'} data={this.state.data.acc_z} index={this.state.index} linkFunction={this.handleMouseOver} />
                        </Col>
                    </Row>
                </Container>

                <Modal dialogClassName='fullScreen' show={this.state.detailPanel} onHide={() => { this.setState({ detailPanel: false }); }}>
                    <Modal.Body style={{height: '90vh'}}>
                        <Container>
                        </Container>
                    </Modal.Body>
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