import React from "react";
import { BarChart2 } from "react-feather";

const chartData = [
  { inspector: "Inspector A", rejections: 12 },
  { inspector: "Inspector B", rejections: 5 },
  { inspector: "Inspector C", rejections: 8 },
  { inspector: "Inspector D", rejections: 3 },
];

const maxValue = Math.max(...chartData.map((d) => d.rejections));
const yTicks = [0, 5, 10, 15];

const InspectorRejectionPatternChart = () => {
  return (
    <div className="card h-100 mb-4 shadow-sm">
      <div className="card-body">
        <h6 className="mb-1 d-flex align-items-center gap-2">
          <BarChart2 size={18} className="text-danger" />
          Inspector-wise Rejection Pattern
        </h6>
        <p className="text-muted mb-3" style={{ fontSize: "14px" }}>
          Identifies trends based on inspector handling.
        </p>

        <div className="overflow-auto">
          <svg width="100%" height="200">
            {yTicks.map((tick, i) => {
              const y = 150 - (tick / maxValue) * 120;
              return (
                <g key={`ytick-${i}`}>
                  <line x1="30" y1={y} x2="100%" y2={y} stroke="#eee" />
                  <text
                    x="28"
                    y={y + 4}
                    fontSize="10"
                    fill="#666"
                    textAnchor="end"
                  >
                    {tick}
                  </text>
                </g>
              );
            })}

            {/* Bars */}
            {chartData.map((d, i) => {
              const barHeight = (d.rejections / maxValue) * 120;
              const barWidth = 40;
              const spacing = 70;
              const x = i * spacing + 40;
              const y = 150 - barHeight;

              return (
                <g key={i}>
                  <rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    fill="#e74a3b"
                    rx="4"
                  />
                  <text
                    x={x + barWidth / 2}
                    y={y - 6}
                    fontSize="12"
                    fill="#000"
                    textAnchor="middle"
                  >
                    {d.rejections}
                  </text>
                  <text
                    x={x + barWidth / 2}
                    y={170}
                    fontSize="11"
                    fill="#333"
                    textAnchor="middle"
                  >
                    {d.inspector}
                  </text>
                </g>
              );
            })}

            {/* Y-Axis Line */}
            <line x1="30" y1="0" x2="30" y2="150" stroke="#ccc" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default InspectorRejectionPatternChart;
