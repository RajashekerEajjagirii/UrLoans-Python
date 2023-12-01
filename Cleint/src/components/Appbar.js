import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {Typography,Stack} from '@mui/material';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/icons/UrLoansLogo.png';
import { useAuthen } from '../utils/useAuthen';

import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import { brown } from '@mui/material/colors';


const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Appbar(props) {
    const{name,setName}=props;
  
    // let admin=sessionStorage.getItem("dt");
    // const{adminInfo,logout}=useAuthen();
    // console.log(adminInfo);
    const navlinkStyles=({isActive})=>{
        return{
            textDecoration:isActive ? 'none':'none',
            fontWeight:isActive ? 'bold':'normal',
            color:isActive ? 'White':'',
            borderBottom:isActive ? '3px solid #ff2625':''
            
        }
    };

    const logout=async()=>{
        await fetch("/logout/",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            credentials: 'include',
            
        })

        sessionStorage.removeItem('access'); 
        setName('');
          
    }

  return (
    <AppBar position="static" >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Stack direction='row' justifyContent='space-around'
            sx={{gap:{sm:'100px',xs:'10px'},mt:{sm:'40px',xs:'30px'},justifyContent:'none'}} px='0px'>
            <NavLink to='/' style={{textDecoration:'none'}} >
                <img src={Logo} alt='UrLoans-Logo'
                style={{width:'58px',height:'58px',margin:'0px 20px'}} />
                <Typography fontWeight={900} fontSize='13px' 
                    sx={{opacity:0.9,display:{lg:'block',sm:'block'},margin:'0px 14px',color:'white'}}>
                    URLOANS
                </Typography>
            </NavLink>
            {name? '':
            <Stack direction='row'  fontSize='20px' alignItems='flex-end' mb={2} sx={{marginLeft:{xs:'20px',lg:'50px'},gap:{xs:"20px",lg:"80px"}}} >
               
                <NavLink to='/' style={navlinkStyles}>
                    Home
                </NavLink> 
                
                <NavLink to='/about' style={navlinkStyles}>
                    About
                </NavLink> 
                
               <NavLink to='/contact' style={navlinkStyles}>
                    Contact
                </NavLink> 
    
            </Stack>
            }
            <Stack alignItems='flex-end' sx={{marginLeft:{xs:'20px',lg:'530px'}}} mt={5} fontSize='20px'>
                {name?
                <NavLink to="/" style={navlinkStyles} onClick={logout}> 
                <Stack sx={{marginLeft:{xs:'20px',lg:'290px'},gap:'25px',marginTop:'-20px'}} direction='row'>
                    <Typography>Welecome, {name}</Typography>
                    <Avatar sx={{ width: 76, height: 30,bgcolor:'brown' }}> <Typography>Logout</Typography> </Avatar>
                </Stack> 
                </NavLink> : 
                <NavLink to='/login' style={navlinkStyles}>
                 SignIn
                </NavLink> }
            </Stack>
        </Stack>

          
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Appbar;
