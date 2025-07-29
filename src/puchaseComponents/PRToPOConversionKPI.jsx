import React, { useState } from 'react';

const PRToPOConversionKPI = () => {
    const [hoveredCard, setHoveredCard] = useState(false);
    const [hoveredPoint, setHoveredPoint] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Sample data - replace with your actual data
    const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

    // Monthly data for past 6 months
    const monthlyData = [
        { month: 'Feb', actual: 720000, target: 900000, shortName: 'Feb' },
        { month: 'Mar', actual: 850000, target: 950000, shortName: 'Mar' },
        { month: 'Apr', actual: 680000, target: 800000, shortName: 'Apr' },
        { month: 'May', actual: 920000, target: 1000000, shortName: 'May' },
        { month: 'Jun', actual: 800000, target: 1000000, shortName: 'Jun' },
        { month: 'Jul', actual: 1050000, target: 1100000, shortName: 'Jul' }
    ];

    const formatCurrency = (amount) => {
        if (amount >= 10000000) {
            return `₹${(amount / 10000000).toFixed(1)}Cr`;
        } else if (amount >= 100000) {
            return `₹${(amount / 100000).toFixed(1)}L`;
        } else if (amount >= 1000) {
            return `₹${(amount / 1000).toFixed(1)}K`;
        } else {
            return `₹${amount}`;
        }
    };

    // Calculate chart dimensions and scales
    const chartWidth = 550;
    const chartHeight = 150;
    const padding = 10;
    const leftPadding = 35; // Extra space for Y-axis labels

    const maxValue = Math.max(...monthlyData.map(d => Math.max(d.actual, d.target)));
    const minValue = Math.min(...monthlyData.map(d => Math.min(d.actual, d.target))) * 0.9;

    const xScale = (index) => leftPadding + (index * (chartWidth - leftPadding - padding)) / (monthlyData.length - 1);
    const yScale = (value) => chartHeight - padding - ((value - minValue) / (maxValue - minValue)) * (chartHeight - 2 * padding);

    // Generate SVG path for lines
    const generatePath = (data, key) => {
        return data.map((d, i) => {
            const x = xScale(i);
            const y = yScale(d[key]);
            return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
        }).join(' ');
    };

    const actualPath = generatePath(monthlyData, 'actual');
    const targetPath = generatePath(monthlyData, 'target');

    // Current month stats
    const currentMonthData = monthlyData[monthlyData.length - 1];
    const achievement = (currentMonthData.actual / currentMonthData.target * 100).toFixed(1);
    const gap = currentMonthData.target - currentMonthData.actual;
    const overallAvgAchievement = (monthlyData.reduce((sum, d) => sum + (d.actual / d.target), 0) / monthlyData.length * 100).toFixed(1);

    const handleMouseMove = (e) => {
        setMousePosition({
            x: e.clientX,
            y: e.clientY
        });
        setHoveredCard(true);
    };

    const handleMouseLeave = () => {
        setHoveredCard(false);
        setHoveredPoint(null);
    };

    const handlePointHover = (index, e) => {
        setHoveredPoint(index);
        setMousePosition({
            x: e.clientX,
            y: e.clientY
        });
    };

    return (
        <div>
            <div
                className="card-container anup purchasecards"
                style={{
                    border: '1px solid #dee2e6',
                    transition: 'all 0.3s ease',
                    transform: hoveredCard ? 'translateY(-2px)' : 'translateY(0)',
                    boxShadow: hoveredCard ? '0 4px 12px rgba(0,0,0,0.15)' : '0 2px 4px rgba(0,0,0,0.1)'
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <div className="card-body">
                    {/* Title */}
                    <div className="mb-3">
                        <h6 className="text-dark mb-1" style={{ fontSize: '16px', fontWeight: '600' }}>
                            PR to PO Conversion Time
                        </h6>
                    </div>



                    {/* Chart */}
                    <div style={{ overflow: "scroll" }}>

                        <div className="mb-1 d-flex justify-content-center" style={{ width: "fit-content" }}>
                            <svg width={chartWidth} height={chartHeight + 30} style={{ overflow: 'visible' }}>
                                {/* Grid lines and Y-axis labels */}
                                {[0, 0.25, 0.5, 0.75, 1].map(ratio => {
                                    const y = chartHeight - padding - ratio * (chartHeight - 2 * padding);
                                    const value = minValue + ratio * (maxValue - minValue);
                                    return (
                                        <g key={ratio}>
                                            {/* Grid line */}
                                            <line
                                                x1={leftPadding}
                                                y1={y}
                                                x2={chartWidth - padding}
                                                y2={y}
                                                stroke="#f1f3f4"
                                                strokeWidth="1"
                                            />
                                            {/* Y-axis label */}
                                            <text
                                                x={leftPadding - 5}
                                                y={y + 3}
                                                textAnchor="end"
                                                style={{
                                                    fontSize: '9px',
                                                    fill: '#6c757d',
                                                    fontWeight: '400'
                                                }}
                                            >
                                                {formatCurrency(value)}
                                            </text>
                                        </g>
                                    );
                                })}

                                {/* Target line */}
                                <path
                                    d={targetPath}
                                    fill="none"
                                    stroke="#6c757d"
                                    strokeWidth="2"
                                    strokeDasharray="4,4"
                                    style={{ transition: 'all 0.3s ease' }}
                                />

                                {/* Actual sales line */}
                                <path
                                    d={actualPath}
                                    fill="none"
                                    stroke="#17a2b8"
                                    strokeWidth="3"
                                    style={{
                                        transition: 'all 0.3s ease',
                                        filter: hoveredCard ? 'drop-shadow(0 2px 4px rgba(23,162,184,0.3))' : 'none'
                                    }}
                                />

                                {/* Data points */}
                                {monthlyData.map((data, index) => {
                                    const x = xScale(index);
                                    const actualY = yScale(data.actual);
                                    const targetY = yScale(data.target);
                                    const isAboveTarget = data.actual >= data.target;

                                    return (
                                        <g key={index}>
                                            {/* Target point */}
                                            <circle
                                                cx={x}
                                                cy={targetY}
                                                r="3"
                                                fill="#6c757d"
                                                stroke="white"
                                                strokeWidth="2"
                                            />

                                            {/* Actual point */}
                                            <circle
                                                cx={x}
                                                cy={actualY}
                                                r={hoveredPoint === index ? "6" : "4"}
                                                fill={isAboveTarget ? "#28a745" : "#dc3545"}
                                                stroke="white"
                                                strokeWidth="2"
                                                style={{
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s ease'
                                                }}
                                                onMouseEnter={(e) => handlePointHover(index, e)}
                                                onMouseLeave={() => setHoveredPoint(null)}
                                            />

                                            {/* Month labels */}
                                            <text
                                                x={x}
                                                y={chartHeight + 15}
                                                textAnchor="middle"
                                                style={{
                                                    fontSize: '10px',
                                                    fill: '#6c757d',
                                                    fontWeight: '500'
                                                }}
                                            >
                                                {data.shortName}
                                            </text>
                                        </g>
                                    );
                                })}

                                {/* Legend */}
                                <g transform={`translate(${leftPadding}, ${chartHeight + 25})`}>
                                    <circle cx="0" cy="0" r="3" fill="#17a2b8" />
                                    <text x="8" y="4" style={{ fontSize: '9px', fill: '#6c757d' }}>Actual</text>

                                    <circle cx="50" cy="0" r="3" fill="#6c757d" />
                                    <text x="58" y="4" style={{ fontSize: '9px', fill: '#6c757d' }}>Target</text>
                                </g>
                            </svg>
                        </div>
                    </div>

                    {/* Stats Summary */}
                    <div className="row text-center" style={{ backgroundColor: '#f8f9fa', borderRadius: '4px', padding: '12px' }}>
                        <div className="col-4">
                            <div style={{ fontSize: '12px', color: '#6c757d' }}>Gap</div>
                            <div style={{
                                fontSize: '13px',
                                fontWeight: '600',
                                color: gap > 0 ? '#dc3545' : '#28a745'
                            }}>
                                {gap > 0 ? '-' : '+'}{formatCurrency(Math.abs(gap))}
                            </div>
                        </div>
                        <div className="col-4">
                            <div style={{ fontSize: '12px', color: '#6c757d' }}>Best Month</div>
                            <div style={{ fontSize: '13px', fontWeight: '600', color: '#28a745' }}>
                                {monthlyData.reduce((best, current) =>
                                    (current.actual / current.target) > (best.actual / best.target) ? current : best
                                ).month}
                            </div>
                        </div>
                        <div className="col-4">
                            <div style={{ fontSize: '12px', color: '#6c757d' }}>Trend</div>
                            <div style={{
                                fontSize: '13px',
                                fontWeight: '600',
                                color: monthlyData[monthlyData.length - 1].actual > monthlyData[monthlyData.length - 2].actual ? '#28a745' : '#dc3545'
                            }}>
                                {monthlyData[monthlyData.length - 1].actual > monthlyData[monthlyData.length - 2].actual ? '↗ Up' : '↘ Down'}
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar - Current Month */}
                    <div className="mb-2">
                        <div className="d-flex justify-content-between mb-1">
                            <span style={{ fontSize: '11px', color: '#6c757d' }}>
                                {currentMonthData.month} Target Progress
                            </span>
                            <span style={{ fontSize: '11px', color: '#6c757d' }}>
                                {formatCurrency(currentMonthData.actual)} / {formatCurrency(currentMonthData.target)}
                            </span>
                        </div>
                        <div className="progress" style={{ height: '6px' }}>
                            <div
                                className={`progress-bar ${achievement >= 100 ? 'bg-success' : achievement >= 80 ? 'bg-warning' : 'bg-danger'}`}
                                role="progressbar"
                                style={{ width: `${Math.min(achievement, 100)}%` }}
                                aria-valuenow={achievement}
                                aria-valuemin="0"
                                aria-valuemax="100"
                            ></div>
                        </div>
                    </div>

                    {/* Status Indicator */}
                    <div className="d-flex justify-content-center">
                        <div className="d-flex align-items-center">
                            <div
                                className="rounded-circle me-2"
                                style={{
                                    width: '8px',
                                    height: '8px',
                                    backgroundColor: achievement >= 100 ? '#28a745' : achievement >= 80 ? '#ffc107' : '#dc3545',
                                    boxShadow: `0 0 0 2px ${achievement >= 100 ? '#28a74520' : achievement >= 80 ? '#ffc10720' : '#dc354520'}`
                                }}
                            ></div>
                            <span style={{ fontSize: '11px', fontWeight: '500' }}>
                                {achievement >= 100 ? '🎯 Target Achieved' : achievement >= 80 ? '⚠️ Near Target' : '📊 Below Target'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tooltip */}
            {(hoveredCard || hoveredPoint !== null) && (
                <div
                    className="position-fixed bg-dark text-white p-2 rounded shadow-sm"
                    style={{
                        left: mousePosition.x + 10,
                        top: mousePosition.y + 10,
                        fontSize: '11px',
                        whiteSpace: 'nowrap',
                        zIndex: 1000
                    }}
                >
                    {hoveredPoint !== null ? (
                        // Point-specific tooltip
                        <div>
                            <div className="fw-bold text-info">
                                {monthlyData[hoveredPoint].month} Sales
                            </div>
                            <div>Actual: <span className="text-success">{formatCurrency(monthlyData[hoveredPoint].actual)}</span></div>
                            <div>Target: <span className="text-warning">{formatCurrency(monthlyData[hoveredPoint].target)}</span></div>
                            <div>Achievement: <span className={monthlyData[hoveredPoint].actual >= monthlyData[hoveredPoint].target ? 'text-success' : 'text-danger'}>
                                {(monthlyData[hoveredPoint].actual / monthlyData[hoveredPoint].target * 100).toFixed(1)}%
                            </span></div>
                            <div>Gap: <span className={monthlyData[hoveredPoint].actual >= monthlyData[hoveredPoint].target ? 'text-success' : 'text-danger'}>
                                {monthlyData[hoveredPoint].actual >= monthlyData[hoveredPoint].target ? '+' : ''}{formatCurrency(monthlyData[hoveredPoint].actual - monthlyData[hoveredPoint].target)}
                            </span></div>
                        </div>
                    ) : (
                        // General card tooltip
                        <div>
                            <div className="fw-bold text-info">
                                6-Month Sales Overview
                            </div>
                            <div>Current Month: <span className="text-warning">{currentMonthData.month}</span></div>
                            <div>Achievement: <span className={achievement >= 100 ? 'text-success' : 'text-danger'}>{achievement}%</span></div>
                            <div>6-Month Avg: <span className="text-info">{overallAvgAchievement}%</span></div>
                            <div>Gap: <span className={gap > 0 ? 'text-danger' : 'text-success'}>{formatCurrency(Math.abs(gap))}</span></div>
                            <div className="mt-1">
                                <div className="text-muted" style={{ fontSize: '10px' }}>Monthly Performance:</div>
                                {monthlyData.slice(-3).map((data, index) => (
                                    <div key={index} style={{ fontSize: '10px' }}>
                                        {data.month}: <span className="text-warning">{(data.actual / data.target * 100).toFixed(0)}%</span>
                                    </div>
                                ))}
                            </div>
                            <div className={`fw-bold ${achievement >= 100 ? 'text-success' : 'text-warning'}`}>
                                {achievement >= 100 ? '🎯 ON TARGET' : '📈 TRACKING'}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PRToPOConversionKPI;