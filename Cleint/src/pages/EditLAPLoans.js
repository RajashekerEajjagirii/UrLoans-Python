import React, { useEffect, useState } from 'react';
import { Avatar, Box,Container,Grid,Paper,TextField,InputAdornment,Checkbox,FormControlLabel, Button, MenuItem, Stack } from '@mui/material';
import {IoBusinessOutline} from "react-icons/io5";
import {MdUpdate} from 'react-icons/md';
import {ImCancelCircle} from 'react-icons/im';
import {useForm} from "react-hook-form"
import {Flip, toast,ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams, useNavigate } from 'react-router-dom';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const EditLAPLoans = () => {

    const [homeLoanData,setHomeLoanData]=useState();
    const[user,setUser]=useState({});
    const {id}=useParams();
    const navigate=useNavigate();
      console.log(id);
    const PaperStyle={
            padding:'60px 20px',
            margin:'20px auto',
            width:500,
            height:900
    };

    
     const {register, handleSubmit, formState:{errors},reset}=useForm({
      defaultValues:async ()=>{
        const response=await fetch(`https://ur-loans.vercel.app/api/propertyloans/${id}/`,{
          method:"GET",
          headers:{"Content-Type":"application/json"},
          credentials: 'include',
      });
        const data1= await response.json();
        const data=data1[0];
        console.log(data);
        return{
          fullName:data.fullName??'',
          email:data.email??'',
          mobileNum:data.mobileNum??'',
          city:data.city??'',        
          loanAmount:data.loanAmount??'',
          
        }
      }
     });
     console.log(user);
     const onSubmit=async(data)=>{
            console.log(data);
            
            // Update LAPLoans users data
            try{
                 const response=await fetch(`/propertyloans/${id}/`,{
                        method:"PUT",
                        headers:{"Content-Type":"application/json"},
                        credentials:'include',
                        body:JSON.stringify(data)
                    });
                    console.log(Response);
                    if(response.status===200){
                      toast.promise(
                          new Promise((resolve,reject)=>{
                              setTimeout(()=>{
                                resolve();  
                              },1000);
                          }),{
                              pending:"Loading...",
                              success:"Record  updated Successfully.",
                              error:'Error recieved'
                          }
                      );
                    } 
                  navigate("/adminhome/propertyloans",3000);  

            }catch(error){
              toast.error("Internal Server issue,Try after some time..");
            }
           reset(); 
           
      };
     console.log(errors);
    return (
      <Stack
        sx={{ mt: { lg: "50px", xs: "50px" }, ml: { xs: "5px" }, mb: "0px" }}
        direction={{ lg: "row", xs: "column" }}
      >
        
        <Stack  ml={{lg:"90px" }}>
          <Container>
            <Paper elevation={10} style={PaperStyle}>
              <Grid align="center" mb={7}>
                <Avatar style={{ backgroundColor: "blue" }}>
                  
                    <IoBusinessOutline  fontSize={40}/>
                </Avatar>
                <h4 style={{ marginTop: "15px" }}>Loan Against Property Loans</h4>
              </Grid>
              <Grid mb={2}>
                <h6>Edit Your Customer Profile</h6>
              </Grid>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  margin="normal"
                  label="Full Name"
                  variant="outlined"                  
                  size="small"
                  fullWidth
                  {...register("fullName", {
                    required: "Full Name is required",
                    
                  })}
                />
                <label className="error">{errors.fullName?.message}</label>

                <TextField
                  
                  margin="normal"
                  type="email"
                  label="Email"
                  variant="outlined"
                  //value={user.email ?? ''}
                  size="small"
                  fullWidth
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "This is not a valid Email",
                    },
                    
                  },{})}
                />
                <label className="error">{errors.email?.message}</label>

                <TextField
                  margin="normal"
                  label="Mobile Number"
                  variant="outlined"
                  //value={user.mobileNum ?? ''}
                  size="small"
                  fullWidth
                  {...register("mobileNum", {
                    required: "Mobile Number is required",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Only Numbers allowed",
                    },
                    minLength: {
                      value: 10,
                      message: "Mobile Number should have 10 numbers",
                    },
                    maxLength: {
                      value: 10,
                      message: "Mobile Number should not exceed 10 numbers",
                    },
                  })}
                />
                <label className="error">{errors.mobileNum?.message}</label>

                <TextField
                  margin="normal"
                  label="City"
                  variant="outlined"
                 // value={user.city ??''}
                  size="small"
                  fullWidth
                  {...register("city", { required: "City is required!" })}
                />
                <label className="error">{errors.city?.message}</label>

                <TextField
                  margin="normal"
                  label="Required Loan Amount"
                  variant="outlined"
                 // value={user.loanAmount ??''}
                  size="small"
                  fullWidth
                  {...register("loanAmount", {
                    required: "Loan Amount is required!",
                  })}
                />
                <label className="error">{errors.loanAmount?.message}</label>

                

                <FormControlLabel
                  control={<Checkbox size="small" value={"cheked"} />}
                  style={{ color: "#a85432", marginBottom: "20px" }}
                  label="I here by accept terms & conditions."
                />
                <Stack direction='row' gap={3}>
                <Button
                  type="submit"
                  variant="contained"
                  color='success'
                  
                >
                  Update
                  <MdUpdate style={{ marginLeft: "10px",fontSize:'25px' }} />
                </Button>

                <Button variant='contained' color='error' LinkComponent={Link} to='/adminhome/propertyloans'>Cancel
                    <ImCancelCircle style={{ marginLeft: "10px",fontSize:'20px' }}/>
                </Button>
                </Stack>
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

export default EditLAPLoans;