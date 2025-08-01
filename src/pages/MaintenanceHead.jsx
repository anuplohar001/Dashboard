import React, { useState, useEffect } from 'react'
import MachineUptimeCard from '../maintenanceComponents/MachineUptimeCard'
import TotalDowntimeCard from '../maintenanceComponents/TotalDowntimeCard'
import PlannedMaintenanceCard from '../maintenanceComponents/PlannedMaintenanceCard'
import BreakdownIncidentsCard from '../maintenanceComponents/BreakdownIncidentsCard'
import DowntimeReason from '../maintenanceComponents/DowntimeReason'
import DowntimeTrendOverTime from '../maintenanceComponents/DowntimeTrendOverTime'
import MeanTimesLineChart from '../maintenanceComponents/MeanTimesLineChart'
import MachineBreakdownChart from '../maintenanceComponents/MachineBreakdownChart'
import MachineWorkload from '../maintenanceComponents/MachineWorkload'
import MaintenanceRequestsChart from '../maintenanceComponents/MaintenanceRequestsChart'
import SparePartsLineChart from '../maintenanceComponents/SparePartsLineChart'
import RepeatFailuresTable from '../maintenanceComponents/RepeatFailuresTable'
import MachineCostChart from '../maintenanceComponents/MachineCost'
import PMvsBMRatio from '../maintenanceComponents/PMvsBMRatio'
const MaintenanceHead = () => {


  const [isColumn, setIsColumn] = useState(true);
  const [card, setCard] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 1100) {
        setCard(true)
        setIsColumn(false); // remove flex-column
      } else {
        setCard(false)
        setIsColumn(true); // keep flex-column
      }
    };

    handleResize(); // initial check
    window.addEventListener('resize', handleResize); // on resize
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div className='text-center' style={{ height: "fit-content", padding: "20px", backgroundColor: "#e3e5e8" }}>
      <div className='h1 fw-bold ' style={{ marginBottom: "40px", fontSize:"1.5rem" }}>
        Maintenance Head Management <br />
      </div>
      <div className='row g-2 flex-wrap col-12'>
        <div className={`row g-2 ${isColumn ? "flex-column" : ""} flex-wrap col-lg-3 col-md-12 col-12 justify-content-center`}>
          <MachineUptimeCard />
          <TotalDowntimeCard />
          <PlannedMaintenanceCard />
          <BreakdownIncidentsCard />
          <DowntimeReason />
          {
            card && (<PMvsBMRatio />)
          }
          
        </div>
        <div className={`${card ? "mt-4" : ""} col-lg-9 col-12 row g-2 flex-wrap justify-content-center`} >
          {
            !card && (<PMvsBMRatio />)
          }
          
          <MachineWorkload />
          <MachineCostChart />
          <MaintenanceRequestsChart />
          <MeanTimesLineChart />
          <DowntimeTrendOverTime />
          <RepeatFailuresTable />
        </div>
        <div className='row g-2 col-lg-12 col-12 flex-wrap'>
          <MachineBreakdownChart />
          <SparePartsLineChart />
        </div>
      </div>
    </div>
  )
}

export default MaintenanceHead
