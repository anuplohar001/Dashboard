import 'bootstrap/dist/css/bootstrap.min.css';
import './products.css'
import { useState, useEffect } from 'react';
import MonthlySalesKPI from '../salesManager/MonthlySalesKPI';
import NewOrdersBookedKPI from '../salesManager/NewOrdersBookedKPI';
import SalesTargetAchievementKPI from '../salesManager/SalesTargetAchievementKPI';
import TopPerformingSalespersonKPI from '../salesManager/TopPerformingSalespersonKPI';
import MonthlySalesTrendKPI from '../salesManager/MonthlySalesTrendKPI';
import SalesByRegion from '../salesManager/SalesByRegionKPI';
import QuoteConversionKPI from '../salesManager/QuoteConversionKPI';
import Top5CustomersKPI from '../salesManager/Top5CustomersKPI';
import SalesOrderAging from '../salesManager/SalesOrderAgingKPI';
import QuotationWinLossReport from '../salesManager/QuotationWinLossReport';
import PendingQuotationsAging from '../salesManager/PendingQuotationsAging';
import SalesForecastVsActualKPI from '../salesManager/SalesForecastVsActualKPI';
import CustomerOrderFrequencyKPI from '../salesManager/CustomerOrderFrequencyKPI';
import LostOrderReasonsKPI from '../salesManager/LostOrderReasonsKPI';

const SalesManagement = () => {


    const [isColumn, setIsColumn] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width >= 601 && width <= 1024) {
                setIsColumn(false); // remove flex-column
            } else {
                setIsColumn(true); // keep flex-column
            }
        };

        handleResize(); // initial check
        window.addEventListener('resize', handleResize); // on resize
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <div className='' >
            
            <div className='text-center' style={{
                padding: "1rem",
            }}>

                <div className='h1 fw-bold ' style={{ marginBottom: "40px" }}>
                    Sales Management <br />
                </div>

                <div className=" d-flex flex-wrap gap-4" >
                    <div className='d-flex gap-4 flex-wrap justify-content-center'>

                        <div className={`d-flex flex-wrap justify-content-center gap-4 ${isColumn ? ' flex-column' : ''}`} >
                            <MonthlySalesKPI />
                            <SalesTargetAchievementKPI />
                            <TopPerformingSalespersonKPI />
                            <NewOrdersBookedKPI />
                        </div>
                        <div className='d-flex flex-column gap-4 justify-content-center align-items-center'>
                            <div className='d-flex gap-4 flex-wrap justify-content-center'>
                                <LostOrderReasonsKPI />
                                <Top5CustomersKPI />
                            </div>

                            <div className='d-flex gap-4 flex-wrap justify-content-center'>
                                <SalesByRegion />
                                <SalesOrderAging />
                            </div>
                            <SalesForecastVsActualKPI />
                            <MonthlySalesTrendKPI />
                        </div>
                    </div>
                    <div className='d-flex gap-4 flex-wrap justify-content-center'>

                        <div className='d-flex gap-4 flex-wrap justify-content-center'>
                            <CustomerOrderFrequencyKPI />
                            <QuotationWinLossReport />
                        </div>
                        <div className='d-flex flex-column justify-content-center'>
                            <PendingQuotationsAging />
                        </div>
                    </div>
                    <QuoteConversionKPI />

                </div>




            </div>

        </div>
    )
}

export default SalesManagement
