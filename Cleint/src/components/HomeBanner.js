import React from 'react';
import { Box,Typography } from '@mui/material';
import homeloan from "../assets/icons/home-loans.jpg"
import personalloan from "../assets/icons/personal2.jpg"
import business from "../assets/icons/business2.jpg"
import property from "../assets/icons/property1.jpg"
import { NavLink } from 'react-router-dom';


const HomeBanner = () => {
    return (
        <Box sx={{mt:{lg:'30px', xs:'30px'},ml:{xs:'50px'}}} >

            <div class="carsoul-img" >
                <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <NavLink to='/homeloans'>
                                <img src={homeloan} class="rounded w-100" alt="HomeLoans"/> 
                                <div class="carousel-caption d-none d-md-block">
                                <h3>Home Loans</h3>
                                <p>...</p>   
                                </div>
                            </NavLink>     
                        </div>
                        <div class="carousel-item">
                            <NavLink to='/personalloans'>
                                <img src={personalloan} class="rounded w-100" alt="PersonalLoans"/>
                                <div class="carousel-caption d-none d-md-block">
                                <h3>Persoanal Loans</h3>
                                <p>...</p>
                                </div>
                            </NavLink>    
                        </div>
                        <div class="carousel-item">
                           <NavLink to='/businessloans'>
                                <img src={business} class="rounded w-100" alt="BusinessLoans"/>                           
                                <div class="carousel-caption d-none d-md-block">
                                <h3>Business Loans</h3>
                                <p>...</p>
                                </div>
                            </NavLink>    
                        </div>
                        <div class="carousel-item">
                            <NavLink to='/propertyloans'>   
                                <img src={property} class="rounded w-100" alt="PropertyLoans"/>
                                <div class="carousel-caption d-none d-md-block">
                                    <h3>Property Loans</h3>
                                    <p>...</p>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <Typography fontWeight='600' fontSize='20px' marginTop={5}
              color='#42adf5'>
                URLOANS Club
            </Typography>
            <Typography fontWeight={700} sx={{fontSize:'30px',mt:{lg:'70px',xs:'50px'}}}  mb='23px'>
                Use URLOANS,<br/> To Achieve Ur Goals...
            </Typography>

            {/* <img src={HomeImg} alt='Home-image' className='home-banner-image'/> */}
            <Typography fontWeight={600} color='#42adf5' sx={{opacity:0.2,display:'block'}} fontSize='130px'>
                URLOANS
            </Typography>
            
        </Box>
    );
};

export default HomeBanner;