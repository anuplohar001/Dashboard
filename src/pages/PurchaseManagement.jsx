import React from 'react'
import POvsGRNGapKPI from '../puchaseComponents/POvsGRNGapKPI'
import PendingPRsKPI from '../puchaseComponents/PendingPRsKPI'
import SupplierOnTimeDeliveryKPI from '../puchaseComponents/SupplierOnTimeDeliveryKPI'
import StockCoverageWarningsKPI from '../puchaseComponents/StockCoverageWarningsKPI'
import VendorDelayKPI from '../puchaseComponents/VendorDelayKPI'
import PRToPOConversionKPI from '../puchaseComponents/PRToPOConversionKPI'
import AveragePOValueKPI from '../puchaseComponents/AveragePOValueKPI'
import LeadTimeGaugeCard from '../puchaseComponents/LeadTimeGaugeCard'
import SupplierScorecard from '../puchaseComponents/SupplierScorecard'

const PurchaseManagement = () => {
  return (
    <div className='d-flex' style={{ width: "fit-content" }}>
      {/* <div style={{ width: "280px", height: "100vh" }}>

      </div> */}

      <div style={{ padding: "1rem", backgroundColor: "#e3e5e8" }}>
        <div className='h1 fw-bold text-center mb-4'>
          Purchase Management <br />
        </div>
        <div className='text-center d-flex gap-4 flex-wrap justify-content-center' >
          <div className='d-flex flex-column gap-4'>
            <div className='d-flex gap-4 flex-wrap'>
              <div className='d-flex flex-column gap-4'>
                <SupplierOnTimeDeliveryKPI />
                <POvsGRNGapKPI />
                <StockCoverageWarningsKPI />
              </div>
              <div className='d-flex flex-column gap-4'>
                <PendingPRsKPI />
                <VendorDelayKPI />
                <LeadTimeGaugeCard />
              </div>
            </div>
            <SupplierScorecard />
          </div>
          <div className='d-flex gap-4 flex-column'>
            <AveragePOValueKPI />
            <PRToPOConversionKPI />
          </div>

        </div>
      </div>
    </div>
  )
}

export default PurchaseManagement
