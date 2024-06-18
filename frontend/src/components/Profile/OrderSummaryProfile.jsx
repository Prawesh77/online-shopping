import React, { useState } from 'react';
import '../../css/SummaryProfile.css';

const OrderSummaryProfile = () => {
    const [orders, setOrders] = useState([
        {
            id: 1,
            username: 'Prawesh',
            products: 'LED Bulb',
            details:{
                quantity:'',
                color:'',
                size:'',
                
            },
            state: {
                pending: true,
                dispatched: false,
                completed: false
            }
        },
        {
            id: 2,
            username: 'rajesh dai',
            products: 'Smartphone ',
            details: '',
            state: {
                pending: true,
                dispatched: false,
                completed: false
            }
        },
    ]);

    const [filterType, setFilterType] = useState('pending');

    const toggleOrderFilter = (type) => {
        setFilterType(type);
    };

    const handleDispatchedChange = (id, isChecked) => {
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === id ? {
                    ...order,
                    state: {
                        ...order.state,
                        dispatched: isChecked,
                        pending: !isChecked
                    }
                } : order
            )
        );
    };

    const handleCompletedChange = (id, isChecked) => {
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === id ? { ...order, state: { ...order.state, completed: isChecked } } : order
            )
        );
    };

    return (
        <div className="order-summary-container">
            <h2>Order Summary</h2>
            <div className="order-filters">
                <label>
                    <input
                        type="checkbox"
                        checked={filterType === 'pending'}
                        onChange={() => toggleOrderFilter('pending')}
                    />
                    Pending
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={filterType === 'dispatched'}
                        onChange={() => toggleOrderFilter('dispatched')}
                    />
                    Dispatched
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={filterType === 'completed'}
                        onChange={() => toggleOrderFilter('completed')}
                    />
                    Completed
                </label>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Products</th>
                        <th>Dispatched</th>
                        <th>Completed</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.filter(order => order.state[filterType]).map(order => (
                        <tr key={order.id}>
                            <td>{order.username}</td>
                            <td>{order.products}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={order.state.dispatched}
                                    disabled={order.state.completed}
                                    onChange={e => handleDispatchedChange(order.id, e.target.checked)}
                                />
                            </td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={order.state.completed}
                                    disabled={order.state.completed}
                                    onChange={e => handleCompletedChange(order.id, e.target.checked)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderSummaryProfile;
