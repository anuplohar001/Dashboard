import React, { useState } from 'react';
import HoverText from "../topComponents/HoverText";

const WIPLoadChart = () => {
    // Sample data for WIP load per machine
    const machineData = [
        {
            id: 'M1',
            name: 'CNC Machine 1',
            jobs: [
                { id: 'Job A', hours: 8, color: '#0d6efd' },
                { id: 'Job B', hours: 6, color: '#6610f2' },
                { id: 'Job C', hours: 4, color: '#d63384' }
            ],
            totalHours: 18
        },
        {
            id: 'M2',
            name: 'CNC Machine 2',
            jobs: [
                { id: 'Job D', hours: 12, color: '#0d6efd' },
                { id: 'Job E', hours: 5, color: '#6610f2' },
                { id: 'Job F', hours: 3, color: '#d63384' }
            ],
            totalHours: 20
        },
        {
            id: 'M3',
            name: 'Lathe Machine',
            jobs: [
                { id: 'Job G', hours: 10, color: '#0d6efd' },
                { id: 'Job H', hours: 8, color: '#6610f2' }
            ],
            totalHours: 18
        },
        {
            id: 'M4',
            name: 'Milling Machine',
            jobs: [
                { id: 'Job I', hours: 15, color: '#0d6efd' },
                { id: 'Job J', hours: 4, color: '#6610f2' },
                { id: 'Job K', hours: 2, color: '#d63384' },
                { id: 'Job L', hours: 3, color: '#fd7e14' }
            ],
            totalHours: 24
        },
        {
            id: 'M5',
            name: 'Drill Press',
            jobs: [
                { id: 'Job M', hours: 6, color: '#0d6efd' },
                { id: 'Job N', hours: 4, color: '#6610f2' }
            ],
            totalHours: 10
        },
        {
            id: 'M6',
            name: 'Grinder',
            jobs: [
                { id: 'Job O', hours: 9, color: '#0d6efd' },
                { id: 'Job P', hours: 7, color: '#6610f2' },
                { id: 'Job Q', hours: 5, color: '#d63384' }
            ],
            totalHours: 21
        }
    ];

    // Chart dimensions
    const chartWidth = 450;
    const chartHeight = 350;
    const margin = { top: 20, right: 50, bottom: 40, left: 50 };
    const innerWidth = chartWidth - margin.left - margin.right;
    const innerHeight = chartHeight - margin.top - margin.bottom;
    const [selectedPeriod, setSelectedPeriod] = useState('current');
    // Bar calculations
    const barHeight = innerHeight / machineData.length * 0.7;
    const barSpacing = innerHeight / machineData.length * 0.3;

    // X-axis scale (0 to max total hours)
    const maxHours = Math.max(...machineData.map(m => m.totalHours));
    const xScale = (value) => (value / maxHours) * innerWidth;

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
        <div className='wipload'>
            <div className="card-container anup " style={{ overflow: "scroll", height:"30rem", border: '1px solid #dee2e6' }}>
                <div className="card-body">
                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-center">
                        <h6 className="card-title mb-1 fw-bold text-dark">WIP Load per Machine</h6>
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
                    <div className="d-flex justify-content-center" style={{width:"fit-content", backgroundColor: '#f8f9fa', }}>
                        <svg width={chartWidth} height={chartHeight}>
                            {/* X-axis grid lines */}
                            {Array.from({ length: 6 }, (_, i) => Math.ceil(maxHours / 5) * i).map(tick => (
                                <g key={tick}>
                                    <line
                                        x1={margin.left + xScale(tick)}
                                        y1={margin.top}
                                        x2={margin.left + xScale(tick)}
                                        y2={margin.top + innerHeight}
                                        stroke="#e9ecef"
                                        strokeWidth="1"
                                    />
                                    <text
                                        x={margin.left + xScale(tick)}
                                        y={margin.top + innerHeight + 15}
                                        textAnchor="middle"
                                        fontSize="10"
                                        fill="#6c757d"
                                    >
                                        {tick}h
                                    </text>
                                </g>
                            ))}

                            {/* Stacked Bars */}
                            {machineData.map((machine, index) => {
                                const y = margin.top + index * (barHeight + barSpacing) + barSpacing / 2;
                                let cumulativeX = 0;

                                return (
                                    <g key={machine.id}>
                                        {/* Machine name label */}
                                        <text
                                            x={margin.left - 10}
                                            y={y + barHeight / 2 + 4}
                                            textAnchor="end"
                                            fontSize="10"
                                            fill="#6c757d"
                                            fontWeight="bold"
                                        >
                                            {machine.id}
                                        </text>

                                        {/* Job segments */}
                                        {machine.jobs.map((job, jobIndex) => {
                                            const segmentWidth = xScale(job.hours);
                                            const segmentX = margin.left + cumulativeX;
                                            cumulativeX += segmentWidth;

                                            return (
                                                <rect
                                                    key={job.id}
                                                    className="hovered"
                                                    x={segmentX}
                                                    y={y}
                                                    width={segmentWidth}
                                                    height={barHeight}
                                                    fill={job.color}
                                                    rx="2"
                                                    onMouseEnter={() => setHovered(true)}
                                                    onMouseLeave={() => setHovered(false)}
                                                    onMouseMove={(e) => handleMouseMove(e, `${machine.id} - ${job.id}: ${job.hours}h`)}
                                                />
                                            );
                                        })}

                                        {/* Total hours label */}
                                        <text
                                            x={margin.left + xScale(machine.totalHours) + 5}
                                            y={y + barHeight / 2 + 4}
                                            textAnchor="start"
                                            fontSize="10"
                                            fill="#495057"
                                            fontWeight="bold"
                                        >
                                            {machine.totalHours}h
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
                                Machines
                            </text>

                            {/* X-axis label */}
                            <text
                                x={margin.left + innerWidth / 2}
                                y={chartHeight - 10}
                                textAnchor="middle"
                                fontSize="10"
                                fill="#6c757d"
                                fontWeight="bold"
                            >
                                Hours
                            </text>
                        </svg>
                    </div>

                    {/* Legend */}
                    <div className="d-flex justify-content-center mb-2 " >
                        <div className="d-flex align-items-center me-3">
                            <div className="me-1" style={{ width: '12px', height: '12px', backgroundColor: '#0d6efd', borderRadius: '2px' }}></div>
                            <small className="text-muted">Priority 1</small>
                        </div>
                        <div className="d-flex align-items-center me-3">
                            <div className="me-1" style={{ width: '12px', height: '12px', backgroundColor: '#6610f2', borderRadius: '2px' }}></div>
                            <small className="text-muted">Priority 2</small>
                        </div>
                        <div className="d-flex align-items-center me-3">
                            <div className="me-1" style={{ width: '12px', height: '12px', backgroundColor: '#d63384', borderRadius: '2px' }}></div>
                            <small className="text-muted">Priority 3</small>
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="me-1" style={{ width: '12px', height: '12px', backgroundColor: '#fd7e14', borderRadius: '2px' }}></div>
                            <small className="text-muted">Priority 4</small>
                        </div>
                    </div>

                    {/* Bottom section with key metrics */}
                    <div className="mt-1 pt-2 border-top">
                        <div className="row g-2">
                            <div className="col-4">
                                <div className="text-center">
                                    <div className="fw-bold text-dark" style={{ fontSize: '14px' }}>
                                        {Math.max(...machineData.map(m => m.totalHours))}h
                                    </div>
                                    <div className="text-muted" style={{ fontSize: '10px' }}>Max Load</div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="text-center">
                                    <div className="fw-bold text-dark" style={{ fontSize: '14px' }}>
                                        {(machineData.reduce((sum, m) => sum + m.totalHours, 0) / machineData.length).toFixed(0)}h
                                    </div>
                                    <div className="text-muted" style={{ fontSize: '10px' }}>Avg Load</div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="text-center">
                                    <div className="fw-bold text-dark" style={{ fontSize: '14px' }}>
                                        {machineData.reduce((sum, m) => sum + m.jobs.length, 0)}
                                    </div>
                                    <div className="text-muted" style={{ fontSize: '10px' }}>Total Jobs</div>
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

export default WIPLoadChart;