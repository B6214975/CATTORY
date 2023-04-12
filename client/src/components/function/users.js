import axios from 'axios'

export const listUser = async(authtoken) =>
await axios.get(process.env.REACT_APP_API+'/users',
    {
    headers:{
        authtoken,
    }
});

export const changeRole = async(authtoken,value) =>
await axios.post(process.env.REACT_APP_API+'/change-role',value,
    {
    headers:{
        authtoken,
    }
});

export const changeStatus = async(authtoken,value) =>
await axios.post(process.env.REACT_APP_API+'/change-status',value,
    {
    headers:{
        authtoken,
    }
});


export const removeUser = async(authtoken,id) =>
await axios.delete(process.env.REACT_APP_API+'/users/'+id,
    {
    headers:{
        authtoken,
    }
});

export const listUserBy = async(authtoken , id) =>
await axios.get(process.env.REACT_APP_API+'/users/'+id,
    {
    headers:{
        authtoken,
    }
});


export const userCart = async(authtoken,cart) =>
await axios.post(process.env.REACT_APP_API+'/user/cart',{cart},
    {
    headers:{
        authtoken,
    }
});

export const getUserCart = async(authtoken) =>
await axios.get(process.env.REACT_APP_API+'/user/cart',
    {
    headers:{
        authtoken,
    }
});


// saveOrder // ไม่ส่งค่าเพราะใช้ข้อมูลใน cart
export const saveOrder = async(authtoken,image) =>
await axios.post(process.env.REACT_APP_API+'/user/order',image, 
    {
    headers:{
        authtoken,
    }
});

export const emotyCart = async(authtoken) =>
await axios.delete(process.env.REACT_APP_API+'/user/cart',
    {
    headers:{
        authtoken,
    }
});

export const getOrders = async(authtoken) =>
await axios.get(process.env.REACT_APP_API+'/user/orders',
    {
    headers:{
        authtoken,
    }
});


export const updateUser = async(authtoken,id,value) =>
await axios.put(process.env.REACT_APP_API+'/users/updateuser/'+id,value,
    {
    headers:{
        authtoken,
    }
});


export const resetPassword = async(authtoken,id,password) =>
await axios.put(process.env.REACT_APP_API+'/users/resetpassword/'+id,password,
    {
    headers:{
        authtoken,
    }
});


export const sendSMS = async(username)=>
await axios.get(process.env.REACT_APP_API+'/sendsms/'+username.username)

export const forgetPassword = async(id,newpassword) =>
await axios.put(process.env.REACT_APP_API+'/users/forgetpassword/'+id,newpassword);

// export const resetPassword = async(authtoken,id,value) =>
// await axios.put(process.env.REACT_APP_API+'/users/'+id,value,
//     {
//     headers:{
//         authtoken,
//     }
// });






// // save Address
// export const saveAdress = async(authtoken,address) =>
// await axios.post(process.env.REACT_APP_API+'/user/address',{address},
//     {
//     headers:{
//         authtoken,
//     }
// });



// // WistList
// export const getWishList = async(authtoken) =>
// await axios.get(process.env.REACT_APP_API+'/user/wishlist',
//     {
//     headers:{
//         authtoken,
//     }
// });
// export const addToWishList = async(authtoken,productId) =>
// await axios.post(process.env.REACT_APP_API+'/user/wishlist',{productId},
//     {
//     headers:{
//         authtoken,
//     }
// });
// export const removeWishList = async(authtoken,productId) => 
// await axios.put(process.env.REACT_APP_API+'/user/wishlist/'+productId,{},
// {
//     headers:{
//         authtoken,
//     }
// });