import React, { useState } from 'react';

const MaintenanceRequestsChart = () => {
    const [hoveredBar, setHoveredBar] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const maintenanceData = [
        { label: "HVAC", open: 6, closed: 24 },
        { label: "Electrical", open: 4, closed: 30 },
        { label: "Plumbing", open: 10, closed: 18 },
        { label: "Others", open: 12, closed: 18 },
        { label: "General", open: 7, closed: 33 },
    ];

    const chartHeight = 250;
    const barWidth = 40;
    const barSpacing = 80;
    const maxValue = Math.max(...maintenanceData.map(item => item.open + item.closed));

    // Calculate totals
    const totals = {
        open: maintenanceData.reduce((sum, item) => sum + item.open, 0),
        closed: maintenanceData.reduce((sum, item) => sum + item.closed, 0)
    };
    const grandTotal = totals.open + totals.closed;

    const handleMouseMove = (e, category, type) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: e.clientX + 10,
            y: e.clientY - 10
        });
        setHoveredBar({ category, type });
    };

    const handleMouseLeave = () => {
        setHoveredBar(null);
    };

    return (
        <div className='col-lg-6 col-md-6 col-12'>
            <div >
                <div className="card-container shadow-sm p-3">
                    <h6 style={{ textAlign: "left", fontWeight: "600" }}>Open vs Closed Maintenance Requests</h6>
                    <div className="">

                        {/* Chart Container */}
                        <div className="d-flex" style={{overflow:"scroll"}}>
                            <div>

                                {/* SVG Chart */}
                                <svg width="500" height="310" >
                                    {/* Y-axis */}
                                    <line x1="60" y1="22" x2="60" y2="270" stroke="#6c757d" strokeWidth="2" />

                                    {/* X-axis */}
                                    <line x1="60" y1="270" x2="450" y2="270" stroke="#6c757d" strokeWidth="2" />

                                    {/* Y-axis Labels and Grid Lines */}
                                    {[0, 10, 20, 30, 40].map((value) => (
                                        <g key={value}>
                                            <text
                                                x="55"
                                                y={270 - (value / maxValue) * chartHeight + 5}
                                                textAnchor="end"
                                                fontSize="11"
                                                fill="#6c757d"
                                            >
                                                {value}
                                            </text>
                                            <line
                                                x1="58"
                                                y1={270 - (value / maxValue) * chartHeight}
                                                x2="450"
                                                y2={270 - (value / maxValue) * chartHeight}
                                                stroke="#dadadaff"
                                                strokeWidth="1"
                                            />
                                        </g>
                                    ))}

                                    {/* Stacked Bars */}
                                    {maintenanceData.map((item, index) => {
                                        const x = 80 + index * barSpacing;
                                        const total = item.open + item.closed;
                                        const closedHeight = (item.closed / maxValue) * chartHeight;
                                        const openHeight = (item.open / maxValue) * chartHeight;

                                        return (
                                            <g key={item.label}>
                                                {/* Closed Requests (Bottom) */}
                                                <rect
                                                    x={x}
                                                    y={270 - closedHeight}
                                                    width={barWidth}
                                                    height={closedHeight}
                                                    fill="#17da45ff"
                                                    stroke="#27e052ff"
                                                    rx={5}
                                                    strokeWidth="1"
                                                    style={{ cursor: 'pointer' }}
                                                    onMouseMove={(e) => handleMouseMove(e, item.label, 'closed')}
                                                    onMouseLeave={handleMouseLeave}
                                                />

                                                {/* Open Requests (Top) */}
                                                <rect
                                                    x={x}
                                                    y={270 - closedHeight - openHeight}
                                                    width={barWidth}
                                                    height={openHeight}
                                                    fill="#e73f50ff"
                                                    stroke="#e63748ff"
                                                    strokeWidth="1"
                                                    rx={5}
                                                    style={{ cursor: 'pointer' }}
                                                    onMouseMove={(e) => handleMouseMove(e, item.label, 'open')}
                                                    onMouseLeave={handleMouseLeave}
                                                />

                                                {/* Category Label */}
                                                <text
                                                    x={x + barWidth / 2}
                                                    y="290"
                                                    textAnchor="middle"
                                                    fontSize="11"
                                                    fontWeight="bold"
                                                    fill="#495057"
                                                >
                                                    {item.label}
                                                </text>

                                                {/* Total count on top of bar */}
                                                <text
                                                    x={x + barWidth / 2}
                                                    y={270 - closedHeight - openHeight - 5}
                                                    textAnchor="middle"
                                                    fontSize="10"
                                                    fontWeight="bold"
                                                    fill="#495057"
                                                >
                                                    {total}
                                                </text>
                                            </g>
                                        );
                                    })}

                                    {/* Y-axis Label */}
                                    <text
                                        x="25"
                                        y="185"
                                        textAnchor="middle"
                                        fontSize="12"
                                        fill="#6c757d"
                                        transform="rotate(-90, 25, 185)"
                                    >
                                        Number of Requests
                                    </text>
                                </svg>


                            </div>
                        </div>
                        

                        {/* Bottom section with key metrics */}
                        <div className="mt-1 pt-2 border-top">
                            <div className="row g-2">
                                <div className="col-4">
                                    <div className="text-center">
                                        <div className="fw-bold text-dark" style={{ fontSize: '14px' }}>
                                            {totals.open}
                                        </div>
                                        <div className="text-muted" style={{ fontSize: '10px' }}>Total Open</div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="text-center">
                                        <div className="fw-bold text-dark" style={{ fontSize: '14px' }}>
                                            {totals.closed}
                                        </div>
                                        <div className="text-muted" style={{ fontSize: '10px' }}>Total Closed</div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="text-center">
                                        <div className="fw-bold text-dark" style={{ fontSize: '14px' }}>
                                            {grandTotal}
                                        </div>
                                        <div className="text-muted" style={{ fontSize: '10px' }}>Grand Total</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Hover Tooltip */}
            {hoveredBar && (
                <div
                    className="position-fixed bg-dark text-white px-3 py-2 rounded shadow"
                    style={{
                        left: mousePosition.x,
                        top: mousePosition.y,
                        zIndex: 1000,
                        pointerEvents: 'none',
                        fontSize: '14px'
                    }}
                >
                    <div className="fw-bold">
                        {hoveredBar.category} - {hoveredBar.type === 'open' ? 'Open' : 'Closed'} Requests
                    </div>
                    <div>
                        Count: {hoveredBar.type === 'open'
                            ? maintenanceData.find(item => item.label === hoveredBar.category)?.open
                            : maintenanceData.find(item => item.label === hoveredBar.category)?.closed}
                    </div>
                    <div>
                        Category Total: {(() => {
                            const item = maintenanceData.find(item => item.label === hoveredBar.category);
                            return item ? item.open + item.closed : 0;
                        })()}
                    </div>
                    <div>
                        Completion Rate: {(() => {
                            const item = maintenanceData.find(item => item.label === hoveredBar.category);
                            return item ? ((item.closed / (item.open + item.closed)) * 100).toFixed(1) + '%' : '0%';
                        })()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MaintenanceRequestsChart;