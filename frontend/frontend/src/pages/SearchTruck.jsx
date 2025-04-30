import { useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';

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
      const response = await axios.get('http://127.0.0.1:8000/truck/');
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
      await axios.delete(`http://127.0.0.1:8000/truck/${id}`);
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
    <div className="flex flex-col items-center justify-start px-4 py-10 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-semibold mb-6">Search Trucks</h1>

      <div className="flex gap-2 w-full max-w-md mb-4">
        <Input
          placeholder="Search by registration..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      {errorMessage && (
        <div className="mb-4 text-red-600 font-medium">{errorMessage}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {filteredTrucks.map((truck) => (
          <Card key={truck.id}>
            <CardHeader className="flex justify-between items-center">
              <CardTitle>{truck.registration}</CardTitle>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(truck.id)}
              >
                Delete
              </Button>
            </CardHeader>
            <CardContent>
              <p><strong>Make:</strong> {truck.make}</p>
              <p><strong>Model:</strong> {truck.model}</p>
              <p><strong>Year:</strong> {truck.year}</p>
              <p><strong>Weight:</strong> {truck.weight} kg</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
