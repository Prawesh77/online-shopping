// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import '../../css/Bargain.css'; // Importing CSS for styling
// import { getOrderStatusByIdAsync, setOrderStatusAsync, bargainOrderAsync } from '../../redux/OrderSlice/orderSlice';

// const BargainUser = () => {
//     const dispatch = useDispatch();
//     const userName = useSelector((state) => state.user.userName);
//     const userID = useSelector((state) => state.user.userid);
//     const allorder = useSelector((state) => state.order.orderbyid);

//     useEffect(() => {
//         dispatch(getOrderStatusByIdAsync({ userid: userID, status: 'pending' }));
//     }, [dispatch, userID]);

//     const [data, setData] = useState([]);
//     useEffect(() => {
//         if (allorder) {
//             setData(allorder);
//         }
//     }, [allorder]);
//     console.log(data);

//     const [editing, setEditing] = useState(null);
//     const [editedPrice, setEditedPrice] = useState('');

//     const handleEditClick = (index) => {
//         setEditing(index);
//         const product = data[index];
//         setEditedPrice(product.yourPrice);
//     };

//     const handlePriceChange = (e) => {
//         setEditedPrice(e.target.value);
//     };

//     const handlePriceSave = (index, userOrderId, productId) => {
//         const updatedData = data.map((product, i) => {
//             if (i === index) {
//                 console.log("edited:", editedPrice);
//                 // Dispatch action with role 'user'
//                 dispatch(bargainOrderAsync({ userOrderId, productId, editedPrice, role: 'user' }));

//                 return { ...product, yourPrice: editedPrice };
//             }
//             return product;
//         });
//         setData(updatedData);
//         setEditing(null);
//     };

//     const handleAcceptStatusChange = (index, userOrderId, productId) => {
//         const updatedData = data.map((product, i) => {
//             if (i === index) {
//                 const newStatus = { accepted: true };
//                 dispatch(setOrderStatusAsync({ userOrderId, productId, newStatus }));
//                 return { ...product, status: 'accepted' };
//             }
//             return product;
//         }).filter(product => product.status !== 'accepted');
//         setData(updatedData);
//     };

//     const handleCancelStatusChange = (index, userOrderId, productId) => {
//         const updatedData = data.map((product, i) => {
//             if (i === index) {
//                 const newStatus = { cancelled: true };
//                 dispatch(setOrderStatusAsync({ userOrderId, productId, newStatus }));
//                 return { ...product, status: 'cancelled' };
//             }
//             return product;
//         }).filter(product => product.status !== 'cancelled');
//         setData(updatedData);
//     };

//     return (
//         <div className="bargain-container">
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Username</th>
//                         <th>Brand</th>
//                         <th>Product</th>
//                         <th>Quantity</th>
//                         <th>Your Price</th>
//                         <th>Sellers Price</th>
//                         <th>Edit Price</th>
//                         <th>Accept</th>
//                         <th>Cancel</th>
//                     </tr>
//                 </thead>
//                 <tbody>
                
//                     {data.map((product, index) => (
//                         <tr key={product._id}>
//                             <td>{userName}</td>
//                             <td>{product.brand}</td>
//                             <td>{product.productName}</td>
//                             <td>{product.quantity}</td>
//                             <td>
//                                 {editing === index ? (
//                                     <input
//                                         type="text"
//                                         value={editedPrice}
//                                         onChange={handlePriceChange}
//                                     />
//                                 ) : (
//                                     product.priceUser
//                                 )}
//                             </td>
//                             <td>{product.priceAdmin}</td>
//                             <td>
//                                 {editing === index ? (
//                                     <button onClick={() => handlePriceSave(index, product.userOrderId, product.orderid)}>Save</button>
//                                 ) : (
//                                     <button onClick={() => handleEditClick(index)}>Edit</button>
//                                 )}
//                             </td>
//                             <td>
//                                 <button
//                                     onClick={() => handleAcceptStatusChange(index, product.userOrderId, product.orderid)}
//                                 >
//                                     Accept
//                                 </button>
//                             </td>
//                             <td>
//                                 <button
//                                     onClick={() => handleCancelStatusChange(index, product.userOrderId, product.orderid)}
//                                 >
//                                     Cancel
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default BargainUser;


import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../css/Bargain.css'; // Importing CSS for styling
import { getOrderStatusByIdAsync, setOrderStatusAsync, bargainOrderAsync } from '../../redux/OrderSlice/orderSlice';

const BargainUser = () => {
    const dispatch = useDispatch();
    const userName = useSelector((state) => state.user.userName);
    const userID = useSelector((state) => state.user.userid);
    const allorder = useSelector((state) => state.order.orderbyid);

    useEffect(() => {
        dispatch(getOrderStatusByIdAsync({ userid: userID, status: 'pending' }));
    }, [dispatch, userID]);

    const [data, setData] = useState([]);
    useEffect(() => {
        if (allorder) {
            setData(allorder);
        }
    }, [allorder]);
    console.log(data);

    const [editing, setEditing] = useState(null);
    const [editedPrice, setEditedPrice] = useState();

    const handleEditClick = (index) => {
        setEditing(index);
        const product = data[index];
        setEditedPrice(product.priceUser || ''); // Ensure a defined value
    };

    const handlePriceChange = (e) => {
        setEditedPrice(e.target.value);
    };

    const handlePriceSave = (index, userOrderId, productId) => {
        const updatedData = data.map((product, i) => {
            if (i === index) {
                console.log("edited:", editedPrice);
                // Dispatch action with role 'user'
                dispatch(bargainOrderAsync({ userOrderId, productId, editedPrice, role: 'user' }));

                return { ...product, priceUser: editedPrice };
            }
            return product;
        });
        setData(updatedData);
        setEditing(null);
    };

    const handleAcceptStatusChange = (index, userorderid, productid) => {
      setEditedPrice(allorder.priceUser);
      if(editedPrice>=allorder.priceAdmin){
        const updatedData = data.map((product, i) => {
          if (i === index) {
              const newStatus = { accepted: true };
              dispatch(setOrderStatusAsync({ userorderid, productid, newStatus }));
              return { ...product, status: 'accepted' };
          }
          return product;
      }).filter(product => product.status !== 'accepted');
      setData(updatedData);
      }else{
          alert("You cannot accept below the seller's price");
          
      }
      
    };

    const handleCancelStatusChange = (index, userorderid, productid) => {
        const updatedData = data.map((product, i) => {
            if (i === index) {
                const newStatus = { cancelled: true };
                dispatch(setOrderStatusAsync({ userorderid, productid, newStatus }));
                return { ...product, status: 'cancelled' };
            }
            return product;
        }).filter(product => product.status !== 'cancelled');
        setData(updatedData);
    };

    return (
        <div className="bargain-container">
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Brand</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Your Price</th>
                        <th>Sellers Price</th>
                        <th>Edit Price</th>
                        <th>Accept</th>
                        <th>Cancel</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((product, index) => (
                        <tr key={product._id}>
                            <td>{userName}</td>
                            <td>{product.brand}</td>
                            <td>{product.productName}</td>
                            <td>{product.quantity}</td>
                            <td>
                                {editing === index ? (
                                    <input
                                        type="text"
                                        value={editedPrice}
                                        onChange={handlePriceChange}
                                    />
                                ) : (
                                    product.priceUser || ''
                                )}
                            </td>
                            <td>{product.priceAdmin}</td>
                            <td>
                                {editing === index ? (
                                    <button onClick={() => handlePriceSave(index, product.orderid, product._id)}>Send Your Price</button>
                                ) : (
                                    <button onClick={() => handleEditClick(index)}>Edit Your Price</button>
                                )}
                            </td>
                            <td>
                                <button
                                    onClick={() => handleAcceptStatusChange(index, product.orderid, product._id)}
                                >
                                    Accept Sellers Price
                                </button>
                            </td>
                            <td>
                                <button
                                    onClick={() => handleCancelStatusChange(index, product.orderid, product._id)}
                                >
                                    Cancel Your Order
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BargainUser;
