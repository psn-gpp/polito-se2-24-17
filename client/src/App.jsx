import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DefaultRoute from './components/DefaultRoute';
import HomeRoute from './components/HomeRoute';
import CustomerDashboard from './components/CustomerDashboard';
import ManagerDashboard from './components/ManagerDashboard';
import OfficerDashboard from './components/OfficerDashboard';
import NotFound from './components/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeRoute />} />
        <Route path='/*' element={<DefaultRoute />} />
        {/* Define routes for different user dashboards */}
        <Route path='/customer' element={<CustomerDashboard />} />
        <Route path='/manager' element={<ManagerDashboard />} />
        <Route path='/officer' element={<OfficerDashboard />} />
        {/* Handle undefined routes */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
