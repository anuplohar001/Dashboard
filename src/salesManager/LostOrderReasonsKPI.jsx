import React, { useState, useRef, useEffect } from 'react';

const LostOrderReasonsKPI = () => {
    const [hoveredCard, setHoveredCard] = useState(false);
    const [hoveredReason, setHoveredReason] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [selectedPeriod, setSelectedPeriod] = useState('quarter');
    const canvasRef = useRef(null);

    // Sample data - replace with your actual data
    const periods = {
        quarter: { label: 'This Quarter', days: 90 },
        month: { label: 'This Month', days: 30 },
        year: { label: 'This Year', days: 365 }
    };

    const lostOrderData = [
        {
            reason: 'Competitor Price',
            count: 24,
            percentage: 40,
            color: '#dc3545',
            icon: '💰',
            avgLostValue: 150000,
            trend: 'up'
        },
        {
            reason: 'Lead Time',
            count: 18,
            percentage: 30,
            color: '#fd7e14',
            icon: '⏰',
            avgLostValue: 120000,
            trend: 'stable'
        },
        {
            reason: 'Product Features',
            count: 9,
            percentage: 15,
            color: '#6f42c1',
            icon: '⚙️',
            avgLostValue: 200000,
            trend: 'down'
        },
        {
            reason: 'Payment Terms',
            count: 6,
            percentage: 10,
            color: '#20c997',
            icon: '🏦',
            avgLostValue: 80000,
            trend: 'stable'
        },
        {
            reason: 'Others',
            count: 3,
            percentage: 5,
            color: '#6c757d',
            icon: '📋',
            avgLostValue: 100000,
            trend: 'down'
        }
    ];

    const currentPeriod = periods[selectedPeriod];
    const totalLostOrders = lostOrderData.reduce((sum, item) => sum + item.count, 0);
    const totalLostValue = lostOrderData.reduce((sum, item) => sum + (item.count * item.avgLostValue), 0);
    const topReason = lostOrderData[0];

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
            case 'up': return '↗️';
            case 'down': return '↘️';
            case 'stable': return '➡️';
            default: return '➡️';
        }
    };

    const getTrendColor = (trend) => {
        switch (trend) {
            case 'up': return '#dc3545'; // Red for increasing lost orders
            case 'down': return '#28a745'; // Green for decreasing lost orders
            case 'stable': return '#ffc107';
            default: return '#6c757d';
        }
    };

    // Draw pie chart
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 10;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let currentAngle = -Math.PI / 2; // Start from top

        lostOrderData.forEach((item, index) => {
            const sliceAngle = (item.percentage / 100) * 2 * Math.PI;

            // Draw slice
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            ctx.closePath();

            // Apply hover effect
            if (hoveredReason === index) {
                ctx.fillStyle = item.color + 'CC'; // More opaque when hovered
                ctx.shadowColor = item.color;
                ctx.shadowBlur = 10;
            } else {
                ctx.fillStyle = item.color + (hoveredReason !== null ? '66' : 'AA'); // Semi-transparent
                ctx.shadowBlur = 0;
            }

            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Draw percentage text
            const textAngle = currentAngle + sliceAngle / 2;
            const textRadius = radius * 0.7;
            const textX = centerX + Math.cos(textAngle) * textRadius;
            const textY = centerY + Math.sin(textAngle) * textRadius;

            if (item.percentage >= 5) { // Only show text for slices >= 5%
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 12px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(`${item.percentage}%`, textX, textY);
            }

            currentAngle += sliceAngle;
        });
    }, [hoveredReason, lostOrderData]);

    const handleMouseMove = (e) => {
        setMousePosition({
            x: e.clientX,
            y: e.clientY
        });
        setHoveredCard(true);
    };

    const handleMouseLeave = () => {
        setHoveredCard(false);
        setHoveredReason(null);
    };

   

    const handleCanvasMouseMove = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 10;

        const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);

        if (distance <= radius) {
            const angle = Math.atan2(y - centerY, x - centerX);
            let normalizedAngle = (angle + Math.PI / 2 + 2 * Math.PI) % (2 * Math.PI);

            let currentAngle = 0;
            let hoveredIndex = null;

            for (let i = 0; i < lostOrderData.length; i++) {
                const sliceAngle = (lostOrderData[i].percentage / 100) * 2 * Math.PI;
                if (normalizedAngle >= currentAngle && normalizedAngle <= currentAngle + sliceAngle) {
                    hoveredIndex = i;
                    break;
                }
                currentAngle += sliceAngle;
            }

            setHoveredReason(hoveredIndex);
        } else {
            setHoveredReason(null);
        }

        setMousePosition({
            x: e.clientX,
            y: e.clientY
        });
    };


    const formatAmount = (value) => {
        if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
        if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
        return `₹${(value / 1000).toFixed(1)}K`;
    };

    const getTrendSymbol = (trend) => {
        if (trend === 'up') return '🔼';
        if (trend === 'down') return '🔽';
        return '➖';
    };

    return (
        <div className='salescards'>
            <div
                className="card-container"
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
                    <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                            <h6 className="text-dark mb-1" style={{ fontSize: '16px', fontWeight: '600' }}>
                                Lost Order Reasons
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

                    <table style={{ width: '100%', fontSize: '0.6rem', borderCollapse: 'collapse' }}>
                        <tbody>
                            {lostOrderData.map((item, idx) => (
                                <tr key={idx} className='' style={{textAlign: 'left', backgroundColor: hoveredReason === idx ? item.color + '20' : '#f8f9fa'}}>                                    
                                    <td style={{ padding: '4px 8px' }}>
                                        {item.icon} {item.reason}
                                    </td>
                                    <td style={{ padding: '4px 8px', textAlign: 'right' }}>
                                        {item.percentage}%
                                    </td>
                                    <td style={{ padding: '4px 8px', textAlign: 'right', color: '#555' }}>
                                        {formatAmount(item.avgLostValue)}
                                    </td>
                                    <td style={{ padding: '4px 8px', textAlign: 'center' }}>
                                        {getTrendSymbol(item.trend)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>


                    {/* Pie Chart */}
                    <div className="d-flex justify-content-center mb-3">
                        <canvas
                            ref={canvasRef}
                            width={200}
                            height={200}
                            style={{ cursor: 'pointer' }}
                            onMouseMove={handleCanvasMouseMove}
                            onMouseLeave={() => setHoveredReason(null)}
                        />
                    </div>

                    

                    

                    {/* Status Indicator */}
                    <div className="d-flex justify-content-center mt-3">
                        <div className="d-flex align-items-center">
                            <div
                                className="rounded-circle me-2"
                                style={{
                                    width: '8px',
                                    height: '8px',
                                    backgroundColor: topReason.percentage > 50 ? '#dc3545' : topReason.percentage > 30 ? '#ffc107' : '#28a745',
                                    boxShadow: `0 0 0 2px ${topReason.percentage > 50 ? '#dc354520' : topReason.percentage > 30 ? '#ffc10720' : '#28a74520'}`
                                }}
                            ></div>
                            <span style={{ fontSize: '11px', fontWeight: '500' }}>
                                {topReason.percentage > 50 ? 'High Risk - Single Reason' : topReason.percentage > 30 ? 'Concentrated Risk' : 'Diversified Issues'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Tooltip */}
            {hoveredCard && hoveredReason === null && (
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
                        Lost Orders Summary
                    </div>
                    <div>Period: <span className="text-warning">{currentPeriod.label}</span></div>
                    <div>Total Lost: <span className="text-danger">{totalLostOrders} orders</span></div>
                    <div>Lost Value: <span className="text-warning">{formatCurrency(totalLostValue)}</span></div>
                    <div>Top Reason: <span className="text-info">{topReason.reason} ({topReason.percentage}%)</span></div>
                    <div className={`fw-bold ${topReason.percentage > 50 ? 'text-danger' : 'text-warning'}`}>
                        {topReason.percentage > 50 ? '🚨 HIGH RISK' : '⚠️ MONITOR CLOSELY'}
                    </div>
                </div>
            )}

            {/* Reason Detail Tooltip */}
            {hoveredReason !== null && (
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
                        {lostOrderData[hoveredReason].icon} {lostOrderData[hoveredReason].reason}
                    </div>
                    <div>Share: <span className="text-warning">{lostOrderData[hoveredReason].percentage}% ({lostOrderData[hoveredReason].count} orders)</span></div>
                    <div>Avg Loss: <span className="text-danger">{formatCurrency(lostOrderData[hoveredReason].avgLostValue)}</span></div>
                    <div>Total Impact: <span className="text-info">{formatCurrency(lostOrderData[hoveredReason].count * lostOrderData[hoveredReason].avgLostValue)}</span></div>
                    <div>Trend: <span style={{ color: getTrendColor(lostOrderData[hoveredReason].trend) }}>
                        {getTrendIcon(lostOrderData[hoveredReason].trend)} {lostOrderData[hoveredReason].trend.toUpperCase()}
                    </span></div>
                </div>
            )}
        </div>
    );
};

export default LostOrderReasonsKPI;