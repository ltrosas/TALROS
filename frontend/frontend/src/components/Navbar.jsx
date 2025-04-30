// src/components/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <h1 className="text-lg font-semibold">Truck Manager</h1>
      <div className="space-x-4">
        <Link to="/create-truck" className="hover:underline">Create Truck</Link>
        <Link to="/search-truck" className="hover:underline">Search Truck</Link>
        <Link to="/create-load" className="hover:underline">Create Load</Link>
        <Link to="/create-trip" className="hover:underline">Create Trip</Link>
      </div>
    </nav>
  );
}