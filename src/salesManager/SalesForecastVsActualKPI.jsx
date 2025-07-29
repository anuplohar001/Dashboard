import React, { useState } from 'react';

const SalesForecastVsActualKPI = () => {
    const [hoveredCard, setHoveredCard] = useState(false);
    const [hoveredPoint, setHoveredPoint] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Sample data - replace with your actual data
    const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

    // Monthly data for past 6 months
    const monthlyData = [
        { month: 'Feb', forecast: 850000, actual: 720000, shortName: 'Feb' },
        { month: 'Mar', forecast: 950000, actual: 850000, shortName: 'Mar' },
        { month: 'Apr', forecast: 800000, actual: 680000, shortName: 'Apr' },
        { month: 'May', forecast: 1000000, actual: 920000, shortName: 'May' },
        { month: 'Jun', forecast: 1000000, actual: 800000, shortName: 'Jun' },
        { month: 'Jul', forecast: 1100000, actual: 1050000, shortName: 'Jul' }
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
    const chartWidth = 870;
    const chartHeight = 150;
    const padding = 20;
    const leftPadding = 35; // Extra space for Y-axis labels

    const maxValue = Math.max(...monthlyData.map(d => Math.max(d.actual, d.forecast)));
    const minValue = Math.min(...monthlyData.map(d => Math.min(d.actual, d.forecast))) * 0.9;

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
    const forecastPath = generatePath(monthlyData, 'forecast');

    // Current month stats
    const currentMonthData = monthlyData[monthlyData.length - 1];
    const variance = currentMonthData.forecast - currentMonthData.actual;
    const accuracy = (currentMonthData.actual / currentMonthData.forecast * 100).toFixed(1);
    const overallAccuracy = (monthlyData.reduce((sum, d) => sum + (d.actual / d.forecast), 0) / monthlyData.length * 100).toFixed(1);

    // Calculate total variance for all 6 months
    const totalForecast = monthlyData.reduce((sum, d) => sum + d.forecast, 0);
    const totalActual = monthlyData.reduce((sum, d) => sum + d.actual, 0);
    const totalVariance = totalForecast - totalActual;

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
        <div className=' saleslines'>
            <div
                className=" card-container anup "
                style={{
                    border: '1px solid #dee2e6',
                    transition: 'all 0.3s ease',
                    transform: hoveredCard ? 'translateY(-2px)' : 'translateY(0)',
                    boxShadow: hoveredCard ? '0 4px 12px rgba(0,0,0,0.15)' : '0 2px 4px rgba(0,0,0,0.1)'
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <div className="card-body ">
                    {/* Title */}
                    <div className="mb-3">
                        <h6 className="text-dark mb-1" style={{ fontSize: '16px', fontWeight: '600' }}>
                            Sales Forecast vs Actual
                        </h6>
                    </div>


                    {/* Chart */}
                    <div style={{ overflow: "scroll" }}>
                        <div className="mb-3 d-flex justify-content-center" style={{ width: "fit-content" }}>
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
                                                stroke="#afafafff"
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

                                {/* Forecast line */}
                                <path
                                    d={forecastPath}
                                    fill="none"
                                    stroke="#007bff"
                                    strokeWidth="2"
                                    strokeDasharray="4,4"
                                    style={{ transition: 'all 0.3s ease' }}
                                />

                                {/* Actual sales line */}
                                <path
                                    d={actualPath}
                                    fill="none"
                                    stroke="#28a745"
                                    strokeWidth="3"
                                    style={{
                                        transition: 'all 0.3s ease',
                                        filter: hoveredCard ? 'drop-shadow(0 2px 4px rgba(40,167,69,0.3))' : 'none'
                                    }}
                                />

                                {/* Data points */}
                                {monthlyData.map((data, index) => {
                                    const x = xScale(index);
                                    const actualY = yScale(data.actual);
                                    const forecastY = yScale(data.forecast);
                                    const isAboveForecast = data.actual >= data.forecast;

                                    return (
                                        <g key={index}>
                                            {/* Forecast point */}
                                            <circle
                                                cx={x}
                                                cy={forecastY}
                                                r="3"
                                                fill="#007bff"
                                                stroke="white"
                                                strokeWidth="2"
                                            />

                                            {/* Actual point */}
                                            <circle
                                                cx={x}
                                                cy={actualY}
                                                r={hoveredPoint === index ? "6" : "4"}
                                                fill={isAboveForecast ? "#28a745" : "#dc3545"}
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
                                    <circle cx="0" cy="0" r="3" fill="#28a745" />
                                    <text x="8" y="4" style={{ fontSize: '9px', fill: '#36383aff' }}>Actual</text>

                                    <circle cx="50" cy="0" r="3" fill="#007bff" />
                                    <text x="58" y="4" style={{ fontSize: '9px', fill: '#36383aff' }}>Forecast</text>
                                </g>
                            </svg>
                        </div>
                    </div>
                    {/* Stats Summary */}
                    <div className="row text-center mb-3" style={{ backgroundColor: '#f8f9fa', borderRadius: '4px', padding: '12px' }}>
                        <div className="col-4">
                            <div style={{ fontSize: '12px', color: '#6c757d' }}>Variance</div>
                            <div style={{
                                fontSize: '13px',
                                fontWeight: '600',
                                color: variance > 0 ? '#dc3545' : '#28a745'
                            }}>
                                {variance > 0 ? '-' : '+'}{formatCurrency(Math.abs(variance))}
                            </div>
                        </div>
                        <div className="col-4">
                            <div style={{ fontSize: '12px', color: '#6c757d' }}>Best Month</div>
                            <div style={{ fontSize: '13px', fontWeight: '600', color: '#28a745' }}>
                                {monthlyData.reduce((best, current) =>
                                    (current.actual / current.forecast) > (best.actual / best.forecast) ? current : best
                                ).month}
                            </div>
                        </div>
                        <div className="col-4">
                            <div style={{ fontSize: '12px', color: '#6c757d' }}>Trend</div>
                            <div style={{
                                fontSize: '13px',
                                fontWeight: '600',
                                color: (monthlyData[monthlyData.length - 1].actual / monthlyData[monthlyData.length - 1].forecast) >
                                    (monthlyData[monthlyData.length - 2].actual / monthlyData[monthlyData.length - 2].forecast) ? '#28a745' : '#dc3545'
                            }}>
                                {(monthlyData[monthlyData.length - 1].actual / monthlyData[monthlyData.length - 1].forecast) >
                                    (monthlyData[monthlyData.length - 2].actual / monthlyData[monthlyData.length - 2].forecast) ? '↗ Up' : '↘ Down'}
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar - Current Month */}
                    <div className="mb-3">
                        <div className="d-flex justify-content-between mb-1">
                            <span style={{ fontSize: '11px', color: '#6c757d' }}>
                                {currentMonthData.month} Forecast Accuracy
                            </span>
                            <span style={{ fontSize: '11px', color: '#6c757d' }}>
                                {formatCurrency(currentMonthData.actual)} / {formatCurrency(currentMonthData.forecast)}
                            </span>
                        </div>
                        <div className="progress" style={{ height: '6px' }}>
                            <div
                                className={`progress-bar ${accuracy >= 95 ? 'bg-success' : accuracy >= 85 ? 'bg-warning' : 'bg-danger'}`}
                                role="progressbar"
                                style={{ width: `${Math.min(accuracy, 100)}%` }}
                                aria-valuenow={accuracy}
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
                                    backgroundColor: accuracy >= 95 ? '#28a745' : accuracy >= 85 ? '#ffc107' : '#dc3545',
                                    boxShadow: `0 0 0 2px ${accuracy >= 95 ? '#28a74520' : accuracy >= 85 ? '#ffc10720' : '#dc354520'}`
                                }}
                            ></div>
                            <span style={{ fontSize: '11px', fontWeight: '500' }}>
                                {accuracy >= 95 ? '🎯 Accurate Forecast' : accuracy >= 85 ? '⚠️ Good Forecast' : '📊 Forecast Gap'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tooltip */}
            {(hoveredPoint !== null) && (
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
                    <div>
                        <div className="fw-bold text-info">
                            {monthlyData[hoveredPoint].month} Performance
                        </div>
                        <div>Actual: <span className="text-success">{formatCurrency(monthlyData[hoveredPoint].actual)}</span></div>
                        <div>Forecast: <span className="text-primary">{formatCurrency(monthlyData[hoveredPoint].forecast)}</span></div>
                        <div>Accuracy: <span className={monthlyData[hoveredPoint].actual >= monthlyData[hoveredPoint].forecast * 0.95 ? 'text-success' : 'text-warning'}>
                            {(monthlyData[hoveredPoint].actual / monthlyData[hoveredPoint].forecast * 100).toFixed(1)}%
                        </span></div>
                        <div>Variance: <span className={monthlyData[hoveredPoint].actual >= monthlyData[hoveredPoint].forecast ? 'text-success' : 'text-danger'}>
                            {monthlyData[hoveredPoint].actual >= monthlyData[hoveredPoint].forecast ? '+' : ''}{formatCurrency(monthlyData[hoveredPoint].actual - monthlyData[hoveredPoint].forecast)}
                        </span></div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default SalesForecastVsActualKPI;