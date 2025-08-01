import React, { useMemo } from "react";
import { BarChart2 } from "react-feather";

const chartData = [
  { operation: "Assembly", defects: 30 },
  { operation: "Welding", defects: 25 },
  { operation: "Painting", defects: 20 },
  { operation: "Machining", defects: 15 },
  { operation: "Testing", defects: 10 },
  { operation: "Packaging", defects: 5 },
];

const DefectsParetoChart = () => {
  const totalDefects = useMemo(
    () => chartData.reduce((sum, d) => sum + d.defects, 0),
    []
  );

  const processedData = useMemo(() => {
    let cumulative = 0;
    return [...chartData]
      .sort((a, b) => b.defects - a.defects)
      .map((d) => {
        cumulative += d.defects;
        return {
          ...d,
          cumulative: (cumulative / totalDefects) * 100,
        };
      });
  }, [totalDefects]);

  const maxDefect = Math.max(...processedData.map((d) => d.defects));
  const chartWidth = 500;
  const chartHeight = 300;

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <h6 className="card-title d-flex align-items-center mb-1">
        <BarChart2 size={16} className="me-2 text-primary" />
          Defects by Operation / Stage
        </h6>
        <p className="card-text text-muted mb-4" style={{fontSize:"14px"}}>
          Pinpoints production stages with the most defects using Pareto analysis.
        </p>

        <div className="d-flex justify-content-center">
          <svg
            width="100%"
            height="auto"
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            preserveAspectRatio="xMidYMid meet"
          >
            {[0, 25, 50, 75, 100].map((y) => (
              <g key={y}>
                <line
                  x1="40"
                  y1={(chartHeight - 50) * (100 - y) / 100}
                  x2={chartWidth}
                  y2={(chartHeight - 50) * (100 - y) / 100}
                  stroke="#e0e0e0"
                />
                <text
                  x="5"
                  y={(chartHeight - 50) * (100 - y) / 100 + 5}
                  fontSize="14"
                >
                  {y}%
                </text>
              </g>
            ))}
            {processedData.map((d, i) => {
              const barHeight = (d.defects / maxDefect) * 200;
              const x = 50 + i * 70;
              return (
                <rect
                  key={d.operation}
                  x={x}
                  y={250 - barHeight}
                  width={30}
                  height={barHeight}
                  fill="#dc3545"
                />
              );
            })}
            {processedData.map((d, i) => {
              const x = 50 + i * 70 + 15;
              const y = 250 - (d.cumulative * 2);
              return (
                <circle key={`circle-${i}`} cx={x} cy={y} r="3" fill="#0d6efd" />
              );
            })}
            {processedData.map((d, i) => {
              if (i === 0) return null;
              const x1 = 50 + (i - 1) * 70 + 15;
              const y1 = 250 - processedData[i - 1].cumulative * 2;
              const x2 = 50 + i * 70 + 15;
              const y2 = 250 - d.cumulative * 2;
              return (
                <line
                  key={`line-${i}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#0d6efd"
                />
              );
            })}
            {processedData.map((d, i) => (
              <text
                key={`label-${d.operation}`}
                x={50 + i * 70}
                y={270}
                fontSize="14"
                transform={`rotate(45, ${50 + i * 70}, 270)`}
              >
                {d.operation}
              </text>
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DefectsParetoChart;
