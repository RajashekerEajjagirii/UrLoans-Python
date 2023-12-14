import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';

const About = () => {
    return (
        <Card sx={{maxWidth:{lg:575,xs:400}, background:'#e6e8eb',ml:{lg:45,xs:3},mt:{lg:20,xs:15},mb:{lg:25,xs:27}}}>
            <CardMedia>

            </CardMedia>
            <CardContent>
                <Typography sx={{opacity:0.2,fontSize:30,fontWeight:600}}>URLoans</Typography>
                <Typography>UrLoans is a platform to provide loans in easy manner as well as in short time</Typography>
                <Typography>It's Working</Typography>
            </CardContent>
        </Card>
    );
};

export default About;