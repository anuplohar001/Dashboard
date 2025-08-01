import React, { useState } from 'react';

const ProductionCostChart = () => {
    const [hoveredBar, setHoveredBar] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    // Sample data based on the image pattern
    const data = [
        {
            workOrder: 'WO-1',
            machineTime: 120,
            machineRate: 0.5,
            materialQty: 50,
            materialRate: 2.0,
            labor: 50,
            rework: 0,
            totalCost: 210
        },
        {
            workOrder: 'WO-2',
            machineTime: 200,
            machineRate: 0.8,
            materialQty: 80,
            materialRate: 18.0,
            labor: 100,
            rework: 20,
            totalCost: 1700
        },
        {
            workOrder: 'WO-3',
            machineTime: 150,
            machineRate: 0.6,
            materialQty: 60,
            materialRate: 20.0,
            labor: 80,
            rework: 10,
            totalCost: 1380
        },
        {
            workOrder: 'WO-4',
            machineTime: 100,
            machineRate: 0.7,
            materialQty: 40,
            materialRate: 28.0,
            labor: 60,
            rework: 5,
            totalCost: 1255
        },
        {
            workOrder: 'WO-5',
            machineTime: 250,
            machineRate: 0.9,
            materialQty: 90,
            materialRate: 18.5,
            labor: 120,
            rework: 15,
            totalCost: 1825
        },
        {
            workOrder: 'WO-6',
            machineTime: 180,
            machineRate: 0.65,
            materialQty: 70,
            materialRate: 21.0,
            labor: 90,
            rework: 8,
            totalCost: 1685
        },
        {
            workOrder: 'WO-7',
            machineTime: 300,
            machineRate: 0.8,
            materialQty: 100,
            materialRate: 16.0,
            labor: 150,
            rework: 25,
            totalCost: 2015
        },
        {
            workOrder: 'WO-8',
            machineTime: 280,
            machineRate: 0.85,
            materialQty: 95,
            materialRate: 17.5,
            labor: 140,
            rework: 20,
            totalCost: 1958
        },
        {
            workOrder: 'WO-9',
            machineTime: 320,
            machineRate: 0.75,
            materialQty: 110,
            materialRate: 15.5,
            labor: 160,
            rework: 30,
            totalCost: 2135
        },
        {
            workOrder: 'WO-10',
            machineTime: 320,
            machineRate: 0.75,
            materialQty: 110,
            materialRate: 15.5,
            labor: 160,
            rework: 30,
            totalCost: 2135
        }
    ];

    const maxCost = Math.max(...data.map(d => d.totalCost));
    const chartWidth = 550;
    const chartHeight = 400;
    const margin = { top: 20, right: 20, bottom: 60, left: 80 };
    const innerWidth = chartWidth - margin.left - margin.right;
    const innerHeight = chartHeight - margin.top - margin.bottom;

    const barWidth = innerWidth / data.length * 0.5;
    const barSpacing = innerWidth / data.length * 0.2;



    const calculateBreakdown = (item) => {
        const machineTimeCost = item.machineTime * item.machineRate;
        const materialCost = item.materialQty * item.materialRate;
        return {
            machineTimeCost,
            materialCost,
            labor: item.labor,
            rework: item.rework,
            total: machineTimeCost + materialCost + item.labor + item.rework
        };
    };


    const handleMouseMove = (e) => {
        const x = e.clientX;
        const y = e.clientY;
        setMousePos({
            x: x,
            y: y,
        });
    };

    return (
        <div className="prodchart">
            <div className="row">
                <div className='card-container myborder'>
                    <div className="">
                        <h6 className="m-1">Production Cost per Job</h6>
                        <div className="card-body d-flex flex-wrap gap-4 justify-content-evenly align-items-center" >

                            {/* Bar Chart */}
                            <div style={{ overflow: "scroll"}}>

                                <div style={{width:"max-content"}}>
                                    <div className="d-flex justify-content-center">
                                        <svg width={chartWidth} height={chartHeight} className="border">
                                            {/* Grid lines */}
                                            <defs>
                                                <pattern id="grid" width="1" height="20" patternUnits="userSpaceOnUse">
                                                    <path d="M 0 20 L 1 20" stroke="#e5e7eb" strokeWidth="0.5" />
                                                </pattern>
                                            </defs>
                                            <rect width={innerWidth} height={innerHeight} x={margin.left} y={margin.top} fill="url(#grid)" opacity="0.5" />

                                            {/* Horizontal grid lines */}
                                            {[0, 500, 1000, 1500, 2000].map(value => (
                                                <g key={value}>
                                                    <line
                                                        x1={margin.left}
                                                        y1={margin.top + innerHeight - (value / maxCost) * innerHeight}
                                                        x2={margin.left + innerWidth}
                                                        y2={margin.top + innerHeight - (value / maxCost) * innerHeight}
                                                        stroke="#969696ff"
                                                        strokeWidth="1"
                                                    />
                                                    <text
                                                        x={margin.left - 10}
                                                        y={margin.top + innerHeight - (value / maxCost) * innerHeight + 5}
                                                        textAnchor="end"
                                                        fontSize="12"
                                                        fill="#6b7280"
                                                    >
                                                        {value}
                                                    </text>
                                                </g>
                                            ))}

                                            {/* Bars */}
                                            {data.map((item, index) => {
                                                const barHeight = (item.totalCost / maxCost) * innerHeight;
                                                const x = margin.left + index * (barWidth + barSpacing) + barSpacing / 2;
                                                const y = margin.top + innerHeight - barHeight;

                                                return (
                                                    <g key={item.workOrder}>
                                                        <rect
                                                            x={x}
                                                            y={y}
                                                            width={barWidth}
                                                            height={barHeight}
                                                            fill={'#10b981'}
                                                            stroke={hoveredBar === index ? '#1f2937' : 'none'}
                                                            strokeWidth={hoveredBar === index ? 2 : 0}
                                                            opacity={hoveredBar === index ? 0.8 : 1}
                                                            onMouseEnter={() => setHoveredBar(index)}
                                                            onMouseLeave={() => setHoveredBar(null)}
                                                            onMouseMove={(e) => handleMouseMove(e)}
                                                            style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
                                                        />

                                                        {/* Value labels on bars */}
                                                        <text
                                                            x={x + barWidth / 2}
                                                            y={y - 5}
                                                            textAnchor="middle"
                                                            fontSize="11"
                                                            fill="#374151"
                                                            fontWeight="bold"
                                                        >
                                                            ₹{item.totalCost}
                                                        </text>

                                                        {/* X-axis labels */}
                                                        <text
                                                            x={x + barWidth / 2}
                                                            y={margin.top + innerHeight + 20}
                                                            textAnchor="middle"
                                                            fontSize="12"
                                                            fill="#374151"
                                                            fontWeight="500"
                                                        >
                                                            {item.workOrder}
                                                        </text>



                                                    </g>
                                                );
                                            })}

                                            {/* Y-axis label */}
                                            <text
                                                x={20}
                                                y={chartHeight / 2}
                                                textAnchor="middle"
                                                fontSize="14"
                                                fill="#374151"
                                                fontWeight="600"
                                                transform={`rotate(-90 20 ${chartHeight / 2})`}
                                            >
                                                Cost (₹)
                                            </text>

                                            {/* X-axis label */}
                                            <text
                                                x={chartWidth / 2}
                                                y={chartHeight - 10}
                                                textAnchor="middle"
                                                fontSize="14"
                                                fill="#374151"
                                                fontWeight="600"
                                            >
                                                Work Orders
                                            </text>
                                        </svg>
                                    </div>
                                </div>
                            </div>



                            {/* Detailed Table */}
                            <div className="table-responsive" style={{ width: "450px" }}>
                                <h6 className="p-2">Cost Breakdown Table</h6>
                                <table className="table table-hover border" style={{ fontSize: "13px" }}>
                                    <thead className='table-light'>
                                        <tr>
                                            <th>Work Order</th>
                                            <th>Machine Cost (₹)</th>
                                            <th>Material Cost (₹)</th>
                                            <th>Labor Cost (₹)</th>
                                            <th>Rework Cost (₹)</th>
                                            <th className="text-primary fw-bold">Total Cost (₹)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item, index) => {
                                            const breakdown = calculateBreakdown(item);
                                            return (
                                                <tr key={item.workOrder} className={hoveredBar === index ? 'table-warning' : ''}>
                                                    <td className="fw-bold">{item.workOrder}</td>
                                                    <td>₹{breakdown.machineTimeCost.toFixed(2)}</td>
                                                    <td>₹{breakdown.materialCost.toFixed(2)}</td>
                                                    <td>₹{item.labor}</td>
                                                    <td>₹{item.rework}</td>
                                                    <td className="fw-bold text-primary">₹{item.totalCost}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>

                                </table>
                                <div className='fw-bold '>
                                    Total Production Cost : <span className="text-primary">₹{data.reduce((sum, item) => sum + item.totalCost, 0).toLocaleString()}</span>
                                </div>
                            </div>



                        </div>
                    </div>
                </div>
            </div>
            {hoveredBar !== null && (
                <div style={{
                    position: 'fixed',
                    left: `${mousePos.x + 10}px`,
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
                }}>
                    <span>
                        {data[hoveredBar].workOrder} &nbsp;
                    </span>
                    <span>
                        Machine: ₹{(data[hoveredBar].machineTime * data[hoveredBar].machineRate).toFixed(0)} &nbsp;
                    </span>
                    <span>
                        Material: ₹{(data[hoveredBar].materialQty * data[hoveredBar].materialRate).toFixed(0)} &nbsp;
                    </span>
                    <span>
                        Labor: ₹{data[hoveredBar].labor} | Rework: ₹{data[hoveredBar].rework}
                    </span>
                </div>

            )}
        </div>
    );
};

export default ProductionCostChart;