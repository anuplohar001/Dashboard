import React, { useState } from 'react';

const AveragePOValueKPI = () => {
    // Sample data for Average PO Value by month
    const data = [
        { month: 'Jan', avgValue: 1500, totalAmount: 185000, poCount: 10 },
        { month: 'Feb', avgValue: 12000, totalAmount: 220000, poCount: 10 },
        { month: 'Mar', avgValue: 19800, totalAmount: 237600, poCount: 12 },
        { month: 'Apr', avgValue: 15000, totalAmount: 200000, poCount: 8 },
        { month: 'May', avgValue: 21500, totalAmount: 258000, poCount: 12 },
        { month: 'Jun', avgValue: 23200, totalAmount: 278400, poCount: 12 },
        { month: 'Jul', avgValue: 10000, totalAmount: 180000, poCount: 9 },
        { month: 'Aug', avgValue: 24500, totalAmount: 294000, poCount: 12 },
        { month: 'Sep', avgValue: 19000, totalAmount: 209000, poCount: 11 },
        { month: 'Oct', avgValue: 26000, totalAmount: 260000, poCount: 10 },
        { month: 'Nov', avgValue: 22800, totalAmount: 273600, poCount: 12 },
        { month: 'Dec', avgValue: 21000, totalAmount: 231000, poCount: 11 }
    ];

    const [hoveredBar, setHoveredBar] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    // Chart dimensions - entire component is 39rem x 39rem
    const adjustedMargin = { top: 30, right: 30, bottom: 60, left: 60 };
    const chartWidth = 550; // Convert rem to pixels
    const chartHeight = 430;
    const adjustedInnerWidth = chartWidth - adjustedMargin.left - adjustedMargin.right;
    const adjustedInnerHeight = chartHeight - adjustedMargin.top - adjustedMargin.bottom;

    // Calculate scales
    const maxValue = Math.max(...data.map(d => d.avgValue));
    const yScale = adjustedInnerHeight / maxValue;
    const barWidth = adjustedInnerWidth / data.length * 0.7;
    const barSpacing = adjustedInnerWidth / data.length;

    // Y-axis ticks
    const yTicks = [];
    const tickCount = 8;
    for (let i = 0; i <= tickCount; i++) {
        yTicks.push((maxValue / tickCount) * i);
    }

    const handleMouseEnter = (bar, event) => {
        setHoveredBar(bar);
        setTooltipPosition({
            x: event.clientX,
            y: event.clientY
        });
    };

    const handleMouseLeave = () => {
        setHoveredBar(null);
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };

    return (
        <div
            className="d-flex flex-column avgpurchase p-2"
            style={{
                height: '35rem',
            }}
        >
            <div className="card-container shadow-sm h-100">
                <div >
                    <h6 className="mb-0">Average Purchase Order Value</h6>
                </div>
                <div className="card-body d-flex flex-column" style={{overflow:"scroll"}}>
                    <div className="flex-grow-1 d-flex justify-content-center align-items-center" style={{width:"fit-content"}}>
                        <svg
                            width={chartWidth}
                            height={chartHeight}
                            className=''
                        >                            

                            {/* Y-axis grid lines */}
                            {yTicks.map((tick, i) => (
                                <g key={i}>
                                    <line
                                        x1={adjustedMargin.left}
                                        y1={adjustedMargin.top + adjustedInnerHeight - (tick * yScale)}
                                        x2={adjustedMargin.left + adjustedInnerWidth}
                                        y2={adjustedMargin.top + adjustedInnerHeight - (tick * yScale)}
                                        stroke="#cececeff"
                                        strokeWidth="1"
                                    />
                                    <text
                                        x={adjustedMargin.left - 10}
                                        y={adjustedMargin.top + adjustedInnerHeight - (tick * yScale) + 5}
                                        textAnchor="end"
                                        fontSize="10"
                                        fill="#666"
                                    >
                                        ₹{(tick / 1000).toFixed(0)}k
                                    </text>
                                </g>
                            ))}

                            {/* X-axis */}
                            <line
                                x1={adjustedMargin.left}
                                y1={adjustedMargin.top + adjustedInnerHeight}
                                x2={adjustedMargin.left + adjustedInnerWidth}
                                y2={adjustedMargin.top + adjustedInnerHeight}
                                stroke="#b1b1b1ff"
                                strokeWidth="2"
                            />

                            {/* Y-axis */}
                            <line
                                x1={adjustedMargin.left}
                                y1={adjustedMargin.top}
                                x2={adjustedMargin.left}
                                y2={adjustedMargin.top + adjustedInnerHeight}
                                stroke="#b1b1b1ff"
                                strokeWidth="2"
                            />

                            {/* Bars */}
                            {data.map((d, i) => {
                                const barHeight = d.avgValue * yScale;
                                const x = adjustedMargin.left + (i * barSpacing) + (barSpacing - barWidth) / 2;
                                const y = adjustedMargin.top + adjustedInnerHeight - barHeight;

                                return (
                                    <rect
                                        key={d.month}
                                        x={x}
                                        y={y}
                                        width={barWidth}
                                        height={barHeight}
                                        rx="3"
                                        fill={hoveredBar?.month === d.month ? '#3484fdff' : '#0d6efd'}
                                        stroke={hoveredBar?.month === d.month ? '#3484fdff' : '#0d6efd'}
                                        strokeWidth="1"
                                        style={{
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease'
                                        }}
                                        onMouseEnter={(e) => handleMouseEnter(d, e)}
                                        onMouseLeave={handleMouseLeave}
                                    />
                                );
                            })}

                            {/* X-axis labels */}
                            {data.map((d, i) => (
                                <text
                                    key={d.month}
                                    x={adjustedMargin.left + (i * barSpacing) + barSpacing / 2}
                                    y={adjustedMargin.top + adjustedInnerHeight + 15}
                                    textAnchor="middle"
                                    fontSize="10"
                                    fill="#333"
                                    fontWeight="500"
                                >
                                    {d.month}
                                </text>
                            ))}

                            

                            {/* Y-axis label */}
                            <text
                                x={45}
                                y={chartHeight / 2 }
                                textAnchor="middle"
                                fontSize="13"
                                fill="#666"
                                transform={`rotate(-90, 15, ${chartHeight / 2})`}
                            >
                                Avg PO Value (₹)
                            </text>

                            {/* X-axis label */}
                            <text
                                x={chartWidth / 2}
                                y={chartHeight - 20}
                                textAnchor="middle"
                                fontSize="13"
                                fill="#666"
                            >
                                Month
                            </text>
                        </svg>

                        {/* Tooltip */}
                        {hoveredBar && (
                            <div
                                className="position-fixed bg-dark text-white p-2 rounded shadow-lg"
                                style={{
                                    left: tooltipPosition.x + 10,
                                    top: tooltipPosition.y - 10,
                                    zIndex: 1000,
                                    minWidth: '200px',
                                    fontSize: '0.75rem',
                                    pointerEvents: 'none'
                                }}
                            >
                                <div className="fw-bold mb-1 text-center border-bottom pb-1">
                                    Average Purchase Order Value
                                </div>
                                <div><strong>Month:</strong> {hoveredBar.month}</div>
                                <div><strong>Avg PO:</strong> {formatCurrency(hoveredBar.avgValue)}</div>
                                <div><strong>Total:</strong> {formatCurrency(hoveredBar.totalAmount)}</div>
                                <div><strong>POs:</strong> {hoveredBar.poCount}</div>
                            </div>
                        )}
                    </div>

                    {/* Summary Statistics - Compact */}
                    <div className="row g-1 mt-2">
                        <div className="col-6">
                            <div className="card bg-light p-1">
                                <div className="text-center">
                                    <div className="fw-bold text-primary" style={{ fontSize: '0.8rem' }}>
                                        {formatCurrency(data.reduce((sum, d) => sum + d.avgValue, 0) / data.length)}
                                    </div>
                                    <div style={{ fontSize: '0.65rem' }}>Overall Avg</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="card bg-light p-1">
                                <div className="text-center">
                                    <div className="fw-bold text-success" style={{ fontSize: '0.8rem' }}>
                                        {formatCurrency(Math.max(...data.map(d => d.avgValue)))}
                                    </div>
                                    <div style={{ fontSize: '0.65rem' }}>Highest</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default AveragePOValueKPI;