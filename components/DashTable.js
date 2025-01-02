"use client";
import { useState, useEffect } from 'react';
import DashForm from './DashForm';
import styles from './DashTable.module.css';

const DashTable = ({ department, level, isAdmin }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      console.log('Fetching orders...');
      const response = await fetch('/api/orders');
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch orders');
      }
      
      const data = await response.json();
      console.log('Fetched orders:', data);
      setOrders(Array.isArray(data) ? data : []);
      
    } catch (error) {
      console.error('Fetch error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    
    try {
      const response = await fetch('/api/orders', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      
      if (!response.ok) throw new Error('Failed to delete order');
      fetchOrders(); // Refresh the list
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Orders List</h2>
        <button 
          className={styles.addButton}
          onClick={() => setShowForm(true)}
        >
          Add New Order
        </button>
      </div>

      {loading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}>Loading...</div>
        </div>
      ) : error ? (
        <div className={styles.error}>
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      ) : !orders || orders.length === 0 ? (
        <div className={styles.emptyState}>
          <h3>No Orders Found</h3>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>SL No</th>
                <th>Customer</th>
                <th>PO No</th>
                <th>Order For</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.slNo}</td>
                  <td>{order.customerName}</td>
                  <td>{order.customerPoNo}</td>
                  <td>{order.orderFor}</td>
                  <td>{order.paymentStatus}</td>
                  <td className={styles.actions}>
                    <button 
                      className={styles.editButton}
                      onClick={() => handleEdit(order)}
                    >
                      ✏️
                    </button>
                    <button 
                      className={styles.deleteButton}
                      onClick={() => handleDelete(order._id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <div className={styles.formOverlay}>
          <DashForm
            department={department}
            level={level}
            isAdmin={isAdmin}
            initialData={selectedOrder}
            onClose={() => {
              setShowForm(false);
              setSelectedOrder(null);
              fetchOrders();
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DashTable;
