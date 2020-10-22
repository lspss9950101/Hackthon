import React from 'react';
import { Container } from 'react-bootstrap';
import {
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    FlexibleXYPlot,
    AreaSeries,
    Crosshair
} from 'react-vis';
import '../../../../node_modules/react-vis/dist/style.css';

function Graph({ data, index, linkFunction, max, min, color, stroke }) {
    let bound = Math.max(Math.abs(Math.min(0, ...(data.map(d => d.y))) * 2), Math.abs(Math.max(0, ...(data.map(d => d.y))) * 2));
    return (
        <Container style={{ width: '100%', height: '30vh' }}>
            <FlexibleXYPlot
                xType={'time'}
                xDomain={ data.length > 1 ? [data[data.length-1].x-(data[data.length-1].x - data[data.length-2].x)*100, data[data.length-1].x] : [0, 1] }
                yDomain={[-bound, bound]}
                onMouseLeave={() => linkFunction(null)}
            >
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <AreaSeries
                    className="first-series"
                    color={color}
                    opacity={0.75}
                    stroke={stroke}
                    curve="curveNatural"
                    data={data}
                    onNearestX={(datapoint) => linkFunction(datapoint)}
                />
                {index === null ? null : <Crosshair
                    values={[data.find(d => d.x == index.x)]}
                    titleFormat={(d) => ({title: 'Time', value: (new Date(d[0].x)).toTimeString()})}
                    itemsFormat={(d) => ([{title: 'Value', value: d[0].y.toFixed(5)}])}
                >
                </Crosshair>}
            </FlexibleXYPlot>
        </Container>
    );
};

export default Graph;