import React from 'react';
import { Avatar,Container,Grid,Paper,Typography,TextField,InputAdornment,Checkbox,FormControlLabel, Button, MenuItem, Stack } from '@mui/material';
import {FaHome} from "react-icons/fa";
import {FaArrowRightLong} from 'react-icons/fa6';
import {useForm} from "react-hook-form"
import {Flip, toast,ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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

const HomeLoan = () => {

    const {register, handleSubmit, formState:{errors}, reset}=useForm();


     const onSubmit=async(data)=>{
            // console.log(data);
            
            // Adding HomeLoans users data
            try{
                 const response=await fetch("/homeloans/",{
                        method:"POST",
                        headers:{"Content-Type":"application/json"},
                        credentials:'include',
                        body:JSON.stringify(data)
                    });
                    console.log(response);
                    if(response.status===201){
                      toast.promise(
                          new Promise((resolve,reject)=>{
                              setTimeout(()=>{
                                resolve();  
                              },2000);
                          }),{
                              pending:"Loading...",
                              success:"Your Eligible for Loan, Our Support team will contact you, Thank you",
                              error:'Error recieved'
                          }
                      );
                    } 

                    if(response.status===226){
                      toast.promise(
                          new Promise((resolve,reject)=>{
                              setTimeout(()=>{
                                reject();  
                              },1000);
                          }),{
                              pending:"Loading...",
                              success:"success msg recieved",
                              error:'Email is already exists'
                          }
                      );
                    } 

            }catch(error){
              toast.error("Internal Server issue,Try after some time..");
            }
           reset(); 
           
      };
     console.log(errors);
    return (
      <Stack
        sx={{ mt: { lg: "110px", xs: "90px" }, ml: { xs: "50px" }, mb: "0px" }}
        direction={{ lg: "row", xs: "column" }}
      >
        <Stack mb={{ xs: "40px" }} width={900}>
          <Typography
            fontWeight="900"
            fontSize="16px"
            color="#42adf5"
            mb="20px"
          >
            URLOANS Club
          </Typography>
          <Typography
            mt={15}
            fontWeight={600}
            fontSize={16}
            fontFamily="cursive"
          >
            "Achieve your goals faster with Ur Loan's innovative loan solutions.
            We bring together a network of top financial institutions,
            to offer you competitive rates and tailored loan packages.
            Let us be your partner on the journey to success,
            providing you with convenient repayment options and expert guidance
            every step of the way..."
          </Typography>
        </Stack>
        <Stack  width={900} >
          <Container>
            <Paper elevation={10}  className='paper-style'>
              <Grid align="center" mb={7}>
                <Avatar style={{ backgroundColor: "blue" }}>
                  {" "}
                  <FaHome />{" "}
                </Avatar>
                <h4 style={{ marginTop: "15px" }}>Home Loans</h4>
              </Grid>
              <Grid mb={2}>
                <h6>Check Your Home Loan Eligibility</h6>
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
                  size="small"
                  fullWidth
                  {...register("email", {
                    required: "Email is Required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "This is not a valid Email",
                    },
                  })}
                />
                <label className="error">{errors.email?.message}</label>

                <TextField
                  margin="normal"
                  label="Mobile Number"
                  variant="outlined"
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
                  size="small"
                  fullWidth
                  {...register("tenure", { required: "Tenure is required!" })}
                />
                <label className="error">{errors.tenure?.message}</label>

                <TextField
                  margin="normal"
                  type="date"
                  variant="outlined"
                  size="small"
                  fullWidth
                  {...register("dob", { required: "DOB is required!" })}
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
                  fullWidth
                  {...register("address", { required: "Address is required" })}
                />
                <label className="error">{errors.address?.message}</label>
                <br/>

                <FormControlLabel
                  control={<Checkbox size="small" value={"cheked"} />}
                  style={{ color: "#a85432", marginBottom: "20px" }}
                  label="I here by accept terms & conditions."
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  style={{ textTransform: "capitalize" }}
                >
                  Check Eligibility{" "}
                  <FaArrowRightLong style={{ marginLeft: "10px" }} />
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
                theme="colored"
                transition={Flip}
                
                />
        </Stack>
      </Stack>
    );
};

export default HomeLoan;