import React, { useState } from 'react';

const PMvsBMRatio = () => {
    const [hoveredSegment, setHoveredSegment] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });



    // PM vs BM Ratio data
    const pmBmData = [
        { type: 'Preventive Maintenance', count: 30, percentage: 75, color: '#28a745' },
        { type: 'Breakdown Maintenance', count: 10, percentage: 25, color: '#dc3545' }
    ];

    const ratio = pmBmData[0].count / pmBmData[1].count;

    // Function to create SVG path for pie chart
    const createPath = (startAngle, endAngle, innerRadius = 0, outerRadius = 80) => {
        const start = polarToCartesian(0, 0, outerRadius, endAngle);
        const end = polarToCartesian(0, 0, outerRadius, startAngle);
        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

        if (innerRadius === 0) {
            return [
                "M", 0, 0,
                "L", start.x, start.y,
                "A", outerRadius, outerRadius, 0, largeArcFlag, 0, end.x, end.y,
                "Z"
            ].join(" ");
        } else {
            const startInner = polarToCartesian(0, 0, innerRadius, endAngle);
            const endInner = polarToCartesian(0, 0, innerRadius, startAngle);
            return [
                "M", start.x, start.y,
                "A", outerRadius, outerRadius, 0, largeArcFlag, 0, end.x, end.y,
                "L", endInner.x, endInner.y,
                "A", innerRadius, innerRadius, 0, largeArcFlag, 1, startInner.x, startInner.y,
                "Z"
            ].join(" ");
        }
    };

    const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
        const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    };

    const handleMouseMove = (e, segment) => {
        setHoveredSegment(segment);
        setTooltipPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
        setHoveredSegment(null);
    };


    return (
        <div className="col-lg-4 col-md-6 col-12">
            {/* PM vs BM Ratio Card */}
            <div className="card-container">
                <div className=" h-100">
                    <div className="card-header bg-white pb-0">
                        <div className="d-flex justify-content-between align-items-center">
                            <h6 style={{ textAlign: "left", fontWeight: "600" }}>PM vs BM Ratio</h6>
                            <div className="dropdown">
                                <button className="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                    This Quarter
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">This Quarter</a></li>
                                    <li><a className="dropdown-item" href="#">Last Quarter</a></li>
                                    <li><a className="dropdown-item" href="#">This Year</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center align-items-center">
                        <svg width="200" height="200" viewBox="-100 -100 200 200">
                            {pmBmData.map((item, index) => {
                                const startAngle = index === 0 ? 0 : pmBmData[0].percentage * 3.6;
                                const endAngle = index === 0 ? pmBmData[0].percentage * 3.6 : 360;

                                return (
                                    <path
                                        key={index}
                                        d={createPath(startAngle, endAngle)}
                                        fill={item.color}
                                        stroke="white"
                                        strokeWidth="2"
                                        style={{
                                            cursor: 'pointer',
                                            filter: hoveredSegment === item ? 'brightness(1.1)' : 'none',
                                            transition: 'filter 0.2s ease'
                                        }}
                                        onMouseMove={(e) => handleMouseMove(e, item)}
                                        onMouseLeave={handleMouseLeave}
                                    />
                                );
                            })}
                        </svg>
                    </div>
                    <div className='d-flex justify-content-evenly' style={{ fontSize: "15px" }}>
                        <div className='d-flex gap-2' style={{lineHeight:"15px"}}>

                            <div style={{ width: "10px", height: "10px", backgroundColor: "#28a745", borderRadius: "5px" }}></div>Preventive
                        </div>
                        <div className='d-flex gap-2' style={{lineHeight:"15px"}}>

                            <div style={{ width: "10px", height: "10px", backgroundColor: "#dc3545", borderRadius: "5px" }}></div>
                            Breakdown
                        </div>
                    </div>
                </div>
                {/* Bottom section with key metrics */}
                <div className="mt-4 pt-2 border-top">
                    <div className="row g-2">
                        <div className="col-4">
                            <div className="text-center">
                                <div className="fw-bold text-dark" style={{ fontSize: '14px' }}> {pmBmData[0].count}
                                </div>
                                <div className="text-muted" style={{ fontSize: '10px' }}>Preventive Maintenance</div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="text-center">
                                <div className="fw-bold text-dark" style={{ fontSize: '14px' }}>
                                    {pmBmData[1].count}
                                </div>
                                <div className="text-muted" style={{ fontSize: '10px' }}>Breakdown Maintenance</div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="text-center">
                                <div className="fw-bold text-dark" style={{ fontSize: '14px' }}>
                                    {ratio.toFixed(1)}:1
                                </div>
                                <div className="text-muted" style={{ fontSize: '10px' }}>PM to BM Ratio</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Tooltip */}
            {hoveredSegment && (
                <div
                    className="position-fixed bg-dark text-white p-2 rounded shadow-lg"
                    style={{
                        left: tooltipPosition.x + 10,
                        top: tooltipPosition.y - 30,
                        zIndex: 1000,
                        fontSize: '12px',
                        pointerEvents: 'none'
                    }}
                >
                    <div className="fw-bold">{hoveredSegment.reason || hoveredSegment.type}</div>
                    <div>
                        {hoveredSegment.percentage}%
                        {hoveredSegment.value && ` (${hoveredSegment.value})`}
                        {hoveredSegment.count && ` - ${hoveredSegment.count} jobs`}
                    </div>
                </div>
            )}
        </div>

    );
};

export default PMvsBMRatio;