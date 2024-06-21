import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../css/Bargain.css'; // Importing CSS for styling
import { getAllOrderAsync, getOrderStatusByIdAsync} from '../../redux/OrderSlice/orderSlice';

const Bargain = () => {
    const dispatch = useDispatch();
    const isAdmin = useSelector((state) => state.user.isAdmin);
    const userID = useSelector((state) => state.user.userid);
    const allorder = useSelector((state) => state.order.allorder);
    
    useEffect(() => {
        if(isAdmin){
          dispatch(getAllOrderAsync('pending'));
        }else{
            dispatch(getOrderStatusByIdAsync(userID, 'pending'))
        }
      }, [dispatch]);
      console.log(allorder);


      const [data, setData] = useState([]);
      useEffect(() => {
        if (allorder) {
          setData(allorder);
        }
      }, [allorder]);

    // Dummy data
    // const [data, setData] = useState([
    //     {
    //         username: 'Alice',
    //         products: [
    //             { id: 1, brand: 'BrandA', productName: 'ProductA', quantity: 1, yourPrice: '10.00', buyersPrice: '12.00' },
    //             { id: 2, brand: 'BrandB', productName: 'ProductB', quantity: 2, yourPrice: '20.00', buyersPrice: '25.00' },
    //         ],
    //     },
    //     {
    //         username: 'Bob',
    //         products: [
    //             { id: 3, brand: 'BrandC', productName: 'ProductC', quantity: 3, yourPrice: '30.00', buyersPrice: '35.00' },
    //         ],
    //     },
    // ]);

    const [editing, setEditing] = useState(null);
    const [editedPrice, setEditedPrice] = useState('');

    const handleEditClick = (username, index) => {
        setEditing({ username, index });
        setEditedPrice(data.find(user => user.username === username).products[index].yourPrice);
    };

    const handlePriceChange = (e) => {
        setEditedPrice(e.target.value);
    };

    const handlePriceSave = (username, index) => {
        const updatedData = data.map(user => {
            if (user.username === username) {
                const newProducts = [...user.products];
                newProducts[index].yourPrice = editedPrice;
                return { ...user, products: newProducts };
            }
            return user;
        });
        setData(updatedData);
        setEditing(null);
    };

    const handleStatusChange = (username, index) => {
        const updatedData = data.map(user => {
            if (user.username === username) {
                const newProducts = user.products.filter((_, i) => i !== index);
                return { ...user, products: newProducts };
            }
            return user;
        }).filter(user => user.products.length > 0); // Remove users with no products left
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
                    {data.map((user) => (
                        user.products.map((product, productIndex) => (
                            <tr key={product.orderid}>
                                {productIndex === 0 && (
                                    <td rowSpan={user.products.length}>{user.username}</td>
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
                                        product.yourPrice
                                    )}
                                </td>
                                <td>{product.buyersPrice}</td>
                                <td>
                                    {editing && editing.username === user.username && editing.index === productIndex ? (
                                        <button onClick={() => handlePriceSave(user.username, productIndex)}>Save</button>
                                    ) : (
                                        <button onClick={() => handleEditClick(user.username, productIndex)}>Edit</button>
                                    )}
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleStatusChange(user.username, productIndex)}
                                    >
                                        Accept
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleStatusChange(user.username, productIndex)}
                                    >
                                        Cancel
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

export default Bargain;
