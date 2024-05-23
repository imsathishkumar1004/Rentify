// OrderHistory.jsx

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrderHistory } from "../../redux/features/order/orderSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const OrderHistory = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { orders, loading, error } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      dispatch(fetchOrderHistory());
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-4">Order History</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order._id}>
              <p>Order ID: {order._id}</p>
              <p>Date: {order.createdAt}</p>
              <p>Total Price: ${order.totalPrice}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
