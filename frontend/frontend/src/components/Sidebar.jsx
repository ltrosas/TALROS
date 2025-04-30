import { NavLink } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Sheet, SheetTrigger, SheetContent } from '/Users/ltrosas/Documents/TALROS/frontend/frontend/src/components/ui/sheet';
import { Button } from '/Users/ltrosas/Documents/TALROS/frontend/frontend/src/components/ui/button';
import { clsx } from 'clsx';

const navItems = [
  { to: '/create-truck', label: 'Create Truck' },
  { to: '/search-truck', label: 'Search Truck' },
  { to: '/create-load', label: 'Create Load' },
  { to: '/create-trip', label: 'Create Trip' },
];

export default function Sidebar() {
  return (
    <div className="bg-white shadow px-4 py-3 flex justify-between items-center md:hidden">
      <h1 className="text-lg font-semibold">Fleet Manager</h1>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-4">
          <nav className="flex flex-col space-y-4 mt-4">
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
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}