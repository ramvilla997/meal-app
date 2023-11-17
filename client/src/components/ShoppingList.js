// client/src/components/ShoppingList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShoppingList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchShoppingList = async () => {
      try {
        const result = await axios.get('/api/shopping-list');
        setItems(result.data.items);
      } catch (error) {
        console.error('Error fetching shopping list:', error);
      }
    };

    fetchShoppingList();
  }, []);

  const handleRemove = async (itemId) => {
    try {
      await axios.delete(`/api/shopping-list/${itemId}`);
      setItems(items.filter(item => item._id !== itemId));
    } catch (error) {
      console.error('Error removing item from shopping list:', error);
    }
  };

  return (
    <div>
      <h1>Shopping List</h1>
      {items.map(item => (
        <div key={item._id}>
          <span>{item.name}</span>
          <button onClick={() => handleRemove(item._id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default ShoppingList;
