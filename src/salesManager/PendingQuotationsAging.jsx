import React, { useState } from 'react';

const PendingQuotationsAging = () => {
    const [hoveredBar, setHoveredBar] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Sample data for quotation aging
    const data = [
        { label: '0-3 Days', value: 45, color: '#4285F4' },
        { label: '4-7 Days', value: 32, color: '#4285F4' },
        { label: '8-14 Days', value: 28, color: '#4285F4' },
        { label: '15-30 Days', value: 18, color: '#4285F4' },
        { label: '15-30 Days', value: 18, color: '#4285F4' },
        { label: '>30 Days', value: 12, color: '#4285F4' }
    ];

    const maxValue = Math.max(...data.map(d => d.value));
    const chartHeight = 300;
    const chartWidth = 470;
    const barWidth = 50;
    const barSpacing = 20;
    const totalQuotes = data.reduce((sum, d) => sum + d.value, 0);

    const handleMouseEnter = (index, event) => {
        setHoveredBar(index);
        setMousePosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseLeave = () => {
        setHoveredBar(null);
    };

    const handleMouseMove = (event) => {
        if (hoveredBar !== null) {
            setMousePosition({ x: event.clientX, y: event.clientY });
        }
    };

    return (
        <div>
            <div className="row ">
                <div >
                    <div className="card-container shadow-sm border-0 pendingquote quotationwin">
                        <div className="card-body " style={{ height: "34.5rem" }}>
                            {/* Header */}
                            <div className="d-flex justify-content-between align-items-center">
                                <h6 className="card-title mb-0 fw-semibold text-dark">
                                    Pending Quotations Aging
                                </h6>
                            </div>

                            {/* Chart Container */}
                            <div className="d-flex" style={{overflow:"scroll"}}>
                                <div className="position-relative" style={{width:"fit-content"}}>
                                    <svg
                                        width={chartWidth + 100}
                                        height={chartHeight + 60}
                                        onMouseMove={handleMouseMove}
                                    >
                                        {/* Y-axis labels */}
                                        {[0, 10, 20, 30, 40, 50].map((value, index) => (
                                            <g key={index}>
                                                <text
                                                    x="90"
                                                    y={chartHeight - (value / maxValue) * (chartHeight - 40) + 45}
                                                    textAnchor="end"
                                                    fontSize="12"
                                                    fill="#6c757d"
                                                >
                                                    {value}
                                                </text>
                                                <line
                                                    x1="90"
                                                    y1={chartHeight - (value / maxValue) * (chartHeight - 40) + 40}
                                                    x2={chartWidth + 45}
                                                    y2={chartHeight - (value / maxValue) * (chartHeight - 40) + 40}
                                                    stroke="#e9ecef"
                                                    strokeWidth="1"
                                                />
                                            </g>
                                        ))}

                                        {/* Bars */}
                                        {data.map((item, index) => {
                                            const barHeight = (item.value / maxValue) * (chartHeight - 40);
                                            const x = 110 + index * (barWidth + barSpacing);
                                            const y = chartHeight - barHeight + 40;

                                            return (
                                                <g key={index}>
                                                    <rect
                                                        x={x}
                                                        y={y}
                                                        width={barWidth}
                                                        height={barHeight}
                                                        fill={item.color}
                                                        rx="4"
                                                        ry="4"
                                                        style={{
                                                            cursor: 'pointer',
                                                            opacity: hoveredBar === index ? 0.8 : 1,
                                                            transition: 'opacity 0.2s ease'
                                                        }}
                                                        onMouseEnter={(e) => handleMouseEnter(index, e)}
                                                        onMouseLeave={handleMouseLeave}
                                                    />
                                                    {/* Value labels on bars */}
                                                    <text
                                                        x={x + barWidth / 2}
                                                        y={y - 8}
                                                        textAnchor="middle"
                                                        fontSize="12"
                                                        fill="#495057"
                                                        fontWeight="500"
                                                    >
                                                        {item.value}
                                                    </text>
                                                </g>
                                            );
                                        })}

                                        {/* X-axis labels */}
                                        {data.map((item, index) => (
                                            <text
                                                key={index}
                                                x={110 + index * (barWidth + barSpacing) + barWidth / 2}
                                                y={chartHeight + 60}
                                                textAnchor="middle"
                                                fontSize="12"
                                                fill="#6c757d"
                                            >
                                                {item.label}
                                            </text>
                                        ))}

                                        {/* Axis titles */}
                                        <text
                                            x="20"
                                            y={chartHeight / 2 + 60}
                                            textAnchor="middle"
                                            fontSize="12"
                                            fill="#495057"
                                            fontWeight="500"
                                            transform={`rotate(-90, 20, ${chartHeight / 2 + 20})`}
                                        >
                                            Number of Quotations
                                        </text>
                                        <text
                                            x={chartWidth / 2 + 50}
                                            y={chartHeight + 80}
                                            textAnchor="middle"
                                            fontSize="12"
                                            fill="#495057"
                                            fontWeight="500"
                                        >
                                            Quote Age (Days)
                                        </text>
                                    </svg>

                                </div>
                            </div>
                            {/* Tooltip */}
                            {hoveredBar !== null && (
                                <div
                                    className="position-fixed bg-dark text-white p-2 rounded shadow-lg"
                                    style={{
                                        left: mousePosition.x + 10,
                                        top: mousePosition.y - 10,
                                        zIndex: 1000,
                                        fontSize: '12px',
                                        pointerEvents: 'none'
                                    }}
                                >
                                    <div className="fw-semibold">{data[hoveredBar].label}</div>
                                    <div>{data[hoveredBar].value} quotations</div>
                                    <div>{((data[hoveredBar].value / totalQuotes) * 100).toFixed(1)}% of total</div>
                                </div>
                            )}


                            {/* Additional Info */}
                            <div className="mt-3 p-3 bg-light rounded">
                                <div className="row text-center">
                                    <div className="col-6 col-md-3">
                                        <div className="fw-semibold text-success">{data[0].value + data[1].value}</div>
                                        <div className="small text-muted">Fresh Quotes (≤7 days)</div>
                                    </div>
                                    <div className="col-6 col-md-3">
                                        <div className="fw-semibold text-warning">{data[2].value}</div>
                                        <div className="small text-muted">Moderate Age (8-14 days)</div>
                                    </div>
                                    <div className="col-6 col-md-3">
                                        <div className="fw-semibold text-danger">{data[3].value}</div>
                                        <div className="small text-muted">Aging (15-30 days)</div>
                                    </div>
                                    <div className="col-6 col-md-3">
                                        <div className="fw-semibold text-secondary">{data[4].value}</div>
                                        <div className="small text-muted">Stale (30 days)</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PendingQuotationsAging;