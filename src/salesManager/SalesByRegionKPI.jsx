import React, { useState } from 'react';

const SalesByRegion = () => {
    const [hoveredSegment, setHoveredSegment] = useState({ region: -1, segment: -1 });
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

    // Sample data for sales by region with segments
    const salesData = [
        {
            region: 'North',
            segments: [
                { name: 'Enterprise', value: 150000, color: '#4285f4' },
                { name: 'SMB', value: 120000, color: '#34a853' },
                { name: 'Retail', value: 80000, color: '#fbbc04' }
            ],
            total: 350000
        },
        {
            region: 'South',
            segments: [
                { name: 'Enterprise', value: 90000, color: '#4285f4' },
                { name: 'SMB', value: 80000, color: '#34a853' },
                { name: 'Retail', value: 50000, color: '#fbbc04' }
            ],
            total: 220000
        },
        {
            region: 'East',
            segments: [
                { name: 'Enterprise', value: 110000, color: '#4285f4' },
                { name: 'SMB', value: 70000, color: '#34a853' },
                { name: 'Retail', value: 40000, color: '#fbbc04' }
            ],
            total: 220000
        },
        {
            region: 'West',
            segments: [
                { name: 'Enterprise', value: 180000, color: '#4285f4' },
                { name: 'SMB', value: 100000, color: '#34a853' },
                { name: 'Retail', value: 60000, color: '#fbbc04' }
            ],
            total: 340000
        }
    ];

    const maxTotal = Math.max(...salesData.map(item => item.total));
    const chartHeight = 250;
    const chartWidth = 400;
    const barWidth = 45;
    const barSpacing = 30;

    const margin = { top: 40, right: 40, bottom: 60, left: 60 };
    const innerWidth = chartWidth - margin.left - margin.right;
    const innerHeight = chartHeight - margin.top - margin.bottom;

    const formatCurrency = (value) => {
        if (value >= 100000) {
            return `₹${(value / 100000).toFixed(1)}L`;
        }
        return `₹${(value / 1000).toFixed(0)}K`;
    };

    return (
        <div className="card salesbars p-1" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            <div className="card-header bg-white border-0 ">
                <div className="d-flex justify-content-between align-items-center">
                    <h6 className="mb-0 fw-semibold text-dark">Sales by Region / Segment</h6>
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

            <div className="card-body pt-1" style={{ overflow: "scroll" }}>
                <div className="d-flex justify-content-center" style={{ width: "fit-content", height: "fit-content" }}>
                    <svg className='' width={chartWidth} height={chartHeight} >
                        {/* Y-axis labels */}
                        {[0, 1, 2, 3, 4].map((value, index) => (
                            <g key={value}>
                                <text
                                    x={35}
                                    y={chartHeight - 50 - (index * (chartHeight - 80) / 4)}
                                    textAnchor="end"
                                    className="text-muted"
                                    style={{ fontSize: '11px', fill: '#6c757d' }}
                                >
                                    ₹{value}L
                                </text>
                                <line
                                    x1={40}
                                    y1={chartHeight - 50 - (index * (chartHeight - 80) / 4)}
                                    x2={chartWidth - 20}
                                    y2={chartHeight - 50 - (index * (chartHeight - 80) / 4)}
                                    stroke="#cececeff"
                                    strokeWidth="1"
                                />
                            </g>
                        ))}

                        {/* Stacked Bars */}
                        {salesData.map((regionData, regionIndex) => {
                            const x = 60 + regionIndex * (barWidth + barSpacing);
                            let cumulativeHeight = 0;

                            return (
                                <g key={regionIndex}>
                                    {regionData.segments.map((segment, segmentIndex) => {
                                        const segmentHeight = (segment.value / maxTotal) * (chartHeight - 80);
                                        const y = chartHeight - 50 - cumulativeHeight - segmentHeight;
                                        const isHovered = hoveredSegment.region !== -1;

                                        cumulativeHeight += segmentHeight;

                                        return (
                                            <g key={segmentIndex}>
                                                <rect
                                                    x={x}
                                                    y={y}
                                                    width={barWidth}
                                                    height={segmentHeight}
                                                    fill={segment.color}
                                                    rx="2"
                                                    ry="2"
                                                    style={{
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s ease'
                                                    }}
                                                    onMouseEnter={() => setHoveredSegment({ region: regionIndex, segment: segmentIndex })}
                                                    onMouseLeave={() => setHoveredSegment({ region: -1, segment: -1 })}
                                                    onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
                                                />
                                            </g>
                                        );
                                    })}

                                    {/* X-axis labels */}
                                    <text
                                        x={x + barWidth / 2}
                                        y={chartHeight - 25}
                                        textAnchor="middle"
                                        className="text-muted"
                                        style={{ fontSize: '11px', fill: '#6c757d' }}
                                    >
                                        {regionData.region}
                                    </text>
                                </g>
                            );
                        })}

                        <text
                            x={margin.left / 2}
                            y={margin.top + innerHeight / 2 - 20}
                            textAnchor="middle"
                            fontSize="11"
                            fill="#383a3bff"
                            transform={`rotate(-90 ${margin.left / 2} ${margin.top + innerHeight / 2})`}
                        >
                            Cost
                        </text>

                        <text
                            x={margin.left + innerWidth / 2}
                            y={margin.top + innerHeight + 50}
                            textAnchor="middle"
                            fontSize="11"
                            fill="#383a3bff"
                        >

                            Regions (Directions)
                        </text>
                    </svg>
                </div>
                {/* Legend */}
                <div className=" d-flex justify-content-center mb-1">
                    <div className="d-flex gap-3">
                        <div className="d-flex align-items-center">
                            <div style={{ width: '12px', height: '12px', backgroundColor: '#4285f4', borderRadius: '2px', marginRight: '6px' }}></div>
                            <span style={{ fontSize: '11px', color: '#6c757d' }}>Enterprise</span>
                        </div>
                        <div className="d-flex align-items-center">
                            <div style={{ width: '12px', height: '12px', backgroundColor: '#34a853', borderRadius: '2px', marginRight: '6px' }}></div>
                            <span style={{ fontSize: '11px', color: '#6c757d' }}>SMB</span>
                        </div>
                        <div className="d-flex align-items-center">
                            <div style={{ width: '12px', height: '12px', backgroundColor: '#fbbc04', borderRadius: '2px', marginRight: '6px' }}></div>
                            <span style={{ fontSize: '11px', color: '#6c757d' }}>Retail</span>
                        </div>
                    </div>
                </div>


                {/* Summary Statistics */}
                <div className="row text-center">
                    <div className="col-4">
                        <div className="fw-bold" style={{ fontSize: '16px', color: '#1a73e8' }}>₹11.3L</div>
                        <div className="text-muted" style={{ fontSize: '12px' }}>Total Sales</div>
                    </div>
                    <div className="col-4">
                        <div className="fw-bold" style={{ fontSize: '16px', color: '#1a73e8' }}>₹3.5L</div>
                        <div className="text-muted" style={{ fontSize: '12px' }}>Top Region</div>
                    </div>
                    <div className="col-4">
                        <div className="fw-bold" style={{ fontSize: '16px', color: '#1a73e8' }}>31%</div>
                        <div className="text-muted" style={{ fontSize: '12px' }}>North Share</div>
                    </div>
                </div>
            </div>

            {/* Tooltip */}
            {hoveredSegment.region !== -1 && (
                <div
                    style={{
                        position: 'fixed',
                        left: `${mousePos.x + 12}px`,
                        top: `${mousePos.y + 10}px`,
                        width: '100px',
                        height: 'fit-content',
                        padding: '5px',
                        borderRadius: '5px',
                        backgroundColor: '#212121ea',
                        color: 'white',
                        zIndex: '1000',
                        textAlign: "center",
                        fontSize: "12px"

                    }}
                >
                    {salesData[hoveredSegment.region].region}
                    <div>
                        {salesData[hoveredSegment.region].segments[hoveredSegment.segment].name} : {salesData[hoveredSegment.region].segments[hoveredSegment.segment].value}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SalesByRegion;