// import { useState } from 'react';
// import {useSelector} from 'react-redux';
// import '../../css/Profile.css';
// import { Link } from 'react-router-dom';

// const Profile = () => {
//   const userName = useSelector((state)=> state.user.userName);
//   const imageurl= useSelector((state)=> state.user.imageurl);
//   const isAdmin = useSelector((state) => state.user.isAdmin);
//   const [adminData, setAdminData] = useState({
//     username: userName,
//     profilePictureUrl: `http://localhost:5000/public${imageurl}`,
//     ordersCompleted: 0,
//     ordersPending: 0,
//     totalRevenue: 0.00,
//   });
//   const [orders, setOrders] = useState([
//     {
//       username: userName,
//       product: 'Laptop, Headphones',
//       products:[{
//         name: 'Laptop',
//         dispatched: true,
//         completed: false
//       },
//       {
//         name: 'Headphones',
//         dispatched: false,
//         completed: false
//       },
//     ]
//     },
//   ]);

//   const handleDispatchedChange = (index) => {
//     const updatedOrders = [...orders];
//     updatedOrders[index].dispatched = !updatedOrders[index].dispatched;
//     setOrders(updatedOrders);
//   };

//   // Handle completed checkbox change
//   const handleCompletedChange = (index) => {
//     const updatedOrders = [...orders];
//     updatedOrders[index].completed = !updatedOrders[index].completed;
//     setOrders(updatedOrders);
//   };

//   return (
//     <div>
//       {isAdmin ? (

//         //if admin
//         <div className="admin-profile">
//           <div className="profile-header">
//             <div className="profile-picture-container">
//               <img src={adminData.profilePictureUrl} alt="Profile" className="profile-picture" />
//             </div>

//             <div className="profile-info">
//               <h2 className="username">{adminData.username}</h2>
//             </div>
//           </div>
//           <div className="orders-info">
//             <Link to="/profile/summary">
//               <div className="summary-box">
//                 <h3>Orders Summary</h3>
//                 <p>Completed: <span>{adminData.ordersCompleted}</span></p>
//                 <p>Pending: <span>{adminData.ordersPending}</span></p>
//               </div>
//             </Link>            
//             <div className="summary-box">
//               <h3>Total Revenue</h3>
//               <p>$<span>{adminData.totalRevenue.toFixed(2)}</span></p>
//             </div>
//           </div>
//           <div className="orders-table-container">
//             <h3>Order Details</h3>
//             <table className="orders-table">
//               <thead>
//                 <tr>
//                   <th>Username</th>
//                   <th>Products</th>
//                   <th>Dispatched</th>
//                   <th>Completed</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {orders.map((order, index) => {
//                   const products = order.product.split(', '); // Split products into an array
//                   return products.map((product, productIndex) => (
//                     <tr key={`${index}-${productIndex}`}>
//                       {/* Render the username only on the first row of each order */}
//                       {productIndex === 0 && (
//                         <td rowSpan={products.length}>
//                           {order.username}
//                         </td>
//                       )}
//                       <td>{product}</td>
//                       {/* Render dispatched and completed checkboxes for each product */}
//                       <td>
//                         <input
//                           type="checkbox"
//                           checked={order.productsDispatched && order.productsDispatched[productIndex]}
//                           onChange={() => handleDispatchedChange(index, productIndex)}
//                         />
//                       </td>
//                       <td>
//                         <input
//                           type="checkbox"
//                           checked={order.productsCompleted && order.productsCompleted[productIndex]}
//                           onChange={() => handleCompletedChange(index, productIndex)}
//                         />
//                       </td>
//                     </tr>
//                   ));
//                 })}
//               </tbody>
//             </table>
//           </div>

//         </div>
//       ):(
//         //if not admin
//           <div className="admin-profile">
//             <div className="admin-profile">
//               <div className="profile-header">
//                 <div className="profile-picture-container">
//                   <img src={adminData.profilePictureUrl} alt="Profile" className="profile-picture" />
//                 </div>

//                 <div className="profile-info">
//                   <h2 className="username">{adminData.username}</h2>
//                 </div>
//               </div>
//             </div>
//           </div>

//       )}
//       </div>
// )}

// export default Profile;

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../../css/Profile.css';
import { Link } from 'react-router-dom';

const Profile = () => {
  const userName = useSelector((state) => state.user.userName);
  const imageurl = useSelector((state) => state.user.imageurl);
  const isAdmin = useSelector((state) => state.user.isAdmin);

  const [adminData, setAdminData] = useState({
    username: userName,
    profilePictureUrl: `http://localhost:5000/public${imageurl}`,
    ordersCompleted: 0,
    ordersPending: 0,
    ordersDispatched: 0, // Added new variable for dispatched orders
    totalRevenue: 0.0, // Added for total revenue
  });

  const [orders, setOrders] = useState([
    {
      id: 1,
      username: 'Prawesh',
      products: [
        { name: 'Laptop', dispatched: true, completed: false, price: 1000, quantity: 1 },
        { name: 'Headphones', dispatched: false, completed: false, price: 100, quantity: 2 },
      ],
    },
    {
      id: 2,
      username: 'Rajesh Dai',
      products: [
        { name: 'Smartphone', dispatched: false, completed: false, price: 500, quantity: 1 },
      ],
    },
  ]);

  useEffect(() => {
    // Calculate pending, completed, and dispatched orders
    const calculateOrderCounts = () => {
      let pendingCount = 0;
      let completedCount = 0;
      let dispatchedCount = 0;
      let totalRevenue = 0;

      orders.forEach(order => {
        order.products.forEach(product => {
          if (product.completed) {
            completedCount += 1;
            totalRevenue += product.price * product.quantity;
          } else if (product.dispatched) {
            dispatchedCount += 1;
          } else {
            pendingCount += 1;
          }
        });
      });

      setAdminData(prevData => ({
        ...prevData,
        ordersCompleted: completedCount,
        ordersPending: pendingCount,
        ordersDispatched: dispatchedCount, // Update dispatched count
        totalRevenue, // Update total revenue
      }));
    };

    calculateOrderCounts();
  }, [orders]);

  const handleDispatchedChange = (orderIndex, productIndex) => {
    const updatedOrders = [...orders];
    const product = updatedOrders[orderIndex].products[productIndex];
    product.dispatched = !product.dispatched;

    // If dispatched is set to true, completed must be false
    if (product.dispatched) {
      product.completed = false;
    }

    setOrders(updatedOrders);
  };

  const handleCompletedChange = (orderIndex, productIndex) => {
    const updatedOrders = [...orders];
    const product = updatedOrders[orderIndex].products[productIndex];
    product.completed = !product.completed;

    // Lock both dispatched and completed checkboxes once completed is true
    if (product.completed) {
      product.dispatched = false;
    }

    setOrders(updatedOrders);
  };

  return (
    <div>
      {isAdmin ? (
        // If admin
        <div className="admin-profile">
          <div className="profile-header">
            <div className="profile-picture-container">
              <img src={adminData.profilePictureUrl} alt="Profile" className="profile-picture" />
            </div>

            <div className="profile-info">
              <h2 className="username">{adminData.username}</h2>
            </div>
          </div>
          <div className="orders-info">
            <Link to="/profile/summary">
              <div className="summary-box">
                <h3>Orders Summary</h3>
                <p>Completed: <span>{adminData.ordersCompleted}</span></p>
                <p>Pending: <span>{adminData.ordersPending}</span></p>
                <p>Dispatched: <span>{adminData.ordersDispatched}</span></p> {/* Display dispatched count */}
              </div>
            </Link>
            <div className="summary-box">
              <h3>Total Revenue</h3>
              <p>$<span>{adminData.totalRevenue.toFixed(2)}</span></p>
            </div>
          </div>
          <div className="orders-table-container">
            <h3>Order Details</h3>
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Dispatched</th>
                  <th>Completed</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, orderIndex) => (
                  order.products.map((product, productIndex) => (
                    <tr key={`${orderIndex}-${productIndex}`}>
                      {/* Render the username only on the first row of each order */}
                      {productIndex === 0 && (
                        <td rowSpan={order.products.length}>
                          {order.username}
                        </td>
                      )}
                      <td>{product.name}</td>
                      <td>${product.price}</td>
                      <td>{product.quantity}</td>
                      <td>
                        <input
                          type="checkbox"
                          checked={product.dispatched}
                          disabled={product.completed}
                          onChange={() => handleDispatchedChange(orderIndex, productIndex)}
                        />
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          checked={product.completed}
                          disabled={product.completed}
                          onChange={() => handleCompletedChange(orderIndex, productIndex)}
                        />
                      </td>
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        // If not admin
        <div className="admin-profile">
          <div className="profile-header">
            <div className="profile-picture-container">
              <img src={adminData.profilePictureUrl} alt="Profile" className="profile-picture" />
            </div>
            <div className="profile-info">
              <h2 className="username">{adminData.username}</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;



