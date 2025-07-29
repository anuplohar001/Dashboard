import React, { useState } from 'react';

const CustomerOrderFrequencyKPI = () => {
    const [hoveredCard, setHoveredCard] = useState(false);
    const [hoveredCustomer, setHoveredCustomer] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [selectedPeriod, setSelectedPeriod] = useState('quarter');

    // Sample data - replace with your actual data
    const periods = {
        quarter: { label: 'This Quarter', days: 90 },
        month: { label: 'This Month', days: 30 },
        year: { label: 'This Year', days: 365 }
    };

    const customerData = [
        { id: 1, name: 'ABC Ltd.', orders: 15, lastOrder: '2 days ago', trend: 'up', avgDays: 6, totalValue: 2500000 },
        { id: 2, name: 'XYZ Corp.', orders: 12, lastOrder: '1 day ago', trend: 'up', avgDays: 7.5, totalValue: 1800000 },
        { id: 3, name: 'Tech Solutions', orders: 8, lastOrder: '5 days ago', trend: 'stable', avgDays: 11.25, totalValue: 1200000 },
        { id: 4, name: 'Global Enterprises', orders: 6, lastOrder: '3 days ago', trend: 'down', avgDays: 15, totalValue: 950000 },
        { id: 5, name: 'Smart Systems', orders: 5, lastOrder: '7 days ago', trend: 'stable', avgDays: 18, totalValue: 750000 },
    ];

    const currentPeriod = periods[selectedPeriod];
    const totalOrders = customerData.reduce((sum, customer) => sum + customer.orders, 0);
    const avgFrequency = (totalOrders / customerData.length).toFixed(1);
    const topCustomer = customerData[0];

    // Format currency in Indian format
    const formatCurrency = (amount) => {
        if (amount >= 10000000) {
            return `₹${(amount / 10000000).toFixed(1)}Cr`;
        } else if (amount >= 100000) {
            return `₹${(amount / 100000).toFixed(1)}L`;
        } else if (amount >= 1000) {
            return `₹${(amount / 1000).toFixed(0)}K`;
        }
        return `₹${amount}`;
    };

    const getTrendIcon = (trend) => {
        switch (trend) {
            case 'up': return '📈';
            case 'down': return '📉';
            case 'stable': return '➡️';
            default: return '➡️';
        }
    };

    const getTrendColor = (trend) => {
        switch (trend) {
            case 'up': return '#28a745';
            case 'down': return '#dc3545';
            case 'stable': return '#ffc107';
            default: return '#6c757d';
        }
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
        setHoveredCustomer(null);
    };

    const handleCustomerHover = (customer, e) => {
        setHoveredCustomer(customer);
        setMousePosition({
            x: e.clientX,
            y: e.clientY
        });
    };

    return (
        <div>
            <div
                className="card-container anup salescards"
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
                    {/* Title and Period Selector */}
                    <div className="d-flex justify-content-between align-items-start mb-1">
                        <div>
                            <h6 className="text-dark mb-1" style={{ fontSize: '16px', fontWeight: '600' }}>
                                Customer Order Frequency
                            </h6>
                        </div>
                        <select
                            className="form-select form-select-sm"
                            style={{ width: 'auto', fontSize: '12px' }}
                            value={selectedPeriod}
                            onChange={(e) => setSelectedPeriod(e.target.value)}
                        >
                            <option value="quarter">This Quarter</option>
                            <option value="month">This Month</option>
                            <option value="year">This Year</option>
                        </select>
                    </div>

                    {/* Main KPI Values */}
                    <div className="row text-center mb-1">
                        <div className="col-4">
                            <div
                                className="fw-bold mb-1"
                                style={{
                                    fontSize: '1.8rem',
                                    color: '#007bff',
                                    textShadow: hoveredCard ? '0 2px 4px rgba(0,123,255,0.3)' : 'none',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {topCustomer.orders}
                            </div>
                            <div className="text-muted" style={{ fontSize: '11px' }}>
                                Top Customer
                            </div>
                        </div>
                        <div className="col-4">
                            <div
                                className="fw-bold mb-1"
                                style={{
                                    fontSize: '1.8rem',
                                    color: '#28a745',
                                    textShadow: hoveredCard ? '0 2px 4px rgba(40,167,69,0.3)' : 'none',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {avgFrequency}
                            </div>
                            <div className="text-muted" style={{ fontSize: '11px' }}>
                                Avg Frequency
                            </div>
                        </div>
                        <div className="col-4">
                            <div
                                className="fw-bold mb-1"
                                style={{
                                    fontSize: '1.8rem',
                                    color: '#6f42c1',
                                    textShadow: hoveredCard ? '0 2px 4px rgba(111,66,193,0.3)' : 'none',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {totalOrders}
                            </div>
                            <div className="text-muted" style={{ fontSize: '11px' }}>
                                Total Orders
                            </div>
                        </div>
                    </div>

                    {/* Customer Frequency Table */}
                    <div className="mb-1">
                        <div className="d-flex justify-content-center align-items-center mb-1">
                            <span style={{ fontSize: '13px', fontWeight: '600', color: '#495057' }}>
                                Top Customers - {currentPeriod.label}
                            </span>
                        </div>

                        <div style={{ backgroundColor: '#f8f9fa', borderRadius: '6px', overflow: 'hidden' }}>
                            {customerData.map((customer, index) => (
                                <div
                                    key={customer.id}
                                    className="d-flex justify-content-between align-items-center"
                                    style={{
                                        padding: '5px 12px',
                                        borderBottom: index < customerData.length - 1 ? '1px solid #e9ecef' : 'none',
                                        transition: 'all 0.2s ease',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => handleCustomerHover(customer, e)}
                                    onMouseLeave={() => setHoveredCustomer(null)}
                                    onMouseMove={(e) => hoveredCustomer?.id === customer.id && handleCustomerHover(customer, e)}
                                >
                                    <div className="d-flex align-items-center flex-grow-1">
                                        <div
                                            className="rounded-circle me-2 d-flex align-items-center justify-content-center"
                                            style={{
                                                width: '24px',
                                                height: '24px',
                                                backgroundColor: index === 0 ? '#007bff' : index === 1 ? '#28a745' : '#6c757d',
                                                color: 'white',
                                                fontSize: '10px',
                                                fontWeight: '600'
                                            }}
                                        >
                                            {index + 1}
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '13px', fontWeight: '500', color: '#212529' }}>
                                                {customer.name}
                                            </div>
                                            <div style={{ fontSize: '10px', color: '#6c757d' }}>
                                                Last order: {customer.lastOrder}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-end">
                                        <div className="d-flex align-items-center justify-content-end mb-1">
                                            <span
                                                className="fw-bold me-1"
                                                style={{
                                                    fontSize: '16px',
                                                    color: index === 0 ? '#007bff' : '#212529'
                                                }}
                                            >
                                                {customer.orders}
                                            </span>
                                            <span style={{ fontSize: '10px', color: getTrendColor(customer.trend) }}>
                                                {getTrendIcon(customer.trend)}
                                            </span>
                                        </div>
                                        <div style={{ fontSize: '10px', color: '#6c757d' }}>
                                            ~{customer.avgDays} days apart
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Summary Stats */}
                    <div className="row text-center" style={{ backgroundColor: '#f8f9fa', borderRadius: '4px', padding: '12px' }}>
                        <div className="col-4">
                            <div style={{ fontSize: '12px', color: '#6c757d' }}>Period</div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#6c757d' }}>
                                {currentPeriod.days} days
                            </div>
                        </div>
                        <div className="col-4">
                            <div style={{ fontSize: '12px', color: '#6c757d' }}>Active Customers</div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#28a745' }}>
                                {customerData.length}
                            </div>
                        </div>
                        <div className="col-4">
                            <div style={{ fontSize: '12px', color: '#6c757d' }}>Repeat Rate</div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#007bff' }}>
                                {((customerData.filter(c => c.orders > 1).length / customerData.length) * 100).toFixed(0)}%
                            </div>
                        </div>
                    </div>

                    {/* Status Indicator */}
                    <div className="d-flex justify-content-center mt-2">
                        <div className="d-flex align-items-center">
                            <div
                                className="rounded-circle me-2"
                                style={{
                                    width: '8px',
                                    height: '8px',
                                    backgroundColor: avgFrequency > 8 ? '#28a745' : avgFrequency > 5 ? '#ffc107' : '#dc3545',
                                    boxShadow: `0 0 0 2px ${avgFrequency > 8 ? '#28a74520' : avgFrequency > 5 ? '#ffc10720' : '#dc354520'}`
                                }}
                            ></div>
                            <span style={{ fontSize: '11px', fontWeight: '500' }}>
                                {avgFrequency > 8 ? 'Excellent Frequency' : avgFrequency > 5 ? 'Good Frequency' : 'Needs Improvement'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Tooltip */}
            {hoveredCard && !hoveredCustomer && (
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
                        Order Frequency Summary
                    </div>
                    <div>Period: <span className="text-warning">{currentPeriod.label}</span></div>
                    <div>Top Customer: <span className="text-success">{topCustomer.name} ({topCustomer.orders} orders)</span></div>
                    <div>Average Frequency: <span className="text-info">{avgFrequency} orders</span></div>
                    <div>Total Orders: <span className="text-warning">{totalOrders}</span></div>
                    <div className={`fw-bold ${avgFrequency > 8 ? 'text-success' : avgFrequency > 5 ? 'text-warning' : 'text-danger'}`}>
                        {avgFrequency > 8 ? '🎯 EXCELLENT' : avgFrequency > 5 ? '📊 GOOD' : '⚠️ NEEDS ATTENTION'}
                    </div>
                </div>
            )}

            {/* Customer Detail Tooltip */}
            {hoveredCustomer && (
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
                        {hoveredCustomer.name}
                    </div>
                    <div>Orders: <span className="text-warning">{hoveredCustomer.orders} this {selectedPeriod}</span></div>
                    <div>Frequency: <span className="text-success">Every ~{hoveredCustomer.avgDays} days</span></div>
                    <div>Total Value: <span className="text-info">{formatCurrency(hoveredCustomer.totalValue)}</span></div>
                    <div>Last Order: <span className="text-warning">{hoveredCustomer.lastOrder}</span></div>
                    <div className={`fw-bold`} style={{ color: getTrendColor(hoveredCustomer.trend) }}>
                        {getTrendIcon(hoveredCustomer.trend)} {hoveredCustomer.trend.toUpperCase()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomerOrderFrequencyKPI;