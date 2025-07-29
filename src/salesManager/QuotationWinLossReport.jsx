import React, { useState } from 'react';

const QuotationWinLossReport = () => {
    const [hoveredCard, setHoveredCard] = useState(false);
    const [hoveredRow, setHoveredRow] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Sample data - replace with your actual data
    const quotationData = [
        {
            month: 'Feb',
            totalQuotes: 45,
            wonQuotes: 28,
            lostQuotes: 17,
            wonValue: 2800000,
            lostValue: 1200000
        },
        {
            month: 'Mar',
            totalQuotes: 52,
            wonQuotes: 35,
            lostQuotes: 17,
            wonValue: 3200000,
            lostValue: 1400000
        },
        {
            month: 'Apr',
            totalQuotes: 38,
            wonQuotes: 20,
            lostQuotes: 18,
            wonValue: 2100000,
            lostValue: 1800000
        },
        {
            month: 'May',
            totalQuotes: 67,
            wonQuotes: 44,
            lostQuotes: 23,
            wonValue: 4200000,
            lostValue: 1900000
        },
        {
            month: 'Jun',
            totalQuotes: 58,
            wonQuotes: 32,
            lostQuotes: 26,
            wonValue: 3600000,
            lostValue: 2200000
        },
        {
            month: 'Jul',
            totalQuotes: 73,
            wonQuotes: 48,
            lostQuotes: 25,
            wonValue: 4800000,
            lostValue: 2000000
        }
    ];

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

    // Calculate totals and percentages
    const totals = quotationData.reduce((acc, month) => {
        acc.totalQuotes += month.totalQuotes;
        acc.wonQuotes += month.wonQuotes;
        acc.lostQuotes += month.lostQuotes;
        acc.wonValue += month.wonValue;
        acc.lostValue += month.lostValue;
        return acc;
    }, { totalQuotes: 0, wonQuotes: 0, lostQuotes: 0, wonValue: 0, lostValue: 0 });

    const overallWinRate = ((totals.wonQuotes / totals.totalQuotes) * 100).toFixed(1);
    const overallLossRate = (100 - overallWinRate).toFixed(1);

    // Current month data
    const currentMonthData = quotationData[quotationData.length - 1];
    const currentWinRate = ((currentMonthData.wonQuotes / currentMonthData.totalQuotes) * 100).toFixed(1);
    const currentLossRate = (100 - currentWinRate).toFixed(1);

    // Calculate monthly win rates for trend
    const monthlyWinRates = quotationData.map(data => ({
        ...data,
        winRate: (data.wonQuotes / data.totalQuotes * 100).toFixed(1),
        lossRate: (data.lostQuotes / data.totalQuotes * 100).toFixed(1)
    }));

    const handleMouseMove = (e) => {
        setMousePosition({
            x: e.clientX,
            y: e.clientY
        });
        setHoveredCard(true);
    };

    const handleMouseLeave = () => {
        setHoveredCard(false);
        setHoveredRow(null);
    };

    const handleRowHover = (index, e) => {
        setHoveredRow(index);
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
                    height:"35rem",
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
                            Quotation Win/Loss Report
                        </h6>
                    </div>

                    {/* Key Metrics */}
                    <div className="text-center ">
                        <div className="row">
                            <div className="col-6">
                                <div style={{ fontSize: '12px', color: '#6c757d' }}>Overall Win Rate</div>
                                <div
                                    style={{
                                        fontSize: '1.4rem',
                                        fontWeight: '700',
                                        color: overallWinRate >= 70 ? '#28a745' : overallWinRate >= 50 ? '#ffc107' : '#dc3545'
                                    }}
                                >
                                    {overallWinRate}%
                                </div>
                                <div style={{ fontSize: '10px', color: '#6c757d' }}>
                                    {totals.wonQuotes} of {totals.totalQuotes} quotes
                                </div>
                            </div>
                            <div className="col-6">
                                <div style={{ fontSize: '12px', color: '#6c757d' }}>Current Month ({currentMonthData.month})</div>
                                <div
                                    style={{
                                        fontSize: '1.4rem',
                                        fontWeight: '700',
                                        color: currentWinRate >= 70 ? '#28a745' : currentWinRate >= 50 ? '#ffc107' : '#dc3545'
                                    }}
                                >
                                    {currentWinRate}%
                                </div>
                                <div style={{ fontSize: '10px', color: '#6c757d' }}>
                                    {currentMonthData.wonQuotes} of {currentMonthData.totalQuotes} quotes
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Win/Loss Visualization */}
                    <div className="mb-2">
                        <div className="row">
                            <div className="col-12">
                                <div className="d-flex justify-content-between mb-1">
                                    <span style={{ fontSize: '11px', color: '#28a745', fontWeight: '600' }}>
                                        Won: {overallWinRate}%
                                    </span>
                                    <span style={{ fontSize: '11px', color: '#dc3545', fontWeight: '600' }}>
                                        Lost: {overallLossRate}%
                                    </span>
                                </div>
                                <div className="d-flex" style={{ height: '12px', borderRadius: '6px', overflow: 'hidden', backgroundColor: '#f8f9fa' }}>
                                    <div
                                        style={{
                                            width: `${overallWinRate}%`,
                                            backgroundColor: '#28a745',
                                            transition: 'all 0.3s ease'
                                        }}
                                    ></div>
                                    <div
                                        style={{
                                            width: `${overallLossRate}%`,
                                            backgroundColor: '#dc3545',
                                            transition: 'all 0.3s ease'
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Monthly Data Table */}
                    <div className="mb-3" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        <table className="table table-sm mb-0" style={{ fontSize: '11px' }}>
                            <thead style={{ backgroundColor: '#f8f9fa', position: 'sticky', top: 0 }}>
                                <tr>
                                    <th style={{ fontSize: '10px', padding: '6px 4px', fontWeight: '600' }}>Month</th>
                                    <th style={{ fontSize: '10px', padding: '6px 4px', fontWeight: '600', textAlign: 'center' }}>Total</th>
                                    <th style={{ fontSize: '10px', padding: '6px 4px', fontWeight: '600', textAlign: 'center', color: '#28a745' }}>Won</th>
                                    <th style={{ fontSize: '10px', padding: '6px 4px', fontWeight: '600', textAlign: 'center', color: '#dc3545' }}>Lost</th>
                                    <th style={{ fontSize: '10px', padding: '6px 4px', fontWeight: '600', textAlign: 'center' }}>Win%</th>
                                    <th style={{ fontSize: '10px', padding: '6px 4px', fontWeight: '600', textAlign: 'right' }}>Value Won</th>
                                </tr>
                            </thead>
                            <tbody>
                                {monthlyWinRates.map((data, index) => (
                                    <tr
                                        key={index}
                                        style={{
                                            backgroundColor: hoveredRow === index ? '#f8f9fa' : 'transparent',
                                            transition: 'background-color 0.2s ease',
                                            cursor: 'pointer'
                                        }}
                                        onMouseEnter={(e) => handleRowHover(index, e)}
                                        onMouseLeave={() => setHoveredRow(null)}
                                    >
                                        <td style={{ padding: '6px 4px', fontWeight: '500' }}>{data.month}</td>
                                        <td style={{ padding: '6px 4px', textAlign: 'center', fontWeight: '500' }}>{data.totalQuotes}</td>
                                        <td style={{ padding: '6px 4px', textAlign: 'center', color: '#28a745', fontWeight: '500' }}>{data.wonQuotes}</td>
                                        <td style={{ padding: '6px 4px', textAlign: 'center', color: '#dc3545', fontWeight: '500' }}>{data.lostQuotes}</td>
                                        <td style={{
                                            padding: '6px 4px',
                                            textAlign: 'center',
                                            fontWeight: '600',
                                            color: data.winRate >= 70 ? '#28a745' : data.winRate >= 50 ? '#ffc107' : '#dc3545'
                                        }}>
                                            {data.winRate}%
                                        </td>
                                        <td style={{ padding: '6px 4px', textAlign: 'right', color: '#17a2b8', fontWeight: '500' }}>
                                            {formatCurrency(data.wonValue)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Summary Stats */}
                    <div className="row text-center" style={{ backgroundColor: '#f8f9fa', borderRadius: '4px', padding: '12px' }}>
                        <div className="col-4">
                            <div style={{ fontSize: '12px', color: '#6c757d' }}>Total Value</div>
                            <div style={{ fontSize: '13px', fontWeight: '600', color: '#17a2b8' }}>
                                {formatCurrency(totals.wonValue + totals.lostValue)}
                            </div>
                        </div>
                        <div className="col-4">
                            <div style={{ fontSize: '12px', color: '#6c757d' }}>Won Value</div>
                            <div style={{ fontSize: '13px', fontWeight: '600', color: '#28a745' }}>
                                {formatCurrency(totals.wonValue)}
                            </div>
                        </div>
                        <div className="col-4">
                            <div style={{ fontSize: '12px', color: '#6c757d' }}>Lost Value</div>
                            <div style={{ fontSize: '13px', fontWeight: '600', color: '#dc3545' }}>
                                {formatCurrency(totals.lostValue)}
                            </div>
                        </div>
                    </div>

                    {/* Performance Indicators */}
                    <div className="row mb-3">
                        <div className="col-6">
                            <div className="text-center p-2" style={{ borderRadius: '4px' }}>
                                <div style={{ fontSize: '11px', color: '#6c757d' }}>Best Month</div>
                                <div style={{ fontSize: '14px', fontWeight: '600', color: '#28a745' }}>
                                    {monthlyWinRates.reduce((best, current) =>
                                        parseFloat(current.winRate) > parseFloat(best.winRate) ? current : best
                                    ).month}
                                </div>
                                <div style={{ fontSize: '10px', color: '#28a745' }}>
                                    {monthlyWinRates.reduce((best, current) =>
                                        parseFloat(current.winRate) > parseFloat(best.winRate) ? current : best
                                    ).winRate}% win rate
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="text-center p-2" style={{ borderRadius: '4px' }}>
                                <div style={{ fontSize: '11px', color: '#6c757d' }}>Trend</div>
                                <div style={{
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: parseFloat(monthlyWinRates[monthlyWinRates.length - 1].winRate) >
                                        parseFloat(monthlyWinRates[monthlyWinRates.length - 2].winRate) ? '#28a745' : '#dc3545'
                                }}>
                                    {parseFloat(monthlyWinRates[monthlyWinRates.length - 1].winRate) >
                                        parseFloat(monthlyWinRates[monthlyWinRates.length - 2].winRate) ? '↗ Improving' : '↘ Declining'}
                                </div>
                                <div style={{ fontSize: '10px', color: '#6c757d' }}>
                                    vs last month
                                </div>
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
                                    backgroundColor: overallWinRate >= 70 ? '#28a745' : overallWinRate >= 50 ? '#ffc107' : '#dc3545',
                                    boxShadow: `0 0 0 2px ${overallWinRate >= 70 ? '#28a74520' : overallWinRate >= 50 ? '#ffc10720' : '#dc354520'}`
                                }}
                            ></div>
                            <span style={{ fontSize: '11px', fontWeight: '500' }}>
                                {overallWinRate >= 70 ? '🎯 Excellent Performance' : overallWinRate >= 50 ? '⚠️ Good Performance' : '📊 Needs Improvement'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tooltip */}
            {(hoveredCard || hoveredRow !== null) && (
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
                    {hoveredRow !== null ? (
                        // Row-specific tooltip
                        <div>
                            <div className="fw-bold text-info">
                                {monthlyWinRates[hoveredRow].month} Quotation Performance
                            </div>
                            <div>Total Quotes: <span className="text-warning">{monthlyWinRates[hoveredRow].totalQuotes}</span></div>
                            <div>Won: <span className="text-success">{monthlyWinRates[hoveredRow].wonQuotes} ({monthlyWinRates[hoveredRow].winRate}%)</span></div>
                            <div>Lost: <span className="text-danger">{monthlyWinRates[hoveredRow].lostQuotes} ({monthlyWinRates[hoveredRow].lossRate}%)</span></div>
                            <div>Won Value: <span className="text-success">{formatCurrency(monthlyWinRates[hoveredRow].wonValue)}</span></div>
                            <div>Lost Value: <span className="text-danger">{formatCurrency(monthlyWinRates[hoveredRow].lostValue)}</span></div>
                            <div className="mt-1">
                                <div className={`fw-bold ${parseFloat(monthlyWinRates[hoveredRow].winRate) >= 70 ? 'text-success' : parseFloat(monthlyWinRates[hoveredRow].winRate) >= 50 ? 'text-warning' : 'text-danger'}`}>
                                    {parseFloat(monthlyWinRates[hoveredRow].winRate) >= 70 ? '🎯 EXCELLENT' : parseFloat(monthlyWinRates[hoveredRow].winRate) >= 50 ? '⚠️ GOOD' : '📊 IMPROVE'}
                                </div>
                            </div>
                        </div>
                    ) : (
                        // General card tooltip
                        <div>
                            <div className="fw-bold text-info">
                                6-Month Quotation Summary
                            </div>
                            <div>Total Quotes: <span className="text-warning">{totals.totalQuotes}</span></div>
                            <div>Won: <span className="text-success">{totals.wonQuotes} ({overallWinRate}%)</span></div>
                            <div>Lost: <span className="text-danger">{totals.lostQuotes} ({overallLossRate}%)</span></div>
                            <div>Total Value: <span className="text-info">{formatCurrency(totals.wonValue + totals.lostValue)}</span></div>
                            <div>Won Value: <span className="text-success">{formatCurrency(totals.wonValue)}</span></div>
                            <div className="mt-1">
                                <div className="text-muted" style={{ fontSize: '10px' }}>Recent Performance:</div>
                                {monthlyWinRates.slice(-3).map((data, index) => (
                                    <div key={index} style={{ fontSize: '10px' }}>
                                        {data.month}: <span className="text-warning">{data.winRate}%</span>
                                    </div>
                                ))}
                            </div>
                            <div className={`fw-bold ${overallWinRate >= 70 ? 'text-success' : 'text-warning'}`}>
                                {overallWinRate >= 70 ? '🎯 PERFORMING WELL' : '📈 ROOM FOR GROWTH'}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default QuotationWinLossReport;