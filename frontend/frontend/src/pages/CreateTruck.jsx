import { useState } from "react";
import axios from "axios";

function CreateTruck() {
  const [registration, setRegistration] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [weight, setWeight] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/truck/", {
        registration,
        make,
        model,
        year: parseInt(year),
        weight: parseFloat(weight),
      });
      alert("Truck created successfully!");
      setRegistration("");
      setMake("");
      setModel("");
      setYear("");
      setWeight("");
    } catch (error) {
      console.error(error);
      alert("Failed to create truck.");
    }
  };

  return (
    <div>
      <h1>Create Truck</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Registration"
          value={registration}
          onChange={(e) => setRegistration(e.target.value)}
        /><br />
        <input
          type="text"
          placeholder="Make"
          value={make}
          onChange={(e) => setMake(e.target.value)}
        /><br />
        <input
          type="text"
          placeholder="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        /><br />
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        /><br />
        <input
          type="number"
          placeholder="Weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        /><br />
        <button type="submit">Create Truck</button>
      </form>
    </div>
  );
}

export default CreateTruck;