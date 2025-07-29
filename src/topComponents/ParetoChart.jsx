import React, { useState } from 'react';

const ParetoChart = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Sample data - replace with your actual data
    const [data, setData] = useState([
        { operation: 'RO2', rejectedQty: 7, producedQty: 200, defectRate: 3.5 },
        { operation: 'RO5', rejectedQty: 12, producedQty: 450, defectRate: 2.67 },
        { operation: 'RO1', rejectedQty: 5, producedQty: 250, defectRate: 2.0 },
        { operation: 'RO3', rejectedQty: 8, producedQty: 400, defectRate: 2.0 },
        { operation: 'RO4', rejectedQty: 3, producedQty: 300, defectRate: 1.0 },
        { operation: 'RO6', rejectedQty: 2, producedQty: 350, defectRate: 0.57 },
    ]);

    // Sort data by defect rate in descending order
    const sortedData = [...data].sort((a, b) => b.defectRate - a.defectRate);

    // Calculate cumulative percentage
    const totalDefects = sortedData.reduce((sum, item) => sum + item.rejectedQty, 0);
    let cumulativeSum = 0;

    const paretoData = sortedData.map(item => {
        cumulativeSum += item.rejectedQty;
        const cumulativePercentage = (cumulativeSum / totalDefects) * 100;
        return {
            ...item,
            cumulativePercentage: Math.round(cumulativePercentage * 10) / 10
        };
    });

    // Chart dimensions
    const chartWidth = 380;
    const chartHeight = 330;
    const margin = { top: 20, right: 60, bottom: 30, left: 40 };
    const innerWidth = chartWidth - margin.left - margin.right;
    const innerHeight = chartHeight - margin.top - margin.bottom;

    // Scales
    const maxDefectRate = Math.max(...paretoData.map(d => d.defectRate));
    const barWidth = innerWidth / paretoData.length * 0.8;
    const barSpacing = innerWidth / paretoData.length;

    // Y-axis scale for defect rate (left)
    const yScale = (value) => innerHeight - (value / maxDefectRate) * innerHeight;

    // Y-axis scale for cumulative percentage (right)
    const yScaleCumulative = (value) => innerHeight - (value / 100) * innerHeight;

    // Generate Y-axis ticks
    const yTicks = [];
    for (let i = 0; i <= Math.ceil(maxDefectRate); i++) {
        yTicks.push(i);
    }

    const cumulativeTicks = [0, 25, 50, 75, 100];
    const [selectedPeriod, setSelectedPeriod] = useState('current');
    // Generate line points for cumulative percentage
    const linePoints = paretoData.map((item, index) => ({
        x: margin.left + barSpacing * index + barWidth / 2,
        y: margin.top + yScaleCumulative(item.cumulativePercentage)
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


    const handleSelectedPeriod = (e) => {
        setSelectedPeriod(e.target.value);
        if (e.target.value === '2024') {
            setData([
                { operation: 'RO2', rejectedQty: 10, producedQty: 200, defectRate: 5.0 },
                { operation: 'RO5', rejectedQty: 15, producedQty: 450, defectRate: 3.33 },
                { operation: 'RO1', rejectedQty: 8, producedQty: 250, defectRate: 3.2 },
                { operation: 'RO3', rejectedQty: 12, producedQty: 400, defectRate: 3.0 },
                { operation: 'RO4', rejectedQty: 5, producedQty: 300, defectRate: 1.67 },
                { operation: 'RO6', rejectedQty: 3, producedQty: 350, defectRate: 0.86 },
            ]);
        } else {
            setData([
                { operation: 'RO2', rejectedQty: 7, producedQty: 200, defectRate: 3.5 },
                { operation: 'RO5', rejectedQty: 12, producedQty: 450, defectRate: 2.67 },
                { operation: 'RO1', rejectedQty: 5, producedQty: 250, defectRate: 2.0 },
                { operation: 'RO3', rejectedQty: 8, producedQty: 400, defectRate: 2.0 },
                { operation: 'RO4', rejectedQty: 3, producedQty: 300, defectRate: 1.0 },
                { operation: 'RO6', rejectedQty: 2, producedQty: 350, defectRate: 0.57 },
            ]);
        }
    }

    return (
        <div>
            <div className="card-container toppareto" style={{ border: '1px solid #dee2e6' }}>
                <div className="card-body">
                    {/* Title */}
                    <div className="mb-3 d-flex justify-content-between align-items-center">
                        <h6 className="text-dark mb-1" style={{ fontSize: '16px', fontWeight: '600' }}>
                            Rework & Rejection Analysis
                        </h6>
                        <select
                            className="form-select form-select-sm mb-1"
                            style={{ width: '75px', fontSize: '10px', padding: '2px 4px' }}
                            value={selectedPeriod}
                            onChange={handleSelectedPeriod}
                        >
                            <option value="current">Current</option>
                            <option value="2024">2024</option>
                        </select>

                    </div>

                    {/* Chart Container */}
                    <div style={{overflow:"scroll", backgroundColor: '#f8f9fa', padding: '10px' }}>
                        <div className="position-relative">
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

                                {/* Y-axis (left) - Defect Rate */}
                                <line
                                    x1={margin.left}
                                    y1={margin.top}
                                    x2={margin.left}
                                    y2={margin.top + innerHeight}
                                    stroke="#dee2e6"
                                    strokeWidth="1"
                                />

                                {/* Y-axis (right) - Cumulative % */}
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

                                {/* Y-axis ticks and labels (left) */}
                                {yTicks.map(tick => (
                                    <g key={tick}>
                                        <line
                                            x1={margin.left - 5}
                                            y1={margin.top + yScale(tick)}
                                            x2={margin.left}
                                            y2={margin.top + yScale(tick)}
                                            stroke="#dee2e6"
                                            strokeWidth="1"
                                        />
                                        <text
                                            x={margin.left - 10}
                                            y={margin.top + yScale(tick)}
                                            textAnchor="end"
                                            dominantBaseline="middle"
                                            fontSize="11"
                                            fill="#6c757d"
                                        >
                                            {tick}%
                                        </text>
                                    </g>
                                ))}

                                {/* Y-axis ticks and labels (right) */}
                                {cumulativeTicks.map(tick => (
                                    <g key={tick}>
                                        <line
                                            x1={margin.left + innerWidth}
                                            y1={margin.top + yScaleCumulative(tick)}
                                            x2={margin.left + innerWidth + 5}
                                            y2={margin.top + yScaleCumulative(tick)}
                                            stroke="#dee2e6"
                                            strokeWidth="1"
                                        />
                                        <text
                                            x={margin.left + innerWidth + 10}
                                            y={margin.top + yScaleCumulative(tick)}
                                            textAnchor="start"
                                            dominantBaseline="middle"
                                            fontSize="11"
                                            fill="#6c757d"
                                        >
                                            {tick}%
                                        </text>
                                    </g>
                                ))}

                                {/* Bars */}
                                {paretoData.map((item, index) => (
                                    <g key={index}>
                                        <rect
                                            x={margin.left + barSpacing * index + (barSpacing - barWidth) / 2}
                                            y={margin.top + yScale(item.defectRate)}
                                            width={barWidth}
                                            height={innerHeight - yScale(item.defectRate)}
                                            fill="#007bff"
                                            stroke="#fff"
                                            strokeWidth="2"
                                            onMouseMove={(e) => handleMouseMove(e, index)}
                                            onMouseLeave={handleMouseLeave}
                                            style={{ cursor: 'pointer' }}
                                            opacity={hoveredIndex !== null && hoveredIndex !== index ? 0.6 : 1}
                                        />

                                        {/* X-axis labels */}
                                        <text
                                            x={margin.left + barSpacing * index + barWidth / 2}
                                            y={margin.top + innerHeight + 20}
                                            textAnchor="middle"
                                            fontSize="11"
                                            fill="#6c757d"
                                        >
                                            {item.operation}
                                        </text>

                                        {/* Defect rate labels on bars */}
                                        <text
                                            x={margin.left + barSpacing * index + barWidth / 2}
                                            y={margin.top + yScale(item.defectRate) - 5}
                                            textAnchor="middle"
                                            fontSize="10"
                                            fill="#6c757d"
                                            fontWeight="600"
                                        >
                                            {item.defectRate}%
                                        </text>
                                    </g>
                                ))}

                                {/* Cumulative percentage line */}
                                <polyline
                                    points={linePoints.map(p => `${p.x},${p.y}`).join(' ')}
                                    fill="none"
                                    stroke="#dc3545"
                                    strokeWidth="2"
                                />

                                {/* Line points */}
                                {linePoints.map((point, index) => (
                                    <circle
                                        key={index}
                                        cx={point.x}
                                        cy={point.y}
                                        r="3"
                                        fill="#dc3545"
                                        stroke="#fff"
                                        strokeWidth="2"
                                        onMouseMove={(e) => handleMouseMove(e, index)}
                                        onMouseLeave={handleMouseLeave}
                                        style={{ cursor: 'pointer' }}
                                    />
                                ))}

                                {/* Cumulative percentage labels */}
                                {paretoData.map((item, index) => (
                                    <text
                                        key={index}
                                        x={linePoints[index].x}
                                        y={linePoints[index].y - 10}
                                        textAnchor="middle"
                                        fontSize="10"
                                        fill="#dc3545"
                                        fontWeight="600"
                                    >
                                        {item.cumulativePercentage}%
                                    </text>
                                ))}

                                {/* Axis labels */}
                                <text
                                    x={margin.left / 2 - 4}
                                    y={margin.top + innerHeight / 2 - 10}
                                    textAnchor="middle"
                                    fontSize="11"
                                    fill="#6c757d"
                                    transform={`rotate(-90 ${margin.left / 2} ${margin.top + innerHeight / 2})`}
                                >
                                    Defect Rate (%)
                                </text>

                                <text
                                    x={margin.left + innerWidth + 35}
                                    y={margin.top + innerHeight / 2}
                                    textAnchor="middle"
                                    fontSize="11"
                                    fill="#6c757d"
                                    transform={`rotate(90 ${margin.left + innerWidth + 35} ${margin.top + innerHeight / 2})`}
                                >
                                    Cumulative (%)
                                </text>
                            </svg>


                        </div>
                    </div>

                    {/* Legend */}
                    <div className="d-flex justify-content-center mt-3">
                        <div className="d-flex align-items-center me-4">
                            <div className="rounded-circle me-2" style={{ width: '8px', height: '8px', backgroundColor: '#007bff' }}></div>
                            <span style={{ fontSize: '11px' }}>Defect Rate</span>
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="me-2" style={{ width: '12px', height: '2px', backgroundColor: '#dc3545' }}></div>
                            <span style={{ fontSize: '11px' }}>Cumulative %</span>
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
                    <div className="fw-bold" style={{ color: '#007bff' }}>
                        {paretoData[hoveredIndex].operation}
                    </div>
                    <div>Defect Rate: <span className="text-warning">{paretoData[hoveredIndex].defectRate}%</span></div>
                    <div>Rejected: <span className="text-info">{paretoData[hoveredIndex].rejectedQty} / {paretoData[hoveredIndex].producedQty}</span></div>
                    <div className="text-success" style={{ fontSize: '10px' }}>
                        Cumulative: {paretoData[hoveredIndex].cumulativePercentage}%
                    </div>
                </div>
            )}
        </div>
    );
};

export default ParetoChart;