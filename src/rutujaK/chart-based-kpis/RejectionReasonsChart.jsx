import { Info } from "react-feather";

const chartData = [
  { reason: "Dimensional", count: 18, fill: "#0d6efd" },
  { reason: "Visual", count: 12, fill: "#6c757d" },
  { reason: "Surface", count: 8, fill: "#ffc107" },
  { reason: "Functional", count: 5, fill: "#dc3545" },
  { reason: "Other", count: 9, fill: "#198754" },
];

const calculatePieSlices = (data) => {
  const total = data.reduce((sum, d) => sum + d.count, 0);
  let cumulative = 0;

  return data.map((item) => {
    const startAngle = (cumulative / total) * 2 * Math.PI;
    cumulative += item.count;
    const endAngle = (cumulative / total) * 2 * Math.PI;

    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
    const x1 = 100 + 100 * Math.cos(startAngle);
    const y1 = 100 + 100 * Math.sin(startAngle);
    const x2 = 100 + 100 * Math.cos(endAngle);
    const y2 = 100 + 100 * Math.sin(endAngle);

    return {
      ...item,
      path: `M100,100 L${x1},${y1} A100,100 0 ${largeArc},1 ${x2},${y2} Z`,
    };
  });
};

const RejectionReasonsChart = () => {
  const slices = calculatePieSlices(chartData);

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <h6 className="card-title d-flex align-items-center mb-1">
          <Info size={20} className="me-2 text-primary" />
          QC Rejection Reasons
        </h6>
        <p className="card-text text-muted" style={{ fontSize: "14px" }}>
          Breakdown of rejection types (e.g., dimensional, surface, visual).
        </p>
        <div className="d-flex flex-column align-items-center justify-content-center">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 200 200"
            style={{ maxWidth: 180 }}
          >
            {slices.map((slice, index) => (
              <path
                key={index}
                d={slice.path}
                fill={slice.fill}
                stroke="#fff"
                strokeWidth="1"
              />
            ))}
          </svg>
          <ul className="list-unstyled d-flex flex-wrap mt-3 gap-3">
            {chartData.map((item, idx) => (
              <li key={idx} className="d-flex align-items-center">
                <span
                  className="me-1"
                  style={{
                    width: 12,
                    height: 12,
                    backgroundColor: item.fill,
                    display: "inline-block",
                  }}
                ></span>
                <span style={{fontSize:"14px"}} className="me-2">{item.reason}</span>
                <span style={{fontSize:"14px"}} className="fw-semibold">{item.count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RejectionReasonsChart;
