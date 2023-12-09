import React, { useEffect, useState } from 'react';
import { Avatar,Typography, Button, Stack, List, ListItem, Divider, Card, CardContent, CardActions, CardMedia } from '@mui/material';
import {Flip, toast,ToastContainer, Zoom} from "react-toastify";
import {LiaBusinessTimeSolid} from "react-icons/lia";
import 'react-toastify/dist/ReactToastify.css';
import {useParams,Link} from "react-router-dom";
import {ImCancelCircle} from 'react-icons/im';



const BlUserView = () => {

    const {id}=useParams();
    const [user,setUser]=useState();

    useEffect(() =>{
       
        async function getUser(){
            console.log(id);
            const response=await fetch(`/businessloans/${id}/`,{
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
                        <LiaBusinessTimeSolid />
                    </Avatar>
                </CardMedia>                
                <CardContent>
                 <Typography ml={22} fontWeight={700}>BusinessLoans</Typography>
                <Stack direction='row' marginLeft={0} mt={3}>                   
                    
                        <Stack>
                            <Card sx={{minWidth:{xs:195,lg:195},marginLeft:{lg:5,xs:0}}}>
                            {user && <List >
                                    <ListItem> Name </ListItem><Divider/>
                                    <ListItem>Email </ListItem><Divider/>
                                    <ListItem>Mobile Number </ListItem><Divider/>
                                    <ListItem>City </ListItem><Divider/>            
                                    <ListItem>Required Loan Amount</ListItem><Divider/>                                   
                                    <ListItem>Created </ListItem>
                                </List>}
                            </Card>
                        </Stack> 
                        
                        <Stack> 
                            <Card sx={{minWidth:{xs:200,lg:75},marginLeft:{lg:5,xs:2}}}> 
                            { user && <List >
                                    <ListItem>{user.fullName}</ListItem><Divider/>
                                    <ListItem>{user.email}</ListItem><Divider/>
                                    <ListItem>{user.mobileNum}</ListItem><Divider/>
                                    <ListItem>{user.city}</ListItem><Divider/>                                   
                                    <ListItem>{user.loanAmount}</ListItem><Divider/>                                   
                                    <ListItem>{user.createdAt}</ListItem>
                                </List>}
                            </Card>
                        </Stack> 
                    
                </Stack>
                </CardContent> 
                <CardActions >
                    <Button variant='contained' color='error' sx={{marginLeft:23}} LinkComponent={Link} to="/adminhome/businessloans">Close
                        <ImCancelCircle style={{fontSize:'17px',marginLeft:10 }}/>
                    </Button>
                </CardActions>
            </Card>     
       </Stack>
    );
};

export default BlUserView;