import { useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Toaster, toast } from 'sonner';

export default function CreateTruck() {
  const [formData, setFormData] = useState({
    registration: '',
    make: '',
    model: '',
    year: '',
    weight: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/truck/', formData);
      toast.success('Truck created successfully!');
      setFormData({
        registration: '',
        make: '',
        model: '',
        year: '',
        weight: '',
      });
    } catch (err) {
      toast.error('Failed to create truck.');
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <Toaster />
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Truck</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="registration">Registration</Label>
              <Input
                id="registration"
                name="registration"
                value={formData.registration}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="make">Make</Label>
              <Input
                id="make"
                name="make"
                value={formData.make}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="model">Model</Label>
              <Input
                id="model"
                name="model"
                value={formData.model}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                name="year"
                type="number"
                value={formData.year}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                name="weight"
                type="number"
                value={formData.weight}
                onChange={handleChange}
              />
            </div>
            <Button type="submit" className="w-full">
              Create Truck
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
