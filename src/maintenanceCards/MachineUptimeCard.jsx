import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const MachineUptimeCard = () => {
    const totalAvailableTime = 720; // in hours
    const downtime = 48; // in hours
    const uptimePercent = (((totalAvailableTime - downtime) / totalAvailableTime) * 100).toFixed(1);

    const previousUptime = 91.5; // example previous month
    const targetUptime = 95.0; // target uptime %
    const percentChange = (uptimePercent - previousUptime).toFixed(1);

    return (
        <div className="card shadow-sm p-3 rounded" style={{ width: '18rem' }}>
            <div className="d-flex justify-content-between align-items-center">
                <h6 className="text-muted mb-0">Machine Uptime %</h6>
                <select className="form-select form-select-sm w-auto" style={{ fontSize: '0.75rem' }}>
                    <option>Month</option>
                    <option>Week</option>
                    <option>Day</option>
                </select>
            </div>

            <div className="text-center mt-3">
                <h1 className="fw-bold text-primary">{uptimePercent}</h1>
                <span className="text-muted">%</span>
                <div className="mt-2">
                    <span className="badge bg-success">✅ Excellent</span>
                </div>
                <div className="mt-2">
                    <span className={`badge ${percentChange >= 0 ? 'bg-success' : 'bg-danger'}`}>
                        {percentChange >= 0 ? `⬆️ ${percentChange}% vs last month` : `⬇️ ${Math.abs(percentChange)}% vs last month`}
                    </span>
                </div>
            </div>

            <div className="d-flex justify-content-between mt-3 text-center border-top pt-2">
                <div>
                    <small className="text-muted">Previous</small>
                    <div>{previousUptime}%</div>
                </div>
                <div>
                    <small className="text-muted">Target</small>
                    <div>{targetUptime}%</div>
                </div>
                <div>
                    <small className="text-muted">Downtime</small>
                    <div>{downtime} hrs</div>
                </div>
            </div>
        </div>
    );
};

export default MachineUptimeCard;
