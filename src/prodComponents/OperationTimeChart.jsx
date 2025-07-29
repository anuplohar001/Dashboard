import React, { useState } from 'react';

const OperationTimeChart = () => {
    const [hoveredElement, setHoveredElement] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Sample data
    const operations = [
        { id: 'Op1', planned: 2.0, actual: 2.2 },
        { id: 'Op2', planned: 3.5, actual: 3.1 },
        { id: 'Op3', planned: 1.8, actual: 2.4 },
        { id: 'Op4', planned: 4.2, actual: 3.8 },
        { id: 'Op5', planned: 2.8, actual: 3.5 },
    ];

    // Calculate efficiency for each operation
    const dataWithEfficiency = operations.map(op => ({
        ...op,
        efficiency: Math.round((op.planned / op.actual) * 100),
        variance: (op.actual - op.planned).toFixed(1)
    }));

    // Chart dimensions
    const chartWidth = 350;
    const chartHeight = 280;
    const margin = { top: 40, right: 40, bottom: 60, left: 60 };
    const innerWidth = chartWidth - margin.left - margin.right;
    const innerHeight = chartHeight - margin.top - margin.bottom;
    const [selectedPeriod, setSelectedPeriod] = useState('current');
    // Scales
    const maxValue = Math.max(...operations.map(op => Math.max(op.planned, op.actual))) * 1.1;
    const yScale = (value) => innerHeight - (value / maxValue) * innerHeight;
    const barWidth = innerWidth / operations.length * 0.6;
    const barSpacing = innerWidth / operations.length;

    // Y-axis ticks
    const yTicks = [];
    const tickCount = 6;
    for (let i = 0; i <= tickCount; i++) {
        yTicks.push((maxValue / tickCount) * i);
    }

    const handleMouseMove = (e) => {
        setMousePosition({
            x: e.clientX,
            y: e.clientY
        });
    };

    const handleMouseEnter = (type, data, index) => {
        setHoveredElement({ type, data, index });
    };

    const handleMouseLeave = () => {
        setHoveredElement(null);
    };

    const getBarColor = (op, isHovered) => {
        if (op.efficiency < 80) {
            return isHovered ? '#c82333' : '#dc3545'; // Red for poor efficiency
        } else if (op.efficiency < 100) {
            return isHovered ? '#e0a800' : '#ffc107'; // Yellow for moderate efficiency
        }
        return isHovered ? '#218838' : '#28a745'; // Green for good efficiency
    };

    return (
        <div className='prodcharts'>
            <div className="card-container planvsactual" style={{ height:"30", border: '1px solid #dee2e6' }}>
                <div className="card-body">
                    {/* Title */}
                    <div className="mb-3 d-flex justify-content-between align-items-center">
                        <h6 className="text-dark mb-1" style={{ fontSize: '16px', fontWeight: '600' }}>
                            Planned vs Actual Operation Time
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
                    <div style={{overflow:'scroll', backgroundColor: '#f8f9fa' }}>
                        <div className="position-relative" style={{width:'fit-content'}}>
                            <svg
                                width={chartWidth}
                                height={chartHeight}
                                onMouseMove={handleMouseMove}
                            >
                                {/* Grid pattern */}
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

                                {/* Y-axis */}
                                <line
                                    x1={margin.left}
                                    y1={margin.top}
                                    x2={margin.left}
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

                                {/* Y-axis ticks and labels */}
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
                                            x={margin.left - 5}
                                            y={margin.top + yScale(tick)}
                                            textAnchor="end"
                                            dominantBaseline="middle"
                                            fontSize="11"
                                            fill="#6c757d"
                                        >
                                            {tick.toFixed(1)}h
                                        </text>
                                    </g>
                                ))}

                                {/* Bars (Actual time) */}
                                {dataWithEfficiency.map((op, index) => {
                                    const isHovered = hoveredElement?.type === 'bar' && hoveredElement?.index === index;
                                    const barColor = getBarColor(op, isHovered);
                                    const barHeight = (op.actual / maxValue) * innerHeight;
                                    const x = margin.left + barSpacing * index + (barSpacing - barWidth) / 2;
                                    const y = margin.top + innerHeight - barHeight;

                                    return (
                                        <g key={`bar-${index}`}>
                                            <rect
                                                x={x}
                                                y={y}
                                                width={barWidth}
                                                height={barHeight}
                                                fill={barColor}
                                                stroke="#fff"
                                                strokeWidth="2"
                                                style={{ cursor: 'pointer' }}
                                                onMouseEnter={() => handleMouseEnter('bar', op, index)}
                                                onMouseLeave={handleMouseLeave}
                                                opacity={hoveredElement !== null && !isHovered ? 0.6 : 1}
                                            />

                                            {/* Efficiency indicator */}
                                            {op.efficiency < 90 && (
                                                <g>
                                                    <circle
                                                        cx={x + barWidth - 8}
                                                        cy={y - 8}
                                                        r="6"
                                                        fill="#ffc107"
                                                        stroke="#fff"
                                                        strokeWidth="1"
                                                    />
                                                    <text
                                                        x={x + barWidth - 8}
                                                        y={y - 8}
                                                        textAnchor="middle"
                                                        dominantBaseline="middle"
                                                        fontSize="8"
                                                        fill="#000"
                                                        fontWeight="bold"
                                                    >
                                                        !
                                                    </text>
                                                </g>
                                            )}

                                            {/* X-axis labels */}
                                            <text
                                                x={x + barWidth / 2}
                                                y={margin.top + innerHeight + 15}
                                                textAnchor="middle"
                                                fontSize="11"
                                                fill="#6c757d"
                                                fontWeight="600"
                                            >
                                                {op.id}
                                            </text>
                                        </g>
                                    );
                                })}

                                {/* Line (Planned time) */}
                                <polyline
                                    points={dataWithEfficiency.map((op, index) =>
                                        `${margin.left + barSpacing * index + barWidth / 2},${margin.top + yScale(op.planned)}`
                                    ).join(' ')}
                                    fill="none"
                                    stroke="#007bff"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />

                                {/* Planned time points */}
                                {dataWithEfficiency.map((op, index) => {
                                    const isHovered = hoveredElement?.type === 'line' && hoveredElement?.index === index;

                                    return (
                                        <circle
                                            key={`point-${index}`}
                                            cx={margin.left + barSpacing * index + barWidth / 2}
                                            cy={margin.top + yScale(op.planned)}
                                            r="5"
                                            fill="#007bff"
                                            stroke="white"
                                            strokeWidth="2"
                                            style={{ cursor: 'pointer' }}
                                            onMouseEnter={() => handleMouseEnter('line', op, index)}
                                            onMouseLeave={handleMouseLeave}
                                            opacity={hoveredElement !== null && !isHovered ? 0.6 : 1}
                                        />
                                    );
                                })}

                                {/* Axis labels */}
                                <text
                                    x={margin.left / 2}
                                    y={margin.top - 5  + innerHeight / 2}
                                    textAnchor="middle"
                                    fontSize="11"
                                    fill="#6c757d"
                                    transform={`rotate(-90 ${margin.left / 2} ${margin.top + innerHeight / 2})`}
                                >
                                    Time (Hours)
                                </text>

                                <text
                                    x={margin.left + innerWidth / 2}
                                    y={margin.top + innerHeight + 45}
                                    textAnchor="middle"
                                    fontSize="11"
                                    fill="#6c757d"
                                >
                                    Operations
                                </text>
                            </svg>
                        </div>
                    </div>

                    {/* Summary Statistics */}
                    <div className="mt-3" style={{ backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                        <div className="row text-center">
                            <div className="col-4">
                                <div style={{ fontSize: '12px', color: '#6c757d' }}>Total Operations</div>
                                <div style={{ fontSize: '16px', fontWeight: '600', color: '#007bff' }}>
                                    {dataWithEfficiency.length}
                                </div>
                            </div>
                            <div className="col-4">
                                <div style={{ fontSize: '12px', color: '#6c757d' }}>Avg Efficiency</div>
                                <div style={{ fontSize: '16px', fontWeight: '600', color: '#28a745' }}>
                                    {Math.round(dataWithEfficiency.reduce((sum, op) => sum + op.efficiency, 0) / dataWithEfficiency.length)}%
                                </div>
                            </div>
                            <div className="col-4">
                                <div style={{ fontSize: '12px', color: '#6c757d' }}>Behind Schedule</div>
                                <div style={{ fontSize: '16px', fontWeight: '600', color: '#dc3545' }}>
                                    {dataWithEfficiency.filter(op => op.efficiency < 100).length}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="d-flex justify-content-center mt-2">
                        <div className="d-flex align-items-center me-4">
                            <div className="me-2" style={{ width: '12px', height: '8px', backgroundColor: '#28a745' }}></div>
                            <span style={{ fontSize: '11px' }}>Actual Time (Good)</span>
                        </div>
                        <div className="d-flex align-items-center me-4">
                            <div className="me-2" style={{ width: '12px', height: '8px', backgroundColor: '#ffc107' }}></div>
                            <span style={{ fontSize: '11px' }}>Actual Time (Warning)</span>
                        </div>
                        <div className="d-flex align-items-center me-4">
                            <div className="me-2" style={{ width: '12px', height: '8px', backgroundColor: '#dc3545' }}></div>
                            <span style={{ fontSize: '11px' }}>Actual Time (Poor)</span>
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="me-2" style={{ width: '12px', height: '3px', backgroundColor: '#007bff' }}></div>
                            <span style={{ fontSize: '11px' }}>Planned Time</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tooltip */}
            {hoveredElement && (
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
                        {hoveredElement.data.id}
                    </div>
                    {hoveredElement.type === 'bar' ? (
                        <div>
                            <div>Actual: <span className="text-warning">{hoveredElement.data.actual}h</span></div>
                            <div>Planned: <span className="text-success">{hoveredElement.data.planned}h</span></div>
                            <div>Variance: <span className={hoveredElement.data.variance > 0 ? 'text-danger' : 'text-success'}>
                                {hoveredElement.data.variance > 0 ? '+' : ''}{hoveredElement.data.variance}h
                            </span></div>
                            <div className={`fw-bold ${hoveredElement.data.efficiency >= 100 ? 'text-success' : hoveredElement.data.efficiency >= 80 ? 'text-warning' : 'text-danger'}`}>
                                Efficiency: {hoveredElement.data.efficiency}%
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div>Planned: <span className="text-info">{hoveredElement.data.planned}h</span></div>
                            <div>Actual: <span className="text-warning">{hoveredElement.data.actual}h</span></div>
                            <div>Target: <span className="text-success">Baseline</span></div>
                            <div className={`fw-bold ${hoveredElement.data.efficiency >= 100 ? 'text-success' : 'text-danger'}`}>
                                {hoveredElement.data.efficiency >= 100 ? '✅ TARGET MET' : '⚠️ TARGET MISSED'}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default OperationTimeChart;