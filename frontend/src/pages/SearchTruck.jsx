import { useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
const IP = import.meta.env.IPT;

export default function SearchTruck() {
  const [trucks, setTrucks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTrucks, setFilteredTrucks] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchTrucks();
  }, []);

  const fetchTrucks = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/truck/'); //'http://127.0.0.1:8000/truck/' `${IPT}/truck/`
      setTrucks(response.data);
      setFilteredTrucks(response.data);
    } catch (error) {
      console.error('Failed to fetch trucks:', error);
    }
  };

  const handleSearch = () => {
    const filtered = trucks.filter((truck) =>
      truck.registration.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTrucks(filtered);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this truck?');
    if (!confirmDelete) return;
  
    try {
      await axios.delete(`http://127.0.0.1:8000/truck/${id}`); //`http://127.0.0.1:8000/truck/${id}` `${IPT}/truck/${id}`
      const updated = trucks.filter((truck) => truck.id !== id);
      setTrucks(updated);
      setFilteredTrucks(updated);
      setErrorMessage('');
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        typeof error.response.data.detail === 'string'
      ) {
        const detail = error.response.data.detail.toLowerCase();
        if (detail.includes('associated with an existing trip')) {
          setErrorMessage('Cannot delete this truck. It is associated with an existing trip.');
        } else {
          setErrorMessage(`Failed to delete truck: ${error.response.data.detail}`);
        }
      } else {
        setErrorMessage('Failed to delete truck. Please try again.');
      }
    }
  };  

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">Search Trucks</h1>

      <div className="flex gap-2 mb-4">
        <Input
          type="text"
          placeholder="Search by registration..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full"
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      {errorMessage && (
        <div className="mb-4 text-red-500 bg-red-100 p-3 rounded-md">{errorMessage}</div>
      )}

      <div className="overflow-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Registration</TableHead>
              <TableHead>Make</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead className="text-left">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTrucks.map((truck) => (
              <TableRow key={truck.id}>
                <TableCell className="text-left" style={{ width: 'auto' }}>{truck.registration}</TableCell>
                <TableCell className="text-left" style={{ width: 'auto' }}>{truck.make}</TableCell>
                <TableCell className="text-left" style={{ width: 'auto' }}>{truck.model}</TableCell>
                <TableCell className="text-left" style={{ width: 'auto' }}>{truck.year}</TableCell>
                <TableCell className="text-left" style={{ width: 'auto' }}>{truck.weight}</TableCell>
                <TableCell className="text-left" style={{ width: 'auto' }}>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(truck.id)}
                    className="text-left"
                    style={{ width: 'auto' }}
                  >
                    <Trash2 className="text-left" style={{ width: 'auto' }} />
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredTrucks.length === 0 && (
              <TableRow>
                <TableCell className="text-left" style={{ width: 'auto' }}>
                  No trucks found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
