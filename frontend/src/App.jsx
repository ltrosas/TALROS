import { Routes, Route, NavLink } from 'react-router-dom';
import CreateTruck from './pages/CreateTruck';
import SearchTruck from './pages/SearchTruck';
import CreateLoad from './pages/CreateLoad';
import CreateTrip from './pages/CreateTrip';
import Layout from './components/Layout';
import Sidebar from './components/Sidebar';
import { clsx } from 'clsx';

const navItems = [
  { to: '/create-truck', label: 'Create Truck' },
  { to: '/search-truck', label: 'Search Truck' },
  { to: '/create-load', label: 'Create Load' },
  { to: '/create-trip', label: 'Create Trip' },
];

function App() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar for medium+ screens */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r p-4 space-y-4">
        <h1 className="text-xl font-bold mb-6">TALROS</h1>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              clsx(
                'block px-3 py-2 rounded hover:bg-gray-100 text-sm font-medium',
                isActive ? 'bg-gray-200 font-semibold' : 'text-gray-700'
              )
            }
          >
            {item.label}
          </NavLink>
        ))}
      </aside>

      {/* Mobile top nav */}
      <Sidebar />

      {/* Page Content */}
      <main className="flex-1 p-6 bg-gray-50">
        <Routes>
          <Route path="/create-truck" element={<CreateTruck />} />
          <Route path="/search-truck" element={<SearchTruck />} />
          <Route path="/create-load" element={<CreateLoad />} />
          <Route path="/create-trip" element={<CreateTrip />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
