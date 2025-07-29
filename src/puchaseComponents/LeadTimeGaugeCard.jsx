import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const LeadTimeGaugeCard = () => {
    // Hardcoded data
    const actualDays = 10;
    const expectedDays = 5;
    const lastMonthDays = 8;
    const urgentCount = 3;
    const previous = 8;
    const totalItems = 15;
    const [hoveredCard, setHoveredCard] = useState(false);

    const percentage = Math.min((expectedDays / actualDays) * 100, 100);
    const delta = actualDays - lastMonthDays;
    const status =
        actualDays <= expectedDays
            ? "On Time"
            : actualDays - expectedDays <= 2
                ? "Delay"
                : "Critical";

    const statusColor =
        status === "On Time"
            ? "success"
            : status === "Delay"
                ? "warning"
                : "danger";

    const arcDegrees = (percentage / 100) * 180;
    const radius = 70;
    const center = 75;
    const radians = (arcDegrees - 90) * (Math.PI / 180);
    const x = center + radius * Math.cos(radians);
    const y = center + radius * Math.sin(radians);
    const largeArcFlag = 2;
    // const largeArcFlag = percentage > 50 ? 1 : 0;

    // Gauge configuration for SVG
    const gaugeRadius = 80;
    const strokeWidth = 15;
    const normalizedRadius = gaugeRadius - strokeWidth * 2;
    const circumference = normalizedRadius * Math.PI; // Half circle
    const strokeDasharray = `${circumference} ${circumference}`;

    // Calculate stroke offset based on percentage
    const gaugeProgress = Math.min(Math.max(percentage, 0), 100);
    const strokeDashoffset = circumference - (gaugeProgress / 100) * circumference;

    // Color based on status
    const getGaugeColor = () => {
        if (status === "On Time") return "#28a745"; // success
        if (status === "Delay") return "#ffc107"; // warning  
        return "#dc3545"; // danger
    };

    return (
        <div className="card-container anup purchasecards onlycards" style={{
            height: '20rem',
            border: '1px solid #dee2e6',
            transition: 'all 0.3s ease',
            transform: hoveredCard ? 'translateY(-2px)' : 'translateY(0)',
            boxShadow: hoveredCard ? '0 4px 12px rgba(0,0,0,0.15)' : '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="mb-0">Lead Time Tracker</h6>
                <select className="form-select form-select-sm" style={{ width: '75px', fontSize: '10px', padding: '2px 4px' }}>
                    <option>Month</option>
                    <option>Week</option>
                </select>
            </div>

            {/* Gauge Chart */}
            <div className="d-flex justify-content-center">
                <div className="position-relative">
                    <svg
                        height={gaugeRadius * 1.3}
                        width={gaugeRadius * 2}
                        
                    >
                        {/* Background arc */}
                        <path
                            d={`M ${strokeWidth * 2} ${gaugeRadius} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${gaugeRadius * 2 - strokeWidth * 2} ${gaugeRadius}`}
                            fill="transparent"
                            stroke="#b6b8bbff"
                            strokeWidth={strokeWidth}
                        />

                        {/* Progress arc */}
                        <path
                            d={`M ${strokeWidth * 2} ${gaugeRadius} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${gaugeRadius * 2 - strokeWidth * 2} ${gaugeRadius}`}
                            fill="transparent"
                            stroke={getGaugeColor()}
                            strokeWidth={strokeWidth}
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                            style={{
                                transition: 'stroke-dashoffset 0.5s ease-in-out, stroke 0.3s ease'
                            }}
                        />

                        {/* Center percentage text */}
                        <text
                            x="50%"
                            y="65%"
                            dy="0.3em"
                            textAnchor="middle"
                            className="fw-bold"
                            fontSize="14"
                            fill={getGaugeColor()}
                        >
                            {Math.round(percentage)}%
                        </text>

                        {/* Expected vs Actual labels */}
                        <text
                            x={strokeWidth * 2}
                            y={gaugeRadius + 20}
                            textAnchor="middle"
                            fontSize="10"
                            fill="#6c757d"
                        >
                            {expectedDays}d
                        </text>
                        <text
                            x={gaugeRadius * 2 - strokeWidth * 2}
                            y={gaugeRadius + 20}
                            textAnchor="middle"
                            fontSize="10"
                            fill="#6c757d"
                        >
                            Target
                        </text>
                    </svg>
                </div>
            </div>

            {/* Lead Time Info */}
            <div className="text-center mb-2">
                <h2 className="fw-bold text-warning mb-1">{actualDays}d</h2>
                <div className={`badge bg-${statusColor} mb-2`}>{status}</div>

                <div className="d-flex justify-content-center gap-2">
                    <span className="badge bg-info text-dark">
                        🔼 {delta > 0 ? "+" : ""}
                        {delta} vs last month
                    </span>
                    {urgentCount > 0 && (
                        <span className="badge bg-danger">🔥 {urgentCount} Urgent</span>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="d-flex justify-content-between bg-light p-2 rounded-3 mt-2 small text-center">
                <div>
                    <div className="text-muted">Previous</div>
                    <div>{previous}d</div>
                </div>
                <div>
                    <div className="text-muted">Total Items</div>
                    <div className="text-primary">{totalItems}</div>
                </div>
                <div>
                    <div className="text-muted">Pending %</div>
                    <div className="text-warning">
                        {Math.round((actualDays / (totalItems * expectedDays)) * 100)}%
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeadTimeGaugeCard;