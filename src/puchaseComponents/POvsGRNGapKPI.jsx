import React, { useState } from 'react';

const POvsGRNGapKPI = () => {
    const [hoveredCard, setHoveredCard] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [selectedPeriod, setSelectedPeriod] = useState('month');

    // Sample data - replace with your actual data
    const periods = {
        week: { label: 'This Week', days: 7 },
        month: { label: 'This Month', days: 30 },
        quarter: { label: 'This Quarter', days: 90 }
    };

    const gapData = {
        week: {
            currentGap: 3.8,
            previousGap: 4.2,
            totalPOs: 28,
            completedPOs: 24,
            target: 3.5
        },
        month: {
            currentGap: 4.2,
            previousGap: 4.8,
            totalPOs: 142,
            completedPOs: 128,
            target: 4.0
        },
        quarter: {
            currentGap: 4.5,
            previousGap: 5.1,
            totalPOs: 425,
            completedPOs: 398,
            target: 4.2
        }
    };

    const currentData = gapData[selectedPeriod];
    const currentPeriod = periods[selectedPeriod];
    const improvementPercentage = ((currentData.previousGap - currentData.currentGap) / currentData.previousGap * 100);
    const isImproving = improvementPercentage > 0;
    const targetAchievement = ((currentData.target - Math.abs(currentData.currentGap - currentData.target)) / currentData.target * 100);
    const isOnTarget = currentData.currentGap <= currentData.target;
    const completionRate = (currentData.completedPOs / currentData.totalPOs * 100);

    // Performance categories
    const getPerformanceLevel = (gap) => {
        if (gap <= 3) return { level: 'Excellent', color: '#28a745', icon: '🎯' };
        if (gap <= 4) return { level: 'Good', color: '#20c997', icon: '✅' };
        if (gap <= 5) return { level: 'Average', color: '#ffc107', icon: '⚠️' };
        return { level: 'Needs Improvement', color: '#dc3545', icon: '🚨' };
    };

    const performance = getPerformanceLevel(currentData.currentGap);

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
                                PO vs GRN Avg Gap
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
                            {currentData.currentGap}
                        </div>
                        <div
                            className="fw-semibold mb-2"
                            style={{ fontSize: '16px', color: performance.color }}
                        >
                            Days
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
                                {currentData.previousGap}d
                            </div>
                        </div>
                        <div className="col-4">
                            <div style={{ fontSize: '9px', color: '#6c757d', lineHeight: '1.2' }}>Target</div>
                            <div style={{ fontSize: '12px', fontWeight: '600', color: isOnTarget ? '#28a745' : '#dc3545' }}>
                                {currentData.target}d
                            </div>
                        </div>
                        <div className="col-4">
                            <div style={{ fontSize: '9px', color: '#6c757d', lineHeight: '1.2' }}>POs</div>
                            <div style={{ fontSize: '12px', fontWeight: '600', color: '#007bff' }}>
                                {currentData.completedPOs}/{currentData.totalPOs}
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
                        PO-GRN Gap Details
                    </div>
                    <div>Current Gap: <span className="text-warning">{currentData.currentGap} days</span></div>
                    <div>Previous: <span className="text-info">{currentData.previousGap} days</span></div>
                    <div>Target: <span className="text-success">{currentData.target} days</span></div>
                    <div>Improvement: <span className={isImproving ? 'text-success' : 'text-danger'}>
                        {isImproving ? '↗' : '↘'} {Math.abs(improvementPercentage).toFixed(1)}%
                    </span></div>
                    <div>Completed: <span className="text-info">{currentData.completedPOs}/{currentData.totalPOs} POs</span></div>
                    <div className={`fw-bold ${isOnTarget ? 'text-success' : 'text-warning'}`}>
                        {performance.icon} {performance.level.toUpperCase()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default POvsGRNGapKPI;