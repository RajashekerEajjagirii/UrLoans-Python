import React from 'react';
import { Box,Typography,Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

const ServiceCard = ({service}) => {
    const {link,name,msg,btnmsg}=service;
    // console.log('from Service card');
    // console.log(service);
    return (
        <Box>
            <NavLink to={link} className='service-card' >
                    <Typography sx={{mt:{lg:'30px',xs:'20px'},ml:{lg:'30px',xs:'20px'},color:'black'}}
                       fontWeight={500} fontSize='20px'>
                       {name}
                    </Typography>
                    <Typography sx={{ml:{lg:'30px',xs:'20px'},mt:{lg:'10px',xs:'10px'},color:'black'}}>
                            {msg}
                    </Typography>
                    <Button sx={{borderRadius:'50px',mb:'20px',fontWeight:'700',width:'120px',ml:'70px',backgroundColor:'#b58d55'}}
                        variant='contained'>
                            {btnmsg}
                    </Button>
            </NavLink>
        </Box>
    );
};

export default ServiceCard;