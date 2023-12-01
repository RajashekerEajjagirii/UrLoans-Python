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
import { fetchData,Get_Options } from '../utils/useFetchData';
import useFetch from '../utils/useFetchData';
import Loader from '../components/Loader';
import {Pagination,Stack,Button} from '@mui/material';
import {useReactToPrint} from "react-to-print";
import {FiDownload} from "react-icons/fi"


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


const BusinessLoansList=()=> {
    
    const componentPDF=useRef();
    const[currentPage,setCurrentPage]=useState(1);
    const recordsPerPage=5;
    const[userData,isLoading,isError]=useFetch("http://localhost:8080/businessloans/getAll");

    //Print PDF
    const generatePDF=useReactToPrint({
      content:()=>componentPDF.current,
      documentTitle:"BusinessLoans_customers List",
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
    
  return (
    <Box >
      <Typography fontWeight={600} fontSize={20} mb={4} align='start'>
            BusinessLoans Users List:
      </Typography>
      <Stack alignItems='end' mb={4}>
      <Button variant='contained' color='success' onClick={generatePDF}>Download PDF <FiDownload /> </Button>
      </Stack>

    <TableContainer component={Paper} ref={componentPDF} >
      <Table sx={{minWidth:786}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Mobile number</StyledTableCell>
            <StyledTableCell align="right">Loan Amount</StyledTableCell>
            <StyledTableCell align="right">City</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            CurrentRecords.map((row) => (
             
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.fullName}
              </StyledTableCell>
              <StyledTableCell align="right">{row.email}</StyledTableCell>
              <StyledTableCell align="right">{row.mobileNum}</StyledTableCell>
              <StyledTableCell align="right">{row.loanAmount}</StyledTableCell>
              <StyledTableCell align="right">{row.city}</StyledTableCell>
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
    </Box>
  );
}

export default BusinessLoansList;