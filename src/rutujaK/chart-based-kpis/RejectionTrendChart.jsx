import { TrendingDown } from 'react-feather';
const chartData = [
  { month: 'Jan', rejections: 22 },
  { month: 'Feb', rejections: 35 },
  { month: 'Mar', rejections: 18 },
  { month: 'Apr', rejections: 40 },
  { month: 'May', rejections: 30 },
  { month: 'Jun', rejections: 52 },
];

const chartWidth = 600;
const chartHeight = 300;
const margin = { top: 20, right: 20, bottom: 40, left: 40 };

const RejectionTrendChart = () => {
  const maxValue = Math.ceil(Math.max(...chartData.map(d => d.rejections)) / 10) * 10;

  const points = chartData.map((d, i) => {
    const x = margin.left + (i * ((chartWidth - margin.left - margin.right) / (chartData.length - 1)));
    const y = margin.top + ((maxValue - d.rejections) / maxValue) * (chartHeight - margin.top - margin.bottom);
    return { x, y, label: d.month, value: d.rejections };
  });

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <h6 className="card-title d-flex align-items-center mb-2">
          <TrendingDown size={16} className="me-2 text-danger" />
          Rejection Trend Over Time
        </h6>
        <p className="card-text text-muted mb-3" style={{ fontSize: '14px' }}>
          Tracks QC rejections month-over-month to identify patterns.
        </p>

        <div className="d-flex justify-content-center">
          <svg
            width="100%"
            height="auto"
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            preserveAspectRatio="xMidYMid meet"
          >
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
              const y = margin.top + ratio * (chartHeight - margin.top - margin.bottom);
              const value = Math.round((1 - ratio) * maxValue);
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
                    fontSize="16"
                    textAnchor="end"
                    fill="#555"
                  >
                    {value}
                  </text>
                </g>
              );
            })}
            {points.map((p, i) => (
              <text
                key={`xlabel-${i}`}
                x={p.x}
                y={chartHeight - margin.bottom + 20}
                fontSize="16"
                textAnchor="middle"
                fill="#555"
              >
                {p.label}
              </text>
            ))}
            <polyline
              fill="none"
              stroke="#dc3545"
              strokeWidth="2"
              points={points.map(p => `${p.x},${p.y}`).join(' ')}
            />
            {points.map((p, i) => (
              <circle
                key={`dot-${i}`}
                cx={p.x}
                cy={p.y}
                r="4"
                fill="#dc3545"
              />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default RejectionTrendChart;
