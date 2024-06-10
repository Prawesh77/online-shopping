// import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types'
const AdminRoute = ({children}) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isAdmin = useSelector((state) => state.user.isAdmin);


  if (!isLoggedIn || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};
AdminRoute.propTypes = {
    children: PropTypes.component
  };

export default AdminRoute;