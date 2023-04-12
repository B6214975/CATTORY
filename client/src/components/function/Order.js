import axios from "axios";

  export const getOrdersAdmin = async(authtoken) =>
  await axios.get(process.env.REACT_APP_API+'/admin/orders',
      {
      headers:{
          authtoken,
      }
  });
  
  
  export const updateOrderStatus = async (authtoken, orderId, orderstatus) =>
  await axios.put(
    process.env.REACT_APP_API + "/admin/order-status",
    {
      orderId,
      orderstatus,
    },
    {
      headers: {
        authtoken,
      },
    }
  );
  export const createQRcode = async(total)=>
  await axios.post(process.env.REACT_APP_API+'/qrcode',total)