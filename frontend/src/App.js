import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await axios.get('http://localhost:5002/api/items');
    setItems(res.data);
  };

  const addItem = async () => {
    const res = await axios.post('http://localhost:5002/api/items', { name });
    setItems([...items, res.data]);
    setName('');
  };

  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:5002/api/items/${id}`);
    setItems(items.filter(item => item._id !== id));
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
