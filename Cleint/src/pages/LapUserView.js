import React, { useEffect, useState } from 'react';
import { Avatar,Typography, Button, Stack, List, ListItem, Divider, Card, CardContent, CardActions, CardMedia } from '@mui/material';
import {IoBusinessOutline} from "react-icons/io5";
import {useParams,Link} from "react-router-dom";
import {ImCancelCircle} from 'react-icons/im';



const LapUserView = () => {

    const {id}=useParams();
    const [user,setUser]=useState();

    useEffect(() =>{
       
        async function getUser(){
            console.log(id);
            const response=await fetch(`https://ur-loans.vercel.app/api/propertyloans/${id}/`,{
                method:"GET",
                headers:{"Content-Type":"application/json"},
                credentials: 'include',
            });
            const data= await response.json();
            // console.log(data[0]);
            setUser(data[0]);
        };
        
        getUser();
        
    },[id]) ;
    // console.log(user);
    
    return (
      <Stack
            sx={{ mt: { lg: "70px", xs: "20px" }, ml: { xs: "0px" }, mb: "0px" }}
            direction={{ lg: "row", xs: "column" }}     >
            
            <Card sx={{minWidth:{xs:575,lg:575},marginLeft:{lg:10,xs:0},background:'#f8f8f8'}}> 
                <CardMedia> 
                    <Avatar style={{ backgroundColor: "blue",marginLeft:250,marginTop:10 }}>                 
                        <IoBusinessOutline  fontSize={45}/>
                    </Avatar>
                </CardMedia>                
                <CardContent>
                 <Typography ml={20} fontWeight={700}>Loan Against Property Loans</Typography>
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
                            { user && <List key={user.id}>
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
                    <Button variant='contained' color='error' sx={{marginLeft:23}} LinkComponent={Link} to="/adminhome/propertyloans">Close
                        <ImCancelCircle style={{fontSize:'17px',marginLeft:10 }}/>
                    </Button>
                </CardActions>
            </Card>     
       </Stack>
    );
};

export default LapUserView;