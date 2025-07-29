import React, { useState } from 'react';

const SalesOrderAging = () => {
    const [hoveredBar, setHoveredBar] = useState(null);
    // Sample data for sales order aging
    const agingData = [
        { bucket: '0-7 Days', count: 45, percentage: 75 },
        { bucket: '8-15 Days', count: 18, percentage: 30 },
        { bucket: '8-15 Days', count: 35, percentage: 40 },
        { bucket: '8-15 Days', count: 20, percentage: 56 },
        { bucket: '8-15 Days', count: 18, percentage: 30 },
        { bucket: '15+ Days', count: 7, percentage: 12 }
    ];

    const maxCount = Math.max(...agingData.map(item => item.count));
    const chartHeight = 280;
    const chartWidth = 400;
    const barWidth = 40;
    const barSpacing = 20;
    
    const margin = { top: 40, right: 40, bottom: 60, left: 60 };
    const innerWidth = chartWidth - margin.left - margin.right;
    const innerHeight = chartHeight - margin.top - margin.bottom;
    return (
        <div className="card salesbars p-1" style={{fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            <div className="card-header bg-white border-0 pb-0">
                <div className="d-flex justify-content-between align-items-center">
                    <h6 className="mb-0 fw-semibold text-dark">Sales Order Aging / Delayed Dispatches</h6>
                    <div className="dropdown">
                        <button
                            className="btn btn-sm btn-outline-secondary dropdown-toggle"
                            type="button"
                            style={{ fontSize: '12px', padding: '4px 8px' }}
                        >
                            Current
                        </button>
                    </div>
                </div>
            </div>

            <div className="card-body p-1" style={{overflow:"scroll"}}>
                <div className="d-flex justify-content-center" style={{width:"fit-content"}}>
                    <svg width={chartWidth} height={chartHeight} className="overflow-visible">
                        {/* Y-axis labels */}
                        {[0, 10, 20, 30, 40, 50].map((value, index) => (
                            <g key={index}>
                                <text
                                    x={50}
                                    y={chartHeight - 40 - (index * (chartHeight - 80) / 5)}
                                    textAnchor="end"
                                    className="text-muted"
                                    style={{ fontSize: '11px', fill: '#6c757d' }}
                                >
                                    {value}
                                </text>
                                <line
                                    x1={50}
                                    y1={chartHeight - 40 - (index * (chartHeight - 80) / 5)}
                                    x2={chartWidth - 20}
                                    y2={chartHeight - 40 - (index * (chartHeight - 80) / 5)}
                                    stroke="#cececeff"
                                    strokeWidth="1"
                                />
                            </g>
                        ))}

                        {/* Bars */}
                        {agingData.map((item, index) => {
                            const barHeight = (item.count / maxCount) * (chartHeight - 80);
                            const x = 60 + index * (barWidth + barSpacing);
                            const y = chartHeight - 40 - barHeight;

                            return (
                                <g key={index}>
                                    <rect
                                        x={x}
                                        y={y}
                                        width={barWidth}
                                        height={barHeight}
                                        fill={hoveredBar === index ? "#1a73e8" : "#4285f4"}
                                        rx="4"
                                        ry="4"
                                        style={{
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            filter: hoveredBar === index ? 'brightness(1.1)' : 'none'
                                        }}
                                        onMouseEnter={() => setHoveredBar(index)}
                                        onMouseLeave={() => setHoveredBar(null)}
                                    />

                                    {/* Tooltip */}
                                    {hoveredBar === index && (
                                        <g>
                                            <rect
                                                x={x + barWidth / 2 - 30}
                                                y={y - 45}
                                                width="60"
                                                height="35"
                                                fill="#333"
                                                rx="4"
                                                ry="4"
                                                opacity="0.9"
                                            />
                                            <text
                                                x={x + barWidth / 2}
                                                y={y - 30}
                                                textAnchor="middle"
                                                fill="white"
                                                style={{ fontSize: '11px', fontWeight: 'bold' }}
                                            >
                                                {item.count} Orders
                                            </text>
                                            <text
                                                x={x + barWidth / 2}
                                                y={y - 18}
                                                textAnchor="middle"
                                                fill="white"
                                                style={{ fontSize: '10px' }}
                                            >
                                                {item.bucket}
                                            </text>
                                        </g>
                                    )}

                                    {/* X-axis labels */}
                                    <text
                                        x={x + barWidth / 2}
                                        y={chartHeight - 20}
                                        textAnchor="middle"
                                        className="text-muted"
                                        style={{ fontSize: '11px', fill: '#6c757d' }}
                                    >
                                        {item.bucket}
                                    </text>
                                </g>
                            );
                        })}

                        <text
                            x={margin.left / 2}
                            y={margin.top - 5 + innerHeight / 2}
                            textAnchor="middle"
                            fontSize="11"
                            fill="#5a5f64ff"
                            transform={`rotate(-90 ${margin.left / 2} ${margin.top + innerHeight / 2})`}
                        >
                            No of Orders
                        </text>

                        <text
                            x={margin.left + innerWidth / 2}
                            y={margin.top + innerHeight + 60}
                            textAnchor="middle"
                            fontSize="11"
                            fill="#5a5f64ff"
                        >
                            Aging Buckets
                        </text>
                    </svg>
                </div>

                {/* Summary Statistics */}
                <div className="row text-center">
                    <div className="col-4">
                        <div className="fw-bold" style={{ fontSize: '15px', color: '#1a73e8' }}>70</div>
                        <div className="text-muted" style={{ fontSize: '12px' }}>Total Orders</div>
                    </div>
                    <div className="col-4">
                        <div className="fw-bold" style={{ fontSize: '15px', color: '#1a73e8' }}>7</div>
                        <div className="text-muted" style={{ fontSize: '12px' }}>Above 15 Days</div>
                    </div>
                    <div className="col-4">
                        <div className="fw-bold" style={{ fontSize: '15px', color: '#1a73e8' }}>10%</div>
                        <div className="text-muted" style={{ fontSize: '12px' }}>Delayed Rate</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalesOrderAging;