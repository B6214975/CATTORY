import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LoadingToRedirect from './LoadingToRedirect'
import { currentAdmin } from '../function/auth'


const AdminRoute = ({children}) => {

    const {user} = useSelector((state)=>({...state}))
    const [ok,setOk] = useState(false)

    useEffect(()=>{
      
        if( user && user.token){
            currentAdmin(user.token).then(
                res =>{
                             
                    setOk(true)
                }
            ).catch(
                err=>{
                    console.log(err)
                    setOk(false)
                }
            )
        }
    
    },[user])

  return ok ? children : <LoadingToRedirect/> 
  //chlidren 
}

export default AdminRoute