import React, { useState } from 'react';

const NewOrdersBookedKPI = () => {
    const [hoveredCard, setHoveredCard] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Sample data - replace with your actual data
    const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
    const newOrdersBooked = 42; // 42 new SOs
    const previousMonthOrders = 38; // For comparison
    const growthCount = newOrdersBooked - previousMonthOrders;
    const growthPercentage = ((newOrdersBooked - previousMonthOrders) / previousMonthOrders * 100).toFixed(1);
    const isPositiveGrowth = growthCount > 0;

    // Sample weekly breakdown
    const weeklyData = [
        { week: 'Week 1', orders: 12 },
        { week: 'Week 2', orders: 8 },
        { week: 'Week 3', orders: 15 },
        { week: 'Week 4', orders: 7 }
    ];

    const handleMouseMove = (e) => {
        setMousePosition({
            x: e.clientX,
            y: e.clientY
        });
        setHoveredCard(true);
    };

    const handleMouseLeave = () => {
        setHoveredCard(false);
    };

    return (
        <div className='salescards'>
            <div
                className="card-container"
                style={{
                    border: '1px solid #dee2e6',
                    transition: 'all 0.3s ease',
                    transform: hoveredCard ? 'translateY(-2px)' : 'translateY(0)',
                    boxShadow: hoveredCard ? '0 4px 12px rgba(0,0,0,0.15)' : '0 2px 4px rgba(0,0,0,0.1)'
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <div className="card-body">
                    {/* Title */}
                    <div className="mb-3">
                        <h6 className="text-dark mb-1" style={{ fontSize: '16px', fontWeight: '600' }}>
                            New Orders Booked
                        </h6>
                    </div>

                    {/* Main KPI Value */}
                    <div className="text-center mb-3">
                        <div
                            className="display-4 fw-bold mb-2 d-flex justify-content-center align-items-center"
                            style={{
                                fontSize: '3rem',
                                color: '#17a2b8',
                                textShadow: hoveredCard ? '0 2px 4px rgba(23,162,184,0.3)' : 'none',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {newOrdersBooked}
                            <span
                                className="ms-2"
                                style={{
                                    fontSize: '1.2rem',
                                    color: '#6c757d',
                                    fontWeight: '400'
                                }}
                            >
                                SOs
                            </span>
                        </div>
                        <div
                            className="text-muted"
                            style={{ fontSize: '14px', fontWeight: '500' }}
                        >
                            New Sales Orders
                        </div>
                    </div>

                    {/* Growth Indicator */}
                    <div className="d-flex justify-content-center align-items-center mb-3">
                        <div
                            className={`d-flex align-items-center px-3 py-1 rounded-pill ${isPositiveGrowth ? 'bg-success' : 'bg-danger'}`}
                            style={{ fontSize: '12px', color: 'white', fontWeight: '600' }}
                        >
                            <span className="me-1">
                                {isPositiveGrowth ? '↗' : '↘'}
                            </span>
                            {isPositiveGrowth ? '+' : ''}{growthCount} orders
                            <span className="ms-1" style={{ fontSize: '10px', opacity: 0.8 }}>
                                ({Math.abs(growthPercentage)}%)
                            </span>
                        </div>
                    </div>

                    {/* Additional Stats */}
                    <div className="row text-center mb-3" style={{ backgroundColor: '#f8f9fa', borderRadius: '4px', padding: '12px' }}>
                        <div className="col-6">
                            <div style={{ fontSize: '12px', color: '#6c757d' }}>Previous Month</div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#6c757d' }}>
                                {previousMonthOrders} SOs
                            </div>
                        </div>
                        <div className="col-6">
                            <div style={{ fontSize: '12px', color: '#6c757d' }}>Weekly Average</div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#28a745' }}>
                                {Math.round(newOrdersBooked / 4)} SOs
                            </div>
                        </div>
                    </div>

                    {/* Weekly Breakdown Mini Chart */}
                    <div className="mb-3">
                        <div className="d-flex justify-content-between mb-3">
                            <span style={{ fontSize: '11px', color: '#6c757d' }}>Weekly Distribution</span>
                            <span style={{ fontSize: '11px', color: '#6c757d' }}>Max: {Math.max(...weeklyData.map(w => w.orders))}</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-end" style={{ height: '40px' }}>
                            {weeklyData.map((week, index) => (
                                <div key={index} className="d-flex flex-column align-items-center" style={{ width: '20%' }}>
                                    <div
                                        className="bg-info rounded-top"
                                        style={{
                                            width: '12px',
                                            height: `${(week.orders / Math.max(...weeklyData.map(w => w.orders))) * 30}px`,
                                            minHeight: '4px',
                                            transition: 'all 0.3s ease'
                                        }}
                                    ></div>
                                    <div style={{ fontSize: '8px', color: '#6c757d', marginTop: '2px' }}>
                                        W{index + 1}
                                    </div>
                                    <div style={{ fontSize: '9px', color: '#17a2b8', fontWeight: '600' }}>
                                        {week.orders}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Progress Bar - Monthly Target */}
                    <div className="mb-3">
                        <div className="d-flex justify-content-between mb-1">
                            <span style={{ fontSize: '11px', color: '#6c757d' }}>Monthly Target Progress</span>
                            <span style={{ fontSize: '11px', color: '#6c757d' }}>84%</span>
                        </div>
                        <div className="progress" style={{ height: '6px' }}>
                            <div
                                className="progress-bar bg-info"
                                role="progressbar"
                                style={{ width: '84%' }}
                                aria-valuenow="84"
                                aria-valuemin="0"
                                aria-valuemax="100"
                            ></div>
                        </div>
                    </div>

                    {/* Status Indicator */}
                    <div className="d-flex justify-content-center">
                        <div className="d-flex align-items-center">
                            <div
                                className="rounded-circle me-2"
                                style={{
                                    width: '8px',
                                    height: '8px',
                                    backgroundColor: isPositiveGrowth ? '#28a745' : '#dc3545',
                                    boxShadow: `0 0 0 2px ${isPositiveGrowth ? '#28a74520' : '#dc354520'}`
                                }}
                            ></div>
                            <span style={{ fontSize: '11px', fontWeight: '500' }}>
                                {isPositiveGrowth ? 'Trending Up' : 'Needs Boost'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tooltip */}
            {hoveredCard && (
                <div
                    className="position-fixed bg-dark text-white p-2 rounded shadow-sm"
                    style={{
                        left: mousePosition.x + 10,
                        top: mousePosition.y + 10,
                        fontSize: '11px',
                        whiteSpace: 'nowrap',
                        zIndex: 1000
                    }}
                >
                    <div className="fw-bold text-info">
                        New Orders Breakdown
                    </div>
                    <div>Current Month: <span className="text-warning">{newOrdersBooked} SOs</span></div>
                    <div>Previous Month: <span className="text-success">{previousMonthOrders} SOs</span></div>
                    <div>Growth: <span className={isPositiveGrowth ? 'text-success' : 'text-danger'}>{isPositiveGrowth ? '+' : ''}{growthCount} orders</span></div>
                    <div>Weekly Average: <span className="text-info">{Math.round(newOrdersBooked / 4)} SOs</span></div>
                    <div className="mt-1">
                        <div className="text-muted" style={{ fontSize: '10px' }}>Weekly Distribution:</div>
                        {weeklyData.map((week, index) => (
                            <div key={index} style={{ fontSize: '10px' }}>
                                {week.week}: <span className="text-warning">{week.orders} SOs</span>
                            </div>
                        ))}
                    </div>
                    <div className={`fw-bold ${isPositiveGrowth ? 'text-success' : 'text-warning'}`}>
                        {isPositiveGrowth ? '📈 GROWING' : '📊 STABLE'}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewOrdersBookedKPI;