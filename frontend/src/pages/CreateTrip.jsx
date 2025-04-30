import { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from '/Users/ltrosas/Documents/TALROS/frontend/src/components/ui/input';
import { Button } from '/Users/ltrosas/Documents/TALROS/frontend/src/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '/Users/ltrosas/Documents/TALROS/frontend/src/components/ui/card';
import { Label } from '/Users/ltrosas/Documents/TALROS/frontend/src/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '/Users/ltrosas/Documents/TALROS/frontend/src/components/ui/select';
import { Toaster, toast } from 'sonner';

export default function CreateTrip() {
  const [trucks, setTrucks] = useState([]);
  const [loads, setLoads] = useState([]);
  const [formData, setFormData] = useState({
    truck_id: '',
    loads_id: '',
    initial_mileage: '',
    final_mileage: '',
    fuel_used: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const truckRes = await axios.get('http://localhost:8000/truck/');
        const loadRes = await axios.get('http://localhost:8000/loads/');
        setTrucks(truckRes.data);
        setLoads(loadRes.data);
      } catch (error) {
        toast.error('Error fetching trucks or loads');
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelect = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/trip/', formData);
      toast.success('Trip created successfully!');
      setFormData({
        truck_id: '',
        loads_id: '',
        initial_mileage: '',
        final_mileage: '',
        fuel_used: '',
      });
    } catch (err) {
      toast.error('Failed to create trip');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <Toaster />
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Trip</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Truck</Label>
              <Select onValueChange={(value) => handleSelect('truck_id', value)} value={formData.truck_id}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a truck" />
                </SelectTrigger>
                <SelectContent>
                  {trucks.map((truck) => (
                    <SelectItem key={truck.id} value={truck.id.toString()}>
                      {truck.registration} ({truck.make})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Load</Label>
              <Select onValueChange={(value) => handleSelect('loads_id', value)} value={formData.loads_id}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a load" />
                </SelectTrigger>
                <SelectContent>
                  {loads.map((load) => (
                    <SelectItem key={load.id} value={load.id.toString()}>
                      {load.type} ({load.weight}kg)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="initial_mileage">Initial Mileage (km)</Label>
              <Input
                id="initial_mileage"
                name="initial_mileage"
                type="number"
                value={formData.initial_mileage}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="final_mileage">Final Mileage (km)</Label>
              <Input
                id="final_mileage"
                name="final_mileage"
                type="number"
                value={formData.final_mileage}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="fuel_used">Fuel Used (L)</Label>
              <Input
                id="fuel_used"
                name="fuel_used"
                type="number"
                value={formData.fuel_used}
                onChange={handleChange}
              />
            </div>

            <Button type="submit" className="w-full">
              Create Trip
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}