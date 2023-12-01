import {useState,useEffect} from "react";

export const Get_Options={
    method:"GET",
    headers:{"Content-Type":"application/json"},
    // body:JSON.stringify(`${data}`)
}

export const Post_Options={
    method:"POST",
    headers:{"Content-Type":"application/json"},
    // body:JSON.stringify(`${data}`)
}



export const fetchData=async(url,options)=>{
    const response=await fetch(url,options); 
    
    const data= await response.json();
    return data;

};



function useFetch(URL){

    const[Data,setData]=useState([]);
    const[isLoading,setLoading]=useState(false);
    const[isError,setError]=useState({status:false,msg:''});

    useEffect(()=>{
        makeCallApi(URL);
    },[]);

    const makeCallApi=async()=>{
           setLoading(true);
           setError({status:false,msg:''});
        try{
            console.log(URL);
            const response=await fetch(URL);
            console.log(response);
            const data=await response.json();
            setData(data);
            setLoading(false);
            if(response.status===404){
                throw new Error('Data not found (404 Error)...');
            }
            // console.log(data);
        }catch(e){
            setError({status:true,msg:e.message});
            setLoading(false);
        }
    };
    // console.log(Data,isLoading,isError);
    return[Data,isLoading,isError];
};

export default useFetch;