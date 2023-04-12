import React from 'react'
import { useSelector } from 'react-redux'
import UserCheck from './UserCheck'

const UserRoute = ({children}) => {
  

    const {user} = useSelector((state)=>({...state}))


  return user && user.token 
  ? children
  : <UserCheck/> 
}

export default UserRoute