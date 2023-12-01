import { Avatar, Button, Card, CardContent, Grid, Stack, TextField,Typography } from '@mui/material';
import React from 'react';
import {FaLocationDot} from "react-icons/fa6";
import {MdOutgoingMail} from "react-icons/md";
import {FiPhoneCall} from "react-icons/fi";
import { NavLink,Link } from 'react-router-dom';
import {FaLinkedin,FaYoutube,FaTwitter,FaInstagram,FaGithub} from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import {Flip, toast,ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {


    const {register, handleSubmit, formState:{errors},reset}=useForm();
    toast.warning(errors.name?.message);
    toast.warning(errors.email?.message);
    toast.warning(errors.query?.message);

    const onSubmit=async(data)=>{
        try{
            
            const response= await fetch("/queries/",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(data)
            });
            
            if(response.status===201){
                toast.promise(
                    new Promise((resolve,reject)=>{
                        setTimeout(()=>{
                          resolve();  
                        },1000);
                    }),{
                        pending:"Loading...",
                        success:"We are working on ur Query, Our team will contact you. Thank you!",
                        error:'Error recieved'
                    }
                );
            } 

        }catch(error){
            toast.error("Internal Server issue,Try after some time..!");
        } 
        
        reset();
        
    };

console.log(errors);
    return (
        <Grid>
            <Card sx={{maxWidth:{lg:925},minHeight:{lg:450},background:'#dcf5f4',ml:{lg:30},mt:5}}> 
                <Card sx={{maxWidth:{lg:295,xs:220},background:'#edd5c5',mt:5,ml:{lg:5,xs:1},minHeight:{lg:350,xs:100},mb:{lg:10,xs:15}}}>
                    <CardContent>
                        <h2>Contact Info</h2>
                        <Stack direction='row'>
                            <Avatar sx={{background:'green'}}>
                                <FaLocationDot/>
                            </Avatar>
                            <Typography ml={2} mt={1}>
                                Nagavara, Banglore <br/>500116
                            </Typography>                           
                        </Stack>
                        <Stack direction='row' mb={2}>
                            <Avatar sx={{bgcolor:'orange',fontSize:25}}><MdOutgoingMail/> </Avatar>
                            <Typography ml={1} mt={1}>Urloans@gmail.com</Typography>
                        </Stack>
                        <Stack direction='row'>
                            <Avatar sx={{bgcolor:'',}}><FiPhoneCall/> </Avatar>
                            <Typography ml={2} mt={1}>8008812777</Typography>
                        </Stack>
                        {/* social media adv start */}
                        <Stack direction='row' gap='10px' mt={10} ml={{lg:4,xs:0}}>
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
                        {/* SC End */}
                    </CardContent>
                </Card>              
                <CardContent sx={{ml:{lg:45,xs:28}, mt:{lg:-50,xs:-60}}}>
                    <Typography fontWeight={900}>
                        Contact Form
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField label="Name" type='text' margin="normal" size='small' 
                            {...register("name", {
                                required: "Name is required",
                                
                              })}
                        />

                        <TextField  label='Email' type='email' margin="normal"  size='small' sx={{ml:{lg:3,xs:0}}}
                             {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "This is not a valid Email",
                                  },
                                
                              })}
                        />
                        
                        <TextField label='your Queries' type='text' multiline rows={4} margin="normal" fullWidth
                            {...register("query", {
                                required: "your query is required",
                                
                              })}
                        />

                        <Button variant='contained' fullWidth type='submit'  >Send</Button>

                    </form>
                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                        transition={Flip}
                        
                    />
                </CardContent>
            </Card>
            
        </Grid>
    );
};

export default Contact;