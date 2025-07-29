import React, { useState } from 'react';
import HoverText from "./HoverText";

const TotalOrders = ({ data }) => {
    const [values, setvalues] = useState([10, 20, 15, 30, 25, 35, 32, 33, 15, 30, 23, 34]);
    const max = Math.max(...values.map(d => d));
    const [barData, setbarData] = useState([22, 33, 33, 39, 33, 50, 17, 28, 33, 39, 22, 30]);
    const [hovered, setHovered] = useState(false)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [hoverData, setHoverData] = useState(null);
    const [selectedPeriod, setSelectedPeriod] = useState('current');

    const width = 530;
    const chartWidth = 490;
    const height = 150;


    const points = values.map((d, i) => {
        const x = (i / (values.length - 1)) * chartWidth + 25;
        const y = height - (d / max) * height + 9;
        return `${x},${y}`;
    });

    const handleSelectPeriodChange = (e) => {
        setSelectedPeriod(e.target.value);
        if (e.target.value === 'current') {
            setvalues([10, 20, 15, 30, 25, 35, 32, 33, 15, 30, 23, 34]);
            setbarData([22, 33, 33, 39, 33, 50, 17, 28, 33, 39, 22, 30]);
        } else {
            setvalues([12, 18, 20, 28, 22, 30, 25, 29, 18, 32, 20, 35]);
            setbarData([25, 30, 30, 40, 30, 55, 20, 25, 30, 40, 25, 35]);
        }
    };
    const handleMouseMove = (e, value) => {
        setMousePos({
            x: e.clientX,
            y: e.clientY,
        });
        setHoverData(value);
    };

    return (
        <div>
            <div className="totalorders card-container" style={{ height: "43rem" }}>
                <div className='d-flex justify-content-between align-items-center mb-2'>
                    <strong>Total Orders Received</strong>
                    <select
                        className="form-select form-select-sm mb-1"
                        style={{ width: '75px', fontSize: '10px', padding: '2px 4px' }}
                        value={selectedPeriod}
                        onChange={handleSelectPeriodChange}
                    >
                        <option value="current">Current</option>
                        <option value="2024">2024</option>
                    </select>
                </div>
                <div className="widget-box d-flex flex-column" style={{ overflow: "scroll" }}>
                    <div className="number">75
                        <div className="desc">Sales Orders</div>
                    </div>

                    <svg width={550} height={height} className=''>
                        {/* Grid Lines */}
                        <line x1="0" y1={height / 4} x2="100%" y2={height / 4} className="grid-line" />
                        <line x1="0" y1={height / 2} x2="100%" y2={height / 2} className="grid-line" />
                        <line x1="0" y1={(3 * height) / 4} x2="100%" y2={(3 * height) / 4} className="grid-line" />
                        <line x1="0" y1={height} x2="100%" y2={height} className="grid-line" />

                        {/* Y-axis Labels in Millions */}
                        <text x="0" y={height / 4 - 5} fontSize="10" fill="#666">30</text>
                        <text x="0" y={height / 2 - 5} fontSize="10" fill="#666">20</text>
                        <text x="0" y={(3 * height) / 4 - 5} fontSize="10" fill="#666">10</text>
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
                                    onMouseMove={(e) => handleMouseMove(e, `${data[i].label}: ${values[i]}`)}
                                />
                            );
                        })}
                    </svg>

                    <div className='myborder' style={{width:"35rem"}}>
                        <svg height={15} width="fit-content" className='font-bold myborder'>
                            {data.map((d, i) => (
                                <text
                                    key={i}
                                    x={(i / (values.length - 1)) * 490 + 25}
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

                <div style={{ overflow: "scroll" }}>
                    <div style={{ width: "fit-content" }}>
                        <svg width={550} height="330">
                            {/* Y-axis Label (Rotated) */}
                            <text
                                x="-210"
                                y="10"
                                transform="rotate(-90)"
                                fontSize="14"
                                fill="#000"
                            >
                                No. of Orders
                            </text>

                            {[0, 10, 20, 30, 40, 50].map((val, idx) => {
                                const chartHeight = 300;
                                const y = chartHeight - (val / 50) * chartHeight + 13;
                                return (
                                    <g key={idx}>
                                        <line
                                            x1="30"
                                            y1={y}
                                            x2="98%"
                                            y2={y}
                                            stroke="#ccc"
                                            strokeDasharray="2 2"
                                        />
                                        <text x="18" y={y + 5} fontSize="12" fill="#666" fontWeight="bold">
                                            {val}
                                        </text>
                                    </g>
                                );
                            })}

                            {/* Bars + X-axis Labels */}
                            {barData.map((v, i) => {
                                const barWidth = 26;
                                const spacing = 15;
                                const chartHeight = 300;
                                const x = 45 + i * (barWidth + spacing);
                                const height = (v / 50) * chartHeight;
                                return (
                                    <g key={i}>
                                        <rect
                                            className="hovered"
                                            x={x}
                                            y={chartHeight - height + 13}
                                            width="5%"
                                            height={height}
                                            fill="#0d6efd"
                                            onMouseEnter={() => setHovered(true)}
                                            onMouseLeave={() => setHovered(false)}
                                            onMouseMove={(e) => handleMouseMove(e, `${data[i].label}: ${barData[i]}`)}
                                        />
                                        <text
                                            x={x + barWidth / 2}
                                            y={chartHeight + 29}
                                            fontSize="10"
                                            textAnchor="middle"
                                            fill="#000"
                                            fontWeight="bold"
                                        >
                                            {data[i].label}
                                        </text>
                                    </g>
                                );
                            })}
                        </svg>
                    </div>


                </div>

            </div>
            {hovered && (<HoverText x={mousePos.x} y={mousePos.y} data={hoverData} />)}
        </div>
    );
};

export default TotalOrders;
