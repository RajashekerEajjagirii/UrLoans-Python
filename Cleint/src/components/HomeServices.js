import React from 'react';
import { Box,Stack,Typography } from '@mui/material';

import ServiceCard from './ServiceCard';

const data=[
    {
        id:1,
        name:'Apply For Home Loans',
        msg:'we provinding best services in home loans with 90% success',
        btnmsg:'Apply Now',
        link:'/homeloans'

    },{
        id:2,
        name:'Check out for Personal Loans',
        msg:'we provinding best services in Personal Loans with 90% success',
        link:'/personalloans',
        btnmsg:'Apply Now'
    },{
        id:3,
        name:'Check Out for Business Loan',
        msg:'we provinding best services in Business Loan with 100% success',
        link:'/businessloans',
        btnmsg:'Apply Now'
    },
    {
        id:4,
        name:'Check Out for Property Loans',
        msg:'we provinding best services in LAP with 100% success',
        link:'/propertyloans',
        btnmsg:'Apply Now'
    }
];

const HomeServices = () => {
    return (
        <Box sx={{mt:{lg:'130px', xs:'90px'},ml:{xs:'50px'}}}>
            <Typography fontWeight={700} fontSize='19px' mb={4}>
                Check out the our Effective Services
            </Typography>
            {/* direction='row' sx={{gap:{lg:'30px',xs:'30px'},mt:{lg:'50px',xs:'30px'}}} */}
            <Stack  direction={{xs:'column',lg:'row'}} gap={5} >
                {data.map((service)=>(
                    <ServiceCard key={service.id} service={service} />
                ))}
            </Stack>
        </Box>
    );
};

export default HomeServices;