import { useState, useEffect } from "react";
import axios from "axios";

function SearchTruck() {
  const [trucks, setTrucks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTrucks, setFilteredTrucks] = useState([]);

  useEffect(() => {
    fetchTrucks();
  }, []);

  const fetchTrucks = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/truck/");
      setTrucks(response.data);
      setFilteredTrucks(response.data);
    } catch (error) {
      console.error("Failed to fetch trucks:", error);
    }
  };

  const deleteTruck = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this truck?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/truck/${id}`);
      const updated = trucks.filter(truck => truck.id !== id);
      setTrucks(updated);
      setFilteredTrucks(updated);
    } catch (error) {
      console.error("Failed to delete truck:", error);
    }
  };

  const handleSearch = () => {
    const filtered = trucks.filter(truck =>
      truck.registration.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTrucks(filtered);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <h1>Search Trucks</h1>
      <input
        type="text"
        placeholder="Search by registration..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Search</button>

      <table border="1" style={{ marginTop: "1rem", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Registration</th>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Weight</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTrucks.map(truck => (
            <tr key={truck.id}>
              <td>{truck.id}</td>
              <td>{truck.registration}</td>
              <td>{truck.make}</td>
              <td>{truck.model}</td>
              <td>{truck.year}</td>
              <td>{truck.weight}</td>
              <td>
                <button onClick={() => deleteTruck(truck.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SearchTruck;
