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
import '../../../../node_modules/react-vis/dist/style.css';

function Graph({ data, index, linkFunction, max, min }) {
    return (
        <Container style={{ width: '100%', height: '30vh' }}>
            <FlexibleXYPlot
                xType={'time'}
                xDomain={ data.length > 1 ? [data[data.length-1].x-(data[data.length-1].x - data[data.length-2].x)*100, data[data.length-1].x] : [0, 1] }
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
                </Crosshair>}
            </FlexibleXYPlot>
        </Container>
    );
};

export default Graph;