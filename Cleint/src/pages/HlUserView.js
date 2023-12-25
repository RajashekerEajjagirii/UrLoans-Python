import React, { useEffect, useState } from 'react';
import { Avatar,Typography, Button, Stack, List, ListItem, Divider, Card, CardContent, CardActions, CardMedia } from '@mui/material';
import {FaHome} from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';
import {useParams,Link} from "react-router-dom";
import {ImCancelCircle} from 'react-icons/im';



const HlUserView = () => {

    const {id}=useParams();
    const [user,setUser]=useState();

    useEffect(() =>{
       
        async function getUser(){
            console.log(id);
            const response=await fetch(`/homeloans/${id}/`,{
                method:"GET",
                headers:{"Content-Type":"application/json"},
                credentials: 'include',
            });
            // console.log('before data');
            // console.log(response);
            const data= await response.json();
            // console.log(data[0]);
            setUser(data[0]);
        };
        
        getUser();
        
    },[]) ;
    // console.log(user);
    
    return (
      <Stack
            sx={{ mt: { lg: "70px", xs: "20px" }, ml: { xs: "0px" }, mb: "0px" }}
            direction={{ lg: "row", xs: "column" }}     >
            
            <Card sx={{minWidth:{xs:575,lg:575},marginLeft:{lg:10,xs:0},background:'#f8f8f8'}}> 
                <CardMedia> 
                    <Avatar style={{ backgroundColor: "blue",marginLeft:220,marginTop:10 }}>                 
                        <FaHome />
                    </Avatar>
                </CardMedia>                
                <CardContent>
                 <Typography ml={22} fontWeight={700}>HomeLoans</Typography>
                <Stack direction='row' marginLeft={0} mt={3}>                   
                    
                        <Stack>
                            <Card sx={{minWidth:{xs:195,lg:195},marginLeft:{lg:5,xs:0}}}>
                            {user && <List >
                                    <ListItem>Full Name </ListItem><Divider/>
                                    <ListItem>Email </ListItem><Divider/>
                                    <ListItem>Mobile Number </ListItem><Divider/>
                                    <ListItem>City </ListItem><Divider/>
                                    <ListItem>Occupation Type </ListItem><Divider/>
                                    <ListItem>Required Loan Amount</ListItem><Divider/>
                                    <ListItem>Monthly Net Salary </ListItem><Divider/>
                                    <ListItem>Current Monthly EMIs </ListItem><Divider/>
                                    <ListItem>Tenure </ListItem><Divider/>
                                    <ListItem>Date Of Birth </ListItem><Divider/>
                                    <ListItem>Address </ListItem><Divider/>
                                    <ListItem>Created </ListItem>
                                </List>}
                            </Card>
                        </Stack> 
                        
                        <Stack> 
                            <Card sx={{minWidth:{xs:200,lg:75},marginLeft:{lg:5,xs:2}}}> 
                            { user && <List key={user.id}>
                                    <ListItem>{user.fullName}</ListItem><Divider/>
                                    <ListItem>{user.email}</ListItem><Divider/>
                                    <ListItem>{user.mobileNum}</ListItem><Divider/>
                                    <ListItem>{user.city}</ListItem><Divider/>
                                    <ListItem>{user.occupationType}</ListItem><Divider/>
                                    <ListItem>{user.loanAmount}</ListItem><Divider/>
                                    <ListItem>{user.monthlySalary}</ListItem><Divider/>
                                    <ListItem>{user.monthlyEmi}</ListItem><Divider/>
                                    <ListItem>{user.tenure}</ListItem><Divider/>
                                    <ListItem>{user.dob}</ListItem><Divider/>
                                    <ListItem>{user.address}</ListItem><Divider/>
                                    <ListItem>{user.createdAt}</ListItem>
                                </List>}
                            </Card>
                        </Stack> 
                    
                </Stack>
                </CardContent> 
                <CardActions >
                    <Button variant='contained' color='error' sx={{marginLeft:23}} LinkComponent={Link} to="/adminhome/homeloans">Close
                        <ImCancelCircle style={{fontSize:'17px',marginLeft:10 }}/>
                    </Button>
                </CardActions>
            </Card>     
       </Stack>
    );
};

export default HlUserView;