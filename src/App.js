import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Pages/Header';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';


function App() {

  const users = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  
  useEffect(() => {
    if (users) {
      navigate("/");
    }else{
      navigate("/login")
    }
  }, []);


  return (
<>
<Header />
<Routes>

<Route  path='/' element={<Home />}   />
<Route  path='/login' element={<Login />}   />
<Route  path='/register' element={<Register />}   />


</Routes>

</>
  );
}

export default App;
