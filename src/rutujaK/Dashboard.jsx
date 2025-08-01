import { AlertCircle, CheckCircle, Repeat, XCircle } from "react-feather";
import DefectsParetoChart from "./chart-based-kpis/DefectsParetoChart";
import ItemDefectsChart from "./chart-based-kpis/ItemDefectsChart";
import RejectionTrendChart from "./chart-based-kpis/RejectionTrendChart";
import ReworkTimeConsumptionChart from "./drill-down-kpis/ReworkTimeConsumptionChart";
import FinalVsInProcessFailRateChart from "./drill-down-kpis/FinalVsInProcessFailRateChart";
import InspectorRejectionPatternChart from "./drill-down-kpis/InspectorRejectionPatternChart";
import CustomerComplaintsChart from "./drill-down-kpis/CustomerComplaintsChart";
import AuditNonConformancesChart from "./drill-down-kpis/AuditNonConformancesChart";
import RejectionReasonsChart from "./chart-based-kpis/RejectionReasonsChart";
import ReworkLoadChart from "./chart-based-kpis/ReworkLoadChart";

const Dashboard = () => {

  return (
    <div className="d-flex min-vh-100 bg-light text-dark">
      <div className="flex-grow-1 p-4">
        <div className="row g-2">
          {[
            {
              title: "Defect Rate (MTD)",
              value: "2.8%",
              description: "+0.2% from last month",
              icon: <AlertCircle size={24} className="text-danger" />,
            },
            {
              title: "Rework Rate",
              value: "1.5%",
              description: "+0.1% from last month",
              icon: <Repeat size={24} className="text-info" />,
            },
            {
              title: "QC Passed %",
              value: "96.3%",
              description: "-0.5% from last month",
              icon: <CheckCircle size={24} className="text-success" />,
            },
            {
              title: "Total Rejections",
              value: "52",
              description: "+5 from last month",
              icon: <XCircle size={24} className="text-danger" />,
            },
          ].map((card, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-3">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="ms-2 mb-0">{card.title}</h6>
                    {card.icon}
                  </div>
                  <h4 className="fw-bold">{card.value}</h4>
                  <p className="mb-0 text-muted">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-2 mt-3">
          <div className="col-lg-4">
            <DefectsParetoChart />
          </div>
          <div className="col-lg-4">
            <ItemDefectsChart />
          </div>
          <div className="col-lg-4">
            <RejectionTrendChart />
          </div>
        </div>

        <div className="row g-2 mt-2">
          <div className="col-lg-6">
            <RejectionReasonsChart />
          </div>
          <div className="col-lg-6">
            <ReworkLoadChart />
          </div>
        </div>

        <div className="row g-2 mt-2">
          <div className="col-lg-4">
            <FinalVsInProcessFailRateChart />
          </div>
          <div className="col-lg-4">
            <InspectorRejectionPatternChart />
          </div>
          <div className="col-lg-4">
            <ReworkTimeConsumptionChart />
          </div>
        </div>

        <div className="row g-2 mt-2">
          <div className="col-lg-6">
            <CustomerComplaintsChart />
          </div>
          <div className="col-lg-6">
            <AuditNonConformancesChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
