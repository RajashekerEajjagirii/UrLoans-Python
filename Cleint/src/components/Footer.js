import React from 'react';
import { Box,Stack,Typography } from '@mui/material';
// import Logo from '../assets/images/Logo-1.png';
import { NavLink,Link } from 'react-router-dom';
import {FaLinkedin,FaYoutube,FaTwitter,FaInstagram,FaGithub} from 'react-icons/fa'

const Footer = () => {
    return (
        <Box mt='50px' bgcolor='#c5d6ca'>
            <Stack gap='20px' alignItems='center' px='40px' pt='24px'>
                {/* <img src={''} alt='footer-logo' width='200px' height='40px' /> */}
                <Typography>
                    Made with ❤ by Rajasheker Eajjagiri
                </Typography>

                <Stack direction='row' gap='50px' >
                    <NavLink to='https://www.linkedin.com/in/rajasheker-eajjagiri-9386b0208' target='_blank'> 
                            <Typography sx={{":hover":{color:'blue',bgcolor:'#e8c8c5'},color:'black'}} fontSize='30px'><FaLinkedin /></Typography>
                    </NavLink>
                    <NavLink to='https://www.youtube.com/' target='_blank'><Typography sx={{":hover":{color:'red',bgcolor:'#e8c8c5'},color:'black'}} fontSize='30px'> <FaYoutube /> </Typography> </NavLink>
                    <Link to='https://twitter.com/home' target='_blank'><Typography sx={{":hover":{color:'blue',bgcolor:'#e8c8c5'},color:'black'}} fontSize='30px'><FaTwitter /></Typography> </Link>
                    <Link to='https://instagram.com/rajasheker_eajjagiri?igshid=MzNlNGNkZWQ4Mg==' target='_blank'>
                            <Typography sx={{":hover":{color:'#f54242',bgcolor:'#e8c8c5'},color:'black'}} fontSize='30px'><FaInstagram /></Typography> 
                    </Link>
                    <NavLink to='https://github.com/RajashekerEajjagirii' target='_blank'>
                        <Typography sx={{":hover":{color:'#ff2625',bgcolor:'#e8c8c5'},color:'black'}} fontSize='30px'> <FaGithub /> </Typography> 
                    </NavLink>
                </Stack>
            </Stack>
            <Typography sx={{textAlign:'right',fontWeight:'bold', mb:'5px',mr:'30px'}}>
            &copy; Coding with Raja, 2023
            </Typography>
            
        </Box>
    );
};

export default Footer;