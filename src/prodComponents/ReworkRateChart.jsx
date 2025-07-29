import React, { useState } from 'react';

const ReworkRateChart = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Sample data - replace with your actual data
    const data = [
        { day: 'Mon', totalProduced: 250, reworkedQty: 58, reworkRate: 3.2 },
        { day: 'Tue', totalProduced: 280, reworkedQty: 101, reworkRate: 3.9 },
        { day: 'Wed', totalProduced: 230, reworkedQty: 95, reworkRate: 3.9 },
        { day: 'Thu', totalProduced: 300, reworkedQty: 152, reworkRate: 4.0 },
        { day: 'Fri', totalProduced: 270, reworkedQty: 80, reworkRate: 3.0 },
        { day: 'Sat', totalProduced: 200, reworkedQty: 51, reworkRate: 2.5 },
        { day: 'Sun', totalProduced: 180, reworkedQty: 50, reworkRate: 2.2 }
    ];

    // Chart dimensions
    const chartWidth = 360;
    const chartHeight = 320;
    const margin = { top: 20, right: 60, bottom: 30, left: 40 };
    const innerWidth = chartWidth - margin.left - margin.right;
    const innerHeight = chartHeight - margin.top - margin.bottom;
    const [selectedPeriod, setSelectedPeriod] = useState('current');
    // Scales
    const maxTotalProduced = Math.max(...data.map(d => d.totalProduced));
    const maxReworkRate = Math.max(...data.map(d => d.reworkRate));
    const barWidth = innerWidth / data.length * 0.7;
    const barSpacing = innerWidth / data.length;

    // Y-axis scale for quantities (left)
    const yScaleQty = (value) => innerHeight - (value / maxTotalProduced) * innerHeight;

    // Y-axis scale for rework rate percentage (right)
    const yScaleRate = (value) => innerHeight - (value / (maxReworkRate * 1.2)) * innerHeight;

    // Generate Y-axis ticks for quantities
    const qtyTicks = [];
    const qtyStep = Math.ceil(maxTotalProduced / 5 / 50) * 50;
    for (let i = 0; i <= maxTotalProduced; i += qtyStep) {
        qtyTicks.push(i);
    }

    // Generate Y-axis ticks for rework rate
    const rateTicks = [];
    const rateStep = Math.ceil(maxReworkRate / 5);
    for (let i = 0; i <= maxReworkRate * 1.2; i += rateStep) {
        rateTicks.push(Math.round(i * 10) / 10);
    }

    // Generate line points for rework rate trend
    const linePoints = data.map((item, index) => ({
        x: margin.left + barSpacing * index + barWidth / 2,
        y: margin.top + yScaleRate(item.reworkRate)
    }));

    const handleMouseMove = (e, index) => {
        setMousePosition({
            x: e.clientX,
            y: e.clientY
        });
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    return (
        <div className='prodcharts'>
            <div className="card-container anup planvsactual" style={{height:"30rem", border: '1px solid #dee2e6' }}>
                <div className="card-body">
                    {/* Title */}
                    <div className="mb-3 d-flex justify-content-between align-items-center">
                        <h6 className="text-dark mb-1" style={{ fontSize: '16px', fontWeight: '600' }}>
                            Rework Rate
                        </h6>
                        <select
                            className="form-select form-select-sm mb-1"
                            style={{ width: '75px', fontSize: '10px', padding: '2px 4px' }}
                            value={selectedPeriod}
                            onChange={(e) => setSelectedPeriod(e.target.value)}
                        >
                            <option value="current">Current</option>
                            <option value="2024">2024</option>
                        </select>
                        
                    </div>

                    {/* Chart Container */}
                    <div style={{overflow:"scroll", backgroundColor: '#f8f9fa', padding: '10px' }}>
                        <div className="position-relative" style={{width:"fit-content"}}>
                            <svg width={chartWidth} height={chartHeight}>
                                {/* Grid lines */}
                                <defs>
                                    <pattern id="grid" width="100%" height="20" patternUnits="userSpaceOnUse">
                                        <path d="M 0 20 L 100 20" fill="none" stroke="#e9ecef" strokeWidth="1" />
                                    </pattern>
                                </defs>

                                {/* Background grid */}
                                <rect
                                    x={margin.left}
                                    y={margin.top}
                                    width={innerWidth}
                                    height={innerHeight}
                                    fill="url(#grid)"
                                />

                                {/* Y-axis (left) - Quantities */}
                                <line
                                    x1={margin.left}
                                    y1={margin.top}
                                    x2={margin.left}
                                    y2={margin.top + innerHeight}
                                    stroke="#dee2e6"
                                    strokeWidth="1"
                                />

                                {/* Y-axis (right) - Rework Rate */}
                                <line
                                    x1={margin.left + innerWidth}
                                    y1={margin.top}
                                    x2={margin.left + innerWidth}
                                    y2={margin.top + innerHeight}
                                    stroke="#dee2e6"
                                    strokeWidth="1"
                                />

                                {/* X-axis */}
                                <line
                                    x1={margin.left}
                                    y1={margin.top + innerHeight}
                                    x2={margin.left + innerWidth}
                                    y2={margin.top + innerHeight}
                                    stroke="#dee2e6"
                                    strokeWidth="1"
                                />

                                {/* Y-axis ticks and labels (left) - Quantities */}
                                {qtyTicks.map(tick => (
                                    <g key={tick}>
                                        <line
                                            x1={margin.left - 5}
                                            y1={margin.top + yScaleQty(tick)}
                                            x2={margin.left}
                                            y2={margin.top + yScaleQty(tick)}
                                            stroke="#dee2e6"
                                            strokeWidth="1"
                                        />
                                        <text
                                            x={margin.left - 10}
                                            y={margin.top + yScaleQty(tick)}
                                            textAnchor="end"
                                            dominantBaseline="middle"
                                            fontSize="11"
                                            fill="#6c757d"
                                        >
                                            {tick}
                                        </text>
                                    </g>
                                ))}

                                {/* Y-axis ticks and labels (right) - Rework Rate */}
                                {rateTicks.map(tick => (
                                    <g key={tick}>
                                        <line
                                            x1={margin.left + innerWidth}
                                            y1={margin.top + yScaleRate(tick)}
                                            x2={margin.left + innerWidth + 5}
                                            y2={margin.top + yScaleRate(tick)}
                                            stroke="#dee2e6"
                                            strokeWidth="1"
                                        />
                                        <text
                                            x={margin.left + innerWidth + 10}
                                            y={margin.top + yScaleRate(tick)}
                                            textAnchor="start"
                                            dominantBaseline="middle"
                                            fontSize="11"
                                            fill="#6c757d"
                                        >
                                            {tick}%
                                        </text>
                                    </g>
                                ))}

                                {/* Stacked Bars */}
                                {data.map((item, index) => {
                                    const goodQty = item.totalProduced - item.reworkedQty;
                                    const goodHeight = (goodQty / maxTotalProduced) * innerHeight;
                                    const reworkHeight = (item.reworkedQty / maxTotalProduced) * innerHeight;
                                    const totalHeight = goodHeight + reworkHeight;

                                    return (
                                        <g key={index}>
                                            {/* Good quantity bar (bottom) */}
                                            <rect
                                                x={margin.left + barSpacing * index + (barSpacing - barWidth) / 2}
                                                y={margin.top + innerHeight - goodHeight}
                                                width={barWidth}
                                                height={goodHeight}
                                                fill="#28a745"
                                                stroke="#fff"
                                                strokeWidth="1"
                                                onMouseMove={(e) => handleMouseMove(e, index)}
                                                onMouseLeave={handleMouseLeave}
                                                style={{ cursor: 'pointer' }}
                                                opacity={hoveredIndex !== null && hoveredIndex !== index ? 0.7 : 1}
                                            />

                                            {/* Rework quantity bar (top) */}
                                            <rect
                                                x={margin.left + barSpacing * index + (barSpacing - barWidth) / 2}
                                                y={margin.top + innerHeight - totalHeight}
                                                width={barWidth}
                                                height={reworkHeight}
                                                fill="#dc3545"
                                                stroke="#fff"
                                                strokeWidth="1"
                                                onMouseMove={(e) => handleMouseMove(e, index)}
                                                onMouseLeave={handleMouseLeave}
                                                style={{ cursor: 'pointer' }}
                                                opacity={hoveredIndex !== null && hoveredIndex !== index ? 0.7 : 1}
                                            />

                                            {/* X-axis labels */}
                                            <text
                                                x={margin.left + barSpacing * index + barWidth / 2}
                                                y={margin.top + innerHeight + 20}
                                                textAnchor="middle"
                                                fontSize="11"
                                                fill="#6c757d"
                                            >
                                                {item.day}
                                            </text>

                                            {/* Total quantity labels on top of bars */}
                                            <text
                                                x={margin.left + barSpacing * index + barWidth / 2}
                                                y={margin.top + innerHeight - totalHeight - 5}
                                                textAnchor="middle"
                                                fontSize="10"
                                                fill="#6c757d"
                                                fontWeight="600"
                                            >
                                                {item.totalProduced}
                                            </text>
                                        </g>
                                    );
                                })}

                                {/* Rework rate trend line */}
                                <polyline
                                    points={linePoints.map(p => `${p.x},${p.y}`).join(' ')}
                                    fill="none"
                                    stroke="#ffc107"
                                    strokeWidth="3"
                                    strokeDasharray="5,5"
                                />

                                {/* Line points */}
                                {linePoints.map((point, index) => (
                                    <circle
                                        key={index}
                                        cx={point.x}
                                        cy={point.y}
                                        r="4"
                                        fill="#ffc107"
                                        stroke="#fff"
                                        strokeWidth="2"
                                        onMouseMove={(e) => handleMouseMove(e, index)}
                                        onMouseLeave={handleMouseLeave}
                                        style={{ cursor: 'pointer' }}
                                    />
                                ))}

                                {/* Rework rate percentage labels */}
                                {data.map((item, index) => (
                                    <text
                                        key={index}
                                        x={linePoints[index].x}
                                        y={linePoints[index].y - 15}
                                        textAnchor="middle"
                                        fontSize="10"
                                        fill="#ffc107"
                                        fontWeight="600"
                                    >
                                        {item.reworkRate}%
                                    </text>
                                ))}

                                {/* Axis labels */}
                                <text
                                    x={margin.left / 2}
                                    y={margin.top + innerHeight / 2 - 10}
                                    textAnchor="middle"
                                    fontSize="11"
                                    fill="#6c757d"
                                    transform={`rotate(-90 ${margin.left / 2} ${margin.top + innerHeight / 2})`}
                                >
                                    Quantity
                                </text>

                                <text
                                    x={margin.left + innerWidth + 35}
                                    y={margin.top + innerHeight / 2}
                                    textAnchor="middle"
                                    fontSize="11"
                                    fill="#6c757d"
                                    transform={`rotate(90 ${margin.left + innerWidth + 35} ${margin.top + innerHeight / 2})`}
                                >
                                    Rework Rate (%)
                                </text>
                            </svg>


                        </div>
                    </div>

                    {/* Legend */}
                    <div className="d-flex justify-content-center mt-3">
                        <div className="d-flex align-items-center me-3">
                            <div className="rounded-circle me-2" style={{ width: '8px', height: '8px', backgroundColor: '#28a745' }}></div>
                            <span style={{ fontSize: '11px' }}>Good</span>
                        </div>
                        <div className="d-flex align-items-center me-3">
                            <div className="rounded-circle me-2" style={{ width: '8px', height: '8px', backgroundColor: '#dc3545' }}></div>
                            <span style={{ fontSize: '11px' }}>Rework</span>
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="me-2" style={{ width: '12px', height: '3px', backgroundColor: '#ffc107', borderRadius: '1px' }}></div>
                            <span style={{ fontSize: '11px' }}>Rework Rate %</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Tooltip */}
            {hoveredIndex !== null && (
                <div
                    className="position-fixed bg-dark text-white p-2 rounded shadow-sm"
                    style={{
                        left: mousePosition.x + 10,
                        top: mousePosition.y + 10,
                        fontSize: '11px',
                        zIndex: 1000,
                        whiteSpace: 'nowrap'
                    }}
                >
                    <div className="fw-bold text-info">
                        {data[hoveredIndex].day}
                    </div>
                    <div>Total Produced: <span className="text-warning">{data[hoveredIndex].totalProduced}</span></div>
                    <div>Reworked: <span className="text-danger">{data[hoveredIndex].reworkedQty}</span></div>
                    <div>Good: <span className="text-success">{data[hoveredIndex].totalProduced - data[hoveredIndex].reworkedQty}</span></div>
                    <div className="text-warning" style={{ fontSize: '10px' }}>
                        Rework Rate: {data[hoveredIndex].reworkRate}%
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReworkRateChart;