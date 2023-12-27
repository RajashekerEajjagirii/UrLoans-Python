import React, { useEffect, useState } from 'react';
import { Avatar, Box,Container,Grid,Paper,TextField,InputAdornment,Checkbox,FormControlLabel, Button, MenuItem, Stack } from '@mui/material';
import {FaHome} from "react-icons/fa";
import {MdUpdate} from 'react-icons/md';
import {ImCancelCircle} from 'react-icons/im';
import {useForm} from "react-hook-form"
import {Flip, toast,ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams, useNavigate } from 'react-router-dom';


const occupationType=[
    {
        value:'Salaried',
        label:'Salaried'
    },
    {
        value:'Self Employed Professional',
        label:'Self Employed'
    },
    {
        value:'Partner',
        label:'Partner'
    },
    {
        value:'Proprietorship',
        label:'Proprietorship'
    },
    {
        value:'Partnership/LLP',
        label:'Partnership/LLP'
    },
    {
        value:'Private Limited',
        label:'Private Limited'
    }
];

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const EditHomeLoans = () => {

    const [homeLoanData,setHomeLoanData]=useState();
    const[user,setUser]=useState({});
    const {id}=useParams();
    const navigate=useNavigate();
      console.log(id);
    const PaperStyle={
            padding:'60px 20px',
            margin:'20px auto',
            width:500,
            height:1200
    };

    // useEffect(()=>{
    //   getUserData();
      
    // },[]);

    // const getUserData=async()=>{
    //   const response =await fetch("/homeloans/getUser/"+id,{
    //     method:"GET",
    //     headers:{"Content-Type":"application/json"},
    //     //body:JSON.stringify(data)
    // });
    //   const data= await response.json();
    //   setUser(data);
    //   console.log(response);
    //   // const[userData,isError,isLoading]= useFetch("http://localhost:8080/homeloans/getUser/"+id);
    // };

    // const[userData,isError,isLoading]= useFetch("http://localhost:8080/homeloans/getUser/"+id);
    // console.log(userData);
    // setUser(userData);
     //const defaultValues={fullName:'',email:'',mobileNum:'',city:''}
     const {register, handleSubmit, formState:{errors},reset}=useForm({
      defaultValues:async ()=>{
        const response=await fetch(`/homeloans/${id}/`,{
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
          mobileNum:data.mobileNum,
          city:data.city,
          occupationType:data.occupationType,
          loanAmount:data.loanAmount,
          monthlySalary:data.monthlySalary,
          monthlyEmi:data.monthlyEmi,
          tenure:data.tenure,
          dob:data.dob,
          address:data.address
        }
      }
     });
     console.log(user);
     const onSubmit=async(data)=>{
            console.log(data);
            
            // Update HomeLoans users data
            try{
                 const response=await fetch(`/homeloans/${id}/`,{
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
                  navigate("/adminhome/homeloans",3000);  

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
                  
                  <FaHome />
                </Avatar>
                <h2 style={{ marginTop: "15px" }}>Home Loans</h2>
              </Grid>
              <Grid mb={2}>
                <h4>Edit Your Customer Profile</h4>
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
                  select
                  label="Occupation Type"
                  variant="outlined"
                 // value={user.occupationType ??''}
                  size="small"
                  fullWidth
                  {...register("occupationType", {
                    required: "Occupation Type is required!",
                  })}
                >
                  {occupationType.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <label className="error">
                  {errors.occupationType?.message}
                </label>

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

                <TextField
                  margin="normal"
                  label="Monthly Net Salary"
                  variant="outlined"
                  //value={user.monthlySalary ??''}
                  size="small"
                  fullWidth
                  {...register("monthlySalary", {
                    required: "Montly Net Salary is required!",
                  })}
                />
                <label className="error">{errors.monthlySalary?.message}</label>

                <TextField
                  margin="normal"
                  label="Current Monthly EMIs"
                  variant="outlined"
                 // value={user.monthlyEmi??''}
                  size="small"
                  fullWidth
                  {...register("monthlyEmi", {
                    required: "Current Monthly EMIs is required!",
                  })}
                />
                <label className="error">{errors.monthlyEmi?.message}</label>

                <TextField
                  margin="normal"
                  label="Tenure(Years)"
                  variant="outlined"
                  //value={user.tenure??''}
                  size="small"
                  fullWidth
                  {...register("tenure", { required: "Tenure is required!" })}
                />
                <label className="error">{errors.tenure?.message}</label>

                <TextField
                  margin="normal"
                  type="date"
                  variant="outlined"
                 // value={user.dob??''}
                  size="small"
                  fullWidth
                  {...register("dob", {  })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">DOB</InputAdornment>
                    ),
                  }}
                />
                <label className="error">{errors.dob?.message}</label>

                <TextField
                  margin="normal"
                  label="Address"
                  variant="outlined"
                  //value={user.address??''}
                  fullWidth
                  {...register("address", { required: "Address is required" })}
                />
                {/* <p className='error'>{errors.address?.message}</p> */}

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

                <Button variant='contained' color='error' LinkComponent={Link} to='/adminhome/homeloans'>Cancel
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

export default EditHomeLoans;