import React, { useState } from 'react';

const DowntimeReason = () => {
    const [hoveredSegment, setHoveredSegment] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    // Downtime data by reason
    const downtimeData = [
        { reason: 'Electrical', hours: 32, percentage: 40, color: '#dc3545' },
        { reason: 'Mechanical', hours: 28, percentage: 35, color: '#fd7e14' },
        { reason: 'Software', hours: 20, percentage: 25, color: '#007bff' }
    ];

    const totalHours = downtimeData.reduce((sum, item) => sum + item.hours, 0);
    const avgHours = totalHours / downtimeData.length;
    const maxItem = downtimeData.reduce((prev, curr) => (curr.hours > prev.hours ? curr : prev));
    const minItem = downtimeData.reduce((prev, curr) => (curr.hours < prev.hours ? curr : prev));
    // Chart dimensions
    const size = 160;
    const radius = 60;
    const innerRadius = 35;
    const centerX = size / 2;
    const centerY = size / 2;

    // Generate donut segments
    const generateSegments = () => {
        let currentAngle = -Math.PI / 2; // Start at top

        return downtimeData.map((item, index) => {
            const angle = (item.percentage / 100) * 2 * Math.PI;

            const startAngle = currentAngle;
            const endAngle = currentAngle + angle;

            const x1 = centerX + radius * Math.cos(startAngle);
            const y1 = centerY + radius * Math.sin(startAngle);
            const x2 = centerX + radius * Math.cos(endAngle);
            const y2 = centerY + radius * Math.sin(endAngle);

            const x3 = centerX + innerRadius * Math.cos(endAngle);
            const y3 = centerY + innerRadius * Math.sin(endAngle);
            const x4 = centerX + innerRadius * Math.cos(startAngle);
            const y4 = centerY + innerRadius * Math.sin(startAngle);

            const largeArcFlag = angle > Math.PI ? 1 : 0;

            const pathData = [
                `M ${x1} ${y1}`,
                `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                `L ${x3} ${y3}`,
                `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
                'Z'
            ].join(' ');

            currentAngle += angle;

            return {
                ...item,
                path: pathData
            };
        });
    };

    const segments = generateSegments();

    const handleMouseMove = (e, segment) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: e.clientX,
            y: e.clientY
        });
        setHoveredSegment(segment);
    };

    const handleMouseLeave = () => {
        setHoveredSegment(null);
    };

    return (

        <div className=' col-lg-12 col-md-6 col-12'>
            <div className='card-container'>
                <div style={{ padding: "10px", borderRadius: "5px", height: "24rem" }}>
                    <div >
                        {/* Title */}
                        <div className="mb-1">
                            <h6 style={{ textAlign: "left", fontWeight: '600' }}>
                                Downtime Reason
                            </h6>
                        </div>


                        {/* Chart and Legend Container */}
                        <div className="d-flex flex-column align-items-center " style={{ backgroundColor: '#f8f9fa', }}>
                            {/* Donut Chart */}
                            <div >
                                <svg width={size} height={149}>
                                    {/* Donut segments */}
                                    {segments.map((segment, index) => (
                                        <path
                                            key={index}
                                            d={segment.path}
                                            fill={segment.color}
                                            stroke="#fff"
                                            strokeWidth="2"
                                            style={{ cursor: 'pointer' }}
                                            onMouseMove={(e) => handleMouseMove(e, segment)}
                                            onMouseLeave={handleMouseLeave}
                                            opacity={hoveredSegment && hoveredSegment.reason !== segment.reason ? 0.6 : 1}
                                        />
                                    ))}
                                </svg>


                            </div>

                            {/* Legend */}
                            <div className="ms-3 mt-4">
                                {downtimeData.map((item, index) => (
                                    <div key={index} className="d-flex align-items-center mb-2">
                                        <div
                                            className="rounded-circle me-2"
                                            style={{
                                                width: '8px',
                                                height: '8px',
                                                backgroundColor: item.color
                                            }}
                                        ></div>
                                        <span style={{ fontSize: '11px' }} className="me-2">{item.reason}:</span>
                                        <span style={{ fontSize: '11px', fontWeight: '600' }}>{item.percentage}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bottom section with key metrics */}
                        <div className="mt-4 pt-2 border-top">
                            <div className="row g-2">
                                <div className="col-4">
                                    <div className="text-center">
                                        <div className="fw-bold text-dark" style={{ fontSize: '14px' }}>
                                            {avgHours.toFixed(2)}
                                        </div>
                                        <div className="text-muted" style={{ fontSize: '10px' }}>Avg Downtime</div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="text-center">
                                        <div className="fw-bold text-dark" style={{ fontSize: '14px' }}>
                                            {maxItem.hours}
                                        </div>
                                        <div className="text-muted" style={{ fontSize: '10px' }}>Highest</div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="text-center">
                                        <div className="fw-bold text-dark" style={{ fontSize: '14px' }}>
                                            {minItem.hours}
                                        </div>
                                        <div className="text-muted" style={{ fontSize: '10px' }}>Lowest</div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
                {/* Tooltip */}
                {hoveredSegment && (
                    <div
                        className="position-fixed bg-dark text-white p-2 rounded shadow-sm"
                        style={{
                            left: mousePosition.x + 10,
                            top: mousePosition.y + 10,
                            fontSize: '11px',
                            zIndex: 1000,
                            whiteSpace: 'nowrap'
                        }}
                    >
                        <div className="fw-bold" style={{ color: hoveredSegment.color }}>
                            {hoveredSegment.reason}
                        </div>
                        <div>Hours: <span className="text-warning">{hoveredSegment.hours}h</span></div>
                        <div>Percentage: <span className="text-info">{hoveredSegment.percentage}%</span></div>
                        <div style={{ fontSize: '10px', color: "#5adb90ff" }}>
                            {hoveredSegment.hours}h out of {totalHours}h total
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DowntimeReason;