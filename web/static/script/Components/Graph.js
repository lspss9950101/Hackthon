import React from 'react';
import { Container } from 'react-bootstrap';
import {
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    FlexibleXYPlot,
    AreaSeries,
    LineSeries,
    MarkSeries,
    XYPlot,
    Crosshair
} from 'react-vis';

function Graph({ data, index, linkFunction, max, min }) {
    return (
        <Container style={{ width: '100%', height: '30vh' }}>
            <FlexibleXYPlot
                yDomain={[2 * min, 2 * max]}
                onMouseLeave={() => linkFunction(null)}
            >
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <AreaSeries
                    className="first-series"
                    curve="curveNatural"
                    data={data}
                    onNearestX={(datapoint) => linkFunction(datapoint)}
                />
                {index === null ? null : <Crosshair values={[index]}>
                    <div style={{ background: 'black' }}>
                        <h3>Values of crosshair:</h3>
                        <p>Series 1: {index.x}</p>
                    </div>
                </Crosshair>}
            </FlexibleXYPlot>
        </Container>
    );
};

export default Graph;