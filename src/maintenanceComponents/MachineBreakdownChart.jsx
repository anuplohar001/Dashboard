import React, { useState } from 'react';

const MachineBreakdownChart = () => {
    // Sample data - replace with your actual data
    const breakdownData = [
        { machine: 'M1', breakdowns: 5, color: '#dc3545' },
        { machine: 'M2', breakdowns: 3, color: '#ffc107' },
        { machine: 'M3', breakdowns: 8, color: '#dc3545' },
        { machine: 'M4', breakdowns: 2, color: '#28a745' },
        { machine: 'M5', breakdowns: 6, color: '#ffc107' },
        { machine: 'M6', breakdowns: 1, color: '#28a745' },
        { machine: 'M7', breakdowns: 4, color: '#ffc107' },
        { machine: 'M8', breakdowns: 7, color: '#dc3545' }
    ];

    const [hoveredBar, setHoveredBar] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // Chart dimensions
    const chartWidth = 600;
    const chartHeight = 400;
    const margin = { top: 20, right: 80, bottom: 40, left: 60 };
    const plotWidth = chartWidth - margin.left - margin.right;
    const plotHeight = chartHeight - margin.top - margin.bottom;

    // Calculate scales
    const maxBreakdowns = Math.max(...breakdownData.map(d => d.breakdowns));
    const barHeight = plotHeight / breakdownData.length * 0.8;
    const barSpacing = plotHeight / breakdownData.length;

    const handleMouseEnter = (data, event) => {
        setHoveredBar(data);
        setMousePos({ x: event.clientX, y: event.clientY });
    };

    const handleMouseMove = (event) => {
        setMousePos({ x: event.clientX, y: event.clientY });
    };

    const handleMouseLeave = () => {
        setHoveredBar(null);
    };

    return (
        <div className="col-lg-6 col-md-12 col-12" >
            <div className="card-container shadow-sm">
                <div>
                    <h6 style={{ textAlign: "left", fontWeight: '600' }}>Machine Breakdown Analysis</h6>
                </div>
                <div className="card-body" style={{width:"100%",overflow:"scroll"}}>
                    <div style={{width:"fit-content"}} className="position-relative d-flex justify-content-center">
                        <svg width={chartWidth} height={chartHeight}>
                            {/* Background grid lines */}
                            <defs>
                                <pattern id="grid" width="50" height="10" patternUnits="userSpaceOnUse">
                                    <path d="M 50 0 L 0 0 0 10" fill="none" stroke="#d1d1d1ff" strokeWidth="1" />
                                </pattern>
                            </defs>
                            <rect width={plotWidth} height={plotHeight} x={margin.left} y={margin.top} fill="url(#grid)" opacity="0.5" />

                            {/* Y-axis labels (machine names) */}
                            {breakdownData.map((data, index) => (
                                <text
                                    key={data.machine}
                                    x={margin.left - 10}
                                    y={margin.top + (index * barSpacing) + barSpacing / 2}
                                    textAnchor="end"
                                    dominantBaseline="middle"
                                    fontSize="14"
                                    fill="#495057"
                                    fontWeight="500"
                                >
                                    {data.machine}
                                </text>
                            ))}

                            {/* X-axis labels */}
                            {[0, 2, 4, 6, 8, 10].map(tick => (
                                <g key={tick}>
                                    <line
                                        x1={margin.left + (tick / maxBreakdowns) * plotWidth}
                                        y1={margin.top + plotHeight}
                                        x2={margin.left + (tick / maxBreakdowns) * plotWidth}
                                        y2={margin.top + plotHeight + 5}
                                        stroke="#6c757d"
                                        strokeWidth="1"
                                    />
                                    <text
                                        x={margin.left + (tick / maxBreakdowns) * plotWidth}
                                        y={margin.top + plotHeight + 20}
                                        textAnchor="middle"
                                        fontSize="12"
                                        fill="#6c757d"
                                    >
                                        {tick}
                                    </text>
                                </g>
                            ))}

                            {/* Bars */}
                            {breakdownData.map((data, index) => {
                                const barWidth = (data.breakdowns / maxBreakdowns) * plotWidth;
                                const isHovered = hoveredBar?.machine === data.machine;

                                return (
                                    <g key={data.machine}>
                                        <rect
                                            x={margin.left}
                                            y={margin.top + (index * barSpacing) + (barSpacing - barHeight) / 2}
                                            width={barWidth}
                                            height={barHeight}
                                            fill={data.color}
                                            rx={3}
                                            opacity={isHovered ? 0.8 : 0.7}
                                            stroke={isHovered ? '#212529' : 'none'}
                                            strokeWidth={isHovered ? 2 : 0}
                                            onMouseEnter={(e) => handleMouseEnter(data, e)}
                                            onMouseMove={handleMouseMove}
                                            onMouseLeave={handleMouseLeave}
                                            style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
                                        />

                                        {/* Value labels on bars */}
                                        <text
                                            x={margin.left + barWidth + 5}
                                            y={margin.top + (index * barSpacing) + barSpacing / 2}
                                            dominantBaseline="middle"
                                            fontSize="12"
                                            fill="#495057"
                                            fontWeight="600"
                                        >
                                            {data.breakdowns}
                                        </text>
                                    </g>
                                );
                            })}

                            {/* X-axis label */}
                            <text
                                x={margin.left + plotWidth / 2}
                                y={chartHeight - 5}
                                textAnchor="middle"
                                fontSize="14"
                                fill="#6c757d"
                            >
                                Number of Breakdowns
                            </text>
                        </svg>

                        
                    </div>

                    {/* Legend */}
                    <div className="mt-2 ">
                        <div className="d-flex flex-wrap gap-3 justify-content-evenly">
                            <div className="d-flex align-items-center">
                                <div className="me-2" style={{ width: '16px', height: '16px', backgroundColor: '#28a745', borderRadius: '2px' }}></div>
                                <small>Low Risk</small>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="me-2" style={{ width: '16px', height: '16px', backgroundColor: '#ffc107', borderRadius: '2px' }}></div>
                                <small>Medium Risk</small>
                            </div>                            
                            <div className="d-flex align-items-center">
                                <div className="me-2" style={{ width: '16px', height: '16px', backgroundColor: '#dc3545', borderRadius: '2px' }}></div>
                                <small>High Risk</small>
                            </div>
                        </div>
                    </div>

                    

                    {/* Bottom section with key metrics */}
                    <div className="mt-1 pt-2 border-top">
                        <div className="row g-2">
                            <div className="col-4">
                                <div className="text-center">
                                    <div className="fw-bold text-dark" style={{ fontSize: '14px' }}>
                                        {breakdownData.reduce((sum, d) => sum + d.breakdowns, 0)}
                                    </div>
                                    <div className="text-muted" style={{ fontSize: '10px' }}>Total Breakdowns</div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="text-center">
                                    <div className="fw-bold text-dark" style={{ fontSize: '14px' }}>
                                        {Math.round(breakdownData.reduce((sum, d) => sum + d.breakdowns, 0) / breakdownData.length * 10) / 10}
                                    </div>
                                    <div className="text-muted" style={{ fontSize: '10px' }}>Average per Machine</div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="text-center">
                                    <div className="fw-bold text-dark" style={{ fontSize: '14px' }}>
                                        {breakdownData.find(d => d.breakdowns === Math.max(...breakdownData.map(m => m.breakdowns)))?.machine}
                                    </div>
                                    <div className="text-muted" style={{ fontSize: '10px' }}>Highest Breakdowns</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Hover tooltip */}
            {hoveredBar && (
                <div
                    className="position-fixed bg-dark text-white px-3 py-2 rounded shadow-lg"
                    style={{
                        left: mousePos.x + 10,
                        top: mousePos.y + 10,
                        zIndex: 1000,
                        pointerEvents: 'none',
                        fontSize: '14px'
                    }}
                >
                    <div><strong>{hoveredBar.machine}</strong></div>
                    <div>Breakdowns: {hoveredBar.breakdowns}</div>
                    <div>Status: {hoveredBar.breakdowns >= 6 ? 'High Risk' : hoveredBar.breakdowns >= 3 ? 'Medium Risk' : 'Low Risk'}</div>
                </div>
            )}
        </div>
    );
};

export default MachineBreakdownChart;