import React, { useState } from 'react';

const QuoteConversionKPI = () => {
    const [hoveredCard, setHoveredCard] = useState(false);
    const [hoveredElement, setHoveredElement] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [viewMode, setViewMode] = useState('funnel'); // 'funnel' or 'trend'

    // Sample conversion data - replace with your actual data
    const conversionData = [
        { month: 'Feb', quotes: 45, orders: 18, conversionRate: 40.0, target: 50 },
        { month: 'Mar', quotes: 60, orders: 30, conversionRate: 50.0, target: 50 },
        { month: 'Apr', quotes: 52, orders: 23, conversionRate: 44.2, target: 50 },
        { month: 'May', quotes: 75, orders: 41, conversionRate: 54.7, target: 55 },
        { month: 'Jun', quotes: 68, orders: 35, conversionRate: 51.5, target: 55 },
        { month: 'Jul', quotes: 82, orders: 49, conversionRate: 59.8, target: 60 }
    ];

    // Current month data
    const currentMonth = conversionData[conversionData.length - 1];
    const currentConversionRate = currentMonth.conversionRate;
    const targetRate = currentMonth.target;
    const performance = currentConversionRate >= targetRate ? 'above' : 'below';

    // Average conversion rate
    const avgConversionRate = (conversionData.reduce((sum, data) => sum + data.conversionRate, 0) / conversionData.length).toFixed(1);

    // Trend calculation
    const lastMonth = conversionData[conversionData.length - 2];
    const trend = currentConversionRate > lastMonth.conversionRate ? 'up' : 'down';
    const trendChange = Math.abs(currentConversionRate - lastMonth.conversionRate).toFixed(1);

    // Best performing month
    const bestMonth = conversionData.reduce((best, current) =>
        current.conversionRate > best.conversionRate ? current : best
    );

    // Funnel stages with sample data
    const funnelStages = [
        {
            stage: 'Leads Generated',
            count: Math.round(currentMonth.quotes * 1.5),
            percentage: 100,
            color: '#6c757d',
            description: 'Initial prospects'
        },
        {
            stage: 'Quotes Sent',
            count: currentMonth.quotes,
            percentage: 66.7,
            color: '#17a2b8',
            description: 'Formal quotations'
        },
        {
            stage: 'Follow-ups Done',
            count: Math.round(currentMonth.quotes * 0.8),
            percentage: 53.3,
            color: '#ffc107',
            description: 'Active negotiations'
        },
        {
            stage: 'Orders Received',
            count: currentMonth.orders,
            percentage: currentConversionRate,
            color: '#28a745',
            description: 'Successful conversions'
        }
    ];

    // Chart dimensions for trend view
    const chartWidth = 260;
    const chartHeight = 120;
    const padding = 20;
    const leftPadding = 35;

    const maxRate = Math.max(...conversionData.map(d => Math.max(d.conversionRate, d.target)));
    const minRate = Math.min(...conversionData.map(d => Math.min(d.conversionRate, d.target))) * 0.9;

    const xScale = (index) => leftPadding + (index * (chartWidth - leftPadding - padding)) / (conversionData.length - 1);
    const yScale = (value) => chartHeight - padding - ((value - minRate) / (maxRate - minRate)) * (chartHeight - 2 * padding);

    // Generate SVG paths
    const conversionPath = conversionData.map((d, i) => {
        const x = xScale(i);
        const y = yScale(d.conversionRate);
        return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    }).join(' ');

    const targetPath = conversionData.map((d, i) => {
        const x = xScale(i);
        const y = yScale(d.target);
        return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    }).join(' ');

    const handleMouseMove = (e) => {
        setMousePosition({
            x: e.clientX,
            y: e.clientY
        });
        setHoveredCard(true);
    };

    const handleMouseLeave = () => {
        setHoveredCard(false);
        setHoveredElement(null);
    };

    const handleElementHover = (index, e) => {
        setHoveredElement(index);
        setMousePosition({
            x: e.clientX,
            y: e.clientY
        });
    };

    return (
        <div>
            <div
                className="card-container anup"
                style={{
                    width: '350px',
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
                        <div className="d-flex justify-content-center align-items-center">
                            <div>
                                <h6 className="text-dark mb-1" style={{ fontSize: '16px', fontWeight: '600' }}>
                                    Quote to Order Conversion
                                </h6>
                            </div>
                            
                        </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="text-center">
                        <div className="row">
                            <div className="col-4">
                                <div style={{ fontSize: '12px', color: '#6c757d' }}>Current Rate</div>
                                <div style={{
                                    fontSize: '1.4rem',
                                    fontWeight: '700',
                                    color: performance === 'above' ? '#28a745' : '#ffc107'
                                }}>
                                    {currentConversionRate.toFixed(1)}%
                                </div>
                                <div style={{ fontSize: '10px', color: '#6c757d' }}>
                                    {currentMonth.orders}/{currentMonth.quotes}
                                </div>
                            </div>
                            <div className="col-4">
                                <div style={{ fontSize: '12px', color: '#6c757d' }}>Target</div>
                                <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#17a2b8' }}>
                                    {targetRate}%
                                </div>
                                <div style={{ fontSize: '10px', color: '#6c757d' }}>
                                    {performance === 'above' ? 'Achieved' : 'Target'}
                                </div>
                            </div>
                            <div className="col-4">
                                <div style={{ fontSize: '12px', color: '#6c757d' }}>6M Average</div>
                                <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#6f42c1' }}>
                                    {avgConversionRate}%
                                </div>
                                <div style={{
                                    fontSize: '10px',
                                    color: trend === 'up' ? '#28a745' : '#dc3545',
                                    fontWeight: '500'
                                }}>
                                    {trend === 'up' ? '↗' : '↘'} {trendChange}%
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chart Container */}
                    <div className=" d-flex justify-content-center ">                        
                            <svg className='' width="350" height="150" style={{ overflow: 'visible' }}>
                                {funnelStages.map((stage, index) => {
                                    const width = (stage.percentage / 100) * 200;
                                    const x = (280 - width) / 2;
                                    const y = index * 35 + 12;
                                    const height = 35;

                                    return (
                                        <g key={index}>
                                            {/* Funnel segment */}
                                            <rect
                                                x={x + 60}
                                                y={y }
                                                width={width}
                                                height={height}
                                                
                                                fill={stage.color}
                                                style={{
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s ease',
                                                    filter: hoveredElement === index ?
                                                        `drop-shadow(0 2px 6px ${stage.color}40) brightness(1.1)` :
                                                        hoveredCard ? `drop-shadow(0 1px 3px ${stage.color}20)` : 'none'
                                                }}
                                                onMouseEnter={(e) => handleElementHover(index, e)}
                                                onMouseLeave={() => setHoveredElement(null)}
                                            />

                                            {/* Stage label */}
                                            <text
                                                x={x + width / 2 + 60}
                                                y={y + height / 2 + 4}
                                                textAnchor="middle"
                                                style={{
                                                    fontSize: '10px',
                                                    fill: 'white',
                                                    fontWeight: '600'
                                                }}
                                            >
                                                {stage.count}
                                            </text>

                                            {/* Stage name and percentage */}
                                            <text
                                                x={10}
                                                y={y + height / 2 - 2}
                                                style={{
                                                    fontSize: '11px',
                                                    fill: '#495057',
                                                    fontWeight: '500'
                                                }}
                                            >
                                                {stage.stage}
                                            </text>
                                            <text
                                                x={340}
                                                y={y + height / 2 - 2}
                                                textAnchor="end"
                                                style={{
                                                    fontSize: '10px',
                                                    fill: stage.color,
                                                    fontWeight: '600'
                                                }}
                                            >
                                                {stage.percentage.toFixed(1)}%
                                            </text>
                                            <text
                                                x={10}
                                                y={y + height / 2 + 10}
                                                style={{
                                                    fontSize: '9px',
                                                    fill: '#6c757d'
                                                }}
                                            >
                                                {stage.description}
                                            </text>
                                        </g>
                                    );
                                })}
                            </svg>
                        
                    </div>

                    {/* Performance Stats */}
                    <div className="row text-center" style={{
                        backgroundColor: '#f8f9fa',
                        borderRadius: '4px',
                        padding: '12px'
                    }}>
                        <div className="col-4">
                            <div style={{ fontSize: '12px', color: '#6c757d' }}>Best Month</div>
                            <div style={{ fontSize: '13px', fontWeight: '600', color: '#28a745' }}>
                                {bestMonth.month}
                            </div>
                            <div style={{ fontSize: '10px', color: '#6c757d' }}>
                                {bestMonth.conversionRate.toFixed(1)}%
                            </div>
                        </div>
                        <div className="col-4">
                            <div style={{ fontSize: '12px', color: '#6c757d' }}>Total Quotes</div>
                            <div style={{ fontSize: '13px', fontWeight: '600', color: '#17a2b8' }}>
                                {conversionData.reduce((sum, data) => sum + data.quotes, 0)}
                            </div>
                            <div style={{ fontSize: '10px', color: '#6c757d' }}>
                                6 months
                            </div>
                        </div>
                        <div className="col-4">
                            <div style={{ fontSize: '12px', color: '#6c757d' }}>Total Orders</div>
                            <div style={{ fontSize: '13px', fontWeight: '600', color: '#28a745' }}>
                                {conversionData.reduce((sum, data) => sum + data.orders, 0)}
                            </div>
                            <div style={{ fontSize: '10px', color: '#6c757d' }}>
                                Converted
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar - Current Performance */}
                    <div className="mb-3">
                        <div className="d-flex justify-content-between mb-1">
                            <span style={{ fontSize: '11px', color: '#6c757d' }}>
                                {currentMonth.month} Conversion Progress
                            </span>
                            <span style={{ fontSize: '11px', color: '#6c757d' }}>
                                {currentConversionRate.toFixed(1)}% / {targetRate}%
                            </span>
                        </div>
                        <div className="progress" style={{ height: '6px' }}>
                            <div
                                className={`progress-bar ${performance === 'above' ? 'bg-success' : currentConversionRate >= targetRate * 0.8 ? 'bg-warning' : 'bg-danger'}`}
                                role="progressbar"
                                style={{ width: `${Math.min((currentConversionRate / targetRate) * 100, 100)}%` }}
                                aria-valuenow={currentConversionRate}
                                aria-valuemin="0"
                                aria-valuemax={targetRate}
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
                                    backgroundColor: performance === 'above' ? '#28a745' : currentConversionRate >= targetRate * 0.8 ? '#ffc107' : '#dc3545',
                                    boxShadow: `0 0 0 2px ${performance === 'above' ? '#28a74520' : currentConversionRate >= targetRate * 0.8 ? '#ffc10720' : '#dc354520'}`
                                }}
                            ></div>
                            <span style={{ fontSize: '11px', fontWeight: '500' }}>
                                {performance === 'above' ? '🎯 Target Exceeded' : currentConversionRate >= targetRate * 0.8 ? '⚠️ Near Target' : '📊 Below Target'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tooltip */}
            {(hoveredCard || hoveredElement !== null) && (
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
                    {hoveredElement !== null ? (
                        viewMode === 'funnel' ? (
                            // Funnel stage tooltip
                            <div>
                                <div className="fw-bold text-info">
                                    {funnelStages[hoveredElement].stage}
                                </div>
                                <div>Count: <span className="text-success">{funnelStages[hoveredElement].count}</span></div>
                                <div>Percentage: <span className="text-warning">{funnelStages[hoveredElement].percentage.toFixed(1)}%</span></div>
                                <div>Description: <span className="text-muted">{funnelStages[hoveredElement].description}</span></div>
                                {hoveredElement > 0 && (
                                    <div>Drop-off: <span className="text-danger">
                                        {(funnelStages[hoveredElement - 1].count - funnelStages[hoveredElement].count)} leads
                                    </span></div>
                                )}
                            </div>
                        ) : (
                            // Trend point tooltip
                            <div>
                                <div className="fw-bold text-info">
                                    {conversionData[hoveredElement].month} Conversion
                                </div>
                                <div>Quotes: <span className="text-warning">{conversionData[hoveredElement].quotes}</span></div>
                                <div>Orders: <span className="text-success">{conversionData[hoveredElement].orders}</span></div>
                                <div>Conversion Rate: <span className="text-info">{conversionData[hoveredElement].conversionRate.toFixed(1)}%</span></div>
                                <div>Target: <span className="text-muted">{conversionData[hoveredElement].target}%</span></div>
                                <div>Performance: <span className={conversionData[hoveredElement].conversionRate >= conversionData[hoveredElement].target ? 'text-success' : 'text-danger'}>
                                    {conversionData[hoveredElement].conversionRate >= conversionData[hoveredElement].target ? '✓ Above' : '✗ Below'} Target
                                </span></div>
                            </div>
                        )
                    ) : (
                        // General card tooltip
                        <div>
                            <div className="fw-bold text-info">
                                Quote Conversion Analytics
                            </div>
                            <div>Current Rate: <span className="text-success">{currentConversionRate.toFixed(1)}%</span></div>
                            <div>Target: <span className="text-warning">{targetRate}%</span></div>
                            <div>6M Average: <span className="text-info">{avgConversionRate}%</span></div>
                            <div>Best Month: <span className="text-success">{bestMonth.month}</span></div>
                            <div className="mt-1">
                                <div className="text-muted" style={{ fontSize: '10px' }}>Recent Performance:</div>
                                {conversionData.slice(-3).map((data, index) => (
                                    <div key={index} style={{ fontSize: '10px' }}>
                                        {data.month}: <span className="text-warning">{data.conversionRate.toFixed(0)}%</span>
                                    </div>
                                ))}
                            </div>
                            <div className={`fw-bold ${performance === 'above' ? 'text-success' : 'text-warning'}`}>
                                {performance === 'above' ? '🎯 PERFORMING WELL' : '📈 IMPROVING'}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default QuoteConversionKPI;