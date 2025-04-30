import { Link } from 'react-router-dom';
import { Card } from "/Users/ltrosas/Documents/TALROS/frontend/frontend/src/components/ui/card";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-white shadow">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary">Fleet Manager</h1>
          <nav className="space-x-4">
            <Link className="text-sm font-medium hover:text-primary" to="/create-truck">Create Truck</Link>
            <Link className="text-sm font-medium hover:text-primary" to="/search-truck">Search Truck</Link>
            <Link className="text-sm font-medium hover:text-primary" to="/create-load">Create Load</Link>
            <Link className="text-sm font-medium hover:text-primary" to="/create-trip">Create Trip</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Card className="p-6">{children}</Card>
      </main>
    </div>
  );
}