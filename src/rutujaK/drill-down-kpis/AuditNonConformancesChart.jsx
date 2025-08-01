import { AlertTriangle } from "react-feather";

const chartData = [
  { month: "Jan", minor: 1, major: 0 },
  { month: "Feb", minor: 2, major: 0 },
  { month: "Mar", minor: 1, major: 1 },
  { month: "Apr", minor: 3, major: 1 },
  { month: "May", minor: 2, major: 0 },
  { month: "Jun", minor: 4, major: 2 },
];

const AuditNonConformancesChart = () => {
  const chartWidth = 600;
  const chartHeight = 300;
  const margin = { top: 20, right: 20, bottom: 40, left: 40 };

  const maxY = Math.ceil(
    Math.max(...chartData.map((d) => Math.max(d.minor, d.major)))
  );

  const points = chartData.map((d, i) => {
    const x =
      margin.left +
      (i * (chartWidth - margin.left - margin.right)) / (chartData.length - 1);
    const minorY =
      margin.top +
      ((maxY - d.minor) / maxY) * (chartHeight - margin.top - margin.bottom);
    const majorY =
      margin.top +
      ((maxY - d.major) / maxY) * (chartHeight - margin.top - margin.bottom);

    return {
      x,
      label: d.month,
      minorY,
      majorY,
    };
  });

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <h6 className="card-title d-flex align-items-center mb-2">
          <AlertTriangle size={16} className="me-2 text-warning" />
          Audit Non-Conformances
        </h6>
        <p className="card-text text-muted mb-3" style={{ fontSize: "14px" }}>
          Defects identified during audits.
        </p>

        <div className="d-flex justify-content-center">
          <svg
            width="100%"
            height="auto"
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            preserveAspectRatio="xMidYMid meet"
          >
            {[0, 1, 2, 3, 4].map((val, idx) => {
              const y =
                margin.top +
                ((maxY - val) / maxY) *
                  (chartHeight - margin.top - margin.bottom);
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
                    y={y + 5}
                    fontSize="13"
                    textAnchor="end"
                    fill="#666"
                  >
                    {val}
                  </text>
                </g>
              );
            })}
            {points.map((p, i) => (
              <text
                key={`x-label-${i}`}
                x={p.x}
                y={chartHeight - margin.bottom + 20}
                fontSize="13"
                textAnchor="middle"
                fill="#333"
              >
                {p.label}
              </text>
            ))}
            <polyline
              fill="none"
              stroke="#0d6efd"
              strokeWidth="2"
              points={points.map((p) => `${p.x},${p.minorY}`).join(" ")}
            />
            {points.map((p, i) => (
              <circle
                key={`minor-dot-${i}`}
                cx={p.x}
                cy={p.minorY}
                r="4"
                fill="#0d6efd"
              />
            ))}
            <polyline
              fill="none"
              stroke="#dc3545"
              strokeWidth="2"
              points={points.map((p) => `${p.x},${p.majorY}`).join(" ")}
            />
            {points.map((p, i) => (
              <circle
                key={`major-dot-${i}`}
                cx={p.x}
                cy={p.majorY}
                r="4"
                fill="#dc3545"
              />
            ))}
            <g>
              <rect
                x={chartWidth - 160}
                y={margin.top - 20}
                width="12"
                height="12"
                fill="#0d6efd"
              />
              <text
                x={chartWidth - 140}
                y={margin.top - 10}
                fontSize="13"
                fill="#333"
              >
                Minor
              </text>
              <rect
                x={chartWidth - 90}
                y={margin.top - 20}
                width="12"
                height="12"
                fill="#dc3545"
              />
              <text
                x={chartWidth - 70}
                y={margin.top - 10}
                fontSize="13"
                fill="#333"
              >
                Major
              </text>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AuditNonConformancesChart;
