import React, { useState } from 'react';

const BottleneckIdentificationChart = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Sample data - replace with your actual data
    const [data, setData] = useState([
        { machine: 'M1', loadPercentage: 85, capacity: 100, actualLoad: 85, isBottleneck: false },
        { machine: 'M2', loadPercentage: 95, capacity: 100, actualLoad: 95, isBottleneck: true },
        { machine: 'M3', loadPercentage: 78, capacity: 100, actualLoad: 78, isBottleneck: false },
        { machine: 'M4', loadPercentage: 92, capacity: 100, actualLoad: 92, isBottleneck: true },
        { machine: 'M5', loadPercentage: 68, capacity: 100, actualLoad: 68, isBottleneck: false },
        { machine: 'M6', loadPercentage: 96, capacity: 100, actualLoad: 96, isBottleneck: true },
        { machine: 'M7', loadPercentage: 82, capacity: 100, actualLoad: 82, isBottleneck: false },
        { machine: 'M8', loadPercentage: 89, capacity: 100, actualLoad: 89, isBottleneck: false }
    ]);

    // Sort data by load percentage in descending order
    const sortedData = [...data].sort((a, b) => b.loadPercentage - a.loadPercentage);

    // Chart dimensions
    const chartWidth = 400;
    const chartHeight = 320;
    const margin = { top: 20, right: 40, bottom: 40, left: 50 };
    const innerWidth = chartWidth - margin.left - margin.right;
    const innerHeight = chartHeight - margin.top - margin.bottom;

    // Scales
    const maxLoad = 100; // Since we're dealing with percentages
    const barWidth = innerWidth / sortedData.length * 0.7;
    const barSpacing = innerWidth / sortedData.length;

    // Y-axis scale for load percentage
    const yScale = (value) => innerHeight - (value / maxLoad) * innerHeight;

    // Generate Y-axis ticks
    const yTicks = [0, 20, 40, 60, 80, 90, 100];

    // Bottleneck threshold line
    const bottleneckThreshold = 90;
    const thresholdY = margin.top + yScale(bottleneckThreshold);
    const [selectedPeriod, setSelectedPeriod] = useState('current');

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

    // Get bar color based on bottleneck status
    const getBarColor = (item, isHovered) => {
        if (item.isBottleneck) {
            return isHovered ? '#bd303eff' : '#fa5d6dff'; // Red for bottleneck
        }
        return isHovered ? '#218838' : '#2cd152ff'; // Green for normal
    };


    const handleSelectedPeriod = (e) => {
        setSelectedPeriod(e.target.value)
        if(e.target.value === 'current') {
            setData([
                { machine: 'M1', loadPercentage: 85, capacity: 100, actualLoad: 85, isBottleneck: false },
                { machine: 'M2', loadPercentage: 95, capacity: 100, actualLoad: 95, isBottleneck: true },
                { machine: 'M3', loadPercentage: 78, capacity: 100, actualLoad: 78, isBottleneck: false },
                { machine: 'M4', loadPercentage: 92, capacity: 100, actualLoad: 92, isBottleneck: true },
                { machine: 'M5', loadPercentage: 68, capacity: 100, actualLoad: 68, isBottleneck: false },
                { machine: 'M6', loadPercentage: 96, capacity: 100, actualLoad: 96, isBottleneck: true },
                { machine: 'M7', loadPercentage: 82, capacity: 100, actualLoad: 82, isBottleneck: false },
                { machine: 'M8', loadPercentage: 89, capacity: 100, actualLoad: 89, isBottleneck: false }
            ])
        } else {
            setData([
                { machine: 'M1', loadPercentage: 72, capacity: 100, actualLoad: 72, isBottleneck: false },
                { machine: 'M2', loadPercentage: 88, capacity: 100, actualLoad: 88, isBottleneck: false },
                { machine: 'M3', loadPercentage: 97, capacity: 100, actualLoad: 97, isBottleneck: true },
                { machine: 'M4', loadPercentage: 65, capacity: 100, actualLoad: 65, isBottleneck: false },
                { machine: 'M5', loadPercentage: 91, capacity: 100, actualLoad: 91, isBottleneck: true },
                { machine: 'M6', loadPercentage: 83, capacity: 100, actualLoad: 83, isBottleneck: false },
                { machine: 'M7', loadPercentage: 99, capacity: 100, actualLoad: 99, isBottleneck: true },
                { machine: 'M8', loadPercentage: 76, capacity: 100, actualLoad: 76, isBottleneck: false }
            ])
        }
    }

    return (
        <div>
            <div className="card-container anup prodcharts" style={{ border: '1px solid #dee2e6' }}>
                <div className="card-body">
                    {/* Title */}
                    <div className="mb-3 d-flex justify-content-between align-items-center">
                        <h6 className="text-dark mb-1" style={{ fontSize: '16px', fontWeight: '600' }}>
                            Bottleneck Identification
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
                    <div style={{overflow:"scroll", backgroundColor: '#f8f9fa' }}>
                        <div className="position-relative">
                            <svg width={chartWidth} height={chartHeight}>
                                {/* Grid lines */}
                                <defs>
                                    <pattern id="grid" width="100%" height="20" patternUnits="userSpaceOnUse">
                                        <path d="M 0 20 L 100 20" fill="none" stroke="#e9ecef" strokeWidth="1" />
                                    </pattern>
                                    {/* Red pattern for bottleneck bars */}
                                    <pattern id="bottleneckPattern" patternUnits="userSpaceOnUse" width="4" height="4">
                                        <rect width="4" height="4" fill="#dc3545" />
                                        <path d="M 0,4 L 4,0 M -1,1 L 1,-1 M 3,5 L 5,3" stroke="#ffffff" strokeWidth="0.5" />
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

                                {/* Bottleneck threshold line */}
                                <line
                                    x1={margin.left}
                                    y1={thresholdY}
                                    x2={margin.left + innerWidth}
                                    y2={thresholdY}
                                    stroke="#ffc107"
                                    strokeWidth="2"
                                    strokeDasharray="5,5"
                                />

                                {/* Threshold label */}
                                <text
                                    x={margin.left + innerWidth - 5}
                                    y={thresholdY - 5}
                                    textAnchor="end"
                                    fontSize="13"
                                    fill="#ffc107"
                                    fontWeight="200"
                                >
                                    Bottleneck Threshold (90%)
                                </text>

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

                                {/* Bars */}
                                {sortedData.map((item, index) => {
                                    const isHovered = hoveredIndex === index;
                                    const barColor = getBarColor(item, isHovered);

                                    return (
                                        <g key={index}>
                                            <rect
                                                x={margin.left + barSpacing * index + (barSpacing - barWidth) / 2}
                                                y={margin.top + yScale(item.loadPercentage)}
                                                width={barWidth}
                                                height={innerHeight - yScale(item.loadPercentage)}
                                                fill={barColor}
                                                stroke="#fff"
                                                strokeWidth="2"
                                                onMouseMove={(e) => handleMouseMove(e, index)}
                                                onMouseLeave={handleMouseLeave}
                                                style={{ cursor: 'pointer' }}
                                                opacity={hoveredIndex !== null && hoveredIndex !== index ? 0.6 : 1}
                                            />

                                            {/* Bottleneck indicator icon */}
                                            {item.isBottleneck && (
                                                <g>
                                                    <circle
                                                        cx={margin.left + barSpacing * index + barWidth / 2}
                                                        cy={margin.top + yScale(item.loadPercentage) - 15}
                                                        r="6"
                                                        fill="#ffc107"
                                                        stroke="#fff"
                                                        strokeWidth="1"
                                                    />
                                                    <text
                                                        x={margin.left + barSpacing * index + barWidth / 2}
                                                        y={margin.top + yScale(item.loadPercentage) - 15}
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
                                                x={margin.left + barSpacing * index + barWidth / 2}
                                                y={margin.top + innerHeight + 15}
                                                textAnchor="middle"
                                                fontSize="11"
                                                fill="#6c757d"
                                                fontWeight="600"
                                            >
                                                {item.machine}
                                            </text>

                                        </g>
                                    );
                                })}

                                {/* Axis labels */}
                                <text
                                    x={margin.left / 2}
                                    y={margin.top + innerHeight / 2 - 12}
                                    textAnchor="middle"
                                    fontSize="11"
                                    fill="#6c757d"
                                    transform={`rotate(-90 ${margin.left / 2} ${margin.top + innerHeight / 2})`}
                                >
                                    Load Percentage (%)
                                </text>

                                <text
                                    x={margin.left + innerWidth / 2}
                                    y={margin.top + innerHeight + 55}
                                    textAnchor="middle"
                                    fontSize="11"
                                    fill="#6c757d"
                                >
                                    Machines
                                </text>
                            </svg>

                            
                        </div>
                    </div>

                    {/* Summary Statistics */}
                    <div className=" " style={{ backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                        <div className="row text-center">
                            <div className="col-4">
                                <div style={{ fontSize: '12px', color: '#6c757d' }}>Total Machines</div>
                                <div style={{ fontSize: '16px', fontWeight: '600', color: '#007bff' }}>
                                    {sortedData.length}
                                </div>
                            </div>
                            <div className="col-4">
                                <div style={{ fontSize: '12px', color: '#6c757d' }}>Bottlenecks</div>
                                <div style={{ fontSize: '16px', fontWeight: '600', color: '#dc3545' }}>
                                    {sortedData.filter(item => item.isBottleneck).length}
                                </div>
                            </div>
                            <div className="col-4">
                                <div style={{ fontSize: '12px', color: '#6c757d' }}>Avg Load</div>
                                <div style={{ fontSize: '16px', fontWeight: '600', color: '#28a745' }}>
                                    {Math.round(sortedData.reduce((sum, item) => sum + item.loadPercentage, 0) / sortedData.length)}%
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="d-flex justify-content-center mt-1">
                        <div className="d-flex align-items-center me-4">
                            <div className="rounded-circle me-2" style={{ width: '8px', height: '8px', backgroundColor: '#28a745' }}></div>
                            <span style={{ fontSize: '11px' }}>Normal Load</span>
                        </div>
                        <div className="d-flex align-items-center me-4">
                            <div className="rounded-circle me-2" style={{ width: '8px', height: '8px', backgroundColor: '#dc3545' }}></div>
                            <span style={{ fontSize: '11px' }}>Bottleneck (&gt;90%)</span>
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="me-2" style={{ width: '12px', height: '2px', backgroundColor: '#ffc107' }}></div>
                            <span style={{ fontSize: '11px' }}>Threshold</span>
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
                        // zIndex: 1000,
                        whiteSpace: 'nowrap'
                    }}
                >
                    <div className="fw-bold text-info">
                        {sortedData[hoveredIndex].machine}
                    </div>
                    <div>Load: <span className="text-warning">{sortedData[hoveredIndex].loadPercentage}%</span></div>
                    <div>Capacity: <span className="text-success">{sortedData[hoveredIndex].capacity}</span></div>
                    <div>Actual Load: <span className="text-info">{sortedData[hoveredIndex].actualLoad}</span></div>
                    <div className={`fw-bold ${sortedData[hoveredIndex].isBottleneck ? 'text-danger' : 'text-success'}`}>
                        {sortedData[hoveredIndex].isBottleneck ? '⚠️ BOTTLENECK' : '✅ NORMAL'}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BottleneckIdentificationChart;