import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './products.css'
import MachineUtilizationChart from '../prodComponents/MachineUtilization'
import WorkOrderDelayChart from '../prodComponents/WorkOrderDelayChart'
import WIPLoadChart from '../prodComponents/WIPLoadChart'
import ScheduleAdherenceChart from '../prodComponents/ScheduleAdherenceChart'
import DowntimeByMachineChart from '../prodComponents/DowntimeByMachineChart'
import DefectRatePareto from '../prodComponents/DefectRatePareto';
import ReworkRateChart from '../prodComponents/ReworkRateChart';
import BottleneckIdentificationChart from '../prodComponents/BottleneckIdentificationChart';
import OperatorPerformanceChart from '../prodComponents/OperatorPerformanceChart';
import OperationTimeChart from '../prodComponents/OperationTimeChart';
import WorkOrderAging from '../prodComponents/WorkOrderAging';
const ProductManagement = () => {

  const [isColumn, setIsColumn] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 601 && width <= 1200) {
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
    <div className='text-center' style={{ height: "fit-content", padding: "20px", backgroundColor: "#e3e5e8" }}>

      <div className='h1 fw-bold'>
        Product Management <br />
      </div>
      <div className='h4 pb-3'>Product analytics, inventory tracking, and market insights</div>


      <div className="d-flex flex-column gap-4" >
        <div className='d-flex gap-4 flex-wrap justify-content-center'>
          <DefectRatePareto />
          <BottleneckIdentificationChart />
          <div className={`d-flex  gap-4 ${isColumn ? ' flex-column' : ''}`} >
            <DowntimeByMachineChart />
            <WorkOrderAging />
          </div>
        </div>
        <div>
          <div className='d-flex gap-4 flex-wrap justify-content-center' >
            <MachineUtilizationChart />
            <WorkOrderDelayChart />
          </div>
        </div>
        <div className='d-flex gap-4 flex-wrap justify-content-center' >

          <div className={`d-flex  gap-4 ${isColumn ? ' flex-column' : ''}`} >
            <OperatorPerformanceChart />
            <WIPLoadChart />
          </div>

          <div className='d-flex flex-column gap-4' >
            <div className='d-flex gap-4 flex-wrap justify-content-center' >
              <ReworkRateChart />
              <OperationTimeChart />
            </div>
            <ScheduleAdherenceChart />
          </div>
        </div>
      </div>




    </div>
  )
}

export default ProductManagement
