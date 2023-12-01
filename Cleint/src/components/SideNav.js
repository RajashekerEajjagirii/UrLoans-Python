import { Avatar, Box, Divider, Drawer, Paper, Stack } from '@mui/material';
import {List,ListItem,ListItemButton,ListItemIcon,ListItemText} from '@mui/material';
import React,{useState} from 'react';
import {FaHome} from "react-icons/fa";
import {LiaBusinessTimeSolid} from "react-icons/lia";
import {BsPersonBadge} from "react-icons/bs";
import {IoBusinessOutline} from "react-icons/io5";
import HomeloansList from '../pages/HomeloansList';
import PersonalLoansList from '../pages/PersonalLoansList';
import BusinessLoansList from '../pages/BusinessLoansList';
import LAPList from '../pages/LAPList';
import { useNavigate,Link } from 'react-router-dom';


const SideNav = () => {
    const [open, setOpen] =useState(false);
    const[menudata,setMenuData]=useState("");
    const navigate=useNavigate();
    return (
        <Stack sx={{marginTop:5}} direction={{xs:'column',lg:'row'}}>
            
             <Stack >
              <List className='side-bar-options'>
              
                <ListItem disablePadding sx={{ display: 'block' }} onClick={()=>setMenuData("Home Loans")}>
                    <ListItemButton 
                        sx={{
                    minHeight: 18,
                    justifyContent: open ? 'initial' : 'left',
                    px: 0.5,
                        }}
                    >
                    <Avatar
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                    }}
                    >
                     <FaHome style={{backgroundColor:'blue',fontSize:40}}/>
                    </Avatar>
                    <ListItemText primary="Home Loans" style={{marginLeft:8}}  />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding sx={{ display: 'block' }}  onClick={()=>setMenuData("Personal Loans")}>
                    <ListItemButton
                        sx={{
                    minHeight: 18,
                    justifyContent: open ? 'initial' : 'left',
                    px: 0.5,
                        }}
                    >
                    <Avatar
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                    }}
                    >
                     <BsPersonBadge style={{backgroundColor:'blue',fontSize:35}}/>
                    </Avatar>
                <ListItemText primary="Personal Loans" style={{marginLeft:8}}  />
                </ListItemButton>
                </ListItem>
           
                <ListItem disablePadding sx={{ display: 'block' }} onClick={()=>setMenuData("Business Loans")} >
                    <ListItemButton
                        sx={{
                    minHeight: 18,
                    justifyContent: open ? 'initial' : 'center',
                    px: 0.5,
                        }}
                    >
                    <Avatar
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                    }}
                    >
                     <LiaBusinessTimeSolid style={{backgroundColor:'blue',fontSize:35}}/>
                    </Avatar>
                    <ListItemText primary="Business Loans" style={{marginLeft:8}}  />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding sx={{ display: 'block' }} onClick={()=>setMenuData("Loan Against Property")}>
                    <ListItemButton
                        sx={{
                    minHeight: 18,
                    justifyContent: open ? 'initial' : 'center',
                    px: 0.5,
                        }}
                    >
                    <Avatar
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                    }}
                    >
                     <IoBusinessOutline style={{backgroundColor:'blue',fontSize:40}}/>
                    </Avatar>
                    <ListItemText primary="Loan Against Property" style={{marginLeft:8}}  />
                    </ListItemButton>
                </ListItem>

              </List>
              </Stack>
        
           <Stack justifyContent='' sx={{ display:"table",ml:10,mt:5 }} className='table-data'>
            
            {menudata==="Personal Loans" && <PersonalLoansList/>}
            {menudata==="Business Loans" && <BusinessLoansList/>}
            {menudata==="Loan Against Property" && <LAPList/>}


           </Stack>
        </Stack>
    );
};

export default SideNav;