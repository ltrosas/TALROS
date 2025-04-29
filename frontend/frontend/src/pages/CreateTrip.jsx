import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CreateTrip = () => {
  const [trucks, setTrucks] = useState([]);
  const [loads, setLoads] = useState([]);
  const [formData, setFormData] = useState({
    truck_id: '',
    loads_id: '',
    initial_mileage: '',
    final_mileage: '',
    fuel_used: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/truck/')
      .then(res => setTrucks(res.data))
      .catch(() => setErrorMessage('Failed to load trucks'));

    axios.get('http://localhost:8000/loads/')
      .then(res => setLoads(res.data))
      .catch(() => setErrorMessage('Failed to load loads'));
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      await axios.post('http://localhost:8000/trip/', {
        ...formData,
        truck_id: parseInt(formData.truck_id),
        loads_id: parseInt(formData.loads_id),
        initial_mileage: parseInt(formData.initial_mileage),
        final_mileage: parseInt(formData.final_mileage),
        fuel_used: parseFloat(formData.fuel_used)
      });

      setSuccessMessage('Trip created successfully!');
      setFormData({
        truck_id: '',
        loads_id: '',
        initial_mileage: '',
        final_mileage: '',
        fuel_used: ''
      });
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to create trip.');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create New Trip</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Select Truck</label>
          <select name="truck_id" value={formData.truck_id} onChange={handleChange} className="w-full border rounded px-3 py-2">
            <option value="">-- Select Truck --</option>
            {trucks.map(truck => (
              <option key={truck.id} value={truck.id}>
                {truck.registration} ({truck.make} {truck.model})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Select Load</label>
          <select name="loads_id" value={formData.loads_id} onChange={handleChange} className="w-full border rounded px-3 py-2">
            <option value="">-- Select Load --</option>
            {loads.map(load => (
              <option key={load.id} value={load.id}>
                {load.type} - {load.weight} kg
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Initial Mileage</label>
          <input
            type="number"
            name="initial_mileage"
            value={formData.initial_mileage}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Final Mileage</label>
          <input
            type="number"
            name="final_mileage"
            value={formData.final_mileage}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Fuel Used (liters)</label>
          <input
            type="number"
            step="0.1"
            name="fuel_used"
            value={formData.fuel_used}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Trip
        </button>
      </form>

      {successMessage && <p className="mt-4 text-green-600">{successMessage}</p>}
      {errorMessage && <p className="mt-4 text-red-600">{errorMessage}</p>}
    </div>
  );
};

export default CreateTrip;