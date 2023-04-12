import axios from 'axios'


export const createAmount = async(authtoken,value) =>
     await axios.post(process.env.REACT_APP_API+'/amount',value,
    {
    headers:{
        authtoken,
    }
});
export const listAmount = async(authtoken) =>
    await axios.get(process.env.REACT_APP_API+'/amount',
    {
    headers:{
        authtoken,
    }
});

export const deleteAmount = async(authtoken,id) =>
    await axios.delete(process.env.REACT_APP_API+'/amount/'+id,
    {
    headers:{
        authtoken,
    }
});

// Period

export const editPeriod = async(authtoken,id,value) => 
    await axios.put(process.env.REACT_APP_API+'/period/'+id,value,
    {
    headers:{
        authtoken,
    }
});

export const listPeriod  = async(authtoken) =>
    await axios.get(process.env.REACT_APP_API+'/period',
    {
    headers:{
        authtoken,
    }
});


// Price

export const editPrice = async(authtoken,id,value) => 
    await axios.put(process.env.REACT_APP_API+'/price/'+id,value,
    {
    headers:{
        authtoken,
    }
});

export const listPrice  = async(authtoken) =>
    await axios.get(process.env.REACT_APP_API+'/price',
    {
    headers:{
        authtoken,
    }
});

