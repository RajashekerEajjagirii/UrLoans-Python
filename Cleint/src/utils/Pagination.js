import React, { useState } from 'react';
import { Pagination, Stack } from '@mui/material';

const usePagination = (userData) => {
        console.log({userData});
        alert("cc");
    const[currentPage,setCurrentPage]=useState(1);
    const recordsPerPage=5;

    const indexOfLastRecord=currentPage*recordsPerPage;
    const indexOfFirstRecord=indexOfLastRecord-recordsPerPage;
    
    const CurrentRecords=userData.slice(indexOfFirstRecord,indexOfLastRecord);
    const paginate=(e,value)=>{
        setCurrentPage(value);
        window.scrollTo({top:1800, behavior:"smooth" });
    }

    return (
        <Stack alignItems='center'>
          {
            recordsPerPage.length>9 &&(
               <Pagination color="primary"   defaultPage={1} 
                 count={Math.ceil(userData.length/recordsPerPage)} page={currentPage}
                 onChange={paginate} size='small'
                >

               </Pagination> 
            )
          }  
        </Stack >
    );
};

export default usePagination;