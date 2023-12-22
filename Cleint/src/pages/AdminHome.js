import React, { useEffect, useState } from 'react';
import SideNav from '../components/SideNav';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import { Route, Routes,Link, Outlet } from 'react-router-dom';
import HomeloansList from './HomeloansList';
import PersonalLoansList from './PersonalLoansList';
import {List,ListItem,ListItemButton,ListItemIcon,ListItemText,Avatar} from '@mui/material';
import {FaHome} from "react-icons/fa";
import {LiaBusinessTimeSolid} from "react-icons/lia";
import {BsPersonBadge} from "react-icons/bs";
import {IoBusinessOutline} from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { LuMailQuestion } from "react-icons/lu";
import { toast } from 'react-toastify';


const AdminHome = (props) => {
    console.log(props);
    const{name,setName}=props;
    const navigate=useNavigate();
    
    useEffect(()=>{
       ( 
            async()=>{
                try{
                    const response=await fetch("/user/",{
                        method:"GET",
                        headers:{"Content-Type":"application/json"},
                        credentials: 'include',
                        
                        })
                    const data= await response.json();
                    setName(data.first_name);
                    if(response.status===200){
                    sessionStorage.setItem('access',data.first_name);                   
                    }else if(response.status===401){
                        alert('Cookie is Expired,Please re-Login...');
                        sessionStorage.removeItem("access");                        
                        window.location.href="/";
                    }    
                }catch(error){
                    toast('token expired');
                }
            }    

            
       )(); 

    })
    

    const cardStyle={
        color: "red",
        backgroundColor: "white",
        width: 300,
        height: 150,
        marginLeft: 120,
        textAlign:"center"
    }
    
    // Inactivity User
    const checkForInactive=()=>{
        const expireTime=localStorage.getItem("expireTime");
        if(expireTime< Date.now()){
            alert('Session Expired');
            sessionStorage.removeItem("access");
            window.location.href="/";
        }
    }

    const upadateExpireTime=()=>{
      
        const expireTime=Date.now()+150000;
        
        localStorage.setItem("expireTime",expireTime);
    }

    // set user expire time on user Inactivity
    useEffect(()=>{
        // Set first expire time
        upadateExpireTime();

        // set event listners
        window.addEventListener("click",upadateExpireTime);
        window.addEventListener("keypress",upadateExpireTime);
        window.addEventListener("scroll",upadateExpireTime);
        window.addEventListener("mousemove",upadateExpireTime);

        return()=>{
            window.removeEventListener("click",upadateExpireTime);
            window.removeEventListener("keypress",upadateExpireTime);
            window.removeEventListener("scroll",upadateExpireTime);
            window.removeEventListener("mousemove",upadateExpireTime);
        }
    },[]);

    // useEffect to set time interval
    useEffect(()=>{

        //check inactivity for every 5 sec
        const interval=setInterval(()=>{
            checkForInactive();
        },100000);
        
        //clear interval on unmount 
        return()=>clearInterval(interval);
    },[]);



    return (
        <Stack mt={{xs:15,lg:20}} direction={{xs:'column',lg:'row'}} >
            

            <Stack >
              <List className='side-bar-options'>
              
                <ListItem disablePadding sx={{ display: 'block' }} >
                    <ListItemButton LinkComponent={Link} to="/adminhome/homeloans"
                        sx={{
                    minHeight: 18,
                    justifyContent: 'center',
                    px: 0.5,
                        }}
                    >
                    <Avatar
                    sx={{
                        minWidth: 0,
                        mr: 'auto',
                        justifyContent: 'center',
                    }}
                    >
                     <FaHome style={{backgroundColor:'blue',fontSize:40}}/>
                    </Avatar>
                    <ListItemText primary="Home Loans" style={{marginLeft:8}}  />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding sx={{ display: 'block' }}  >
                    <ListItemButton LinkComponent={Link} to="/adminhome/personalloans"
                        sx={{
                    minHeight: 18,
                    justifyContent: 'center',
                    px: 0.5,
                        }}
                    >
                    <Avatar
                    sx={{
                        minWidth: 0,
                        mr: 'auto',
                        justifyContent: 'center',
                    }}
                    >
                     <BsPersonBadge style={{backgroundColor:'blue',fontSize:35}}/>
                    </Avatar>
                <ListItemText primary="Personal Loans" style={{marginLeft:8}}  />
                </ListItemButton>
                </ListItem>
           
                <ListItem disablePadding sx={{ display: 'block' }}  >
                    <ListItemButton LinkComponent={Link} to="/adminhome/businessloans"
                        sx={{
                    minHeight: 18,
                    justifyContent: 'center',
                    px: 0.5,
                        }}
                    >
                    <Avatar
                    sx={{
                        minWidth: 0,
                        mr:'auto',
                        justifyContent: 'center',
                    }}
                    >
                     <LiaBusinessTimeSolid style={{backgroundColor:'blue',fontSize:35}}/>
                    </Avatar>
                    <ListItemText primary="Business Loans" style={{marginLeft:8}}  />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding sx={{ display: 'block' }} >
                    <ListItemButton LinkComponent={Link} to="/adminhome/propertyloans"
                        sx={{
                    minHeight: 18,
                    justifyContent:'center',
                    px: 0.5,
                        }}
                    >
                    <Avatar
                    sx={{
                        minWidth: 0,
                        mr:'auto',
                        justifyContent: 'center',
                    }}
                    >
                     <IoBusinessOutline style={{backgroundColor:'blue',fontSize:40}}/>
                    </Avatar>
                    <ListItemText primary="Loan Against Property" style={{marginLeft:8}}  />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding sx={{ display: 'block' }} >
                    <ListItemButton LinkComponent={Link} to="/adminhome/queries"
                        sx={{
                    minHeight: 18,
                    justifyContent:'center',
                    px: 0.5,
                        }}
                    >
                    <Avatar
                    sx={{
                        minWidth: 0,
                        mr:'auto',
                        justifyContent: 'center',
                    }}
                    >
                     <LuMailQuestion style={{backgroundColor:'blue',fontSize:31}}/>
                    </Avatar>
                    <ListItemText primary="Queries" style={{marginLeft:8}}  />
                    </ListItemButton>
                </ListItem>

              </List>
              
              
            </Stack>
            <Stack sx={{ml:{xs:2,lg:15}}}  mt={5}>
                
                <Outlet/>
            </Stack>

        </Stack>
    );
};

export default AdminHome;