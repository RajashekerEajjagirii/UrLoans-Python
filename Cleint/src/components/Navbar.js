import React from 'react';
import { Avatar, Stack, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/icons/UrLoansLogo.png';
import { useAuthen } from '../utils/useAuthen';

const Navbar = () => {

    let admin=sessionStorage.getItem("dt");
    const{adminInfo,logout}=useAuthen();
    console.log(adminInfo);
    const navlinkStyles=({isActive})=>{
        return{
            textDecoration:isActive ? 'none':'none',
            fontWeight:isActive ? 'bold':'normal',
            color:isActive ? '3A1212':'',
            borderBottom:isActive ? '3px solid #FF2625':''
            
        }
    };

    return (
        <Stack direction='row' justifyContent='space-around'
            sx={{gap:{sm:'122px',xs:'44px'},mt:{sm:'30px',xs:'20px'},justifyContent:'none'}} px='20px'>
            <NavLink to='/' style={{textDecoration:'none'}} >
                <img src={Logo} alt='UrLoans-Logo'
                style={{width:'58px',height:'58px',margin:'0px 20px'}} />
                <Typography fontWeight={900} fontSize='13px' 
                    sx={{opacity:0.5,display:{lg:'block',sm:'block'},margin:'0px 14px',color:'#42adf5'}}>
                    URLOANS
                </Typography>
            </NavLink>
            <Stack direction='row' gap='50px' fontSize='20px' alignItems='flex-end' >
                {admin ? "":
                <NavLink to='/' style={navlinkStyles}>
                    Home
                </NavLink> }
                {admin ? "":
                <NavLink to='/about' style={navlinkStyles}>
                    About
                </NavLink> }
               {admin? '': <NavLink to='/contact' style={navlinkStyles}>
                    Contact
                </NavLink> }
                {admin ? <NavLink to="/"  style={navlinkStyles} onClick={logout}> <Stack alignItems='flex-end' sx={{marginLeft:90}}>
                    <Avatar style={{backgroundColor:'blue'}}></Avatar> <Typography>Logout</Typography> </Stack> </NavLink> :
                <NavLink to='/login' style={navlinkStyles}>
                 Login
                </NavLink> }
            </Stack>
        </Stack>
    );
};

export default Navbar;