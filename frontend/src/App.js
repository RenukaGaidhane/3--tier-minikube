import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get('http://192.168.67.2:30008/api/items');
      setItems(res.data);
    } catch (err) {
      console.error("Fetch error:", err.message);
    }
  };

  const addItem = async () => {
    try {
      const res = await axios.post('http://192.168.67.2:30008/api/items', { name });
      setItems([...items, res.data]);
      setName('');
    } catch (err) {
      console.error("Add error:", err.message);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://192.168.67.2:30008/api/items/${id}`);
      setItems(items.filter(item => item._id !== id));
    } catch (err) {
      console.error("Delete error:", err.message);
    }
  };

  return (
    <div>
      <h1>REACT-APP-deploy</h1>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={addItem}>Add</button>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            {item.name} <button onClick={() => deleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
