import React, { useState } from 'react';

const MonthlySalesKPI = () => {
    const [hoveredCard, setHoveredCard] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Sample data - replace with your actual data
    const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
    const monthlySales = 2520000; // ₹25,20,000
    const previousMonthSales = 2380000; // For comparison
    const growthPercentage = ((monthlySales - previousMonthSales) / previousMonthSales * 100).toFixed(1);
    const isPositiveGrowth = growthPercentage > 0;

    // Format currency in Indian format
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    // Format number in Indian format (lakhs/crores)
    const formatIndianNumber = (num) => {
        if (num >= 10000000) {
            return `₹${(num / 10000000).toFixed(1)}Cr`;
        } else if (num >= 100000) {
            return `₹${(num / 100000).toFixed(1)}L`;
        } else if (num >= 1000) {
            return `₹${(num / 1000).toFixed(0)}K`;
        }
        return `₹${num}`;
    };

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
                className="card-container anup "
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
                    <div className="mb-1">
                        <h6 className="text-dark mb-1" style={{ fontSize: '16px', fontWeight: '600' }}>
                            Monthly Sales
                        </h6>
                    </div>

                    {/* Main KPI Value */}
                    <div className="text-center mb-1">
                        <div
                            className="display-6 fw-bold mb-2"
                            style={{
                                fontSize: '2.5rem',
                                color: '#007bff',
                                textShadow: hoveredCard ? '0 2px 4px rgba(0,123,255,0.3)' : 'none',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {formatIndianNumber(monthlySales)}
                        </div>
                        <div
                            className="text-muted"
                            style={{ fontSize: '14px', fontWeight: '500' }}
                        >
                            {formatCurrency(monthlySales)}
                        </div>
                    </div>

                    {/* Growth Indicator */}
                    <div className="d-flex justify-content-center align-items-center mb-1">
                        <div
                            className={`d-flex align-items-center px-3 py-1 rounded-pill ${isPositiveGrowth ? 'bg-success' : 'bg-danger'}`}
                            style={{ fontSize: '12px', color: 'white', fontWeight: '600' }}
                        >
                            <span className="me-1">
                                {isPositiveGrowth ? '↗' : '↘'}
                            </span>
                            {Math.abs(growthPercentage)}%
                            <span className="ms-1" style={{ fontSize: '10px', opacity: 0.8 }}>
                                vs last month
                            </span>
                        </div>
                    </div>

                    {/* Additional Stats */}
                    <div className="row text-center" style={{ backgroundColor: '#f8f9fa', borderRadius: '4px', padding: '12px' }}>
                        <div className="col-6">
                            <div style={{ fontSize: '12px', color: '#6c757d' }}>Previous Month</div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#6c757d' }}>
                                {formatIndianNumber(previousMonthSales)}
                            </div>
                        </div>
                        <div className="col-6">
                            <div style={{ fontSize: '12px', color: '#6c757d' }}>Daily Average</div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#28a745' }}>
                                {formatIndianNumber(Math.round(monthlySales / 30))}
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3">
                        <div className="d-flex justify-content-between mb-1">
                            <span style={{ fontSize: '11px', color: '#6c757d' }}>Monthly Target Progress</span>
                            <span style={{ fontSize: '11px', color: '#6c757d' }}>84%</span>
                        </div>
                        <div className="progress" style={{ height: '6px' }}>
                            <div
                                className="progress-bar bg-success"
                                role="progressbar"
                                style={{ width: '84%' }}
                                aria-valuenow="84"
                                aria-valuemin="0"
                                aria-valuemax="100"
                            ></div>
                        </div>
                    </div>

                    {/* Status Indicator */}
                    <div className="d-flex justify-content-center mt-3">
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
                                {isPositiveGrowth ? 'On Track' : 'Needs Attention'}
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
                        Monthly Sales Details
                    </div>
                    <div>Current Month: <span className="text-warning">{formatCurrency(monthlySales)}</span></div>
                    <div>Previous Month: <span className="text-success">{formatCurrency(previousMonthSales)}</span></div>
                    <div>Growth: <span className={isPositiveGrowth ? 'text-success' : 'text-danger'}>{growthPercentage}%</span></div>
                    <div>Daily Average: <span className="text-info">{formatCurrency(Math.round(monthlySales / 30))}</span></div>
                    <div className={`fw-bold ${isPositiveGrowth ? 'text-success' : 'text-warning'}`}>
                        {isPositiveGrowth ? '📈 GROWING' : '📉 DECLINING'}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MonthlySalesKPI;