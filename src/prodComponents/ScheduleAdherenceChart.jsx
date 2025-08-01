import React, { useState } from 'react';

const ScheduleAdherenceChart = () => {
    const [hoveredPoint, setHoveredPoint] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [selectedPeriod, setSelectedPeriod] = useState('current');
    // Schedule Adherence data
    const scheduleData = [
        { week: 'Week 1', adherence: 92, jobsOnTime: 92, totalJobs: 100 },
        { week: 'Week 2', adherence: 88, jobsOnTime: 88, totalJobs: 100 },
        { week: 'Week 3', adherence: 95, jobsOnTime: 95, totalJobs: 100 },
        { week: 'Week 4', adherence: 89, jobsOnTime: 89, totalJobs: 100 },
        { week: 'Week 5', adherence: 94, jobsOnTime: 94, totalJobs: 100 },
        { week: 'Week 6', adherence: 91, jobsOnTime: 91, totalJobs: 100 },
        { week: 'Week 7', adherence: 96, jobsOnTime: 96, totalJobs: 100 },
        { week: 'Week 8', adherence: 87, jobsOnTime: 87, totalJobs: 100 }
    ];

    // Chart dimensions
    const chartWidth = 630;
    const chartHeight = 255;
    const padding = 40;

    // Calculate scales
    const xScale = (index) => (index * (chartWidth - padding * 2)) / (scheduleData.length - 1) + padding;
    const yScale = (value) => chartHeight - padding - ((value - 80) * (chartHeight - padding * 2)) / 20;

    // Generate path for line chart
    const generatePath = () => {
        return scheduleData.map((point, index) => {
            const x = xScale(index);
            const y = yScale(point.adherence);
            return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
        }).join(' ');
    };

    const handleMouseMove = (e, point, index) => {
        setMousePosition({
            x: e.clientX,
            y: e.clientY
        });
        setHoveredPoint({ ...point, index });
    };

    const handleMouseLeave = () => {
        setHoveredPoint(null);
    };

    return (
        <div className='prodcharts'>
            <div className="card-container anup scheduleadhe" style={{ height: "25rem", border: '1px solid #dee2e6' }}>
                <div className="card-body">
                    {/* Title and Current Value */}
                    <div className=" d-flex flex-column">
                        <div className='d-flex justify-content-evenly align-items-center mb-3'>
                            <h6 className="text-dark mb-1" style={{ fontSize: '16px', fontWeight: '600' }}>
                                Schedule Adherence
                            </h6>
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
                        <div className="d-flex align-items-center">
                            <h3 className="text-dark mb-0" style={{ fontSize: '28px', fontWeight: '700' }}>
                                {scheduleData[scheduleData.length - 1].adherence}%
                            </h3>
                            <span className="text-muted ms-2" style={{ fontSize: '14px' }}>
                                Current Week
                            </span>
                        </div>
                    </div>



                    {/* SVG Line Chart */}
                    <div className="d-flex" style={{overflow:"scroll"}}>
                        <div style={{width:"fit-content"}}>

                            <svg
                                width={chartWidth}
                                height={chartHeight}
                                className="rounded"
                                style={{ backgroundColor: '#f8f9fa' }}
                            >
                                {/* Grid lines */}
                                {[85, 90, 95, 100].map((value) => (
                                    <line
                                        key={value}
                                        x1={padding}
                                        y1={yScale(value)}
                                        x2={chartWidth - padding}
                                        y2={yScale(value)}
                                        stroke="#353636ff"
                                        strokeWidth="1"
                                        strokeDasharray="2,2"
                                    />
                                ))}

                                {/* Y-axis labels */}
                                {[80, 85, 90, 95, 100].map((value) => (
                                    <text
                                        key={value}
                                        x={padding - 10}
                                        y={yScale(value) + 4}
                                        textAnchor="end"
                                        fontSize="10"
                                    >
                                        {value}%
                                    </text>
                                ))}

                                {/* X-axis labels */}
                                {scheduleData.map((point, index) => (
                                    <text
                                        key={index}
                                        x={xScale(index)}
                                        y={chartHeight - 5}
                                        textAnchor="middle"
                                        fontSize="10"
                                    >
                                        {point.week.replace('Week ', 'W')}
                                    </text>
                                ))}

                                {/* Line path */}
                                <path
                                    d={generatePath()}
                                    fill="none"
                                    stroke="#007bff"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />

                                {/* Data points */}
                                {scheduleData.map((point, index) => (
                                    <circle
                                        key={index}
                                        cx={xScale(index)}
                                        cy={yScale(point.adherence)}
                                        r="4"
                                        fill="#007bff"
                                        // stroke="#fff"
                                        strokeWidth="2"
                                        style={{ cursor: 'pointer' }}
                                        onMouseMove={(e) => handleMouseMove(e, point, index)}
                                        onMouseLeave={handleMouseLeave}
                                        className={hoveredPoint?.index === index ? 'shadow' : ''}
                                    />
                                ))}
                            </svg>
                        </div>


                    </div>


                </div>
            </div>
            {/* Tooltip */}
            {
                hoveredPoint && (
                    <div
                        className="position-fixed bg-dark text-white p-2 rounded shadow-sm"
                        style={{
                            left: mousePosition.x + 10,
                            top: mousePosition.y - 10,
                            fontSize: '11px',
                            zIndex: 1000,
                            whiteSpace: 'nowrap',
                            maxWidth: '200px'
                        }}
                    >
                        <div className="fw-bold text-info">{hoveredPoint.week}</div>
                        <div>Adherence: <span className="text-warning">{hoveredPoint.adherence}%</span></div>
                        <div>Jobs on Time: {hoveredPoint.jobsOnTime}</div>
                        <div>Total Jobs: {hoveredPoint.totalJobs}</div>
                        <div className="text-success" style={{ fontSize: '10px' }}>
                            ({hoveredPoint.jobsOnTime}/{hoveredPoint.totalJobs}) × 100 = {hoveredPoint.adherence}%
                        </div>
                    </div>
                )
            }
        </div>

    );
};

export default ScheduleAdherenceChart;