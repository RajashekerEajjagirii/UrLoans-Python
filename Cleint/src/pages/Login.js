import React,{useState } from 'react';
import { Avatar, Box,Button,Checkbox,Container,FormControlLabel,Grid,Typography,Card,CardContent } from '@mui/material';
import {TextField,Paper} from '@mui/material';
import {BsPersonLock} from 'react-icons/bs';
import {useForm} from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import {toast,ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



const Login = () => {
    const navigate=useNavigate();
    const[isError,setError]=useState({status:false,msg:''});
    
    const {register,handleSubmit,formState:{errors},reset}=useForm();
    const PaperStyle={
            padding:'50px 20px',
            width:350,
            margin:'20px auto',
            height:500
    };

    const OnSubmit=async(data)=>{
        
        
        console.log(data);
             var statusCode;
            try{
                const response=await fetch("/login/",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                credentials: 'include',
                body:JSON.stringify(data)
                })
                 console.log(response);
                 statusCode= response.status;

                const dt =await response.json();
                
                if(statusCode===401){
                    toast.error('Please Verify your Account  with URLoans..!');
                }else if(statusCode===404){
                    // setError({status:true,msg:'Email or Password is Invalid'});
                    toast.error('Email or Password is Invalid');
                }else{
                  navigate('/adminhome',{replace:true});
                }
                //replace is prevent to not go to back 
            }catch(error){
            
                if(statusCode===404){
                    // setError({status:true,msg:'Email or Password is Invalid'});
                    toast.error('Email or Password is Invalid');
                }else{
                    // setError({status:true,msg:'Network Issue,Try again later..!'});
                    toast.error('Network Issue,Try again later..!');

                }
            }
        reset();
    
    };


    const cardStyle={
        color: "red",
        backgroundColor: "white",
        width: 300,
        height: 50,
        marginLeft: 120,
        textAlign:"center"
    }


    return (<>
        <Box sx={{mt:{lg:'130px', xs:'90px'},ml:{xs:'20px'}}}>
            <Typography fontWeight='900' fontSize='16px' color='#42adf5' mb='20px'>
                URLOANS Club
            </Typography>
            {/* <img src={HomeImg} alt='Home-image' className='home-banner-image'/> */}

            {isError.status===true? (<Card sx={{color:'red',backgroundColor:"white",width:300,height:50,marginLeft:'120px',textAlign:'center'}} 
              align="center" ><CardContent>{isError.msg}</CardContent>
                </Card>):("")}
            {/* <pre> {JSON.stringify(adminInfo,undefined,2)}</pre> */}
            
            <Container>
                <Paper elevation={10} style={PaperStyle}>
                    <Grid align='center' mb={7}>
                        <Avatar style={{backgroundColor:'#1bbd7e',mb:'50px'}}> <BsPersonLock/> </Avatar>
                        <h2 style={{marginTop:'10px'}}>Sign in</h2>
                    </Grid>
                    <form onSubmit={handleSubmit(OnSubmit)} >
                        <TextField margin='normal'   type='email' label="Email" variant="filled"  fullWidth 
                        {...register("email",{required:"Email is Required",
                        pattern:{
                            value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message:'This is not a valid Email'
                        }})} 
                        />
                        <p className='error'>{errors.email?.message}</p>
                        <TextField margin='normal'  type='password'  label="Password" variant="filled" fullWidth 
                        {...register("password",{required:"Password is Required"})} />
                        <p className='error'>{errors.password?.message}</p>
                        <FormControlLabel 
                            control={
                            <Checkbox name='checkdb' color='primary' />

                            // </Checkbox>
                            } label='Remember Me'
                        />
                        <Button style={{marginTop:'10px'}} type='Submit' variant='contained' color='primary' fullWidth>Login</Button>
                    </form>
                    
                </Paper>    
            </Container>
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
                />
                
        </Box>
        {/* <ToastContainer/> */}
        </>
    );
};

export default Login;