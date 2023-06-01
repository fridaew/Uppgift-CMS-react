import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';

const OrderDetails = ({ user }) => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch('http://localhost:9998/api/orders/' + id);
        const data = await response.json();
        console.log(data);
        setOrder(data);
        setStatus(data.orderStatus);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const handleStatusChange = async () => {
    try {
      const response = await fetch('http://localhost:9998/api/orders/status/' + id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: selectedStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }

      const updatedOrder = await response.json();
      setStatus(updatedOrder.orderStatus);
      console.log('Order status updated successfully.');
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleStatusOptionChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  if (user == null) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!order) {
    return <p>Order not found.</p>;
  }

  return (
    <div className="orderDetails">
      <div>
        <h2>Order Details</h2>
        <p>Order ID: {order._id}</p>
      </div>

      <div className="order-details-wrapper">
        {order.orderRow.map((row) => (
          <div key={row._id} className="details-row-wrapper">
            <div className="img-card">
              <img src={row.product.imageURL} alt={row.product.name} width={230} height={160} />
            </div>
            <div className="text-card">
              <hr />
              <h2>{row.product.name}</h2>
              <p>Description: {row.product.description}</p>
              <hr />
              <p>Price: ${row.product.price}</p>
              <hr />
              <p>Tags: {row.product.tags}</p>
              <p>Status: {status}</p>

              <div>
                <select value={selectedStatus} onChange={handleStatusOptionChange}>
                  <option value="in transit">In Transit</option>
                  <option value="pending">Pending</option>
                </select>
                <button className="btn btn-primary" onClick={handleStatusChange}>
                  Update Status
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;



