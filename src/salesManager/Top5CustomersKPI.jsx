import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const Top5CustomersKPI = () => {
    const [hoveredBar, setHoveredBar] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const customers = [
        { name: 'ABC Ltd.', revenue: 5.2, percentage: 90 },
        { name: 'XYZ Corp.', revenue: 4.8, percentage: 92 },
        { name: 'TechnoSoft Pvt Ltd.', revenue: 3.9, percentage: 75 },
        { name: 'Global Industries', revenue: 3.2, percentage: 62 },
        { name: 'InnovateCo', revenue: 2.7, percentage: 52 }
    ];

    return (
        <div className=''>
            <div className="card-container salestopcustomers" style={{ height: '26.5rem' }}>
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="card-title mb-0" style={{ fontSize: '14px', fontWeight: '500', color: '#333' }}>
                            Top 5 Customers
                        </h6>
                        <button className="btn btn-outline-secondary btn-sm" style={{ fontSize: '12px', padding: '2px 8px' }}>
                            Current ▼
                        </button>
                    </div>
                    <div style={{ overflow: "scroll", width: '100%' }}>

                        <div style={{ width: "max-content" }}>
                            <div className="d-flex justify-content-center" style={{ marginLeft: "0rem" }}>
                                <div className='' style={{ position: "relative", top: "8rem", height: "30px", transform: 'rotate(-90deg)', fontSize: '15px', color: '#666' }}>
                                    Customers
                                </div>
                                <div className=''>
                                    {customers.map((customer, index) => (
                                        <div
                                            key={index}
                                            className="mb-2 position-relative"
                                            
                                        >
                                            <div className="d-flex justify-content-between align-items-center mb-1">
                                                <span style={{ fontSize: '12px', color: '#333', fontWeight: '500' }}>
                                                    {customer.name}
                                                </span>
                                                <span style={{ fontSize: '12px', color: '#666' }}>
                                                    ₹{customer.revenue}L
                                                </span>
                                            </div>

                                            <div>

                                                {/* Background bar */}
                                                <div
                                                    className="rounded"
                                                    style={{
                                                        width: '32rem',
                                                        height: '1.5rem',
                                                        backgroundColor: '#f1f3f4'
                                                    }}
                                                    onMouseEnter={() => setHoveredBar(index)}
                                                    onMouseLeave={() => setHoveredBar(null)}
                                                    onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
                                                >
                                                    {/* Filled bar */}
                                                    <div
                                                        className="h-100 rounded"
                                                        style={{
                                                            width: `${customer.percentage}%`,
                                                            backgroundColor: '#4285f4',
                                                            cursor: 'pointer',
                                                            transition: 'opacity 0.2s',
                                                            opacity: hoveredBar === index ? 0.8 : 1
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='' style={{ height: "30px", fontSize: '15px', color: '#666' }}>
                                Amount
                            </div>
                            {/* Summary */}
                            <div className=" pt-2 border-top">
                                <div className="text-center">
                                    <div className="fw-bold" style={{ fontSize: '16px', color: '#333' }}>₹19.8L</div>
                                    <div style={{ fontSize: '12px', color: '#666' }}>Total Revenue (Top 5)</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {/* Tooltip */}
            {hoveredBar !== null && (
                <div
                    style={{
                        position: 'fixed',
                        left: `${mousePos.x + 12}px`,
                        top: `${mousePos.y + 10}px`,
                        width: '100px',
                        height: 'fit-content',
                        padding: '5px',
                        borderRadius: '5px',
                        backgroundColor: '#212121ea',
                        color: 'white',
                        zIndex: '1000',
                        textAlign: "center",
                        fontSize: "12px"
                        
                    }}
                >
                    Revenue: ₹{customers[hoveredBar].revenue}L
                </div>
            )}
        </div>
    );
};


export default Top5CustomersKPI;
