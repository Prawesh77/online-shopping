import { useState } from 'react';
import {useSelector} from 'react-redux';
import '../../css/AdminProfile.css';

const AdminProfile = () => {
  const userName = useSelector((state)=> state.user.userName);
  const imageurl= useSelector((state)=> state.user.imageurl);
  const [adminData, setAdminData] = useState({
    username: userName,
    profilePictureUrl: `http://localhost:5000/public${imageurl}`,
    ordersCompleted: 0,
    ordersPending: 0,
    totalRevenue: 0.00,
  });
  const [orders, setOrders] = useState([
    {
      username: userName,
      products: 'Laptop, Headphones',
      dispatched: true,
      completed: false,
    },
  ]);

  const handleDispatchedChange = (index) => {
    const updatedOrders = [...orders];
    updatedOrders[index].dispatched = !updatedOrders[index].dispatched;
    setOrders(updatedOrders);
  };

  // Handle completed checkbox change
  const handleCompletedChange = (index) => {
    const updatedOrders = [...orders];
    updatedOrders[index].completed = !updatedOrders[index].completed;
    setOrders(updatedOrders);
  };

  return (
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
        <div className="summary-box">
          <h3>Orders Summary</h3>
          <p>Completed: <span>{adminData.ordersCompleted}</span></p>
          <p>Pending: <span>{adminData.ordersPending}</span></p>
        </div>
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
        <th>Products</th>
        <th>Dispatched</th>
        <th>Completed</th>
      </tr>
    </thead>
    <tbody>
      {orders.map((order, index) => {
        const products = order.products.split(', '); // Split products into an array
        return products.map((product, productIndex) => (
          <tr key={`${index}-${productIndex}`}>
            {/* Render the username only on the first row of each order */}
            {productIndex === 0 && (
              <td rowSpan={products.length}>
                {order.username}
              </td>
            )}
            <td>{product}</td>
            {/* Render dispatched and completed checkboxes for each product */}
            <td>
              <input
                type="checkbox"
                checked={order.productsDispatched && order.productsDispatched[productIndex]}
                onChange={() => handleDispatchedChange(index, productIndex)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={order.productsCompleted && order.productsCompleted[productIndex]}
                onChange={() => handleCompletedChange(index, productIndex)}
              />
            </td>
          </tr>
        ));
      })}
    </tbody>
  </table>
</div>
    </div>
  );
};

export default AdminProfile;
