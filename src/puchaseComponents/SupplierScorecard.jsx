import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SupplierScorecard = () => {
    const [hoveredPoint, setHoveredPoint] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    // Sample data for top 3 vendors
    const vendors = [
        {
            name: 'Supplier A',
            onTimePercent: 95,
            quality: 88,
            priceEfficiency: 92,
            compositeScore: 92,
            color: '#007bff'
        },
        {
            name: 'Supplier B',
            onTimePercent: 87,
            quality: 94,
            priceEfficiency: 85,
            compositeScore: 89,
            color: '#28a745'
        },
        {
            name: 'Supplier C',
            onTimePercent: 78,
            quality: 82,
            priceEfficiency: 96,
            compositeScore: 83,
            color: '#ffc107'
        }
    ];

    const metrics = [
        { key: 'onTimePercent', label: 'On-Time Delivery %', weight: 0.4 },
        { key: 'quality', label: 'Quality Score', weight: 0.4 },
        { key: 'priceEfficiency', label: 'Price Efficiency', weight: 0.2 }
    ];

    const center = { x: 300, y: 200 };
    const maxRadius = 250;
    const numPoints = metrics.length;

    // Calculate angle for each metric point
    const getAngle = (index) => (index * 2 * Math.PI) / numPoints - Math.PI / 2;

    // Convert polar coordinates to cartesian
    const getCoordinates = (value, angle) => ({
        x: center.x + (value / 100) * maxRadius * Math.cos(angle),
        y: center.y + (value / 100) * maxRadius * Math.sin(angle)
    });

    // Generate grid circles
    const gridLevels = [20, 40, 60, 80, 100];

    // Generate axis lines and labels
    const axisLines = metrics.map((metric, index) => {
        const angle = getAngle(index);
        const endPoint = getCoordinates(100, angle);
        const labelPoint = getCoordinates(110, angle);

        return {
            line: { x1: center.x, y1: center.y, x2: endPoint.x, y2: endPoint.y },
            label: { x: labelPoint.x, y: labelPoint.y, text: metric.label, weight: metric.weight }
        };
    });

    // Generate vendor paths
    const generatePath = (vendor) => {
        const points = metrics.map((metric, index) => {
            const angle = getAngle(index);
            const value = vendor[metric.key];
            return getCoordinates(value, angle);
        });

        const pathData = points.reduce((path, point, index) => {
            return path + (index === 0 ? `M ${point.x} ${point.y}` : ` L ${point.x} ${point.y}`);
        }, '') + ' Z';

        return { pathData, points };
    };

    const handleMouseEnter = (vendor, metric, point, event) => {
        setHoveredPoint({ vendor, metric, point });
        setTooltipPosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseLeave = () => {
        setHoveredPoint(null);
    };

    return (
        <div className="" >
            <div className="card purchasecards p-1" style={{ height: '42rem' }}>
                <h6 className=" p-3">Supplier Scorecard - Top 3 Vendors</h6>
                <div className=" d-flex flex-column p-2" style={{overflow:"scroll"}}>


                    <div className='d-flex flex-column justify-content-center align-items-center' style={{width:"fit-content"}}>

                        <svg width="400" height="400" viewBox="0 0 600 400">
                            {/* Grid circles */}
                            {gridLevels.map((level, index) => (
                                <g key={index}>
                                    <circle
                                        cx={center.x}
                                        cy={center.y}
                                        r={(level / 100) * maxRadius}
                                        fill="none"
                                        stroke="#e9ecef"
                                        strokeWidth="1"
                                    />
                                    <text
                                        x={center.x + 5}
                                        y={center.y - (level / 100) * maxRadius - 5}
                                        fontSize="15"
                                        fill="#6c757d"
                                    >
                                        {level}
                                    </text>
                                </g>
                            ))}

                            {/* Axis lines and labels */}
                            {axisLines.map((axis, index) => (
                                <g key={index}>
                                    <line
                                        x1={axis.line.x1}
                                        y1={axis.line.y1}
                                        x2={axis.line.x2}
                                        y2={axis.line.y2}
                                        stroke="#dee2e6"
                                        strokeWidth="1"
                                    />
                                    <text
                                        x={axis.label.x}
                                        y={axis.label.y-10}
                                        textAnchor="middle"
                                        fontSize="18"
                                        fontWeight="bold"
                                        fill="#495057"
                                    >
                                        {axis.label.text}
                                    </text>
                                    <text
                                        x={axis.label.x}
                                        y={axis.label.y + 5}
                                        textAnchor="middle"
                                        fontSize="15"
                                        fill="#6c757d"
                                    >
                                        (Weight: {(axis.label.weight * 100).toFixed(0)}%)
                                    </text>
                                </g>
                            ))}

                            {/* Vendor data */}
                            {vendors.map((vendor, vendorIndex) => {
                                const { pathData, points } = generatePath(vendor);

                                return (
                                    <g key={vendorIndex}>
                                        {/* Filled area */}
                                        <path
                                            d={pathData}
                                            fill={vendor.color}
                                            fillOpacity="0.1"
                                            stroke={vendor.color}
                                            strokeWidth="2"
                                        />

                                        {/* Data points */}
                                        {points.map((point, pointIndex) => (
                                            <circle
                                                key={pointIndex}
                                                cx={point.x}
                                                cy={point.y}
                                                r="5"
                                                fill={vendor.color}
                                                stroke="white"
                                                strokeWidth="2"
                                                style={{ cursor: 'pointer' }}
                                                onMouseEnter={(e) => handleMouseEnter(
                                                    vendor,
                                                    metrics[pointIndex],
                                                    point,
                                                    e
                                                )}
                                                onMouseLeave={handleMouseLeave}
                                            />
                                        ))}
                                    </g>
                                );
                            })}
                        </svg>
                        {/* Performance breakdown */}
                        <div className="row " style={{ height: "fit-content", width: "fit-content" }}>
                            <div>
                                <div className="table-responsive">
                                    <table className="table table-sm border" style={{ fontSize: '0.7rem' }}>
                                        <thead>
                                            <tr className='border'>
                                                <th>Supplier</th>
                                                <th>On-Time %</th>
                                                <th>Quality</th>
                                                <th>Price Efficiency</th>
                                                <th>Composite Score</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {vendors.map((vendor, index) => (
                                                <tr key={index}>
                                                    <td className='border'>
                                                        <div className="d-flex align-items-center">

                                                            {vendor.name}
                                                        </div>
                                                    </td>
                                                    <td className='border'>{vendor.onTimePercent}%</td>
                                                    <td className='border'>{vendor.quality}%</td>
                                                    <td className='border'>{vendor.priceEfficiency}%</td>
                                                    <td className='border'><strong>{vendor.compositeScore}</strong></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row m-2" style={{ background: '#e4e4e4ff', borderRadius: '5px', padding: '10px' }}>
                        <div className="d-flex justify-content-evenly flex-wrap">
                            {vendors.map((vendor, index) => (
                                <div key={index} className="mx-3 text-center">
                                    <div className="d-flex align-items-center mb-1">
                                        <strong className='small'>{vendor.name}</strong>
                                    </div>
                                    <div className="small" style={{ color: vendor.color }}>
                                        Score: <strong>{vendor.compositeScore}</strong>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tooltip */}
                    {hoveredPoint && (
                        <div
                            className="position-fixed bg-dark text-white p-2 rounded shadow-lg"
                            style={{
                                left: tooltipPosition.x + 10,
                                top: tooltipPosition.y - 10,
                                zIndex: 1000,
                                fontSize: '12px',
                                maxWidth: '200px'
                            }}
                        >
                            <div><strong>{hoveredPoint.vendor.name}</strong></div>
                            <div>{hoveredPoint.metric.label}: {hoveredPoint.vendor[hoveredPoint.metric.key]}%</div>
                            <div>Weight: {(hoveredPoint.metric.weight * 100)}%</div>
                            <div className="border-top pt-1 mt-1">
                                <strong>Composite Score: {hoveredPoint.vendor.compositeScore}</strong>
                            </div>
                        </div>
                    )}


                </div>
            </div>
        </div>
    );
};

export default SupplierScorecard;