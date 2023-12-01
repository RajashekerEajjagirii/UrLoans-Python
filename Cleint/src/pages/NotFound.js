import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';

const NotFound = () => {
    return (
        <Card sx={{maxWidth:{lg:567},ml:{lg:45},mt:{lg:10}}}>
            <CardContent sx={{ml:{lg:20}}}>
                <Typography fontWeight={900} fontSize={20} color='error'>Page Not Found</Typography>
                <Typography color='error'>Your trying to access Wrong Page</Typography>
            </CardContent>

        </Card>
    );
};

export default NotFound;