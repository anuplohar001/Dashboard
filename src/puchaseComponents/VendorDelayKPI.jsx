import React, { useState } from 'react';

const VendorDelayKPI = () => {
    const [hoveredCard, setHoveredCard] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [selectedPeriod, setSelectedPeriod] = useState('month');

    // Sample data - replace with your actual data
    const periods = {
        week: { label: 'This Week', days: 7 },
        month: { label: 'This Month', days: 30 },
        quarter: { label: 'This Quarter', days: 90 }
    };

    const vendorData = {
        week: {
            delayedVendors: 8,
            totalActiveVendors: 35,
            previousDelayedVendors: 12,
            target: 20.0,
            topDelayedVendors: [
                { name: 'ABC Corp', delays: 3 },
                { name: 'XYZ Ltd', delays: 2 },
                { name: 'Tech Solutions', delays: 2 }
            ]
        },
        month: {
            delayedVendors: 12,
            totalActiveVendors: 40,
            previousDelayedVendors: 18,
            target: 25.0,
            topDelayedVendors: [
                { name: 'ABC Corp', delays: 5 },
                { name: 'Global Supplies', delays: 4 },
                { name: 'XYZ Ltd', delays: 3 },
                { name: 'Tech Solutions', delays: 3 },
                { name: 'Prime Materials', delays: 2 }
            ]
        },
        quarter: {
            delayedVendors: 22,
            totalActiveVendors: 45,
            previousDelayedVendors: 28,
            target: 30.0,
            topDelayedVendors: [
                { name: 'ABC Corp', delays: 8 },
                { name: 'Global Supplies', delays: 6 },
                { name: 'XYZ Ltd', delays: 5 },
                { name: 'Tech Solutions', delays: 4 },
                { name: 'Prime Materials', delays: 3 }
            ]
        }
    };

    const currentData = vendorData[selectedPeriod];
    const currentPeriod = periods[selectedPeriod];
    const currentDelayPercentage = (currentData.delayedVendors / currentData.totalActiveVendors * 100);
    const previousDelayPercentage = (currentData.previousDelayedVendors / currentData.totalActiveVendors * 100);
    const improvementPercentage = ((previousDelayPercentage - currentDelayPercentage) / previousDelayPercentage * 100);
    const isImproving = improvementPercentage > 0;
    const isOnTarget = currentDelayPercentage <= currentData.target;
    const onTimeVendors = currentData.totalActiveVendors - currentData.delayedVendors;
    const onTimePercentage = 100 - currentDelayPercentage;

    // Performance categories
    const getPerformanceLevel = (percentage) => {
        if (percentage <= 10) return { level: 'Excellent', color: '#28a745', icon: '🎯' };
        if (percentage <= 20) return { level: 'Good', color: '#20c997', icon: '✅' };
        if (percentage <= 30) return { level: 'Fair', color: '#ffc107', icon: '⚠️' };
        if (percentage <= 40) return { level: 'Poor', color: '#fd7e14', icon: '🔔' };
        return { level: 'Critical', color: '#dc3545', icon: '🚨' };
    };

    const performance = getPerformanceLevel(currentDelayPercentage);

    // Donut chart calculations
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const delayArc = (currentDelayPercentage / 100) * circumference;
    const onTimeArc = circumference - delayArc;

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
                className="card-container anup purchasecards"
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
                <div className="card-body d-flex flex-column h-100">
                    {/* Title and Period Selector */}
                    <div className="d-flex justify-content-between align-items-start mb-1">
                        <div className="flex-grow-1">
                            <h6 className="text-dark mb-1" style={{ fontSize: '14px', fontWeight: '600', lineHeight: '1.2' }}>
                                Vendor Delay %
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

                    {/* Donut Chart with KPI Value */}
                    <div className="text-center mb-1 flex-grow-1 d-flex flex-column justify-content-center">
                        <div className="mb-1">
                            <span style={{ fontSize: '10px', color: '#6c757d', fontWeight: '500' }}>
                                {currentPeriod.label}
                            </span>
                        </div>
                        
                        {/* SVG Donut Chart */}
                        <div className="d-flex justify-content-center mb-1">
                            <div style={{ position: 'relative' }}>
                                <svg width="90" height="90" style={{ transform: 'rotate(-90deg)' }}>
                                    {/* Background circle */}
                                    <circle
                                        cx="45"
                                        cy="45"
                                        r={radius}
                                        fill="none"
                                        stroke="#f8f9fa"
                                        strokeWidth="13"
                                    />
                                    {/* On-time arc */}
                                    <circle
                                        cx="45"
                                        cy="45"
                                        r={radius}
                                        fill="none"
                                        stroke="#28a745"
                                        strokeWidth="13"
                                        strokeDasharray={`${onTimeArc} ${circumference}`}
                                        strokeLinecap="round"
                                    />
                                    {/* Delay arc */}
                                    <circle
                                        cx="45"
                                        cy="45"
                                        r={radius}
                                        fill="none"
                                        stroke={performance.color}
                                        strokeWidth="13"
                                        strokeDasharray={`${delayArc} ${circumference}`}
                                        strokeDashoffset={-onTimeArc}
                                    />
                                </svg>
                                {/* Center text */}
                                <div style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    textAlign: 'center'
                                }}>
                                    <div
                                        className="fw-bold"
                                        style={{
                                            fontSize: '1rem',
                                            color: performance.color,
                                            lineHeight: '1'
                                        }}
                                    >
                                        {currentDelayPercentage.toFixed(1)}%
                                    </div>
                                </div>
                            </div>
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
                            <div style={{ fontSize: '9px', color: '#6c757d', lineHeight: '1.2' }}>Delayed</div>
                            <div style={{ fontSize: '12px', fontWeight: '600', color: performance.color }}>
                                {currentData.delayedVendors}/{currentData.totalActiveVendors}
                            </div>
                        </div>
                        <div className="col-4">
                            <div style={{ fontSize: '9px', color: '#6c757d', lineHeight: '1.2' }}>Target</div>
                            <div style={{ fontSize: '12px', fontWeight: '600', color: isOnTarget ? '#28a745' : '#dc3545' }}>
                                ≤{currentData.target}%
                            </div>
                        </div>
                        <div className="col-4">
                            <div style={{ fontSize: '9px', color: '#6c757d', lineHeight: '1.2' }}>On-Time</div>
                            <div style={{ fontSize: '12px', fontWeight: '600', color: '#28a745' }}>
                                {onTimePercentage.toFixed(1)}%
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
                        Vendor Delay Details
                    </div>
                    <div>Delay Rate: <span className="text-warning">{currentDelayPercentage.toFixed(1)}%</span></div>
                    <div>Delayed Vendors: <span className="text-danger">{currentData.delayedVendors}</span></div>
                    <div>Total Vendors: <span className="text-info">{currentData.totalActiveVendors}</span></div>
                    <div>On-Time Vendors: <span className="text-success">{onTimeVendors}</span></div>
                    <div>Target: <span className="text-success">≤{currentData.target}%</span></div>
                    <div>Improvement: <span className={isImproving ? 'text-success' : 'text-danger'}>
                        {isImproving ? '↗' : '↘'} {Math.abs(improvementPercentage).toFixed(1)}%
                    </span></div>
                    <div className="fw-bold text-info mt-1">Top Delayed:</div>
                    {currentData.topDelayedVendors.slice(0, 3).map((vendor, index) => (
                        <div key={index} style={{ fontSize: '9px' }}>
                            <span className="text-warning">{vendor.name}</span>: {vendor.delays} delays
                        </div>
                    ))}
                    <div className={`fw-bold ${isOnTarget ? 'text-success' : 'text-warning'}`}>
                        {performance.icon} {performance.level.toUpperCase()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default VendorDelayKPI;