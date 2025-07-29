import React from 'react'
import MachineUptimeCard from '../maintenanceCards/MachineUptimeCard'
import TotalDowntimeCard from '../maintenanceCards/TotalDowntimeCard'
import PlannedMaintenanceCard from '../maintenanceCards/PlannedMaintenanceCard'
import BreakdownIncidentsCard from '../maintenanceCards/BreakdownIncidentsCard'
import DowntimeReason from '../maintenanceCards/DowntimeReason'
import DowntimeTrendOverTime from '../maintenanceCards/DowntimeTrendOverTime'
import MeanTimesLineChart from '../maintenanceCards/MeanTimesLineChart'
const MaintenanceHead = () => {
  return (
    <div className='text-center' style={{ height: "fit-content", padding: "20px", backgroundColor: "#e3e5e8" }}>
      <div className='h1 fw-bold ' style={{ marginBottom: "40px" }}>
        Maintenance Head Management <br />
      </div>
      <div className='d-flex flex-wrap justify-content-center gap-3'>
        <MachineUptimeCard />
        <TotalDowntimeCard />
        <PlannedMaintenanceCard />
        <BreakdownIncidentsCard />
        <DowntimeTrendOverTime />
        <MeanTimesLineChart />
        <DowntimeReason />
      </div>
    </div>
  )
}

export default MaintenanceHead
