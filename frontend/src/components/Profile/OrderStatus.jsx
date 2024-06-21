// // import React from 'react'
// import { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux'
// import { getOrderStatusByIdAsync } from '../../redux/OrderSlice/orderSlice';

// const OrderStatus = () => {
//   const userID = useSelector((state) => state.user.userid);
//   const dispatch=useDispatch();
//   useEffect(() => {
//     if (userID) {
//       dispatch(getOrderStatusByIdAsync({ userid: userID }));
//     }
//   }, [dispatch, userID]);
//   const orderOfId = useSelector((state) => state.order.orderbyid);

  
//   console.log(orderOfId);
//   return (
//     <div>orderStatus</div>
//   )
// }

// export default OrderStatus

// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { getOrderStatusByIdAsync } from '../../redux/OrderSlice/orderSlice';
// import '../../css/Profile.css'; // Import CSS file for styling

// const OrderStatus = () => {
//   const userID = useSelector((state) => state.user.userid);
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(true); // Loading state
//   const [orderOfId, setOrderOfId] = useState([]); // State to hold order data
//   useEffect(() => {
//     if (userID) {
//       dispatch(getOrderStatusByIdAsync({ userid: userID }))
//         .then((data) => {
//           setOrderOfId(data.payload); // Update state with fetched data
//           setLoading(false); // Set loading to false after fetching data
//         })
//         .catch((error) => {
//           console.error('Error fetching order status:', error);
//           setLoading(false); // Set loading to false on error as well
//         });
//     }
//   }, [dispatch, userID]);
// console.log(orderOfId);
//   const [selectedStatuses, setSelectedStatuses] = useState({
//     pending: true,
//     dispatched: true,
//     completed: true
//   });

//   const handleStatusChange = (status) => {
//     setSelectedStatuses((prevStatuses) => ({
//       ...prevStatuses,
//       [status]: !prevStatuses[status]
//     }));
//   };

//   // Filter orders based on selected statuses
//   const filteredOrders = Array.isArray(orderOfId)
//     ? orderOfId.filter((order) => selectedStatuses[order.status])
//     : [];

//   if (loading) {
//     return <div>Loading...</div>; // Optional: Render a loading indicator
//   }

//   return (
//     <div className="order-status-container">
//       <div className="status-filters">
//         <label className="status-filter">
//           <input
//             type="checkbox"
//             checked={selectedStatuses.pending}
//             onChange={() => handleStatusChange('pending')}
//           />
//           Pending
//         </label>
//         <label className="status-filter">
//           <input
//             type="checkbox"
//             checked={selectedStatuses.dispatched}
//             onChange={() => handleStatusChange('dispatched')}
//           />
//           Dispatched
//         </label>
//         <label className="status-filter">
//           <input
//             type="checkbox"
//             checked={selectedStatuses.completed}
//             onChange={() => handleStatusChange('completed')}
//           />
//           Completed
//         </label>
//       </div>
//       <table className="orderStatus-table">
//         <thead>
//           <tr>
//             <th>Image</th>
//             <th>Product Name</th>
//             <th>Quantity</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredOrders.map((order) => (
//             <tr key={order._id}>
//               <td><img src={order.imageurl} alt="Product" className="product-image" /></td>
//               <td>{order.productId}</td>
//               <td>{order.quantity}</td>
//               <td>{order.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default OrderStatus;


import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrderStatusByIdAsync } from '../../redux/OrderSlice/orderSlice';
import '../../css/OrderStatus.css'; // Import CSS file for styling

const OrderStatus = () => {
  const userID = useSelector((state) => state.user.userid);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Loading state
  const [orders, setOrders] = useState([]); // State to hold order data

  useEffect(() => {
    if (userID) {
      dispatch(getOrderStatusByIdAsync({ userid: userID }))
        .then((response) => {
          // Extract orders array from response payload
          const ordersData = response.payload?.order || [];
          setOrders(ordersData);
          setLoading(false); // Set loading to false after fetching data
        })
        .catch((error) => {
          console.error('Error fetching order status:', error);
          setLoading(false); // Set loading to false on error as well
        });
    }
  }, [dispatch, userID]);

  const [selectedStatuses, setSelectedStatuses] = useState({
    pending: true,
    dispatched: true,
    completed: true
  });

  const handleStatusChange = (status) => {
    setSelectedStatuses((prevStatuses) => ({
      ...prevStatuses,
      [status]: !prevStatuses[status]
    }));
  };

  // Filter orders based on selected statuses
  const filteredOrders = Array.isArray(orders)
    ? orders.filter((order) => selectedStatuses[order.status])
    : [];

  if (loading) {
    return <div>Loading...</div>; // Optional: Render a loading indicator
  }

  return (
    <div className="order-status-container">
      <div className="status-filters">
        <label className="status-filter">
          <input
            type="checkbox"
            checked={selectedStatuses.pending}
            onChange={() => handleStatusChange('pending')}
          />
          Pending
        </label>
        <label className="status-filter">
          <input
            type="checkbox"
            checked={selectedStatuses.dispatched}
            onChange={() => handleStatusChange('dispatched')}
          />
          Dispatched
        </label>
        <label className="status-filter">
          <input
            type="checkbox"
            checked={selectedStatuses.completed}
            onChange={() => handleStatusChange('completed')}
          />
          Completed
        </label>
      </div>
      <table className="orderStatus-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order._id}>
              <td><img src={`http://localhost:5000/public${order.imageurl}`} alt="Product" className="product-image" /></td>
              <td>{order.productName}</td>
              <td>{order.quantity}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderStatus;
