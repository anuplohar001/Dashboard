import { BarChart2 } from "react-feather";

const chartData = [{ stage: "QC Stage", "In-Process": 2, Final: 1.2 }];

const maxValue = Math.max(
  ...chartData.map((d) => Math.max(d["In-Process"], d["Final"]))
);

const FinalVsInProcessFailRateChart = () => {
  return (
    <div className="card h-100 mb-4 shadow-sm">
      <div className="card-body">
        <h6 className="mb-1 d-flex align-items-center gap-2">
          <BarChart2 size={18} className="text-primary" />
          Final QC vs In-Process QC Fail Rate
        </h6>
        <p className="text-muted mb-3" style={{ fontSize: "14px" }}>
          Compares rejection rates etween in-process and final inspection.
        </p>
        <div className="overflow-auto">
          <svg width="100%" height={chartData.length * 80}>
            {chartData.map((d, i) => {
              const bar1Length = (d["In-Process"] / maxValue) * 300;
              const bar2Length = (d["Final"] / maxValue) * 300;

              return (
                <g key={i} transform={`translate(0, ${i * 60})`}>
                  <text x="0" y="15" fontSize="12" fill="#333">
                    {d.stage}
                  </text>
                  <rect
                    x="120"
                    y="0"
                    width={bar1Length}
                    height="16"
                    fill="#1cc88a"
                    rx="3"
                  />
                  <text
                    x={120 + bar1Length + 5}
                    y="12"
                    fontSize="12"
                    fill="#000"
                  >
                    {d["In-Process"]}%
                  </text>
                  <rect
                    x="120"
                    y="22"
                    width={bar2Length}
                    height="16"
                    fill="#36b9cc"
                    rx="3"
                  />
                  <text
                    x={120 + bar2Length + 5}
                    y="34"
                    fontSize="12"
                    fill="#000"
                  >
                    {d["Final"]}%
                  </text>
                  <g transform="translate(0, 50)">
                    <rect x="120" y="0" width="12" height="12" fill="#1cc88a" />
                    <text x="140" y="10" fontSize="12" fill="#333">
                      In-Process
                    </text>
                    <rect x="220" y="0" width="12" height="12" fill="#36b9cc" />
                    <text x="240" y="10" fontSize="12" fill="#333">
                      Final
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FinalVsInProcessFailRateChart;
