import React from 'react';
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
    GradientDefs,
    Highlight
} from 'react-vis';
import '../../../../node_modules/react-vis/dist/style.css';

class LargeGraph extends React.Component {
    static defaultProps = {
        color: 'black',
        stroke: 'black'
    };

    constructor(props) {
        super(props);
        let now = new Date();
        now.setHours(0);
        now.setMinutes(0);
        now.setSeconds(0);
        now.setTime(now.getTime() + 24 * 60 * 60 * 1000);
        let past = new Date();
        past.setHours(0);
        past.setMinutes(0);
        past.setSeconds(0);
        this.state = {
            index: null,
            lastDrawLocation: null,
            data: [past, now].map(d => ({ x: d, y: 0, y0: 0 }))
        };
        this.fetchData();
    }

    fetchData() {
        let params = {
            uuid: this.props.uuid,
            date: this.props.date,
            type: this.props.title
        };
        fetch('/api/getRoutineData', {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => data.map(d => ({ x: d.time, y: d.value, y0: 0 })))
            .then(data => {
                if (data.length) {
                    data = [
                        { x: data[0].x, y: 0, y0: 0 },
                        ...data,
                        { x: data[data.length - 1].x, y: 0, y0: 0 }
                    ];
                }
                this.setState({ lastDrawLocation: null, data: data })
            })
            .catch(e => {
                console.log(e);
            });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.date != this.props.date) {
            this.fetchData();
        }
    }
/*

                    this.state.lastDrawLocation ? [
                        this.state.lastDrawLocation.bottom,
                        this.state.lastDrawLocation.top
                    ] :
*/
    render() {
        let now = new Date(this.props.date);
        now.setHours(0);
        now.setMinutes(0);
        now.setSeconds(0);
        now.setTime(now.getTime() + 24 * 60 * 60 * 1000);
        now = now.getTime();
        let past = new Date(this.props.date);
        past.setHours(0);
        past.setMinutes(0);
        past.setSeconds(0);
        past = past.getTime();
        if(this.state.lastDrawLocation !== null) {
            now = this.state.lastDrawLocation.right;
            past = this.state.lastDrawLocation.left;
        }

        let boundedData = this.state.data.filter(d => {
                if(this.state.lastDrawLocation == null) {
                    if(d.x >= past && d.x <= now) return true;
                    else return false;
                }
                return (d.x >= this.state.lastDrawLocation.left && d.x <= this.state.lastDrawLocation.right)
            }
        );
        let bound = Math.max(Math.abs(Math.min(0, ...boundedData.map(d => d.y)) * 2), Math.abs(Math.max(0, ...boundedData.map(d => d.y)) * 2), 1);
        
        return (
            <FlexibleXYPlot
                xType={'time'}
                xDomain={
                    this.state.lastDrawLocation && [
                        this.state.lastDrawLocation.left,
                        this.state.lastDrawLocation.right
                    ]
                }
                yDomain={ [-bound, bound]
                }
                onMouseLeave={() => { this.setState({ index: null }); }}
            >
                <GradientDefs>
                    <linearGradient id={"gradient" + this.props.color} x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor={this.props.stroke} stopOpacity={0.8} />
                        <stop offset="100%" stopColor={this.props.stroke} stopOpacity={0.3} />
                    </linearGradient>
                </GradientDefs>

                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <AreaSeries
                    color={'url(#gradient' + this.props.color + ')'}
                    curve="monotoneX"
                    data={[{x: past, y: 0, y0: 0}, ...boundedData, {x: now, y: 0, y0: 0}]}
                    onNearestX={(datapoint) => { this.setState({ index: datapoint }); }}
                />
                <LineSeries
                    color={this.props.stroke}
                    curve="monotoneX"
                    data={[{x: past, y: 0, y0: 0}, ...boundedData, {x: now, y: 0, y0: 0}]}
                    strokeWidth={1}
                />
                <Highlight
                    onBrushEnd={area => this.setState({ lastDrawLocation: area })}
                    onDrag={area => {
                        this.setState({
                            lastDrawLocation: {
                                bottom: this.state.lastDrawLocation.bottom + (area.top - area.bottom),
                                left: this.state.lastDrawLocation.left - (area.right - area.left),
                                right: this.state.lastDrawLocation.right - (area.right - area.left),
                                top: this.state.lastDrawLocation.top + (area.top - area.bottom)
                            }
                        });
                    }}
                />
                {this.state.index === null || boundedData.find(d => d.x == this.state.index.x) == null ? null : <Crosshair
                    values={[this.state.index]}
                    titleFormat={(d) => ({ title: 'Time', value: (new Date(d[0].x)).toTimeString() })}
                    itemsFormat={(d) => ([{ title: 'Value', value: d[0].y.toFixed(5) }])}
                />}
                {this.state.index === null || boundedData.find(d => d.x == this.state.index.x) == null ? null : <MarkSeries
                    color={this.props.stroke}
                    size={2}
                    data={[this.state.index]}
                />}
            </FlexibleXYPlot>
        );
    }
}

export default LargeGraph;