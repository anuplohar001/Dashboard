import React, { useState } from 'react';

const TopPerformingSalespersonKPI = () => {
    const [hoveredCard, setHoveredCard] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Sample data - replace with your actual data
    const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
    const topSalesperson = {
        name: 'Mr. A. Gupta',
        totalValue: 650000, // ₹6.5L
        ordersCount: 12,
        previousMonthValue: 580000, // ₹5.8L for comparison
        region: 'North Zone'
    };

    const formatCurrency = (amount) => {
        if (amount >= 10000000) {
            return `₹${(amount / 10000000).toFixed(1)}Cr`;
        } else if (amount >= 100000) {
            return `₹${(amount / 100000).toFixed(1)}L`;
        } else if (amount >= 1000) {
            return `₹${(amount / 1000).toFixed(1)}K`;
        } else {
            return `₹${amount}`;
        }
    };

    const growthAmount = topSalesperson.totalValue - topSalesperson.previousMonthValue;
    const growthPercentage = ((growthAmount / topSalesperson.previousMonthValue) * 100).toFixed(1);
    const isPositiveGrowth = growthAmount > 0;

    // Sample top 3 salespeople for comparison
    const topSalespeople = [
        { name: 'Mr. A. Gupta', value: 650000, orders: 12 },
        { name: 'Ms. P. Sharma', value: 540000, orders: 9 },
        { name: 'Mr. R. Singh', value: 480000, orders: 8 }
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
                            Top Performing Salesperson
                        </h6>
                        
                    </div>

                    {/* Salesperson Name */}
                    <div className="text-center mb-3">
                        <div
                            className="mb-2"
                            style={{
                                fontSize: '1.4rem',
                                fontWeight: '700',
                                color: '#495057',
                                textShadow: hoveredCard ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {topSalesperson.name}
                        </div>
                        <div
                            className="text-muted mb-2"
                            style={{ fontSize: '12px', fontWeight: '500' }}
                        >
                            {topSalesperson.region}
                        </div>
                    </div>

                    {/* Main KPI Value */}
                    <div className="text-center mb-3">
                        <div
                            className="display-4 fw-bold mb-2 d-flex justify-content-center align-items-center"
                            style={{
                                fontSize: '2.8rem',
                                color: '#28a745',
                                textShadow: hoveredCard ? '0 2px 4px rgba(40,167,69,0.3)' : 'none',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {formatCurrency(topSalesperson.totalValue)}
                        </div>
                        <div
                            className="text-muted"
                            style={{ fontSize: '14px', fontWeight: '500' }}
                        >
                            Total Order Value
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
                            {isPositiveGrowth ? '+' : ''}{formatCurrency(Math.abs(growthAmount))}
                            <span className="ms-1" style={{ fontSize: '10px', opacity: 0.8 }}>
                                ({Math.abs(growthPercentage)}%)
                            </span>
                        </div>
                    </div>

                    {/* Additional Stats */}
                    <div className="row text-center mb-3" style={{ backgroundColor: '#f8f9fa', borderRadius: '4px', padding: '12px' }}>
                        <div className="col-6">
                            <div style={{ fontSize: '12px', color: '#6c757d' }}>Orders Count</div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#17a2b8' }}>
                                {topSalesperson.ordersCount}
                            </div>
                        </div>
                        <div className="col-6">
                            <div style={{ fontSize: '12px', color: '#6c757d' }}>Avg Order Value</div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#28a745' }}>
                                {formatCurrency(Math.round(topSalesperson.totalValue / topSalesperson.ordersCount))}
                            </div>
                        </div>
                    </div>

                    {/* Top 3 Salespeople Mini Chart */}
                    <div className="mb-3">
                        <div className="d-flex justify-content-between mb-4">
                            <span style={{ fontSize: '11px', color: '#6c757d' }}>Top 3 Performers</span>
                            <span style={{ fontSize: '11px', color: '#6c757d' }}>This Month</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-end" style={{ height: '50px' }}>
                            {topSalespeople.map((person, index) => (
                                <div key={index} className="d-flex flex-column align-items-center" style={{ width: '30%' }}>
                                    <div
                                        className={`rounded-top ${index === 0 ? 'bg-warning' : index === 1 ? 'bg-info' : 'bg-secondary'}`}
                                        style={{
                                            width: '20px',
                                            height: `${(person.value / topSalespeople[0].value) * 40}px`,
                                            minHeight: '8px',
                                            transition: 'all 0.3s ease'
                                        }}
                                    ></div>
                                    <div style={{ fontSize: '8px', color: '#6c757d', marginTop: '2px', textAlign: 'center' }}>
                                        {person.name.split(' ')[1]}
                                    </div>
                                    <div style={{ fontSize: '9px', color: '#28a745', fontWeight: '600' }}>
                                        {formatCurrency(person.value)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Performance Bar - vs Previous Month */}
                    <div className="mb-3">
                        <div className="d-flex justify-content-between mb-1">
                            <span style={{ fontSize: '11px', color: '#6c757d' }}>vs Previous Month</span>
                            <span style={{ fontSize: '11px', color: '#6c757d' }}>
                                {formatCurrency(topSalesperson.previousMonthValue)}
                            </span>
                        </div>
                        <div className="progress" style={{ height: '6px' }}>
                            <div
                                className="progress-bar bg-success"
                                role="progressbar"
                                style={{ width: `${Math.min((topSalesperson.totalValue / topSalesperson.previousMonthValue) * 100, 100)}%` }}
                                aria-valuenow={Math.min((topSalesperson.totalValue / topSalesperson.previousMonthValue) * 100, 100)}
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
                                    backgroundColor: '#ffc107',
                                    boxShadow: '0 0 0 2px #ffc10720'
                                }}
                            ></div>
                            <span style={{ fontSize: '11px', fontWeight: '500' }}>
                                🏆 Top Performer
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
                    <div className="fw-bold text-warning">
                        {topSalesperson.name} - Performance
                    </div>
                    <div>Total Orders: <span className="text-info">{topSalesperson.ordersCount}</span></div>
                    <div>Order Value: <span className="text-success">{formatCurrency(topSalesperson.totalValue)}</span></div>
                    <div>Previous Month: <span className="text-muted">{formatCurrency(topSalesperson.previousMonthValue)}</span></div>
                    <div>Growth: <span className={isPositiveGrowth ? 'text-success' : 'text-danger'}>{isPositiveGrowth ? '+' : ''}{formatCurrency(Math.abs(growthAmount))}</span></div>
                    <div>Avg Order: <span className="text-info">{formatCurrency(Math.round(topSalesperson.totalValue / topSalesperson.ordersCount))}</span></div>
                    <div className="mt-1">
                        <div className="text-muted" style={{ fontSize: '10px' }}>Top 3 This Month:</div>
                        {topSalespeople.map((person, index) => (
                            <div key={index} style={{ fontSize: '10px' }}>
                                {index + 1}. {person.name}: <span className="text-warning">{formatCurrency(person.value)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="fw-bold text-warning">
                        🏆 CHAMPION
                    </div>
                </div>
            )}
        </div>
    );
};

export default TopPerformingSalespersonKPI;