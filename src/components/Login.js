import React, { useState } from 'react'
import { Link, createBrowserRouter, useNavigate } from 'react-router-dom';

const Login=(props)=> {

const [credential,setcredential]=useState({email:"",password:""});
const history=useNavigate()

const onChange=(e)=>{
   setcredential({...credential,[e.target.name]:e.target.value})
    
  }
  

 const handleSubmit=async(e)=>{
   e.preventDefault();

   const response = await fetch("https://inotebook-backend-ohj1.onrender.com/api/auth/login", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    
    headers: {
      "Content-Type": "application/json",
      "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiZTE3NjE4YTVkYTQyNWE3MTZkMjI0In0sImlhdCI6MTY5MDE3OTQ1Nn0.cplraX-pwcq65QrswZb01FxyW39Xc6TDne76UrZvUYg"
  
    },
         
    body: JSON.stringify({email:credential.email,password:credential.password}),

  });
  const json=await response.json();
  console.log(json)  

    if(json.success){
        localStorage.setItem("token",json.authtoken)
        props.showAlert("Logged in Successfully ","success")
        history('/')
      
    }else{
        props.showAlert("Invalid credentials ","danger")
    }
 }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" name='email' value={credential.email} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange} placeholder="Enter email"/>
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="password" >Password</label>
          <input type="password" className="form-control" name='password'value={credential.password} id="exampleInputPassword1" onChange={onChange} placeholder="Password"/>
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
     </form>
     <br />
     <p>Don't have an account? <Link to="/signup" >register</Link> </p>
    </div>
  )
}

export default Login
