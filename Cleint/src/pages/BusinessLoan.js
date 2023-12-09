import React, { useState } from 'react';
import { Avatar, Box,Container,Grid,Paper,Typography,TextField,FormControlLabel,Checkbox,Button, Stack } from '@mui/material';
import UrLoansImg from "../assets/images/UrLoansImg.png";
import {LiaBusinessTimeSolid} from "react-icons/lia";
import {FaArrowRightLong} from 'react-icons/fa6';
import {useForm} from "react-hook-form";
import {Flip, toast,ToastContainer, Zoom} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const BusinessLoan = () => {

    const[businessData,setBusinessData]=useState();

    const{ register, handleSubmit,formState:{errors},reset}= useForm();

    const PaperStyle={
        padding:'50px 20px',
        margin:'30px auto',
        width:500,
        height:800
    };

    const onSubmit=async(data)=>{
        // console.log(data);
        setBusinessData(data);

            //Adding BusinessLoans customers list
            try{
                const response=await fetch("/businessloans/",{
                        method:"POST",
                        headers:{"Content-Type":"application/json"},
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
                                success:"Your Eligible for Loan, Our Support team will contact you... Thank you",
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
            <Stack mb={{ xs: "20px" }}>
            <Typography fontWeight='900' fontSize='16px' color='#42adf5' mb='20px'>
                URLOANS Club
            </Typography>
            <Typography fontWeight={600} mt={15} fontSize={16} fontFamily='cursive'>
                We understand that time is of the essence when it comes to securing business loans. 
                That's why we prioritize lightning-fast processing, ensuring that you receive the funds you need in a timely manner. 
                By minimizing the documentation required, we aim to simplify the loan application process, allowing you to focus on what matters most: growing your business.
            </Typography>
            </Stack>

            <Stack ml={{lg:"50px" }}>
                <Container>
                    <Paper elevation={10} style={PaperStyle}>
                        <Grid align='center' mb={7}>
                            <Avatar style={{backgroundColor:'blue'}}> <LiaBusinessTimeSolid fontSize={30}/> </Avatar>
                            <h4 style={{marginTop:'15px'}}>Business Loans</h4>
                        </Grid>

                        <Grid mb={2}>
                                <h6>Check Your Business Loan Eligibility</h6>
                        </Grid>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField margin='normal' label="Full Name" variant="outlined" size='small' fullWidth 
                                {...register("fullName",{required:"Full Name is required"})}
                            />
                            <label className='error'>{errors.fullName?.message}</label>

                            <TextField margin='normal' type='email' label="Email" variant="outlined" size='small' fullWidth 
                            {...register("email",{required:"Email is Required",
                            pattern:{
                                value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message:'This is not a valid Email'
                            }})}  
                            />
                            <label className='error'>{errors.email?.message}</label>

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
                            <label className='error'>{errors.mobileNum?.message}</label>

                            <TextField margin='normal' label="City" variant="outlined" size='small' fullWidth 
                            {...register("city",{required:'City is required!'})} 
                            />
                            <label className='error'>{errors.city?.message}</label>

                            
                            <TextField margin='normal' label="Required Loan Amount" variant="outlined" size='small' fullWidth 
                                {...register("loanAmount",{required:'Loan Amount is required!'})}
                            />
                            <p className='error'>{errors.loanAmount?.message}</p>

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
            </Stack>

        </Stack>
    );
};

export default BusinessLoan;