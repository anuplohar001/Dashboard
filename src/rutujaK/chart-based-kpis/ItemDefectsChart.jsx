import { AlertCircle } from 'react-feather';
const chartData = [
  { name: 'Gearbox Pro', defects: 12 },
  { name: 'Rotor XT', defects: 5 },
  { name: 'Casing Standard', defects: 8 },
  { name: 'Bearing Plus', defects: 3 },
  { name: 'Shaft-2000', defects: 7 },
];

const maxDefects = Math.max(...chartData.map(item => item.defects));

const ItemDefectsChart = () => {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <h6 className="card-title d-flex align-items-center mb-1">
        <AlertCircle className="me-2 text-primary" size={20} />
          Defects by Item / Category
        </h6>
        <p className="card-text text-muted mb-3" style={{fontSize:"14px"}}>
          Highlights items or categories with the most quality issues.
        </p>

        <div className="d-flex flex-column gap-3">
          {chartData.map((item, index) => {
            const barWidth = (item.defects / maxDefects) * 100;

            return (
              <div key={index}>
                <div className="d-flex justify-content-between small fw-medium">
                  <span style={{fontSize:"14px"}}>{item.name}</span>
                  <span style={{fontSize:"14px"}}>{item.defects}</span>
                </div>
                <div className="progress" style={{ height: '13px' }}>
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{ width: `${barWidth}%` }}
                    aria-valuenow={item.defects}
                    aria-valuemin="0"
                    aria-valuemax={maxDefects}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ItemDefectsChart;
