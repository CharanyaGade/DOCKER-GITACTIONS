import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Style.css';
import config from '../config.js';

const ItemManager = () => {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({
    id: '',
    name: '',
    category: '',
    price: '',
    quantity: '',
    supplier: ''
  });

  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const baseUrl = `${config.url}/itemapi`;

  useEffect(() => {
    fetchAllItems();
  }, []);

  const fetchAllItems = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      setItems(res.data);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setMessage('Failed to fetch items.');
    }
  };

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    for (let key in item) {
      if (!item[key] || item[key].toString().trim() === '') {
        setMessage(`Please fill out the ${key} field.`);
        return false;
      }
    }
    return true;
  };

  const addItem = async () => {
    if (!validateForm()) return;
    try {
      await axios.post(`${baseUrl}/add`, item);
      setMessage('Item added successfully.');
      fetchAllItems();
      resetForm();
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setMessage('Error adding item.');
    }
  };

  const updateItem = async () => {
    if (!validateForm()) return;
    try {
      await axios.put(`${baseUrl}/update`, item);
      setMessage(`Item with ID ${item.id} updated successfully.`);
      fetchAllItems();
      resetForm();
      setIsEditing(false);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setMessage('Error updating item.');
    }
  };

  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage(res.data);
      setItems((prev) => prev.filter((i) => i.id !== id));
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setMessage('Error deleting item.');
    }
  };

  const editItem = (itm) => {
    setItem(itm);
    setIsEditing(true);
  };

  const resetForm = () => {
    setItem({
      id: '',
      name: '',
      category: '',
      price: '',
      quantity: '',
      supplier: ''
    });
    setIsEditing(false);
  };

  return (
    <div className="student-container">

      {message && (
        <div
          className={`message-banner ${
            message.toLowerCase().includes('error') ? 'error' : 'success'
          }`}
        >
          {message}
        </div>
      )}

      <h2>Item Management</h2>

      <div>
        <h3>{isEditing ? 'Update Item' : 'Add Item'}</h3>
        <div className="form-grid">
          <input
            type="number"
            name="id"
            placeholder="ID"
            value={item.id}
            onChange={handleChange}
            disabled={isEditing}
          />
          <input
            type="text"
            name="name"
            placeholder="Name (max 20 chars)"
            value={item.name}
            onChange={handleChange}
            maxLength={20}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={item.category}
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={item.price}
            onChange={handleChange}
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={item.quantity}
            onChange={handleChange}
          />
          <input
            type="text"
            name="supplier"
            placeholder="Supplier (max 15 chars)"
            value={item.supplier}
            onChange={handleChange}
            maxLength={15}
          />
        </div>

        <div className="btn-group">
          {isEditing ? (
            <button className="btn-blue" onClick={updateItem}>
              Update Item
            </button>
          ) : (
            <button className="btn-blue" onClick={addItem}>
              Add Item
            </button>
          )}
          <button className="btn-gray" onClick={resetForm}>
            Reset
          </button>
        </div>
      </div>

      <div>
        <h3>All Items</h3>
        {items.length === 0 ? (
          <p>No items found.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  {Object.keys(item).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((itm) => (
                  <tr key={itm.id}>
                    {Object.keys(item).map((key) => (
                      <td key={key}>{itm[key]}</td>
                    ))}
                    <td>
                      <div className="action-buttons">
                        <button className="btn-blue" onClick={() => editItem(itm)}>
                          Edit
                        </button>
                        <button className="btn-blue" onClick={() => deleteItem(itm.id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemManager;
