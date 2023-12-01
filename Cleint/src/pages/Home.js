import React from 'react';
import { Box } from '@mui/material';
import HomeBanner from '../components/HomeBanner';
import HomeServices from '../components/HomeServices';

const Home = () => {
    return (
        <Box>
            <HomeBanner/>
            <HomeServices/>
        </Box>
    );
};

export default Home;