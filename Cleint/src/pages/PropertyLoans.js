import React, { useState } from 'react';
import { Avatar, Box,Container,Grid,Paper,Typography,TextField,FormControlLabel,Checkbox,Button, Stack } from '@mui/material';
import UrLoansImg from "../assets/images/UrLoansImg.png";
import {IoBusinessOutline} from "react-icons/io5";
import {FaArrowRightLong} from 'react-icons/fa6';
import {useForm} from "react-hook-form";
import {Flip, toast,ToastContainer, Zoom} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const PropertyLoans = () => {


    const[propertyData,setPropertyData]=useState();

    const{ register, handleSubmit,formState:{errors},reset}= useForm();
        
        //validation tostify messages
        toast.warning(errors.fullName?.message);
        toast.warning(errors.email?.message);
        toast.warning(errors.mobileNum?.message);
        toast.warning(errors.city?.message);
        toast.warning(errors.loanAmount?.message);

    const PaperStyle={
        padding:'50px 20px',
        margin:'30px auto',
        width:500,
        height:700
    };

    const onSubmit=async(data)=>{
        console.log(data);
        setPropertyData(data);

        try{
            const response= await fetch("/propertyloans/",{
                    method:"POST",
                    headers:{"Content-Type":"Application/json"},
                    credentials:'include',
                    body:JSON.stringify(data)
            });
            if(response.status===201){
                toast.promise(
                    new Promise((resolve,reject)=>{
                        setTimeout(()=>{
                          resolve();  
                        },2000);
                    }),{
                        pending:"Loading...",
                        success:"Your Eligible for Loan, Our Support team will contact you..., Thank you",
                        error:'Error recieved'
                    }
                );
            }   

        }catch(error){
            toast.error("Internal Server issue,Try after some time..");
        }

        reset();
    };

    return (
        <Stack sx={{mt:{mt:'110px',xs:'90px',sm:'90px'}}} ml={5} direction={{lg:'row',xs:'column'}}>
            <Stack mb={{ xs: "50px" }}>
            <Typography fontWeight='900' fontSize='16px' color='#42adf5' mb='20px'>
                URLOANS Club
            </Typography>
            <Typography fontWeight={600} mt={15} fontSize={16} fontFamily='cursive'>
                    With Ur loans, you can leverage the value of your property to secure a loan and access funds for various purposes. 
                    Whether you need funds for business expansion, debt consolidation, education expenses, or 
                    any other financial requirement, LAP can be a viable option.
            </Typography>
            </Stack>

            <Stack ml={{lg:"50px" }}>
            <Container>
                <Paper elevation={10} style={PaperStyle}>
                    <Grid align='center' mb={7}>
                        <Avatar style={{backgroundColor:'blue'}}> <IoBusinessOutline fontSize={30}/> </Avatar>
                        <h4 style={{marginTop:'15px'}}>Loan Against Property Loans</h4>
                    </Grid>

                    <Grid mb={2}>
                            <h6>Check Loan Against Property Eligibility</h6>
                    </Grid>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField margin='normal' label="Full Name" variant="outlined" size='small' fullWidth 
                            {...register("fullName",{required:"Full Name is required"})}
                        />
                        {/* <p className='error'>{errors.fullName?.message}</p> */}
                           {/* {toast.warning(errors.fullName?.message)} */}
                        <TextField margin='normal' type='email' label="Email" variant="outlined" size='small' fullWidth 
                           {...register("email",{required:"Email is Required",
                           pattern:{
                               value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                               message:'This is not a valid Email'
                           }})}  
                        />
                        {/* <p className='error'>{errors.email?.message}</p> */}
                        {/* {toast.warning(errors.email?.message)} */}
                        <TextField margin='normal' label="Mobile Number" variant="outlined" size='small' fullWidth 
                            {...register("mobileNum",{required:'Mobile Number is required',
                            pattern:{
                                value:/^[0-9]+$/,
                                message:'Only Numbers allowed'
                                  },
                            minLength:{
                                   value:10,
                                   message:'Mobile Number should have 10 numbers'
                                    },
                            maxLength:{
                                value:10,
                                message:"Mobile Number should not exceed 10 numbers"
                            } 
                        })} 
                        />
                        {/* <p className='error'>{errors.mobileNum?.message}</p> */}
                         {/* {toast.warning(errors.mobileNum?.message)} */}
                        <TextField margin='normal' label="City" variant="outlined" size='small' fullWidth 
                          {...register("city",{required:'City is required!'})} 
                        />
                        {/* <p className='error'>{errors.city?.message}</p> */}
                        {/* {toast.warning(errors.city?.message)} */}
                        
                        <TextField margin='normal' label="Required Loan Amount" variant="outlined" size='small' fullWidth 
                            {...register("loanAmount",{required:'Loan Amount is required!'})}
                        />
                        {/* <p className='error'>{errors.loanAmount?.message}</p> */}
                         {/* {toast.warning(errors.loanAmount?.message)} */}
                        <FormControlLabel control={<Checkbox size='small' />} style={{color:'#a85432',marginBottom:'20px'}}
                            label="I here by accept terms & conditions."  />
                        <Button  type='submit' variant='contained' fullWidth
                           style={{textTransform:'capitalize'}}>
                            Check Eligibility  <FaArrowRightLong style={{marginLeft:'10px'}} /> 
                        </Button>
                    </form>
                </Paper>
            </Container>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Flip}
                
                />
            </Stack> 

        </Stack>
    );
};

export default PropertyLoans;