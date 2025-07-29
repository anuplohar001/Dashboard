import React, { useState } from 'react';

const StockCoverageWarningsKPI = () => {
    const [hoveredCard, setHoveredCard] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [selectedPeriod, setSelectedPeriod] = useState('current');

    // Sample data - replace with your actual data
    const periods = {
        current: { label: 'Current Status', days: 0 },
        week: { label: 'Weekly Trend', days: 7 },
        month: { label: 'Monthly Trend', days: 30 }
    };

    const coverageData = {
        current: {
            criticalItems: 7,
            previousCount: 12,
            totalItems: 450,
            threshold: 5,
            target: 3
        },
        week: {
            criticalItems: 9,
            previousCount: 15,
            totalItems: 450,
            threshold: 5,
            target: 3
        },
        month: {
            criticalItems: 11,
            previousCount: 18,
            totalItems: 450,
            threshold: 5,
            target: 3
        }
    };

    const currentData = coverageData[selectedPeriod];
    const currentPeriod = periods[selectedPeriod];
    const improvementCount = currentData.previousCount - currentData.criticalItems;
    const isImproving = improvementCount > 0;
    const improvementPercentage = currentData.previousCount > 0 ?
        (improvementCount / currentData.previousCount * 100) : 0;
    const isOnTarget = currentData.criticalItems <= currentData.target;
    const coveragePercentage = ((currentData.totalItems - currentData.criticalItems) / currentData.totalItems * 100);

    // Performance categories
    const getPerformanceLevel = (count, target) => {
        if (count === 0) return { level: 'Perfect', color: '#28a745', icon: '🎯' };
        if (count <= target) return { level: 'Good', color: '#20c997', icon: '✅' };
        if (count <= target * 2) return { level: 'Warning', color: '#ffc107', icon: '⚠️' };
        if (count <= target * 3) return { level: 'Critical', color: '#fd7e14', icon: '🔔' };
        return { level: 'Emergency', color: '#dc3545', icon: '🚨' };
    };

    const performance = getPerformanceLevel(currentData.criticalItems, currentData.target);

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
                    height: '20rem',
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
                    <div className="d-flex justify-content-between align-items-start mb-2">
                        <div className="flex-grow-1">
                            <h6 className="text-dark mb-1" style={{ fontSize: '14px', fontWeight: '600', lineHeight: '1.2' }}>
                                Stock Coverage Warnings
                            </h6>
                        </div>
                        <select
                            className="form-select form-select-sm"
                            style={{ width: '80px', fontSize: '10px', padding: '2px 4px' }}
                            value={selectedPeriod}
                            onChange={(e) => setSelectedPeriod(e.target.value)}
                        >
                            <option value="current">Current</option>
                            <option value="week">Week</option>
                            <option value="month">Month</option>
                        </select>
                    </div>

                    {/* Main KPI Value */}
                    <div className="text-center mb-2 flex-grow-1 d-flex flex-column justify-content-center">
                        <div className="mb-1">
                            <span style={{ fontSize: '10px', color: '#6c757d', fontWeight: '500' }}>
                                {currentPeriod.label}
                            </span>
                        </div>
                        <div
                            className="fw-bold mb-1"
                            style={{
                                fontSize: '3rem',
                                color: performance.color,
                                textShadow: hoveredCard ? `0 2px 4px ${performance.color}30` : 'none',
                                transition: 'all 0.3s ease',
                                lineHeight: '1'
                            }}
                        >
                            {currentData.criticalItems}
                        </div>
                        <div
                            className="fw-semibold mb-2"
                            style={{ fontSize: '16px', color: performance.color }}
                        >
                            Items
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
                                {Math.abs(improvementCount)} items
                                <span className="ms-1" style={{ fontSize: '9px', opacity: 0.8 }}>
                                    vs previous
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Comparison Stats */}
                    <div className="row text-center mb-2" style={{ backgroundColor: '#f8f9fa', borderRadius: '4px', padding: '8px', fontSize: '11px' }}>
                        <div className="col-4">
                            <div style={{ fontSize: '9px', color: '#6c757d', lineHeight: '1.2' }}>Previous</div>
                            <div style={{ fontSize: '12px', fontWeight: '600', color: '#6c757d' }}>
                                {currentData.previousCount}
                            </div>
                        </div>
                        <div className="col-4">
                            <div style={{ fontSize: '9px', color: '#6c757d', lineHeight: '1.2' }}>Target</div>
                            <div style={{ fontSize: '12px', fontWeight: '600', color: isOnTarget ? '#28a745' : '#dc3545' }}>
                                ≤{currentData.target}
                            </div>
                        </div>
                        <div className="col-4">
                            <div style={{ fontSize: '9px', color: '#6c757d', lineHeight: '1.2' }}>Coverage</div>
                            <div style={{ fontSize: '12px', fontWeight: '600', color: '#007bff' }}>
                                {coveragePercentage.toFixed(1)}%
                            </div>
                        </div>
                    </div>

                    {/* Additional Alert Info */}
                    {currentData.criticalItems > 0 && (
                        <div className="text-center" style={{ fontSize: '10px', color: performance.color, fontWeight: '500' }}>
                            {performance.icon} {currentData.criticalItems}/{currentData.totalItems} items need attention
                        </div>
                    )}
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
                        Stock Coverage Details
                    </div>
                    <div>Critical Items: <span className="text-warning">{currentData.criticalItems} items</span></div>
                    <div>Previous Count: <span className="text-info">{currentData.previousCount} items</span></div>
                    <div>Target: <span className="text-success">≤{currentData.target} items</span></div>
                    <div>Change: <span className={isImproving ? 'text-success' : 'text-danger'}>
                        {isImproving ? '↗' : '↘'} {Math.abs(improvementCount)} items
                    </span></div>
                    <div>Threshold: <span className="text-info">{currentData.threshold} days coverage</span></div>
                    <div>Total Items: <span className="text-info">{currentData.totalItems} items</span></div>
                    <div>Coverage Rate: <span className="text-success">{coveragePercentage.toFixed(1)}%</span></div>
                    <div className={`fw-bold ${isOnTarget ? 'text-success' : 'text-warning'}`}>
                        {performance.icon} {performance.level.toUpperCase()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default StockCoverageWarningsKPI;