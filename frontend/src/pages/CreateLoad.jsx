import { useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Toaster, toast } from 'sonner';

export default function CreateLoad() {
  const [formData, setFormData] = useState({
    weight: '',
    type: '',
    width: '',
    height: '',
    cost: '',
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
      await axios.post('http://localhost:8000/loads/', formData);
      toast.success('Load created successfully!');
      setFormData({
        weight: '',
        type: '',
        width: '',
        height: '',
        cost: '',
      });
    } catch (err) {
      toast.error('Failed to create load.');
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <Toaster />
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Load</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
            <div>
              <Label htmlFor="type">Type</Label>
              <Input
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="width">Width (m)</Label>
              <Input
                id="width"
                name="width"
                type="number"
                value={formData.width}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="height">Height (m)</Label>
              <Input
                id="height"
                name="height"
                type="number"
                value={formData.height}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="cost">Cost (R$)</Label>
              <Input
                id="cost"
                name="cost"
                type="number"
                value={formData.cost}
                onChange={handleChange}
              />
            </div>
            <Button type="submit" className="w-full">
              Create Load
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}