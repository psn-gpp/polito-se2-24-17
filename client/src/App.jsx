import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Default from './components/Default';
import Home from './components/Home';
import ManagerDashboard from './components/ManagerDashboard';
import OfficerDashboard from './components/OfficerDashboard';
import CustomerDashboard from './components/CustomerDashboard';
import DisplayDashboard from './components/DisplayBoard';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/*' element={<Default />} />
        <Route path='/manager' element={<Default />} />
        <Route path='/officer' element={<OfficerDashboard />} />
        <Route path='/customer' element={<CustomerDashboard />} />
        <Route path='/display' element={<Default />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
