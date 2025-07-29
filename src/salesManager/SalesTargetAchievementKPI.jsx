import React, { useState } from 'react';

const SalesTargetAchievementKPI = () => {
    const [hoveredCard, setHoveredCard] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [selectedPeriod, setSelectedPeriod] = useState('MTD'); // MTD or YTD

    // Sample data - replace with your actual data
    const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

    // MTD Data
    const mtdData = {
        actualSales: 730000, // ₹7.3L
        targetSales: 1000000, // ₹10L
        achievementPercentage: 73,
        previousMonthAchievement: 68,
        dailyTarget: 33333, // ₹10L / 30 days
        daysElapsed: 22
    };

    // YTD Data
    const ytdData = {
        actualSales: 8500000, // ₹85L
        targetSales: 12000000, // ₹1.2Cr
        achievementPercentage: 70.8,
        previousYearAchievement: 65.2,
        monthlyTarget: 1000000, // ₹10L per month
        monthsElapsed: 8.5
    };

    const currentData = selectedPeriod === 'MTD' ? mtdData : ytdData;
    const previousAchievement = selectedPeriod === 'MTD' ? mtdData.previousMonthAchievement : ytdData.previousYearAchievement;
    const growthPercentage = (currentData.achievementPercentage - previousAchievement).toFixed(1);
    const isPositiveGrowth = growthPercentage > 0;

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

    // Get achievement status and color
    const getAchievementStatus = (percentage) => {
        if (percentage >= 90) return { status: 'Excellent', color: '#28a745', bgColor: '#d4edda' };
        if (percentage >= 75) return { status: 'Good', color: '#ffc107', bgColor: '#fff3cd' };
        if (percentage >= 50) return { status: 'Fair', color: '#fd7e14', bgColor: '#ffeaa7' };
        return { status: 'Needs Improvement', color: '#dc3545', bgColor: '#f8d7da' };
    };

    const achievementStatus = getAchievementStatus(currentData.achievementPercentage);

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
                    height: "22rem",
                    border: '1px solid #dee2e6',
                    transition: 'all 0.3s ease',
                    transform: hoveredCard ? 'translateY(-2px)' : 'translateY(0)',
                    boxShadow: hoveredCard ? '0 4px 12px rgba(0,0,0,0.15)' : '0 2px 4px rgba(0,0,0,0.1)'
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <div className="card-body">
                    {/* Title with Period Toggle */}
                    <div className="mb-1">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                            <h6 className="text-dark mb-0" style={{ fontSize: '16px', fontWeight: '600' }}>
                                Sales Target Achievement
                            </h6>
                            <div className="btn-group" role="group" style={{ transform: 'scale(0.8)' }}>
                                <button
                                    type="button"
                                    className={`btn btn-sm ${selectedPeriod === 'MTD' ? 'btn-primary' : 'btn-outline-primary'}`}
                                    onClick={() => setSelectedPeriod('MTD')}
                                    style={{ fontSize: '10px', padding: '2px 8px' }}
                                >
                                    MTD
                                </button>
                                <button
                                    type="button"
                                    className={`btn btn-sm ${selectedPeriod === 'YTD' ? 'btn-primary' : 'btn-outline-primary'}`}
                                    onClick={() => setSelectedPeriod('YTD')}
                                    style={{ fontSize: '10px', padding: '2px 8px' }}
                                >
                                    YTD
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main KPI Value */}
                    <div className="text-center mb-1">
                        <div
                            className=" fw-bold mb-1 d-flex justify-content-center align-items-center"
                            style={{
                                fontSize: '2.5rem',
                                color: achievementStatus.color,
                                textShadow: hoveredCard ? `0 2px 4px ${achievementStatus.color}30` : 'none',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {currentData.achievementPercentage}%
                            <span
                                className="ms-2"
                                style={{
                                    fontSize: '1.5rem',
                                    color: isPositiveGrowth ? '#28a745' : '#dc3545',
                                    fontWeight: '600'
                                }}
                            >
                                {isPositiveGrowth ? '↗' : '↘'}
                            </span>
                        </div>
                        <div
                            className="text-muted"
                            style={{ fontSize: '14px', fontWeight: '500' }}
                        >
                            {formatCurrency(currentData.actualSales)} / {formatCurrency(currentData.targetSales)}
                        </div>
                    </div>

                    <div className='d-flex flex-column justify-content-center gap-2 mb-1'>

                        {/* Achievement Status Badge */}
                        <div className="d-flex justify-content-center mb-1">
                            <div
                                className="px-3 py-1 rounded-pill"
                                style={{
                                    backgroundColor: achievementStatus.bgColor,
                                    color: achievementStatus.color,
                                    fontSize: '12px',
                                    fontWeight: '600'
                                }}
                            >
                                {achievementStatus.status}
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
                                {isPositiveGrowth ? '+' : ''}{growthPercentage}%
                                <span className="ms-1" style={{ fontSize: '10px', opacity: 0.8 }}>
                                    vs last {selectedPeriod === 'MTD' ? 'month' : 'year'}
                                </span>
                            </div>
                        </div>

                    </div>


                    {/* Progress Bar */}
                    <div className="mb-1">
                        <div className="d-flex justify-content-between mb-1">
                            <span style={{ fontSize: '11px', color: '#6c757d' }}>Target Progress</span>
                            <span style={{ fontSize: '11px', color: '#6c757d' }}>{currentData.achievementPercentage}%</span>
                        </div>
                        <div className="progress" style={{ height: '8px' }}>
                            <div
                                className="progress-bar"
                                role="progressbar"
                                style={{
                                    width: `${Math.min(currentData.achievementPercentage, 100)}%`,
                                    backgroundColor: achievementStatus.color,
                                    transition: 'width 0.6s ease'
                                }}
                                aria-valuenow={currentData.achievementPercentage}
                                aria-valuemin="0"
                                aria-valuemax="100"
                            ></div>
                        </div>
                    </div>

                    {/* Additional Stats */}
                    <div className="row text-center mb-1" style={{ backgroundColor: '#f8f9fa', borderRadius: '4px', padding: '5px' }}>
                        <div className="col-4">
                            <div style={{ fontSize: '12px', color: '#6c757d' }}>
                                {selectedPeriod === 'MTD' ? 'Days Left' : 'Months Left'}
                            </div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#6c757d' }}>
                                {selectedPeriod === 'MTD' ? (30 - currentData.daysElapsed) : (12 - currentData.monthsElapsed).toFixed(0)}
                            </div>
                        </div>
                        <div className="col-4">
                            <div style={{ fontSize: '12px', color: '#6c757d' }}>Gap</div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#dc3545' }}>
                                {formatCurrency(currentData.targetSales - currentData.actualSales)}
                            </div>
                        </div>
                        <div className="col-4">
                            <div style={{ fontSize: '12px', color: '#6c757d' }}>
                                {selectedPeriod === 'MTD' ? 'Daily Run Rate' : 'Monthly Run Rate'}
                            </div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#28a745' }}>
                                {selectedPeriod === 'MTD' ?
                                    formatCurrency(Math.round(currentData.actualSales / currentData.daysElapsed)) :
                                    formatCurrency(Math.round(currentData.actualSales / currentData.monthsElapsed))
                                }
                            </div>
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
                                    backgroundColor: achievementStatus.color,
                                    boxShadow: `0 0 0 2px ${achievementStatus.color}20`
                                }}
                            ></div>
                            <span style={{ fontSize: '11px', fontWeight: '500' }}>
                                {currentData.achievementPercentage >= 75 ? 'On Track' : 'Action Required'}
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
                        {selectedPeriod} Target Achievement
                    </div>
                    <div>Achievement: <span className="text-warning">{currentData.achievementPercentage}%</span></div>
                    <div>Actual Sales: <span className="text-success">{formatCurrency(currentData.actualSales)}</span></div>
                    <div>Target Sales: <span className="text-info">{formatCurrency(currentData.targetSales)}</span></div>
                    <div>Gap: <span className="text-danger">{formatCurrency(currentData.targetSales - currentData.actualSales)}</span></div>
                    <div>Previous {selectedPeriod === 'MTD' ? 'Month' : 'Year'}: <span className="text-muted">{previousAchievement}%</span></div>
                    <div className={`fw-bold ${isPositiveGrowth ? 'text-success' : 'text-warning'}`}>
                        {achievementStatus.status.toUpperCase()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SalesTargetAchievementKPI;