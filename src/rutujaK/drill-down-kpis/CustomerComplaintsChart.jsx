import React from 'react';
import { AlertCircle } from 'react-feather';

const chartData = [
  { reason: 'Surface', complaints: 2 },
  { reason: 'Tolerance', complaints: 2 },
  { reason: 'Functional', complaints: 1 },
];

const CustomerComplaintsChart = () => {
  const chartWidth = 500;
  const chartHeight = 250;
  const margin = { top: 20, right: 20, bottom: 50, left: 40 };

  const maxValue = Math.ceil(Math.max(...chartData.map(d => d.complaints)) / 1) * 1;
  const barAreaHeight = chartHeight - margin.top - margin.bottom;
  const barWidth = 50;
  const barSpacing = 30;

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <h6 className="card-title d-flex align-items-center mb-1">
          <AlertCircle size={16} className="me-2 text-danger" />
          Customer Complaints (External Rejections)
        </h6>
        <p className="card-text text-muted mb-4" style={{ fontSize: '14px' }}>
          Total complaints received due to rejected dispatches.
        </p>

        <div className="d-flex justify-content-center">
          <svg
            width="100%"
            height="auto"
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            preserveAspectRatio="xMidYMid meet"
          >
            {[0, 1, 2].map((v, idx) => {
              const y = margin.top + (barAreaHeight * (1 - v / maxValue));
              return (
                <g key={idx}>
                  <line
                    x1={margin.left}
                    y1={y}
                    x2={chartWidth - margin.right}
                    y2={y}
                    stroke="#e0e0e0"
                  />
                  <text
                    x={margin.left - 10}
                    y={y + 4}
                    fontSize="14"
                    textAnchor="end"
                    fill="#555"
                  >
                    {v}
                  </text>
                </g>
              );
            })}
            {chartData.map((d, i) => {
              const x = margin.left + i * (barWidth + barSpacing);
              const height = (d.complaints / maxValue) * barAreaHeight;
              const y = chartHeight - margin.bottom - height;
              return (
                <g key={i}>
                  <rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={height}
                    fill="#dc3545"
                    rx="4"
                    ry="4"
                  />
                  <text
                    x={x + barWidth / 2}
                    y={chartHeight - margin.bottom + 15}
                    fontSize="13"
                    textAnchor="middle"
                    fill="#333"
                  >
                    {d.reason}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CustomerComplaintsChart;
