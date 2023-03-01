import React from 'react';
import { Navigate,Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  let user = localStorage.getItem("user")
  let auth = {'token':false}
  if(user){
    auth.token=true;
  }
return (
    auth.token ? <Outlet/> : <Navigate to='/register'/>
  )
}

  export default ProtectedRoutes;