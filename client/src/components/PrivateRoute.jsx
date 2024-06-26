import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom'
const PrivateRoute = () => {

    const {currentUser}= useSelector((state) => state.user)
  return (
    <div>
    
    {
        currentUser ? <Outlet></Outlet> : <Navigate to={"/sign-in"}></Navigate>
    }
 
      </div>
  )
}

export default PrivateRoute