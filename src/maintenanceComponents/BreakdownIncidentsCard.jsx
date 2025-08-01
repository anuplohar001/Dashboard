import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const BreakdownIncidentsCard = () => {
    const currentBreakdowns = 7; // Example: 7 breakdowns this month
    const previousBreakdowns = 11; // Example: Last month
    const targetBreakdowns = 5; // Target (lower is better)

    const difference = previousBreakdowns - currentBreakdowns;
    const trend = difference >= 0 ? `⬇️ ${difference} vs last month` : `⬆️ ${Math.abs(difference)} vs last month`;
    const trendColor = difference >= 0 ? 'bg-success' : 'bg-danger';

    return (
        <div className=" col-md-6 col-lg-12 col-12">
            <div className='card-container'>
                <div className="d-flex justify-content-between align-items-center">
                    <h6 style={{ textAlign: "left", fontWeight: '600' }}>Breakdown Incidents (MTD)</h6>
                    <select className="form-select form-select-sm w-auto" style={{ fontSize: '0.75rem' }}>
                        <option>Month</option>
                        <option>Week</option>
                        <option>Day</option>
                    </select>
                </div>

                <div className="text-center mt-3">
                    <h1 className="fw-bold text-danger">{currentBreakdowns}</h1>
                    <span className="text-muted">incidents</span>
                    <div className="mt-2">
                        <span className="badge bg-warning text-dark">⚠️ Monitor Closely</span>
                    </div>
                    <div className="mt-2">
                        <span className={`badge ${trendColor}`}>{trend}</span>
                    </div>
                </div>

                <div className="d-flex justify-content-between mt-3 text-center p-2 rounded" style={{ backgroundColor: "#f1f1f1" }}>
                    <div>
                        <small className="text-muted">Previous</small>
                        <div className="text-primary">{previousBreakdowns}</div>
                    </div>
                    <div>
                        <small className="text-muted">Target</small>
                        <div className="text-success">{targetBreakdowns}</div>
                    </div>
                    <div>
                        <small className="text-muted">Logged</small>
                        <div className="text-dark">{currentBreakdowns} breakdowns</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BreakdownIncidentsCard;
