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
    XYPlot
} from 'react-vis';

function Graph({ data, index, linkFunction, max, min }) {
    return (
        <Container style={{ width: '100%', height: '30vh' }}>
            <FlexibleXYPlot
                yDomain={[2*min, 2*max]}
                onMouseLeave={() => linkFunction(null)}
            >
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <LineSeries
                    className="first-series"
                    curve="curveNatural"
                    data={data}
                    onNearestX={(datapoint, { index }) => linkFunction(index)}
                />
                {index === null ? null : <LineSeries
                    data={[{ x: index, y: max }, { x: index, y: min }]}
                    opacity={0.5} />
                }
                {index === null ? null : <MarkSeries
                    data={[data[index]]}
                    stroke="white" />
                }
            </FlexibleXYPlot>
        </Container>
    );
};

export default Graph;