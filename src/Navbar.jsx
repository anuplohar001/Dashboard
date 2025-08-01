import React, { useState } from 'react';

const Navbar = () => {
    const [activeTab, setActiveTab] = useState(1);

    const tabs = [
        { id: 1, name: "Live Dashboard", path: "/" },
        { id: 2, name: "Top Management", path: "/topmanagement" },
        { id: 3, name: "Product Management", path: "/productmanagement" },
        { id: 4, name: "Sales Management", path: "/salesmanagement" },
        { id: 5, name: "Purchase Management", path: "/purchasemanagement" },
    ];

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    return (
        <div>

            <div className="card mb-3">
                <div className="card-body p-0">
                    <ul className="nav nav-tabs" id="dashboardTabs" role="tablist">
                        {tabs.map((tab) => (
                            <li className="nav-item" key={tab.id} role="presentation">
                                <button
                                    className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                                    onClick={() => handleTabClick(tab.id)}
                                    type="button"
                                    role="tab"
                                    aria-selected={activeTab === tab.id}
                                >
                                    {tab.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <style jsx>{`
        .nav-tabs {
          border-bottom: 1px solid #dee2e6;
        }
        
        .nav-tabs .nav-link {
          color: #6c757d;
          border: none;
          border-bottom: 2px solid transparent;
          padding: 1rem 1.5rem;
          font-weight: 500;
          transition: all 0.2s ease-in-out;
        }
        
        .nav-tabs .nav-link:hover {
          color: #0d6efd;
          border-bottom-color: #0d6efd;
          background-color: #f8f9fa;
        }
        
        .nav-tabs .nav-link.active {
          color: #0d6efd;
          background-color: #e7f1ff;
          border-bottom-color: #0d6efd;
          font-weight: 600;
        }
        
        .card {
          box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
          border: 1px solid #dee2e6;
        }
      `}</style>
        </div>
    );
};

export default Navbar;