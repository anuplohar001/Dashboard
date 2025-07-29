import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TotalDowntimeCard = () => {
    const totalDowntime = 62;
    const previousDowntime = 70; // example
    const targetDowntime = 60; // example
    const difference = previousDowntime - totalDowntime;
    const percentChange = ((difference / previousDowntime) * 100).toFixed(1);

    return (
        <div className="card shadow-sm p-3 rounded" style={{ width: '18rem' }}>
            <div className="d-flex justify-content-between">
                <h6 className="text-muted">Total Downtime (hrs)</h6>
                <select className="form-select form-select-sm w-auto" style={{ fontSize: '0.75rem' }}>
                    <option>Month</option>
                    <option>Week</option>
                    <option>Day</option>
                </select>
            </div>

            <div className="text-center mt-3">
                <h1 className="fw-bold text-primary">{totalDowntime}</h1>
                <span className="text-muted">hrs</span>
                <div className="mt-2">
                    <span className="badge bg-warning text-dark">⚠️ Needs Attention</span>
                </div>
                <div className="mt-2">
                    <span className={`badge ${percentChange >= 0 ? 'bg-success' : 'bg-danger'}`}>
                        {percentChange >= 0 ? `⬇️ ${percentChange}% vs last month` : `⬆️ ${Math.abs(percentChange)}% vs last month`}
                    </span>
                </div>
            </div>

            <div className="d-flex justify-content-between mt-3 text-center border-top pt-2">
                <div>
                    <small className="text-muted">Previous</small>
                    <div>{previousDowntime} hrs</div>
                </div>
                <div>
                    <small className="text-muted">Target</small>
                    <div>{targetDowntime} hrs</div>
                </div>
                <div>
                    <small className="text-muted">Downtimes</small>
                    <div>14 entries</div> {/* Example */}
                </div>
            </div>
        </div>
    );
};

export default TotalDowntimeCard;
