import React, { useContext, useState } from "react";

const AuthContext=React.createContext();

export const AuthProvider=({children})=>{

    const[adminInfo,setAdminInfo]=useState(null);

    const login=(data)=>{
        setAdminInfo(data);
        sessionStorage.setItem("adminInfo",data);
    }

    const logout=()=>{
        setAdminInfo(null);
        sessionStorage.clear();
    }

    return <>
        <AuthContext.Provider value={{adminInfo,login,logout}}>
            {children}
        </AuthContext.Provider>
    </>
};

//creating custom hook to make using of AuthContext
export const useAuthen=()=>{
    return useContext(AuthContext);
}