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
                    <Typography sx={{mt:{lg:'30px',xs:'20px'},ml:{lg:'30px',xs:'20px'}}}
                       fontWeight={600} fontSize='20px'>
                       {name}
                    </Typography>
                    <Typography sx={{ml:{lg:'30px',xs:'20px'},mt:{lg:'-100px',xs:'-60px'}}}>
                            {msg}
                    </Typography>
                    <Button sx={{borderRadius:'50px',mb:'20px',fontWeight:'900'}}
                        fontWeight='600px' variant='contained' color='primary'>
                            {btnmsg}
                    </Button>
            </NavLink>
        </Box>
    );
};

export default ServiceCard;