import { Routes, Route, Link } from 'react-router-dom';
import CreateTruck from './pages/CreateTruck';
import SearchTruck from './pages/SearchTruck';
import CreateLoad from './pages/CreateLoad';
import CreateTrip from './pages/CreateTrip';

function App() {
  return (
    <div>
      <nav>
        <Link to="/create-truck">Create Truck</Link> | 
        <Link to="/search-truck">Search Truck</Link> | 
        <Link to="/create-load">Create Load</Link> | 
        <Link to="/create-trip">Create Trip</Link>
      </nav>

      <Routes>
        <Route path="/create-truck" element={<CreateTruck />} />
        <Route path="/search-truck" element={<SearchTruck />} />
        <Route path="/create-load" element={<CreateLoad />} />
        <Route path="/create-trip" element={<CreateTrip />} />
      </Routes>
    </div>
  );
}

export default App;
