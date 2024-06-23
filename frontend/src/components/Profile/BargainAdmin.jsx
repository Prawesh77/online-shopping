// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import '../../css/Bargain.css'; // Importing CSS for styling
// import { getAllOrderAsync, getOrderStatusByIdAsync, setOrderStatusAsync} from '../../redux/OrderSlice/orderSlice';

// const BargainAdmin = () => {
//     const dispatch = useDispatch();
//     const isAdmin = useSelector((state) => state.user.isAdmin);
//     const userName = useSelector((state)=> state.user.userName);
//     const userID = useSelector((state) => state.user.userid);
//     const allorder = useSelector((state) => state.order.allorder);
//     // console.log("Decoded", userID);
//     useEffect(() => {
//         if(isAdmin){
//           dispatch(getAllOrderAsync('pending'));
//         }else{
//             dispatch(getOrderStatusByIdAsync(userID, 'pending'))
//         }
//       }, [dispatch]);
//     //   console.log(allorder);


//       const [data, setData] = useState([]);
//       useEffect(() => {
//         if (allorder) {
//           setData(allorder);
//         }
//       }, [allorder]);

//     // Dummy data
//     // const [data, setData] = useState([
//     //     {
//     //         username: 'Alice',
//     //         products: [
//     //             { id: 1, brand: 'BrandA', productName: 'ProductA', quantity: 1, yourPrice: '10.00', buyersPrice: '12.00' },
//     //             { id: 2, brand: 'BrandB', productName: 'ProductB', quantity: 2, yourPrice: '20.00', buyersPrice: '25.00' },
//     //         ],
//     //     },
//     //     {
//     //         username: 'Bob',
//     //         products: [
//     //             { id: 3, brand: 'BrandC', productName: 'ProductC', quantity: 3, yourPrice: '30.00', buyersPrice: '35.00' },
//     //         ],
//     //     },
//     // ]);

//     const [editing, setEditing] = useState(null);
//     const [editedPrice, setEditedPrice] = useState('');

//     const handleEditClick = (username, index) => {
//         setEditing({ username, index });
//         setEditedPrice(data.find(user => user.username === username).products[index].yourPrice);
//     };

//     const handlePriceChange = (e) => {
//         setEditedPrice(e.target.value);
//     };

//     const handlePriceSave = (username, index,userorderid, productid, yourprice) => {
//         const updatedData = data.map(user => {
//             if (user.username === username) {
//                 console.log("Userorderid:", userorderid);
//                 console.log("productid:", productid);
//                 console.log("yourprice:", yourprice);

//                 const newProducts = [...user.products];
//                 newProducts[index].yourPrice = editedPrice;
//                 return { ...user, products: newProducts };
//             }
//             return user;
//         });
//         setData(updatedData);
//         setEditing(null);
//     };

//     const handleAcceptStatusChange = (username, index, userorderid, productid) => {
//         const updatedData = data.map(user => {
//             if (user.username === username) {
//                 const newStatus = {
//                     accepted: true 
//                 };
//                 dispatch(setOrderStatusAsync({ userorderid, productid, newStatus }));
//                 const newProducts = user.products.filter((_, i) => i !== index);
//                 return { ...user, products: newProducts };
//             }
//             return user;
//         }).filter(user => user.products.length > 0); // Remove users with no products left
//         setData(updatedData);

//     };
//     const handleCancelStatusChange = (username, index, userorderid, productid) => {
//         const updatedData = data.map(user => {
//             if (user.username === username) {
//                 const newStatus = {
//                     cancelled: true 
//                 };
//                 dispatch(setOrderStatusAsync({ userorderid, productid, newStatus }));
//                 const newProducts = user.products.filter((_, i) => i !== index);
//                 return { ...user, products: newProducts };
//             }
//             return user;
//         }).filter(user => user.products.length > 0); // Remove users with no products left
//         setData(updatedData);
//         console.log(data);
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
//                         <th>Buyers Price</th>
//                         <th>Edit Price</th>
//                         <th>Accept</th>
//                         <th>Cancel</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data.map((user) => (
//                         user.products.map((product, productIndex) => (
//                             <tr key={product.orderid}>
//                                 {productIndex === 0 && (
//                                     <td rowSpan={user.products.length}>{user.username}</td>
//                                 )}
//                                 <td>{product.brand}</td>
//                                 <td>{product.productName}</td>
//                                 <td>{product.quantity}</td>
//                                 <td>
                                
//                                     {editing && editing.username === user.username && editing.index === productIndex ? (
//                                         <input
//                                             type="text"
//                                             value={editedPrice}
//                                             onChange={handlePriceChange}
//                                         />
//                                     ) : (
//                                         (isAdmin && user.username === userName) ? product.buyersPrice : product.yourPrice
//                                     )}
//                                 </td>
//                                 <td>{!(isAdmin && user.username === userName) ? product.buyersPrice : product.yourPrice}</td>
//                                 <td>
//                                     {editing && editing.username === user.username && editing.index === productIndex ? (
//                                         <button onClick={() => handlePriceSave(user.username, productIndex, user.userOrderid, product.orderid, product.yourPrice)}>Save</button>
//                                     ) : (
//                                         <button onClick={() => handleEditClick(user.username, productIndex)}>Edit</button>
//                                     )}
//                                 </td>
//                                 <td>
//                                     <button
//                                         onClick={() => handleAcceptStatusChange(user.username, productIndex, user.userOrderid, product.orderid)}
//                                     >
//                                         Accept
//                                     </button>
//                                 </td>
//                                 <td>
//                                     <button
//                                         onClick={() => handleCancelStatusChange(user.username, productIndex, user.userOrderid, product.orderid)}
//                                     >
//                                         Cancel
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default BargainAdmin;


import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../css/Bargain.css'; // Importing CSS for styling
import { getAllOrderAsync, getOrderStatusByIdAsync, setOrderStatusAsync, bargainOrderAsync } from '../../redux/OrderSlice/orderSlice';

const BargainAdmin = () => {
    const dispatch = useDispatch();
    const isAdmin = useSelector((state) => state.user.isAdmin);
    const userName = useSelector((state) => state.user.userName);
    const userID = useSelector((state) => state.user.userid);
    const allorder = useSelector((state) => state.order.allorder);

    useEffect(() => {
        if (isAdmin) {
            dispatch(getAllOrderAsync('pending'));
        } else {
            dispatch(getOrderStatusByIdAsync(userID, 'pending'));
        }
    }, [dispatch, isAdmin, userID]);

    const [data, setData] = useState([]);
    useEffect(() => {
        if (allorder) {
            setData(allorder);
        }
    }, [allorder]);

    const [editing, setEditing] = useState(null);
    const [editedPrice, setEditedPrice] = useState('');

    const handleEditClick = (username, index) => {
        setEditing({ username, index });
        const user = data.find(user => user.username === username);
        const product = user.products[index];
        setEditedPrice(product.yourPrice);
    };

    const handlePriceChange = (e) => {
        setEditedPrice(e.target.value);
    };

    const handlePriceSave = (username, index, userOrderId, productId) => {
        const updatedData = data.map(user => {
            if (user.username === username) {
                const updatedProducts = user.products.map((product, i) => {
                    if (i === index) {
                        console.log("edited:", editedPrice);
                        //dispatch 
                        dispatch(bargainOrderAsync({userOrderId, productId, editedPrice,role:'admin'}));

                        return { ...product, yourPrice: editedPrice };
                    }
                    return product;
                });
                return { ...user, products: updatedProducts };
            }
            return user;
        });
        setData(updatedData);
        setEditing(null);
    };

    const handleAcceptStatusChange = (username, index, userorderid, productid) => {
        const updatedData = data.map(user => {
            if (user.username === username) {
                const newStatus = { accepted: true };
                dispatch(setOrderStatusAsync({ userorderid, productid, newStatus, role:'admin'}));
                const updatedProducts = user.products.filter((_, i) => i !== index);
                return { ...user, products: updatedProducts };
            }
            return user;
        }).filter(user => user.products.length > 0);
        setData(updatedData);
    };

    const handleCancelStatusChange = (username, index, userorderid, productid) => {
        const updatedData = data.map(user => {
            if (user.username === username) {
                const newStatus = { cancelled: true };
                dispatch(setOrderStatusAsync({ userorderid, productid, newStatus, role:'admin'}));
                const updatedProducts = user.products.filter((_, i) => i !== index);
                return { ...user, products: updatedProducts };
            }
            return user;
        }).filter(user => user.products.length > 0);
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
                        <th>Buyers Price</th>
                        <th>Edit Price</th>
                        <th>Accept</th>
                        <th>Cancel</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(user => (
                        user.products.map((product, productIndex) => (
                            <tr key={product.orderid}>
                                {productIndex === 0 && (
                                    (isAdmin && user.username === userName)? <td rowSpan={user.products.length}>{user.username}<br/>(Your's)</td> : <td rowSpan={user.products.length}>{user.username}</td>
                                    
                                )}
                                <td>{product.brand}</td>
                                <td>{product.productName}</td>
                                <td>{product.quantity}</td>
                                <td>
                                    {editing && editing.username === user.username && editing.index === productIndex ? (
                                        <input
                                            type="text"
                                            value={editedPrice}
                                            onChange={handlePriceChange}
                                        />
                                    ) : (
                                        (isAdmin && user.username === userName) ? product.yourPrice : product.yourPrice
                                    )}
                                </td>
                                <td>{product.buyersPrice}</td>
                                <td>
                                    {editing && editing.username === user.username && editing.index === productIndex ? (
                                        <button onClick={() => handlePriceSave(user.username, productIndex, user.userOrderid, product.orderid)}>Send Your Price</button>
                                    ) : (
                                        <button onClick={() => handleEditClick(user.username, productIndex)}>Edit Your Price</button>
                                    )}
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleAcceptStatusChange(user.username, productIndex, user.userOrderid, product.orderid)}
                                    >
                                        Accept Buyers Price
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleCancelStatusChange(user.username, productIndex, user.userOrderid, product.orderid)}
                                    >
                                        Cancel The Order
                                    </button>
                                </td>
                            </tr>
                        ))
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BargainAdmin;

