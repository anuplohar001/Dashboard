import React, { useState } from 'react';

const PendingPRsKPI = () => {
    const [hoveredCard, setHoveredCard] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [selectedPeriod, setSelectedPeriod] = useState('month');

    // Sample data - replace with your actual data
    const periods = {
        week: { label: 'This Week', days: 7 },
        month: { label: 'This Month', days: 30 },
        quarter: { label: 'This Quarter', days: 90 }
    };

    const prData = {
        week: {
            pendingPRs: 8,
            previousPending: 6,
            totalPRs: 15,
            convertedPRs: 7,
            avgProcessingDays: 3.2,
            urgentPRs: 2
        },
        month: {
            pendingPRs: 28,
            previousPending: 22,
            totalPRs: 65,
            convertedPRs: 37,
            avgProcessingDays: 4.5,
            urgentPRs: 8
        },
        quarter: {
            pendingPRs: 42,
            previousPending: 38,
            totalPRs: 187,
            convertedPRs: 145,
            avgProcessingDays: 5.1,
            urgentPRs: 12
        }
    };

    const currentData = prData[selectedPeriod];
    const currentPeriod = periods[selectedPeriod];
    const changeFromPrevious = currentData.pendingPRs - currentData.previousPending;
    const changePercentage = currentData.previousPending > 0 ?
        ((changeFromPrevious) / currentData.previousPending * 100) : 0;
    const isIncreasing = changeFromPrevious > 0;
    const conversionRate = (currentData.convertedPRs / currentData.totalPRs * 100);
    const pendingRate = (currentData.pendingPRs / currentData.totalPRs * 100);

    // Performance categories based on pending PR count
    const getPerformanceLevel = (pendingCount, totalPRs) => {
        const pendingPercentage = (pendingCount / totalPRs) * 100;
        if (pendingPercentage <= 15) return { level: 'Excellent', color: '#28a745', icon: '🎯' };
        if (pendingPercentage <= 30) return { level: 'Good', color: '#20c997', icon: '✅' };
        if (pendingPercentage <= 50) return { level: 'Average', color: '#ffc107', icon: '⚠️' };
        return { level: 'Needs Attention', color: '#dc3545', icon: '🚨' };
    };

    const performance = getPerformanceLevel(currentData.pendingPRs, currentData.totalPRs);

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
                <div className="card-body d-flex flex-column h-100">
                    {/* Title and Period Selector */}
                    <div className="d-flex justify-content-between align-items-start mb-2">
                        <div className="flex-grow-1">
                            <h6 className="text-dark mb-1" style={{ fontSize: '14px', fontWeight: '600', lineHeight: '1.2' }}>
                                Pending Purchase Requisitions
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
                            {currentData.pendingPRs}
                        </div>
                        <div
                            className="fw-semibold mb-2"
                            style={{ fontSize: '16px', color: performance.color }}
                        >
                            PRs Pending
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

                        <div className='d-flex gap-3 justify-content-center'>
                            {/* Change Indicator */}
                            <div className="d-flex justify-content-center align-items-center mb-2">
                                <div
                                    className={`d-flex align-items-center px-2 py-1 rounded-pill ${isIncreasing ? 'bg-warning' : 'bg-success'}`}
                                    style={{ fontSize: '10px', color: 'white', fontWeight: '600' }}
                                >
                                    <span className="me-1">
                                        {isIncreasing ? '↗' : '↘'}
                                    </span>
                                    {changeFromPrevious > 0 ? '+' : ''}{changeFromPrevious}
                                    <span className="ms-1" style={{ fontSize: '9px', opacity: 0.8 }}>
                                        vs last {selectedPeriod}
                                    </span>
                                </div>
                            </div>

                            {/* Urgent PRs Alert */}
                            {currentData.urgentPRs > 0 && (
                                <div className="mb-2">
                                    <span
                                        className="badge px-2 py-1"
                                        style={{
                                            backgroundColor: '#dc354515',
                                            color: '#dc3545',
                                            fontSize: '9px',
                                            fontWeight: '600'
                                        }}
                                    >
                                        🔥 {currentData.urgentPRs} Urgent
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Comparison Stats */}
                    <div className="row text-center mb-2" style={{ backgroundColor: '#f8f9fa', borderRadius: '4px', padding: '8px', fontSize: '11px' }}>
                        <div className="col-4">
                            <div style={{ fontSize: '9px', color: '#6c757d', lineHeight: '1.2' }}>Previous</div>
                            <div style={{ fontSize: '12px', fontWeight: '600', color: '#6c757d' }}>
                                {currentData.previousPending}
                            </div>
                        </div>
                        <div className="col-4">
                            <div style={{ fontSize: '9px', color: '#6c757d', lineHeight: '1.2' }}>Total PRs</div>
                            <div style={{ fontSize: '12px', fontWeight: '600', color: '#007bff' }}>
                                {currentData.totalPRs}
                            </div>
                        </div>
                        <div className="col-4">
                            <div style={{ fontSize: '9px', color: '#6c757d', lineHeight: '1.2' }}>Pending %</div>
                            <div style={{ fontSize: '12px', fontWeight: '600', color: performance.color }}>
                                {pendingRate.toFixed(0)}%
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
                        Pending PRs Details
                    </div>
                    <div>Pending PRs: <span className="text-warning">{currentData.pendingPRs}</span></div>
                    <div>Previous: <span className="text-info">{currentData.previousPending}</span></div>
                    <div>Total PRs: <span className="text-info">{currentData.totalPRs}</span></div>
                    <div>Converted: <span className="text-success">{currentData.convertedPRs}</span></div>
                    <div>Conversion Rate: <span className="text-success">{conversionRate.toFixed(1)}%</span></div>
                    <div>Avg Processing: <span className="text-warning">{currentData.avgProcessingDays} days</span></div>
                    {currentData.urgentPRs > 0 && (
                        <div>Urgent PRs: <span className="text-danger">🔥 {currentData.urgentPRs}</span></div>
                    )}
                    <div className={`fw-bold ${performance.color === '#28a745' ? 'text-success' : performance.color === '#dc3545' ? 'text-danger' : 'text-warning'}`}>
                        {performance.icon} {performance.level.toUpperCase()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PendingPRsKPI;