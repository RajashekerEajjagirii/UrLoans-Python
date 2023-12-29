import React,{useEffect, useState,useRef} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Typography,Card,CardContent } from '@mui/material';
import useFetch from '../utils/useFetchData';
import Loader from '../components/Loader';
import {Pagination,Stack,Button} from '@mui/material';
import {useReactToPrint} from "react-to-print";
import {FiDownload} from "react-icons/fi";
import { Link } from 'react-router-dom';
import {Dialog,DialogActions,DialogTitle,DialogContent,DialogContentText,Slide} from '@mui/material';
import {Flip, toast,ToastContainer, Zoom} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



const LAPList=()=> {
    
    const[open,setOpen]=useState(false);
    // const navigate=useNavigate();
    const[id,setId]=useState();
    const componentPDF=useRef();
    const[currentPage,setCurrentPage]=useState(1);
    const recordsPerPage=5;
    const[userData,isLoading,isError]=useFetch("https://ur-loans.vercel.app/api/propertyloans/");

    //Print PDF
    const generatePDF=useReactToPrint({
      content:()=>componentPDF.current,
      documentTitle:"LoanAgainstProperty_customers List",
      onAfterPrint:()=>alert("PDF Downloaded Successfully")
    });

  //Pagination
  const indexOfLastRecord=currentPage*recordsPerPage;
  const indexOfFirstRecord=indexOfLastRecord-recordsPerPage;
  
  const CurrentRecords=userData.slice(indexOfFirstRecord,indexOfLastRecord);

  const paginate=(e,value)=>{
    setCurrentPage(value);
    window.scrollTo({top:1800, behavior:"smooth" });
 }

    if(isLoading){
      return <>
          <Loader/>
      </>
  }

  if(isError?.status){
      return <>
          <Card sx={{color:'red',backgroundColor:"white",width:300,height:50,marginLeft:'120px',textAlign:'center'}} 
              align="center" ><CardContent>{isError.msg}</CardContent>
          </Card>
      </>
  }


//Delete Model Implementation
const openModel=(id)=>{
  setOpen(true);
  setId(id);

}

const closeModal=()=>{
  setOpen(false);
}

const handleDelete=async(id)=>{
  const response= await fetch(`https://ur-loans.vercel.app/api/propertyloans/${id}/`,{
    method:"DELETE",
    headers:{"Content-Type":"application/json"},
    credentials: "include",
  });
  if(response.status===200){
      toast.promise(
        new Promise((resolve,reject)=>{
            setTimeout(()=>{
              resolve();  
            },1000);
        }),{
            pending:"Loading...",
            success:"User was deleted Successfully..!",
            error:'Error recieved'
        }
      );
  }
  setOpen(false);
  // window.location.reload();
  // navigate('/adminhome/homeloans');
}



  return (
    <Box >
      <Typography fontWeight={600} fontSize={20} mb={4} align='start'>
            Loan Against Property Users List:
      </Typography>

      <Stack alignItems='end' mb={4}>
      <Button variant='contained' color='success' onClick={generatePDF}>Download PDF <FiDownload /> </Button>
      </Stack>

    <TableContainer component={Paper} ref={componentPDF}>
      <Table sx={{minWidth:786}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Mobile Number</StyledTableCell>
            <StyledTableCell align="center">Loan Amount</StyledTableCell>
            <StyledTableCell align="center">City</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            CurrentRecords.map((row) => (
             
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.fullName}
              </StyledTableCell>
              <StyledTableCell align="center">{row.email}</StyledTableCell>
              <StyledTableCell align="center">{row.mobileNum}</StyledTableCell>
              <StyledTableCell align="center">{row.loanAmount}</StyledTableCell>
              <StyledTableCell align="center">{row.city}</StyledTableCell>
              <StyledTableCell >
                <Stack direction="row" gap={1}>
                  <Button variant='contained' color='primary' LinkComponent={Link} to={`/adminhome/propertyloans/view/${row.id}`} >View</Button>
                  <Button variant='contained' color='success' LinkComponent={Link} to={`/adminhome/propertyloans/edit/${row.id}`}>Edit</Button>
                  <Button variant='contained' color='error' onClick={()=>openModel(row.id)}>Delete</Button>
                </Stack>
              </StyledTableCell>
            </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
       <Stack alignItems='flex-end' mt={7} >
          {
            userData.length>5 &&(
               <Pagination color="primary" shape='rounded'   defaultPage={1} 
                 count={Math.ceil(userData.length/recordsPerPage)} page={currentPage}
                 onChange={paginate} size='large'
                >

               </Pagination> 
            )
          }  
        </Stack >

        {/* Model */}
        <Dialog
          open={open}
          aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"HomeLoans"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Are you sure, Do you want to delete this User ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant='contained' color="success" onClick={()=>handleDelete(id)}>Yes</Button>
              <Button variant="contained" color='error' onClick={closeModal}>No</Button>
            </DialogActions>
        </Dialog>

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

    </Box>
  );
}

export default LAPList;