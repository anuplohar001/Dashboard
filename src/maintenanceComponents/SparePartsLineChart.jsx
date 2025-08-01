import React, { useState } from "react";
import { Card } from "react-bootstrap";

const SparePartsLineChart = () => {
    const usageData = [
        { month: "Jan", Bearings: 8000, Gears: 6000, Belts: 3000 },
        { month: "Feb", Bearings: 9000, Gears: 5000, Belts: 4000 },
        { month: "Mar", Bearings: 7500, Gears: 7000, Belts: 3500 },
        { month: "Apr", Bearings: 12000, Gears: 8000, Belts: 5000 },
        { month: "May", Bearings: 9500, Gears: 6500, Belts: 4200 },
        { month: "Jun", Bearings: 10000, Gears: 7000, Belts: 4500 },
    ];

    const items = ["Bearings", "Gears", "Belts"];
    const colors = {
        Bearings: "#007bff",
        Gears: "#28a745",
        Belts: "#ffc107",
    };

    const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, label: "" });

    const maxValue = Math.max(
        ...usageData.flatMap((d) => items.map((item) => d[item]))
    );

    const chartWidth = 600;
    const chartHeight = 350;
    const padding = 50;
    const spacing = (chartWidth - 2 * padding) / (usageData.length - 1);

    const handleMouseOver = (e, item, value, x, y) => {
        setTooltip({
            show: true,
            x,
            y,
            label: `${item}: ₹${value.toLocaleString()}`,
        });
    };

    const handleMouseOut = () => setTooltip({ ...tooltip, show: false });

    const totalUsage = usageData.reduce(
        (acc, item) => {
            acc.Bearings += item.Bearings;
            acc.Gears += item.Gears;
            acc.Belts += item.Belts;
            return acc;
        },
        { Bearings: 0, Gears: 0, Belts: 0 }
    );

    // Output
    // Bearings: 56000, Gears: 39500, Belts: 24200
    const maxMonth = usageData.reduce((prev, curr) => {
        const prevTotal = prev.Bearings + prev.Gears + prev.Belts;
        const currTotal = curr.Bearings + curr.Gears + curr.Belts;
        return currTotal > prevTotal ? curr : prev;
    });

    // Output
    // April – Bearings: 12000, Gears: 8000, Belts: 5000 → Total = 25,000
    const months = usageData.length;

    const avgUsage = {
        Bearings: totalUsage.Bearings / months,
        Gears: totalUsage.Gears / months,
        Belts: totalUsage.Belts / months
    };

    // Output (approx.):
    // Bearings: 9333.33
    // Gears: 6583.33
    // Belts: 4033.33


    return (
        <div className="col-lg-6 col-md-12 col-12 ">
            <div className="card-container">

                <h6 style={{ textAlign: "left", fontWeight: "600" }}>Spare Parts Usage (Monthly)</h6>
                <div style={{ width: "100%", overflow: "scroll" }}>
                    <div style={{ width: "fit-content" }}>

                        <svg width={chartWidth} height={chartHeight}>
                            {/* Axes */}
                            <line x1={padding} y1={padding} x2={padding} y2={chartHeight - padding} stroke="#6c757d" strokeWidth="2" />
                            <line x1={padding} y1={chartHeight - padding} x2={chartWidth - padding} y2={chartHeight - padding} stroke="#6c757d" strokeWidth="2" />

                            {/* Y-axis gridlines and labels */}
                            {[0, 3000, 6000, 9000, 12000].map((val) => {
                                const y = chartHeight - padding - (val / maxValue) * (chartHeight - 2 * padding);
                                return (
                                    <g key={val}>
                                        <text x={padding - 10} y={y + 5} fontSize="11" textAnchor="end" fill="#6c757d">
                                            ₹{val / 1000}k
                                        </text>
                                        <line x1={padding} y1={y} x2={chartWidth - padding} y2={y} stroke="#dee2e6" strokeDasharray="4 2" />
                                    </g>
                                );
                            })}

                            {/* Lines for each item */}
                            {items.map((item) => (
                                <polyline
                                    key={item}
                                    fill="none"
                                    stroke={colors[item]}
                                    strokeWidth="1"
                                    points={usageData
                                        .map((d, i) => {
                                            const x = padding + i * spacing;
                                            const y = chartHeight - padding - (d[item] / maxValue) * (chartHeight - 2 * padding);
                                            return `${x},${y}`;
                                        })
                                        .join(" ")}
                                />
                            ))}

                            {/* Circles and tooltips for each point */}
                            {usageData.map((d, i) => {
                                const x = padding + i * spacing;
                                return items.map((item) => {
                                    const y = chartHeight - padding - (d[item] / maxValue) * (chartHeight - 2 * padding);
                                    return (
                                        <circle
                                            key={`${d.month}-${item}`}
                                            cx={x}
                                            cy={y}
                                            r={4}
                                            fill={colors[item]}
                                            stroke="#fff"
                                            strokeWidth={1.5}
                                            onMouseOver={(e) => handleMouseOver(e, item, d[item], x + 10, y - 10)}
                                            onMouseOut={handleMouseOut}
                                        />
                                    );
                                });
                            })}

                            {/* X-axis labels */}
                            {usageData.map((d, i) => {
                                const x = padding + i * spacing;
                                return (
                                    <text key={d.month} x={x} y={chartHeight - padding + 20} textAnchor="middle" fontSize="11" fill="#6c757d">
                                        {d.month}
                                    </text>
                                );
                            })}

                            {/* Y-axis label */}
                            <text
                                x="20"
                                y={chartHeight / 2}
                                textAnchor="middle"
                                fontSize="12"
                                fill="#6c757d"
                                transform={`rotate(-90, 20, ${chartHeight / 2})`}
                            >
                                Usage Cost (₹)
                            </text>

                            {/* X-axis label */}
                            <text
                                x={chartWidth / 2}
                                y={chartHeight - 10}
                                textAnchor="middle"
                                fontSize="12"
                                fill="#6c757d"
                            >
                                Month
                            </text>

                            {/* Tooltip */}
                            {tooltip.show && (
                                <foreignObject x={tooltip.x} y={tooltip.y} width="120" height="30">
                                    <div
                                        style={{
                                            background: "rgba(0,0,0,0.75)",
                                            color: "white",
                                            padding: "4px 8px",
                                            borderRadius: "4px",
                                            fontSize: "11px",
                                        }}
                                    >
                                        {tooltip.label}
                                    </div>
                                </foreignObject>
                            )}
                        </svg>
                    </div>
                </div>

                {/* Legend */}
                <div className="mt-3 d-flex justify-content-evenly gap-3">
                    {items.map((item) => (
                        <div key={item} className="d-flex align-items-center gap-2">
                            <div style={{ width: "12px", height: "12px", backgroundColor: colors[item], borderRadius: "50%" }}></div>
                            <small>{item}</small>
                        </div>
                    ))}
                </div>
                {/* Bottom section with key metrics */}
                <div className="mt-1 pt-2 border-top">
                    <div className="row g-2">
                        <div className="col-4">
                            <div className="text-center">
                                <div className="fw-bold text-dark" style={{ fontSize: '14px' }}>
                                    {maxMonth.Bearings}
                                </div>
                                <div className="text-muted" style={{ fontSize: '10px' }}>Max Month Cost (Bearings)</div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="text-center">
                                <div className="fw-bold text-dark" style={{ fontSize: '14px' }}>
                                    {avgUsage.Bearings.toFixed(2)}
                                </div>
                                <div className="text-muted" style={{ fontSize: '10px' }}>Average Cost</div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="text-center">
                                <div className="fw-bold text-dark" style={{ fontSize: '14px' }}>
                                    {totalUsage.Bearings}
                                </div>
                                <div className="text-muted" style={{ fontSize: '10px' }}>Total Bearings Cost</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SparePartsLineChart;
