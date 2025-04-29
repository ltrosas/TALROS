import { useState } from "react";
import axios from "axios";

function CreateLoad() {
  const [formData, setFormData] = useState({
    weight: "",
    type: "",
    width: "",
    height: "",
    cost: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/loads/", {
        ...formData,
        weight: parseFloat(formData.weight),
        width: parseFloat(formData.width),
        height: parseFloat(formData.height),
        cost: parseFloat(formData.cost),
      });
      setMessage("Load created successfully!");
      setFormData({ weight: "", type: "", width: "", height: "", cost: "" });
    } catch (err) {
      console.error(err);
      setMessage("Failed to create load.");
    }
  };

  return (
    <div>
      <h1>Create Load</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="weight"
          placeholder="Weight"
          value={formData.weight}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="type"
          placeholder="Type"
          value={formData.type}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="width"
          placeholder="Width"
          value={formData.width}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="height"
          placeholder="Height"
          value={formData.height}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="cost"
          placeholder="Cost"
          value={formData.cost}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Load</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default CreateLoad;