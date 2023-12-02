import React from 'react';
import { Box } from '@mui/material';
import HomeBanner from '../components/HomeBanner';
import HomeServices from '../components/HomeServices';
import Partners from '../components/Partners';

const Home = () => {
    return (
        <Box>
            <HomeBanner/>
            <HomeServices/>
            <Partners/>
        </Box>
    );
};

export default Home;