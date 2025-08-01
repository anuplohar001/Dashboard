import React, { useState } from 'react'
import HoverText from '../topComponents/HoverText';

const DowntimeTrendOverTime = () => {
    const [hoveredCard, setHoveredCard] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [hoverData, setHoverData] = useState('');
    const [selectedPeriod, setSelectedPeriod] = useState('current');
    const [values, setvalues] = useState([28, 19, 24, 10, 26, 17, 30, 23, 27, 21, 24, 29])
    const width = 630;
    const compWidth = 730;
    const height = 150;
    const data = [
        { label: "Jan", value: 1 },
        { label: "Feb", value: 12 },
        { label: "Mar", value: 15 },
        { label: "Apr", value: 5 },
        { label: "May", value: 19 },
        { label: "Jun", value: 21 },
        { label: "Aug", value: 22 },
        { label: "Sept", value: 22 },
        { label: "Oct", value: 22 },
        { label: "Nov", value: 22 },
        { label: "Dec", value: 22 },
    ];
    const max = Math.max(...values.map(d => d));

    const points = values.map((d, i) => {
        const x = (i / (values.length - 1)) * width + 30;
        const y = height - (d / max) * height + 9;
        return `${x},${y}`;
    });
    const handleMouseMove = (data, e) => {
        const x = e.clientX;
        const y = e.clientY;
        setMousePos({
            x: x,
            y: y,
        });
        setHoverData(`${data}Hr`);
    };


    const handleSelectedPeriod = (period) => {
        if (period === 'current') {
            setvalues([28, 19, 24, 10, 26, 17, 30, 23, 27, 21, 24, 29]);
        } else {
            setvalues([23, 15, 28, 12, 30, 11, 30, 23, 24, 21, 24, 30]);
        }
        setSelectedPeriod(period);
    }


    return (
        <div className='col-lg-12 col-md-12 col-12'>
            <div className=" card-container" style={{
                border: '1px solid #dee2e6',
                transition: 'all 0.3s ease',
                transform: hoveredCard ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: hoveredCard ? '0 4px 12px rgba(0,0,0,0.15)' : '0 2px 4px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',

            }}>
                <div className='d-flex justify-content-between align-items-center mb-2'>
                    <h6 style={{ textAlign: "left", fontWeight: '600' }} className="card-title">Downtime Trend Over Time</h6>
                    <select
                        className="form-select form-select-sm mb-1"
                        style={{ width: '75px', fontSize: '10px', padding: '2px 4px' }}
                        value={selectedPeriod}
                        onChange={(e) => handleSelectedPeriod(e.target.value)}
                    >
                        <option value="current">Current</option>
                        <option value="2024">2024</option>
                    </select>
                </div>
                <div className='border my-2 p-2 d-flex flex-column' style={{ overflow: 'scroll' }}>
                    <strong className='number'>25 Hr Avg</strong>
                    <svg width={width} height={height} style={{ overflow: "scroll" }}>
                        {/* Grid Lines */}
                        <line x1="0" y1={height / 4} x2={width} y2={height / 4} className="grid-line" />
                        <line x1="0" y1={height / 2} x2={width} y2={height / 2} className="grid-line" />
                        <line x1="0" y1={(3 * height) / 4} x2={width} y2={(3 * height) / 4} className="grid-line" />
                        <line x1="0" y1={height} x2={width} y2={height} className="grid-line" />

                        {/* Y-axis Labels in Millions */}
                        <text x="0" y={height / 4 - 5} fontSize="10" fill="#666">30Hr</text>
                        <text x="0" y={height / 2 - 5} fontSize="10" fill="#666">20Hr</text>
                        <text x="0" y={(3 * height) / 4 - 5} fontSize="10" fill="#666">10Hr</text>
                        <text x="0" y={height - 5} fontSize="10" fill="#666">0</text>

                        {/* Data Line */}
                        <polyline
                            fill="none"
                            stroke="#0d6efd"
                            strokeWidth="1"
                            points={points.join(" ")}
                            className="filter-drop-shadow"
                            style={{ pointerEvents: 'stroke' }}
                        />

                        {/* Circles on Data Points */}
                        {points.map((p, i) => {
                            const [x, y] = p.split(",");
                            return (
                                <circle
                                    key={i}
                                    cx={x}
                                    cy={y}
                                    r="3"
                                    fill="#0d6efd"
                                    onMouseEnter={() => setHovered(true)}
                                    onMouseLeave={() => setHovered(false)}
                                    onMouseMove={(e) => handleMouseMove(`${data[i].label} : ${values[i]}`, e)}
                                />
                            );
                        })}
                    </svg>

                    <svg width={width} height={15} className='font-bold'>
                        {data.map((d, i) => (
                            <text
                                key={i}
                                x={(i / (values.length - 1)) * width + 30}
                                // x={values}
                                y={7}
                                textAnchor="middle"
                                fontSize="10"
                                fill="#333"
                                startOffset="25%"
                            >
                                {d.label}
                            </text>
                        ))}
                    </svg>
                </div>





            </div>
            {hovered && (
                <HoverText x={mousePos.x} y={mousePos.y} bgcolor={'#0d6efd'} data={hoverData} />
            )}
        </div>
    )
}

export default DowntimeTrendOverTime
