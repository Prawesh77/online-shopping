import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import  "../../css/Order.css";
import { placeOrderAsync } from '../../redux/OrderSlice/orderSlice';

const Order = (props) => {
  const { productId, toggleOrder } = props;
console.log(productId);
const dispatch = useDispatch();
  //userid,, order[{productId, quantity,deliveryAddress{fullName, address, contactNo, city, state}}]
const userID = useSelector((state) => state.user.userid);

    const [orderFormData, setOrderFormData] = useState({
        userid: userID ,
        order: {
            productId: productId ,
            quantity: '',
            deliveryAddress: {
                fullName: '',
                address: '',
                contactNo: '',
                city: '',
                state: ''
            }
        }
    });

    // Handle changes for general inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        const [section, key] = name.split('.');
        
        setOrderFormData((prevState) => {
            if (section === 'order') {
                if (key in prevState.order) {
                    return {
                        ...prevState,
                        order: {
                            ...prevState.order,
                            [key]: value
                        }
                    };
                } else {
                    return {
                        ...prevState,
                        order: {
                            ...prevState.order,
                            deliveryAddress: {
                                ...prevState.order.deliveryAddress,
                                [key]: value
                            }
                        }
                    };
                }
            }
            return {
                ...prevState,
                [name]: value
            };
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', orderFormData);
        dispatch(placeOrderAsync(orderFormData));
        console.log("dispatched");
    };

    return (
        <form onSubmit={handleSubmit} className='order_container'>
            <div>
                <label>Quantity:</label>
                <input type="number" name="order.quantity" value={orderFormData.order.quantity} onChange={handleChange} />
            </div>
            <div>
                <label>Full Name:</label>
                <input type="text" name="order.fullName" value={orderFormData.order.deliveryAddress.fullName} onChange={handleChange} />
            </div>
            <div>
                <label>Address:</label>
                <input type="text" name="order.address" value={orderFormData.order.deliveryAddress.address} onChange={handleChange} />
            </div>
            <div>
                <label>Contact Number:</label>
                <input type="text" name="order.contactNo" value={orderFormData.order.deliveryAddress.contactNo} onChange={handleChange} />
            </div>
            <div>
                <label>City:</label>
                <input type="text" name="order.city" value={orderFormData.order.deliveryAddress.city} onChange={handleChange} />
            </div>
            <div>
                <label>State:</label>
                <input type="text" name="order.state" value={orderFormData.order.deliveryAddress.state} onChange={handleChange} />
            </div>
            <button type="submit">Submit Order</button>
            <p onClick={toggleOrder}>Close</p>
        </form>
    );
}
Order.propTypes = {
    toggleOrder: PropTypes.func.isRequired,
    productId: PropTypes.string
};
export default Order

