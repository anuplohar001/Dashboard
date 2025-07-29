import React, { useState } from 'react'
import HoverText from './HoverText';

const RevenueThisYear = () => {
    const [hoveredCard, setHoveredCard] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [hoverData, setHoverData] = useState('');
    const [selectedPeriod, setSelectedPeriod] = useState('current');
    const [values, setvalues] = useState([2800000, 1900000, 2400000, 1000000, 2600000, 1700000, 3000000, 2300000, 2700000, 2100000, 2400000, 2900000])
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
        setHoverData(data);
    };


    const handleSelectedPeriod = (period) => {
        if (period === 'current') {
            setvalues([2800000, 1900000, 2400000, 1000000, 2600000, 1700000, 3000000, 2300000, 2700000, 2100000, 2400000]);
        } else {
            setvalues([2300000, 1500000, 2800000, 1200000, 3000000, 1100000, 3000000, 2300000, 2400000, 2100000, 2400000]);
        }
        setSelectedPeriod(period);
    }


    return (
        <div>
            <div className="revenuecurrent card-container" style={{
                border: '1px solid #dee2e6',
                transition: 'all 0.3s ease',
                transform: hoveredCard ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: hoveredCard ? '0 4px 12px rgba(0,0,0,0.15)' : '0 2px 4px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                height:"19rem"

            }}>
                <div className='d-flex justify-content-between align-items-center mb-2'>
                    <strong className="card-title">Revenue This Year</strong>
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
                    <strong className='number'>2.50 M</strong>
                    <svg width={width} height={height} style={{ overflow: "scroll" }}>
                        {/* Grid Lines */}
                        <line x1="0" y1={height / 4} x2={width} y2={height / 4} className="grid-line" />
                        <line x1="0" y1={height / 2} x2={width} y2={height / 2} className="grid-line" />
                        <line x1="0" y1={(3 * height) / 4} x2={width} y2={(3 * height) / 4} className="grid-line" />
                        <line x1="0" y1={height} x2={width} y2={height} className="grid-line" />

                        {/* Y-axis Labels in Millions */}
                        <text x="0" y={height / 4 - 5} fontSize="10" fill="#666">3M</text>
                        <text x="0" y={height / 2 - 5} fontSize="10" fill="#666">2M</text>
                        <text x="0" y={(3 * height) / 4 - 5} fontSize="10" fill="#666">1M</text>
                        <text x="0" y={height - 5} fontSize="10" fill="#666">0</text>

                        {/* Data Line */}
                        <polyline
                            fill="none"
                            stroke="#0d6efd"
                            strokeWidth="2"
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
                                    onMouseMove={(e) => handleMouseMove(`${data[i].label}: ${values[i]}`, e)}
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

export default RevenueThisYear
