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
                    }    
                }catch(error){
                    
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
    

    return (
        <Stack sx={{marginTop:5}} direction={{xs:'column',lg:'row'}} >
            

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
                {/* <Card style={cardStyle}>
                    <CardContent>
                       {name? <Box>
                        <Typography>Hi {name},</Typography><br/>
                         <Typography>Welcome to AdminHome Page</Typography>
                        </Box>
                        :'Your not logged In'}
                    </CardContent>
                </Card> */}
                <Outlet/>
            </Stack>

        </Stack>
    );
};

export default AdminHome;