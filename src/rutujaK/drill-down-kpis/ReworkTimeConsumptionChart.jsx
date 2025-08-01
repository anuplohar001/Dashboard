import { Clock } from "react-feather";

const chartData = [
  { operation: "Welding", hours: 15 },
  { operation: "Assembly", hours: 12 },
  { operation: "Painting", hours: 8 },
  { operation: "Machining", hours: 7 },
];

const maxValue = Math.max(...chartData.map((d) => d.hours));

const ReworkTimeConsumptionChart = () => {
  return (
    <div className="card h-100 shadow-sm mb-4">
      <div className="card-body">
        <h6 className="mb-1 d-flex align-items-center gap-2">
          <Clock size={18} className="text-primary" />
          Rework Time Consumption
        </h6>
        <p className="text-muted mb-3" style={{ fontSize: "14px" }}>
          Time spent on performing rework activities.
        </p>

        <div className="overflow-auto">
          <svg width="100%" height="200">
            {[0, 5, 10, 15].map((tick, i) => {
              const y = 150 - (tick / maxValue) * 120;
              return (
                <g key={`ytick-${i}`}>
                  <line x1="40" y1={y} x2="100%" y2={y} stroke="#eee" />
                  <text
                    x="35"
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
            {chartData.map((d, i) => {
              const barHeight = (d.hours / maxValue) * 120;
              const barWidth = 40;
              const spacing = 70;
              const x = i * spacing + 50;
              const y = 150 - barHeight;

              return (
                <g key={i}>
                  <rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    fill="#4e73df"
                    rx="4"
                  />
                  <text
                    x={x + barWidth / 2}
                    y={y - 6}
                    fontSize="12"
                    fill="#000"
                    textAnchor="middle"
                  >
                    {d.hours}h
                  </text>
                  <text
                    x={x + barWidth / 2}
                    y={170}
                    fontSize="11"
                    fill="#333"
                    textAnchor="middle"
                  >
                    {d.operation}
                  </text>
                </g>
              );
            })}
            <line x1="40" y1="0" x2="40" y2="150" stroke="#ccc" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ReworkTimeConsumptionChart;
