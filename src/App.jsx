import './App.css';
import './Responsive.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopManagement from './pages/TopManagement';
import ProductManagement from './pages/ProductManagement';
import HomePage from './Home';
import SalesManagement from './pages/SalesManagement';
import PurchaseManagement from './pages/PurchaseManagement';
import MaintenanceHead from './pages/MaintenanceHead';
export default function App() {
  return (

    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/topmanagement" element={<TopManagement />} />
        <Route path="/productmanagement" element={<ProductManagement />} />
        <Route path="/salesmanagement" element={<SalesManagement />} />
        <Route path="/purchasemanagement" element={<PurchaseManagement />} />
        <Route path="/maintenancehead" element={<MaintenanceHead />} />
      </Routes>
    </div>

  );
}
