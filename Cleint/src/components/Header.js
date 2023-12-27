import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    const{name,setName}=props;


    const logout=async()=>{
        await fetch("/logout/",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            credentials: 'include',
            
        })

        localStorage.removeItem('access'); 
        setName('');
          
    }

    return (
        <div>
            <nav class="navbar navbar-expand-lg fixed-top">
                <div class="container-fluid">
                    <a className="navbar-brand me-auto" href="#">UrLoans</a>                   
                    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">UrLoans</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        {name?'':
                        <div class="offcanvas-body">
                            <ul class="navbar-nav justify-content-center flex-grow-1 pe-3">
                                <li class="nav-item">
                                    <NavLink to='/' className="nav-link  mx-lg-2">Home
                                    {/* <a class="nav-link active mx-lg-2" aria-current="page" href="/homeloans">Home</a> */}
                                    </NavLink>
                                </li>
                                <li class="nav-item">
                                    <NavLink to='/about' className="nav-link mx-lg-2">About
                                    {/* <a class="nav-link mx-lg-2" href="#">About</a> */}
                                    </NavLink>
                                </li> 
                                <li class="nav-item">
                                    <NavLink to='/contact' className="nav-link mx-lg-2">Contact
                                    {/* <a class="nav-link mx-lg-2" href="#">Contact</a> */}
                                    </NavLink>
                                </li>                
                            </ul>                    
                        </div> }
                    </div>
                    {name? <div className='welcome'> <h6>Welcome, {name}</h6> </div>:''}
                    {name? <NavLink to='/' className="login-button" onClick={logout}>Logout</NavLink>:
                    <NavLink to='/login' className="login-button">Login</NavLink>}
                    {/* <a href='' class='login-button'>Login</a> */}
                    {name?'':
                    <button class="navbar-toggler pe-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button> }
                </div>
            </nav>
        </div>
    );
};

export default Header;