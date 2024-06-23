import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../css/Profile.css';
import { Link } from 'react-router-dom';
import { getAllOrderAsync, setOrderStatusAsync } from '../../redux/OrderSlice/orderSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.userName);
  const imageurl = useSelector((state) => state.user.imageurl);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const allorder = useSelector((state) => state.order.allorder);

  const [adminData, setAdminData] = useState({
    username: userName,
    profilePictureUrl: `http://localhost:5000/public${imageurl}`,
    ordersCompleted: 0,
    ordersPending: 0,
    ordersDispatched: 0,
    totalRevenue: 0.0,
  });

  const [orders, setOrders] = useState([]);
  const [editableProducts, setEditableProducts] = useState({});

  useEffect(() => {
    if(isAdmin){
      dispatch(getAllOrderAsync('accepted'));
    }
  }, [dispatch]);

  useEffect(() => {
    if (allorder) {
      setOrders(allorder);
    }
  }, [allorder]);

  useEffect(() => {
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
        ordersDispatched: dispatchedCount,
        totalRevenue,
      }));
    };

    if (Array.isArray(orders)) {
      calculateOrderCounts();
    }
  }, [orders]);

  const handleDispatchedChange = (orderIndex, productIndex, userorderid, productid) => {
    setOrders(prevOrders => {
      const newOrders = prevOrders.map((order, idx) => {
        if (idx === orderIndex) {
          const newProducts = order.products.map((product, pIdx) => {
            if (pIdx === productIndex) {
              const newStatus = {
                dispatched: !product.dispatched,
              };
              dispatch(setOrderStatusAsync({ userorderid, productid, newStatus }));
              return {
                ...product,
                dispatched: !product.dispatched,
                completed: product.dispatched ? false : product.completed,
              };
            }
            return product;
          });
          return {
            ...order,
            products: newProducts,
          };
        }
        return order;
      });
      return newOrders;
    });
  };

  const handleCompletedChange = (orderIndex, productIndex, userorderid, productid) => {
    setOrders(prevOrders => {
      const newOrders = prevOrders.map((order, idx) => {
        if (idx === orderIndex) {
          const newProducts = order.products.map((product, pIdx) => {
            if (pIdx === productIndex) {
              const newStatus = {
                completed: !product.completed
              };
              dispatch(setOrderStatusAsync({ userorderid, productid, newStatus }));
              return {
                ...product,
                completed: !product.completed,
                dispatched: !product.completed ? true : product.dispatched,
              };
            }
            return product;
          });
          return {
            ...order,
            products: newProducts,
          };
        }
        return order;
      });
      return newOrders;
    });
  };

  const handleEditClick = (orderIndex, productIndex) => {
    setEditableProducts(prevState => ({
      ...prevState,
      [`${orderIndex}-${productIndex}`]: !prevState[`${orderIndex}-${productIndex}`],
    }));
  };

  return (
    <div>
      {isAdmin ? (
        <div className="admin-profile">
          <div className="notification_bell">
            <Link to="/profile/bargainadmin" >
                <i className='bx bxs-bell'></i>
              </Link>
              <p className="noti_num">1</p>   
              {/* {
                cartnum===0? 
                <p className="cart_num_none"></p> :
                <p className="cart_num">{cartnum}</p>
              }  */}

          </div>
          
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
                <p>Dispatched: <span>{adminData.ordersDispatched}</span></p>
              </div>
            </Link>
            <div className="summary-box">
              <h3>Total Revenue</h3>
              <p>Rs<span>{adminData.totalRevenue.toFixed(2)}</span></p>
            </div>
          </div>

          <div className="order-status-card">
            <Link to="/profile/orders">
              <button className="order-status-button">Check Your Order Status</button>
            </Link>
          </div>

          <div className="orders-table-container">
            <h3>Order Details</h3>
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Brand</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Dispatched</th>
                  <th>Completed</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {console.log(orders)}
                {orders && Array.isArray(orders) && orders.map((order, orderIndex) => (
                  order.products.map((product, productIndex) => (
                    <tr key={product.orderid}>
                      {productIndex === 0 && (
                        <td rowSpan={order.products.length}>
                          {order.username}
                        </td>
                      )}
                      <td>{product.brand}</td>
                      <td>{product.productName}</td>
                      <td>Rs{product.price}</td>
                      <td>{product.quantity}</td>
                      <td>
                        <input
                          type="checkbox"
                          checked={product.dispatched}
                          disabled={!editableProducts[`${orderIndex}-${productIndex}`] || product.completed}
                          onChange={() => handleDispatchedChange(orderIndex, productIndex, order.userOrderid, product.orderid)}
                        />
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          checked={product.completed}
                          disabled={!editableProducts[`${orderIndex}-${productIndex}`]}
                          onChange={() => handleCompletedChange(orderIndex, productIndex, order.userOrderid, product.orderid)}
                        />
                      </td>
                      <td>
                        <button onClick={() => handleEditClick(orderIndex, productIndex)}>
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="admin-profile">
          <div className="notification_bell">
            <Link to="/profile/bargainuser" >
                <i className='bx bxs-bell'></i>
              </Link>
              <p className="noti_num">1</p> 
          </div>
          <div className="profile-header">
            <div className="profile-picture-container">
              <img src={adminData.profilePictureUrl} alt="Profile" className="profile-picture" />
            </div>
            <div className="profile-info">
              <h2 className="username">{adminData.username}</h2>
            </div>
          </div>

          <div className="order-status-card">
            <Link to="/profile/orders">
              <button className="order-status-button">Check Your Order Status</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;








