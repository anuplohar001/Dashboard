import { BarChart2 } from "react-feather";

const chartData = [
  { machine: "M1", jobs: 5 },
  { machine: "M2", jobs: 7 },
  { machine: "M3", jobs: 8 },
  { machine: "M4", jobs: 4 },
  { machine: "Assembly A", jobs: 12 },
  { machine: "Assembly B", jobs: 6 },
];

const maxJobs = Math.max(...chartData.map((d) => d.jobs));

const ReworkLoadChart = () => {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div>
          <h6 className="mb-0">
            <BarChart2 size={20} className="text-success" />
            Rework Load by Machine / Department
          </h6>
          <p style={{ fontSize: "14px" }} className="text-muted">
            Shows rework distribution across machines or teams.
          </p>
        </div>

        <div className="overflow-x-auto">
          <svg width="100%" height={chartData.length * 50}>
            {chartData.map((d, i) => {
              const barLength = (d.jobs / maxJobs) * 300;
              return (
                <g key={i} transform={`translate(0, ${i * 50})`}>
                  <text
                    x="0"
                    y="15"
                    alignmentBaseline="middle"
                    fontSize="12"
                    fill="#333"
                  >
                    {d.machine}
                  </text>
                  <rect
                    x="100"
                    y="2"
                    width={barLength}
                    height="20"
                    fill="#0d6efd"
                    rx="4"
                    ry="4"
                  />
                  <text
                    x={100 + barLength + 5}
                    y="15"
                    fontSize="12"
                    fill="#000"
                  >
                    {d.jobs}
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

export default ReworkLoadChart;
