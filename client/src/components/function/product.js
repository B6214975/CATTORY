import axios from 'axios'

export const createProduct = async(authtoken,value) =>
     await axios.post(process.env.REACT_APP_API+'/product',value,
    {
    headers:{
        authtoken,
    }
});

export const listProduct = async(count) =>
     await axios.get(process.env.REACT_APP_API+'/product/'+count);

export const listAllProduct = async() =>
     await axios.get(process.env.REACT_APP_API+'/product');

export const listAllProductforAdmin = async(date) =>
await axios.get(process.env.REACT_APP_API+'/admin/product/'+date);

export const removeProduct = async(authtoken,id)=> 
    await axios.delete(process.env.REACT_APP_API+'/product/'+id,
    {
        headers:{
            authtoken
        }
    })

export const updateProduct = async(authtoken,id,product)=>
    await axios.put(process.env.REACT_APP_API+'/product/'+id,product,
    {
        headers:{
            authtoken
        }
    })




export const readProduct = async(id) =>
    await axios.get(process.env.REACT_APP_API+'/products/title/'+id);



//     export const listProductBy = async(sort,order,limit) =>
//     await axios.post(process.env.REACT_APP_API+'/productby',{
//         sort,
//         order,
//         limit
//     });

    export const searchFilter = async(value)=>
    await axios.post(process.env.REACT_APP_API+'/search/filters',value)