import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {

  let location=useLocation();
  const history=useNavigate()
  // useEffect(()=>{
  //     console.log(location.pathname)
  // },[])

  const handleLogout=()=>{
     localStorage.removeItem('token')
     history('/login')
  }

  return (
    
    <nav className="navbar navbar-expand-lg navbar-fixed-top navbar-dark bg-dark ">
        <Link className="navbar-brand" to="/">INoteBook</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item ">
              <Link className={`nav-link ${location.pathname==='/'? "active":""}`} aria-current="page" to="/">Home <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==='/about'? "active":""}`} to="/about">About</Link>
            </li>
            
          </ul>
        {!localStorage.getItem('token') ?
            <form className="form-inline my-2 my-lg-0">
              <div className="container ">
              <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
              <Link className="btn btn-primary ml-1" to="/signup" role="button">SignUp</Link>
              </div>
            </form> 
        
           : 
        
            <Link className="btn btn-primary ml-1"  role="button" onClick={handleLogout}>LogOut</Link>}
        </div>
    </nav> 
  )
}

export default Navbar
