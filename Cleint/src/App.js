import { Box } from "@mui/material";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { Route, Routes, useNavigate } from "react-router-dom";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./pages/Login";
import HomeLoan from "./pages/HomeLoan";
import PersonalLoan from "./pages/PersonalLoan";
import BusinessLoan from "./pages/BusinessLoan";
import PropertyLoans from "./pages/PropertyLoans";
import AdminHome from "./pages/AdminHome";
import HomeloansList from "./pages/HomeloansList";
import PersonalLoansList from "./pages/PersonalLoansList";
import SideNav from "./components/SideNav";
import { AuthProvider } from "./utils/useAuthen";
import { useAuthen } from "./utils/useAuthen";
import { useEffect,useState } from "react";
import Appbar from "./components/Appbar";
import EditHomeLoans from "./pages/EditHomeLoans";
import HlUserView from "./pages/HlUserView";
import BusinessLoansList from "./pages/BusinessLoansList";
import LAPList from "./pages/LAPList";
import NotFound from "./pages/NotFound";
import { BrowserRouter } from 'react-router-dom';
import Queries from "./pages/Queries";
import BlUserView from "./pages/BlUserView";
import EditBusinessLoans from "./pages/EditBusinessLoans";
import LapUserView from "./pages/LapUserView";
import EditLAPLoans from "./pages/EditLAPLoans";
import PlUserView from "./pages/PlUserView";
import EditPLUser from "./pages/EditPLUser";
import Header from "./components/Header";

const App=()=> {

  // let name=sessionStorage.getItem("name");
  const[name,setName]=useState();
  const navigate=useNavigate();
    
 
  useEffect(()=>{
    let access=localStorage.getItem("access");
   
    {access?navigate('/adminhome'):navigate('/')}
    
  },[])


  return (
    <>
        <Header  name={name} setName={setName} />
        {/* <Navbar /> */}
        {/* <Appbar name={name} setName={setName} /> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/homeloans" element={<HomeLoan />} />            
          <Route path="/personalloans" element={<PersonalLoan />} />
          <Route path="/businessloans" element={<BusinessLoan />} />
          <Route path="/propertyloans" element={<PropertyLoans />} />
          {/* Admin Related Routes */}
          <Route path="/adminhome" element={<AdminHome  name={name} setName={setName} />}>            
            <Route path="homeloans" element={<HomeloansList/>} />
            <Route path="homeloans/view/:id" element={<HlUserView/>} />
            <Route path="homeloans/edit/:id" element={<EditHomeLoans/>} />
            <Route path="personalloans" element={<PersonalLoansList />} />
            <Route path="personalloans/view/:id" element={<PlUserView/>} />
            <Route path="personalloans/edit/:id" element={<EditPLUser/>} />
            <Route path="businessloans" element={<BusinessLoansList />} />
            <Route path="businessloans/view/:id" element={<BlUserView/>} />
            <Route path="businessloans/edit/:id" element={<EditBusinessLoans/>} />
            <Route path="propertyloans" element={<LAPList />} />
            <Route path="propertyloans/view/:id" element={<LapUserView/>} />
            <Route path="propertyloans/edit/:id" element={<EditLAPLoans/>} />
            <Route path="queries" element={<Queries/>} />
          </Route>
          <Route path="/*" element={<NotFound/>} />
          
        </Routes>
        <Footer />
      
    </>
  );
}

export default App;
