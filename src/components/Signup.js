import React, { useState } from 'react'
import { useNavigate } from 'react-router';

function Signup(props) {

    const [credential,setcredential]=useState({name:"",email:"",password:"",confirmpassword:""});
    const history=useNavigate()

    const onChange=(e)=>{
        setcredential({...credential,[e.target.name]:e.target.value})
         
       }

       const handleSubmit=async(e)=>{
        e.preventDefault();
     
       const  {name,email,password}=credential 

        const response = await fetch("https://inotebook-backend-ohj1.onrender.com/api/auth/createuser", {
     
        method: "POST", // *GET, POST, PUT, DELETE, etc.
         
         headers: {
           "Content-Type": "application/json",
       
         },
              
         body: JSON.stringify({name,email,password}),
     
       });
       const json=await response.json();
       console.log(json)  
     
         if(json.success){
            localStorage.setItem("token",json.authtoken)
            history('/login')
            props.showAlert("Account created Successfully ","success")

         }else{
            props.showAlert("Invalid details","danger")
         }
     
      }
     

  return (
    <div className='container'>
      
      <form onSubmit={handleSubmit}>

            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Username</label>
                <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" placeholder="Enter name"  onChange={onChange} />
                
        </div>
        <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} />
           
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={onChange} minLength={5} required/>
        </div>
       
        <div className="form-group">
            <label htmlFor="Confirmpassword">Confirm Password</label>
            <input type="password" className="form-control" id="confirmpassword" name="Confirmpassword" placeholder="Password" onChange={onChange} minLength={5} required/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
</form>
        

    </div>
  )
}

export default Signup
