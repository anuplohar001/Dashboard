const KpiCard = ({ title, value, icon, description }) => {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column justify-content-between">
        <div className="d-flex justify-content-between align-items-start">
          <h6 className="card-title mb-2">{title}</h6>
          {icon}
        </div>
        <h3 className="fw-bold">{value}</h3>
        <p className="card-text text-muted small mb-0">{description}</p>
      </div>
    </div>
  );
};

export default KpiCard;
