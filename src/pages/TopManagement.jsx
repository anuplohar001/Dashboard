import React, { useState } from 'react'
import ProductionCostChart from '../topComponents/ProductionCostChart';
import LineChart from "../topComponents/LineChart";
import WODelayRate from "../topComponents/WODelayRate";
import TotalOrders from "../topComponents/TotalOrders";
import MonthlyLineChart from "../topComponents/MonthlyLineChart";
import RevenueThisYear from "../topComponents/RevenueThisYear";
import RegionWiseSalesPieChart from "../topComponents/RegionWiseSalesPieChart";
import ParetoChart from "../topComponents/ParetoChart";
import OEEHeatmap from "../topComponents/OEEHeatmap";
import ReceivablesAgingTable from "../topComponents/ReceivablesAgingTable";
import TopCustomersChart from '../topComponents/TopCustomersChart';
import TotalRevenue from '../topComponents/TotalRevenue';
import PayableAgingTable from '../topComponents/PayableAgingTable';
const TopManagement = () => {

    const [expandedCard, setExpandedCard] = useState(null);
    const handleToggle = (id) => {
        setExpandedCard((prev) => (prev === id ? null : id));
    };
    const data = [10, 30, 70, 40, 90, 60, 70, 40, 90, 60, 70, 40];

    const pieData = [
        { label: "A", value: 30 },
        { label: "B", value: 50 },
        { label: "C", value: 20 },
    ];
    const sampleData = [
        { date: 'Jul 1', closed: 10, delayed: 2 },
        { date: 'Jul 2', closed: 15, delayed: 3 },
        { date: 'Jul 3', closed: 20, delayed: 5 },
        { date: 'Jul 4', closed: 25, delayed: 4 },
        { date: 'Jul 5', closed: 30, delayed: 6 },
    ];
    const trendData = [
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
    ];
    const values = [2800000, 1900000, 2400000, 1000000, 2600000, 1700000, 3000000, 2300000, 2700000, 2100000, 2400000];


    return (
        <div className="mycontainer" style={{ backgroundColor: "#e3e5e8" }}>
            <div className='h1 fw-bold text-center'>
                Top Management
            </div>
            <div className='h4 pb-3 text-center'>Executive dashboards, KPIs, and strategic analytics</div>
            <div className="d-flex flex-column gap-4" >
                <div className='d-flex gap-4 flex-wrap justify-content-center'>
                    <MonthlyLineChart />
                    <WODelayRate data={sampleData} expandedCard={expandedCard} />
                    <RegionWiseSalesPieChart />
                </div>
                <div className='d-flex gap-4 flex-wrap justify-content-center'>
                    <div className='d-flex flex-column gap-3 justify-content-center'>
                        <TotalOrders data={trendData} />
                        <ReceivablesAgingTable name={"Payables"} />
                    </div>
                    <div className='d-flex flex-column gap-3 justify-content-center'>
                        <div className='d-flex gap-3 flex-column flex-wrap justify-content-center'>
                            <PayableAgingTable />
                            <OEEHeatmap />
                        </div>
                        <LineChart />
                    </div>
                </div>
                <div className='d-flex gap-4 flex-wrap justify-content-center'>
                    <ProductionCostChart/>
                    <RevenueThisYear />
                    <TotalRevenue />
                </div>
                <div className='d-flex gap-4 flex-wrap justify-content-center'>
                    <TopCustomersChart />
                    <ParetoChart />
                    
                </div>



            </div>
        </div>
    )
}

export default TopManagement

