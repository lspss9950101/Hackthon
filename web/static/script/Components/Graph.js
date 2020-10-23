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
    Crosshair,
    GradientDefs
} from 'react-vis';
import '../../../../node_modules/react-vis/dist/style.css';

function Graph({ data, index, linkFunction, color, stroke }) {
    let bound = Math.max(Math.abs(Math.min(0, ...(data.map(d => d.y))) * 2), Math.abs(Math.max(0, ...(data.map(d => d.y))) * 2), 1);
    return (
        <Container style={{ width: '100%', height: '30vh' }}>
            <FlexibleXYPlot
                xType={'time'}
                xDomain={data.length ? [data[data.length - 1].x - 120*1000, data[data.length - 1].x] : [0, 1]}
                yDomain={[-bound, bound]}
                onMouseLeave={() => linkFunction(null)}
            >
                <GradientDefs>
                    <linearGradient id={"gradient" + color} x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor={stroke} stopOpacity={0.8} />
                        <stop offset="100%" stopColor={stroke} stopOpacity={0.3} />
                    </linearGradient>
                </GradientDefs>

                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <AreaSeries
                    color={'url(#gradient'+color+')'}
                    curve="monotoneX"
                    data={data}
                    onNearestX={(datapoint) => linkFunction(datapoint)}
                />
                <LineSeries
                    color={stroke}
                    curve="monotoneX"
                    strokeWidth={1}
                    data={data}
                />
                {index === null || data.find(d => d.x == index.x) == null ? null : <Crosshair
                    values={[data.find(d => d.x == index.x)]}
                    titleFormat={(d) => ({ title: 'Time', value: (new Date(d[0].x)).toTimeString() })}
                    itemsFormat={(d) => ([{ title: 'Value', value: d[0].y.toFixed(5) }])}
                />}
                {index === null || data.find(d => d.x == index.x) == null ? null : <MarkSeries
                    color={stroke}
                    size={2}
                    data={[data.find(d => d.x == index.x)]}
                />}
            </FlexibleXYPlot>
        </Container>
    );
};

export default Graph;