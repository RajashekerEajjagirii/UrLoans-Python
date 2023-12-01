import React from 'react';
import { Stack } from '@mui/material';
import {InfinitySpin} from 'react-loader-spinner';

const Loader = () => {
    return (
        <Stack>
            <InfinitySpin color='blue' />
        </Stack>
    );
};

export default Loader;