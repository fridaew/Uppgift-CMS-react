import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllOrders } from '../store/features/orders/orderSlice';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const OrderList = ({ user }) => {

  if (user == null) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);
  
  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  const filteredOrders = orders.filter((order) => order.orderStatus);


  return (
    <div>
      <div className='prevOrders'>
        <h1>All orders</h1>
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order._id} className='order-wrapper'>
              <p className='ordernumber'>
                <b>Ordernumber:</b> {order._id}
              </p>
              {order.orderRow.map((row) => (
                <div key={row._id} className='row-wrapper'>
                  {row.product && (
                    <>
                      <Link to={`/orders/${order._id}`}>
                      <img src={row.product.imageURL} alt={row.product.name} className='orderRowImg' width={430} height={360} />
                      <p><b>Product:</b> {row.product.name}</p>
                      <p><b>Quantity:</b> {row.quantity}</p>
                      <p><b>Status:</b> {order.orderStatus}</p>
                      </Link>
                    </>
                  )}
                </div>
              ))}
            </div>
          ))
        ) : (
          <p>No orders found with status</p>
        )}
      </div>
    </div>
  );
};


export default OrderList;




