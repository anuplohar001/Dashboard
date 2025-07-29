import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
const ReceivablesAgingTable = ({ name }) => {

    const [selectedPeriod, setSelectedPeriod] = React.useState('current');
    const [invoices, setInvoices] = useState([
        { id: 1, customer: "Customer A", amount: 50000, dueInDays: 15 },
        { id: 2, customer: "Customer B", amount: 75000, dueInDays: 45 },
        { id: 3, customer: "Customer C", amount: 75000, dueInDays: 45 },
        { id: 4, customer: "Customer D", amount: 75000, dueInDays: 45 },
        { id: 5, customer: "Customer E", amount: 25000, dueInDays: 95 }
    ]);

    // Function to determine aging bucket
    const getBucket = (days) => {
        if (days <= 30) return "0–30 days";
        if (days <= 60) return "31–60 days";
        if (days <= 90) return "61–90 days";
        return "90+ days";
    };
    const handleSelectChange = (event) => {
        setSelectedPeriod(event.target.value);
        if (event.target.value === 'current') {
            setInvoices([
                { id: 1, customer: "Customer A", amount: 50000, dueInDays: 15 },
                { id: 2, customer: "Customer B", amount: 75000, dueInDays: 45 },
                { id: 3, customer: "Customer C", amount: 75000, dueInDays: 45 },
                { id: 4, customer: "Customer D", amount: 75000, dueInDays: 45 },
                { id: 5, customer: "Customer E", amount: 25000, dueInDays: 95 }
            ]);
        } else if (event.target.value === '2024') {
            setInvoices([
                { id: 1, customer: "Customer A", amount: 60000, dueInDays: 20 },
                { id: 2, customer: "Customer B", amount: 60000, dueInDays: 20 },
                { id: 3, customer: "Customer C", amount: 80000, dueInDays: 50 },
                { id: 4, customer: "Customer D", amount: 30000, dueInDays: 70 },
                { id: 5, customer: "Customer E", amount: 90000, dueInDays: 110 }
            ]);
        }
    }

    return (
        <div className="card-container tables" style={{ height: "fit-content" }}>
            <div className='d-flex justify-content-between align-items-center mb-2'>
                <h4 style={{ fontSize: "14px" }}><strong>Receivable Aging Report</strong></h4>
                <select
                    className="form-select form-select-sm mb-1"
                    style={{ width: '75px', fontSize: '10px', padding: '2px 4px' }}
                    value={selectedPeriod}
                    onChange={handleSelectChange}
                >
                    <option value="current">Current</option>
                    <option value="2024">2024</option>
                </select>
            </div>

            <div style={{overflow:"scroll"}}>
                <div>
                    <table className="table table-bordered table-hover mt-3" style={{ fontSize: "13px" }}>
                        <thead className="table-light">
                            <tr>
                                <th>Invoice ID</th>
                                <th>Customer</th>
                                <th>Amount (₹)</th>
                                <th>Due In (Days)</th>
                                <th>Aging Bucket</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map(({ id, customer, amount, dueInDays }) => (
                                <tr key={id}>
                                    <td>{id}</td>
                                    <td>{customer}</td>
                                    <td>₹{amount.toLocaleString()}</td>
                                    <td>{dueInDays}</td>
                                    <td>{getBucket(dueInDays)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>



        </div>
    );
};

export default ReceivablesAgingTable;
