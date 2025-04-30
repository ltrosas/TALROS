import { useState } from 'react';
import axios from 'axios';
import { Input } from '/Users/ltrosas/Documents/TALROS/frontend/frontend/src/components/ui/input';
import { Button } from '/Users/ltrosas/Documents/TALROS/frontend/frontend/src/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '/Users/ltrosas/Documents/TALROS/frontend/frontend/src/components/ui/card';

export default function SearchTruck() {
  const [registration, setRegistration] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/truck/search/?registration=${registration}`);
      setResults(response.data);
    } catch (error) {
      console.error('Error searching for truck:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="flex flex-col items-center justify-start px-4 py-10 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-semibold mb-6">Search Truck</h1>

      <div className="flex gap-2 w-full max-w-md mb-10">
        <Input
          placeholder="Enter registration..."
          value={registration}
          onChange={(e) => setRegistration(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {results.map((truck) => (
          <Card key={truck.id}>
            <CardHeader>
              <CardTitle>{truck.registration}</CardTitle>
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