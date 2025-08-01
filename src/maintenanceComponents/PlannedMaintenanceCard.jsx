import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PlannedMaintenanceCard = () => {
    const totalPMs = 50;
    const completedOnTime = 43;
    const compliancePercent = ((completedOnTime / totalPMs) * 100).toFixed(1);

    const previousCompliance = 81.2; // example
    const targetCompliance = 90.0; // example
    const percentChange = (compliancePercent - previousCompliance).toFixed(1);

    return (
        <div className=" col-md-6 col-lg-12 col-12">
            <div className='card-container'>

                <div className="d-flex justify-content-between align-items-center">
                    <h6 style={{ textAlign: "left", fontWeight: '600' }}>Planned Maintenance Compliance</h6>
                    <select className="form-select form-select-sm w-auto" style={{ fontSize: '0.75rem' }}>
                        <option>Month</option>
                        <option>Week</option>
                        <option>Day</option>
                    </select>
                </div>

                <div className="text-center mt-3">
                    <h1 className="fw-bold text-primary">{compliancePercent}</h1>
                    <span className="text-muted">%</span>
                    <div className="mt-2">
                        <span className="badge bg-info text-dark">🛠️ On Track</span>
                    </div>
                    <div className="mt-2">
                        <span className={`badge ${percentChange >= 0 ? 'bg-success' : 'bg-danger'}`}>
                            {percentChange >= 0 ? `⬆️ ${percentChange}% vs last month` : `⬇️ ${Math.abs(percentChange)}% vs last month`}
                        </span>
                    </div>
                </div>

                <div className="d-flex justify-content-between mt-3 text-center p-2 rounded" style={{ backgroundColor: "#f1f1f1" }}>
                    <div>
                        <small className="text-muted">Previous</small>
                        <div className="text-primary">{previousCompliance}%</div>
                    </div>
                    <div>
                        <small className="text-muted">Target</small>
                        <div className="text-success">{targetCompliance}%</div>
                    </div>
                    <div>
                        <small className="text-muted">PMs</small>
                        <div className="text-dark">{completedOnTime}/{totalPMs}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlannedMaintenanceCard;
