import React from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import Graph from './Graph';

const data = [...Array(100).keys()
].map(d => ({ x: d, y: Math.random() * 20 - 10 }));

const DataCard = (props) => (
    <Card>
        <Card.Body>
            <Card.Title>{props.title}</Card.Title>
            <Graph data={[{ x: 0, y: 0 }, ...data, { x: 101, y: 0 }]} index={props.index} linkFunction={props.linkFunction} max={Math.max(...data.map(d=>d.y))} min={Math.min(...data.map(d=>d.y))} />
        </Card.Body>
    </Card>
);

DataCard.defaultProps = {
    title: 'Title'
};

export default DataCard;