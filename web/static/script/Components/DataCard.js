import React from 'react';
import { Card } from 'react-bootstrap';
import Graph from './Graph';

const data = [...Array(100).keys()
].map(d => ({ x: d, y: Math.random() * 20 - 10, y0: 0 }));

const DataCard = (props) => (
    <Card style={{ margin: '8px' }}>
        <Card.Body>
            <Card.Title>{ props.title }</Card.Title>
            <Graph data={ props.data } index={props.index} linkFunction={props.linkFunction} color={props.color} />
        </Card.Body>
    </Card>
);

DataCard.defaultProps = {
    title: 'Title',
    data: data
};

export default DataCard;