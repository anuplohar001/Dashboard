import React, { useState } from 'react';
import HoverText from "../topComponents/HoverText";

const WorkOrderDelayChart = () => {
    // Sample data for work order delays
    const workOrderData = [
        { id: 'WO101', planned: 5, actual: 6, delay: 1 },
        { id: 'WO102', planned: 8, actual: 10, delay: 2 },
        { id: 'WO103', planned: 3, actual: 3, delay: 0 },
        { id: 'WO104', planned: 7, actual: 9, delay: 2 },
        { id: 'WO105', planned: 4, actual: 6, delay: 2 },
        { id: 'WO105', planned: 4, actual: 6, delay: 2 },
        { id: 'WO106', planned: 6, actual: 6, delay: 0 },
        { id: 'WO106', planned: 6, actual: 6, delay: 0 }
    ];

    // Chart dimensions
    const chartWidth = 720;
    const chartHeight = 290;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const innerWidth = chartWidth - margin.left - margin.right;
    const [selectedPeriod, setSelectedPeriod] = useState('current');
    const innerHeight = chartHeight - margin.top - margin.bottom;

    // Bar calculations
    const groupWidth = innerWidth / workOrderData.length * 0.8;
    const groupSpacing = innerWidth / workOrderData.length * 0.2;
    const barWidth = groupWidth / 2 * 0.8;
    const barSpacing = groupWidth / 2 * 0.2;

    // Y-axis scale (0 to max value)
    const maxValue = Math.max(...workOrderData.map(d => Math.max(d.planned, d.actual)));
    const yScale = (value) => innerHeight - (value / maxValue) * innerHeight;

    const [hovered, setHovered] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [hoverData, setHoverData] = useState(null);

    const handleMouseMove = (e, value) => {
        const x = e.clientX;
        const y = e.clientY;
        setMousePos({
            x: x,
            y: y,
        });
        setHoverData(value);
    };


    return (
        <div className='workdelay'>
            <div className="card-container anup">
                <div className="card-body " style={{  height: "25rem" }}>
                    {/* Header */}
                    <div className="mb-1 d-flex justify-content-evenly align-items-center">
                        <h6 className="card-title mb-1 fw-bold text-dark">Work Order Delays</h6>
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

                    {/* Chart */}
                    <div className="d-flex " style={{ overflow: "scroll", backgroundColor: '#f8f9fa' }}>
                        <div style={{ width: "fit-content" }}>
                            <svg width={chartWidth} height={chartHeight}>
                                {/* Y-axis grid lines */}
                                {Array.from({ length: 6 }, (_, i) => Math.ceil(maxValue / 5) * i).map(tick => (
                                    <g key={tick}>
                                        <line
                                            x1={margin.left}
                                            y1={margin.top + yScale(tick)}
                                            x2={margin.left + innerWidth}
                                            y2={margin.top + yScale(tick)}
                                            stroke="#e9ecef"
                                            strokeWidth="1"
                                        />
                                        <text
                                            x={margin.left - 5}
                                            y={margin.top + yScale(tick) + 4}
                                            textAnchor="end"
                                            fontSize="10"
                                            fill="#6c757d"
                                        >
                                            {tick}
                                        </text>
                                    </g>
                                ))}

                                {/* Grouped Bars */}
                                {workOrderData.map((workOrder, index) => {
                                    const groupX = margin.left + index * (groupWidth + groupSpacing) + groupSpacing / 2;
                                    // Planned bar
                                    const plannedHeight = (workOrder.planned / maxValue) * innerHeight;
                                    const plannedY = margin.top + innerHeight - plannedHeight;
                                    // Actual bar
                                    const actualHeight = (workOrder.actual / maxValue) * innerHeight;
                                    const actualY = margin.top + innerHeight - actualHeight;

                                    return (
                                        <g key={workOrder.id}>
                                            {/* Planned Bar */}
                                            <rect
                                                className="hovered"
                                                x={groupX}
                                                y={plannedY}
                                                width={barWidth}
                                                height={plannedHeight}
                                                fill="#28a745"
                                                rx="2"
                                                onMouseEnter={() => setHovered(true)}
                                                onMouseLeave={() => setHovered(false)}
                                                onMouseMove={(e) => handleMouseMove(e, `${workOrder.id} Planned: ${workOrder.planned} days`)}
                                            />

                                            {/* Actual Bar */}
                                            <rect
                                                className="hovered"
                                                x={groupX + barWidth + barSpacing}
                                                y={actualY}
                                                width={barWidth}
                                                height={actualHeight}
                                                fill="#dc3545"
                                                rx="2"
                                                onMouseEnter={() => setHovered(true)}
                                                onMouseLeave={() => setHovered(false)}
                                                onMouseMove={(e) => handleMouseMove(e, `${workOrder.id} Actual: ${workOrder.actual} days (Delay: ${workOrder.delay} days)`)}
                                            />

                                            {/* Work Order ID below bars */}
                                            <text
                                                x={groupX + groupWidth / 2}
                                                y={margin.top + innerHeight + 15}
                                                textAnchor="middle"
                                                fontSize="10"
                                                fill="#6c757d"
                                            >
                                                {workOrder.id}
                                            </text>
                                        </g>
                                    );
                                })}

                                {/* Y-axis label */}
                                <text
                                    x={15}
                                    y={margin.top + innerHeight / 2}
                                    textAnchor="middle"
                                    fontSize="10"
                                    fill="#6c757d"
                                    transform={`rotate(-90, 15, ${margin.top + innerHeight / 2})`}
                                >
                                    Days
                                </text>
                            </svg>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="d-flex justify-content-center ">
                        <div className="d-flex align-items-center me-3">
                            <div className="me-1" style={{ width: '12px', height: '12px', backgroundColor: '#28a745', borderRadius: '2px' }}></div>
                            <small className="text-muted">Planned</small>
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="me-1" style={{ width: '12px', height: '12px', backgroundColor: '#dc3545', borderRadius: '2px' }}></div>
                            <small className="text-muted">Actual</small>
                        </div>
                    </div>

                    {/* Bottom section with key metrics */}
                    <div className="mt-1 pt-1 border-top">
                        <div className="row g-2">
                            <div className="col-4">
                                <div className="text-center">
                                    <div className="fw-bold text-dark" style={{ fontSize: '14px' }}>
                                        {Math.max(...workOrderData.map(w => w.delay))}
                                    </div>
                                    <div className="text-muted" style={{ fontSize: '10px' }}>Max Delay</div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="text-center">
                                    <div className="fw-bold text-dark" style={{ fontSize: '14px' }}>
                                        {workOrderData.filter(w => w.delay > 0).length}
                                    </div>
                                    <div className="text-muted" style={{ fontSize: '10px' }}>Delayed</div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="text-center">
                                    <div className="fw-bold text-dark" style={{ fontSize: '14px' }}>
                                        {((workOrderData.filter(w => w.delay === 0).length / workOrderData.length) * 100).toFixed(0)}%
                                    </div>
                                    <div className="text-muted" style={{ fontSize: '10px' }}>On Time</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {hovered && (<HoverText x={mousePos.x} y={mousePos.y} data={hoverData} />)}
        </div>
    );
};

export default WorkOrderDelayChart;