import React, { useState } from 'react';
import HoverText from './HoverText';


const WODelayRate = ({ data, expandedCard }) => {
    const total = data.reduce((sum, d) => sum + d.closed, 0);
    const delayed = data.reduce((sum, d) => sum + d.delayed, 0);
    const delayRate = ((delayed / total) * 100);
    const onTime = total - delayed;
    const width = 200;
    const [hovered, setHovered] = useState(false);
    const [hover2, setHover2] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        setMousePos({
            x: e.clientX,
            y: e.clientY,
        });
    };

    return (
        <div className='wodelay mycards'>
            <div className=" card-container" style={{ height: "18.5rem"}}>
                <div className='row flex-column'>
                    <strong>WO Delay Rate</strong>

                    <div>
                        <strong>Current Delay Rate:</strong> {delayRate}%
                    </div>
                </div>

                <div className="charts">
                    {/* Donut Chart */}
                    <div className="donut">

                        <svg
                            viewBox="0 0 36 36"
                            className={`${expandedCard === "wo" ? "donut-chart-expand" : "donut-chart"}`}
                        >
                            <circle className="donut-ring" cx="18" cy="18" r="14.9155"
                                onMouseEnter={() => setHovered(true)}
                                onMouseLeave={() => setHovered(false)}
                                onMouseMove={handleMouseMove}
                            />
                            <circle
                                className="donut-segment"
                                cx="18" cy="18" r="14.9155"
                                strokeDasharray={`${(delayed / total) * 100} ${(onTime / total) * 100}`}
                                strokeDashoffset="30"
                                onMouseEnter={() => setHover2(true)}
                                onMouseLeave={() => setHover2(false)}
                                onMouseMove={handleMouseMove}
                            />


                        </svg>

                    </div>


                </div>
                
                <div className="donut-legend">
                    <div><span className="legend-box ontime"></span>On Time</div>
                    <div><span className="legend-box delayed"></span>Delayed</div>
                </div>

            </div>
            {hovered && (<HoverText x={mousePos.x} y={mousePos.y} bgcolor={'#0d6efd'} data={`${100 - delayRate}% Ontime`} />)}
            {hover2 && (<HoverText x={mousePos.x} y={mousePos.y} bgcolor={'#fc630a'} data={`${delayRate}% Delay`} />)}
        </div>
    );
};

export default WODelayRate;
