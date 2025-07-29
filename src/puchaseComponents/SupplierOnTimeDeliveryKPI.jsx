import React, { useState } from 'react';

const SupplierOnTimeDeliveryKPI = () => {
    const [hoveredCard, setHoveredCard] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [selectedPeriod, setSelectedPeriod] = useState('month');

    // Sample data - replace with your actual data
    const periods = {
        week: { label: 'This Week', days: 7 },
        month: { label: 'This Month', days: 30 },
        quarter: { label: 'This Quarter', days: 90 }
    };

    const deliveryData = {
        week: {
            currentRate: 87.5,
            previousRate: 82.3,
            onTimeDeliveries: 35,
            totalDeliveries: 40,
            target: 85.0
        },
        month: {
            currentRate: 85.2,
            previousRate: 78.9,
            onTimeDeliveries: 156,
            totalDeliveries: 183,
            target: 85.0
        },
        quarter: {
            currentRate: 83.7,
            previousRate: 79.4,
            onTimeDeliveries: 485,
            totalDeliveries: 579,
            target: 85.0
        }
    };

    const currentData = deliveryData[selectedPeriod];
    const currentPeriod = periods[selectedPeriod];
    const improvementPercentage = ((currentData.currentRate - currentData.previousRate) / currentData.previousRate * 100);
    const isImproving = improvementPercentage > 0;
    const isOnTarget = currentData.currentRate >= currentData.target;

    // Performance categories
    const getPerformanceLevel = (rate) => {
        if (rate >= 95) return { level: 'Excellent', color: '#28a745', icon: '🎯' };
        if (rate >= 90) return { level: 'Very Good', color: '#20c997', icon: '✅' };
        if (rate >= 85) return { level: 'Good', color: '#17a2b8', icon: '👍' };
        if (rate >= 80) return { level: 'Fair', color: '#ffc107', icon: '⚠️' };
        return { level: 'Needs Improvement', color: '#dc3545', icon: '🚨' };
    };

    const performance = getPerformanceLevel(currentData.currentRate);

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
        <div>
            <div
                className="card-container anup purchasecards onlycards"
                style={{
                    height: '18rem',
                    border: '1px solid #dee2e6',
                    transition: 'all 0.3s ease',
                    transform: hoveredCard ? 'translateY(-2px)' : 'translateY(0)',
                    boxShadow: hoveredCard ? '0 4px 12px rgba(0,0,0,0.15)' : '0 2px 4px rgba(0,0,0,0.1)',
                    display: 'flex',
                    flexDirection: 'column'
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <div className=" d-flex flex-column h-100">
                    {/* Title and Period Selector */}
                    <div className="d-flex justify-content-between align-items-start">
                        <div className="flex-grow-1">
                            <h6 className="text-dark mb-1" style={{ fontSize: '14px', fontWeight: '600', lineHeight: '1.2' }}>
                                Supplier On-Time Delivery
                            </h6>
                        </div>
                        <select
                            className="form-select form-select-sm"
                            style={{ width: '75px', fontSize: '10px', padding: '2px 4px' }}
                            value={selectedPeriod}
                            onChange={(e) => setSelectedPeriod(e.target.value)}
                        >
                            <option value="week">Week</option>
                            <option value="month">Month</option>
                            <option value="quarter">Quarter</option>
                        </select>
                    </div>

                    {/* Main KPI Value */}
                    <div className="text-center flex-grow-1 d-flex flex-column justify-content-center">
                        <div className="mb-1">
                            <span style={{ fontSize: '10px', color: '#6c757d', fontWeight: '500' }}>
                                {currentPeriod.label}
                            </span>
                        </div>
                        <div
                            className="fw-bold"
                            style={{
                                fontSize: '3rem',
                                color: performance.color,
                                textShadow: hoveredCard ? `0 2px 4px ${performance.color}30` : 'none',
                                transition: 'all 0.3s ease',
                                lineHeight: '1'
                            }}
                        >
                            {currentData.currentRate.toFixed(1)}
                        </div>
                        <div
                            className="fw-semibold mb-2"
                            style={{ fontSize: '16px', color: performance.color }}
                        >
                            %
                        </div>

                        {/* Performance Badge */}
                        <div className="mb-2">
                            <span
                                className="badge px-2 py-1"
                                style={{
                                    backgroundColor: performance.color + '15',
                                    color: performance.color,
                                    fontSize: '10px',
                                    fontWeight: '600'
                                }}
                            >
                                {performance.icon} {performance.level}
                            </span>
                        </div>

                        {/* Improvement Indicator */}
                        <div className="d-flex justify-content-center align-items-center mb-2">
                            <div
                                className={`d-flex align-items-center px-2 py-1 rounded-pill ${isImproving ? 'bg-success' : 'bg-danger'}`}
                                style={{ fontSize: '10px', color: 'white', fontWeight: '600' }}
                            >
                                <span className="me-1">
                                    {isImproving ? '↗' : '↘'}
                                </span>
                                {Math.abs(improvementPercentage).toFixed(1)}%
                                <span className="ms-1" style={{ fontSize: '9px', opacity: 0.8 }}>
                                    vs last {selectedPeriod}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Comparison Stats */}
                    <div className="row text-center mb-2" style={{ backgroundColor: '#f8f9fa', borderRadius: '4px', padding: '8px', fontSize: '11px' }}>
                        <div className="col-4">
                            <div style={{ fontSize: '9px', color: '#6c757d', lineHeight: '1.2' }}>Previous</div>
                            <div style={{ fontSize: '12px', fontWeight: '600', color: '#6c757d' }}>
                                {currentData.previousRate.toFixed(1)}%
                            </div>
                        </div>
                        <div className="col-4">
                            <div style={{ fontSize: '9px', color: '#6c757d', lineHeight: '1.2' }}>Target</div>
                            <div style={{ fontSize: '12px', fontWeight: '600', color: isOnTarget ? '#28a745' : '#dc3545' }}>
                                {currentData.target.toFixed(1)}%
                            </div>
                        </div>
                        <div className="col-4">
                            <div style={{ fontSize: '9px', color: '#6c757d', lineHeight: '1.2' }}>Deliveries</div>
                            <div style={{ fontSize: '12px', fontWeight: '600', color: '#007bff' }}>
                                {currentData.onTimeDeliveries}/{currentData.totalDeliveries}
                            </div>
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
                        fontSize: '10px',
                        whiteSpace: 'nowrap',
                        zIndex: 1000
                    }}
                >
                    <div className="fw-bold text-info">
                        On-Time Delivery Details
                    </div>
                    <div>Current Rate: <span className="text-warning">{currentData.currentRate.toFixed(1)}%</span></div>
                    <div>Previous: <span className="text-info">{currentData.previousRate.toFixed(1)}%</span></div>
                    <div>Target: <span className="text-success">{currentData.target.toFixed(1)}%</span></div>
                    <div>Improvement: <span className={isImproving ? 'text-success' : 'text-danger'}>
                        {isImproving ? '↗' : '↘'} {Math.abs(improvementPercentage).toFixed(1)}%
                    </span></div>
                    <div>On-Time: <span className="text-info">{currentData.onTimeDeliveries}/{currentData.totalDeliveries} deliveries</span></div>
                    <div className={`fw-bold ${isOnTarget ? 'text-success' : 'text-warning'}`}>
                        {performance.icon} {performance.level.toUpperCase()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SupplierOnTimeDeliveryKPI;