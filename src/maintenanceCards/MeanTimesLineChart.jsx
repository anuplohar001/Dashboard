import React, { useState } from "react";
import HoverText from "../topComponents/HoverText";

export default function MeanTimesLineChart() {
    const [data, setData] = useState([10, 30, 70, 40, 90, 60, 70, 40, 90, 60, 70, 40]);
    const [trendData, setTrendData] = useState([
        { label: "Jan", value: 1 },
        { label: "Feb", value: 12 },
        { label: "Mar", value: 15 },
        { label: "Apr", value: 5 },
        { label: "May", value: 19 },
        { label: "Jun", value: 21 },
        { label: "July", value: 23 },
        { label: "Aug", value: 22 },
        { label: "Sept", value: 22 },
        { label: "Oct", value: 22 },
        { label: "Nov", value: 22 },
        { label: "Dec", value: 22 },
    ]);
    const width = 630;
    const height = 180;
    const max = Math.max(...data);
    const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * 600 + 20; // Adjusting for spacing
        const y = height - (d / max) * height + 10;
        return `${x},${y}`;
    });

    const dispatchData = [40, 30, 50, 60, 80, 10, 50, 60, 80, 10, 50, 60];
    const dispatched = dispatchData.map((d, i) => {
        const x = (i / (data.length - 1)) * 600 + 20; // Adjusting for spacing
        const y = height - (d / max) * height + 10;
        return `${x},${y}`;
    });
    const [hovered, setHovered] = useState(false)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [hoverData, setHoverData] = useState(null);
    const [selectedPeriod, setSelectedPeriod] = useState('current');

    const handleSelectPeriod = (e) => {
        setSelectedPeriod(e.target.value);
        if (e.target.value === '2024') {
            setData([20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240]);
            setTrendData([
                { label: "Jan", value: 2 },
                { label: "Feb", value: 24 },
                { label: "Mar", value: 30 },
                { label: "Apr", value: 10 },
                { label: "May", value: 38 },
                { label: "Jun", value: 42 },
                { label: "July", value: 46 },
                { label: "Aug", value: 44 },
                { label: "Sept", value: 44 },
                { label: "Oct", value: 44 },
                { label: "Nov", value: 44 },
                { label: "Dec", value: 44 },
            ]);
        } else {
            setData([10, 30, 70, 40, 90, 60, 70, 40, 90, 60, 70, 40]);
            setTrendData([
                { label: "Jan", value: 1 },
                { label: "Feb", value: 12 },
                { label: "Mar", value: 15 },
                { label: "Apr", value: 5 },
                { label: "May", value: 19 },
                { label: "Jun", value: 21 },
                { label: "July", value: 23 },
                { label: "Aug", value: 22 },
                { label: "Sept", value: 22 },
                { label: "Oct", value: 22 },
                { label: "Nov", value: 22 },
                { label: "Dec", value: 22 },
            ]);
        }
    }
    const handleMouseMove = (e, value) => {
        const x = e.clientX;
        const y = e.clientY;
        setMousePos({
            x: x,
            y: y,
        });
        setHoverData(value);
    };

    return (

        <div className="linechart">
            <div className="card-container d-flex flex-column ">
                <div className='d-flex justify-content-between align-items-center mb-2'>
                    <h6>Mean Time to Repair VS Mean Time Between Failures.</h6>
                    <select
                        className="form-select form-select-sm mb-1"
                        style={{ width: '75px', fontSize: '10px', padding: '2px 4px' }}
                        value={selectedPeriod}
                        onChange={handleSelectPeriod}
                    >
                        <option value="current">Current</option>
                        <option value="2024">2024</option>
                    </select>
                </div>
                <div className="d-flex flex-column" style={{ overflow: "scroll" }} >

                    <div className=" d-flex flex-column" style={{height:"", width: "800px" }}>

                        <svg width={width} height={height}  >
                            {/* Grid Lines */}
                            <line x1="0" y1={height / 2} x2="680" y2={height / 2} className="grid-line" />
                            <line x1="0" y1={height / 4} x2="680" y2={height / 4} className="grid-line" />
                            <line x1="0" y1={height - height / 4} x2="680" y2={height - height / 4} className="grid-line" />
                            <line x1="0" y1={height} x2="680" y2={height} className="grid-line" />

                            {/* Y-axis Labels (Number of Goods) */}
                            <text x="0" y={height} fontSize="10" fill="#666">0</text>
                            <text x="0" y={height - height / 4} fontSize="10" fill="#666">50</text>
                            <text x="0" y={height / 2} fontSize="10" fill="#666">100</text>
                            <text x="0" y={height / 4} fontSize="10" fill="#666">150</text>




                            {/* FG Line */}
                            <polyline fill="none" stroke="#fc630a" strokeWidth="2" points={dispatched.join(" ")} />
                            {dispatched.map((p, i) => {
                                const [x, y] = p.split(",");
                                return <circle key={i} cx={x} cy={y} r="3" fill="#fc630a"
                                    onMouseEnter={() => setHovered(true)}
                                    onMouseLeave={() => setHovered(false)}
                                    onMouseMove={(e) => handleMouseMove(e, `${dispatchData[i]}: ${trendData[i].label}`)} />;
                            })}

                            {/* Dispatched Line */}
                            <polyline fill="none" stroke="#0d6efd" strokeWidth="2" points={points.join(" ")} />
                            {points.map((p, i) => {
                                const [x, y] = p.split(",");
                                return <circle key={i} cx={x} cy={y} r="3" fill="#0d6efd"
                                    onMouseEnter={() => setHovered(true)}
                                    onMouseLeave={() => setHovered(false)}
                                    onMouseMove={(e) => handleMouseMove(e, `${data[i]}: ${trendData[i].label}`)} />;
                            })}
                        </svg>
                        <svg width={width} height={20}>
                            {trendData.map((item, i) => (
                                <text
                                    key={i}
                                    x={(i / (data.length - 1)) * 600 + 20}  // Adjust spacing as per your data points
                                    y={10}
                                    fontSize="10"
                                    fill="#666"
                                    textAnchor="middle"
                                    fontWeight={"bold"}
                                >
                                    {item.label}
                                </text>
                            ))}
                        </svg>
                    </div>
                </div>
                <div className="line-title">
                    <div className="d-flex g-1">
                        <div className="fgline"></div>
                        Mean Time to Repair.
                    </div>
                    <div className="d-flex">
                        <div className="fgline symbol"></div>
                        Mean Time Between Failures.
                    </div>
                </div>
            </div>
            {hovered && (<HoverText x={mousePos.x} y={mousePos.y} data={hoverData} />)}
        </div>
    );
}
