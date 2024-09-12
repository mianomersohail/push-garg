import Navbar from "../Compo/Nav/Nav"
import Footer from "../Compo/Footer/Footer"
import './LoginPage.css'
import { useNavigate } from "react-router-dom"
import { useState } from "react"
export default function UserLogin(){
    const [email,setemail]=useState()
    const [password,setpassword]=useState()
    const navigate=useNavigate()
    const emailchange=(event)=>{
        setemail(event.target.value)
    }
    const passwordchange=(event)=>{
        setpassword(event.target.value)
    }
    const submitform=async (event)=>{
        event.preventDefault();
       
        try{
        const Response=await fetch('http://localhost:3001/Login',{
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({email,password}),
              
        })  
        if(!Response){
            alert('No Response from server')
        }
        
        const Data=await Response.json()
        if(Data.message=='Authorized'){
            alert("Your are")
            navigate('/paiduser')

        }
        if(Data.message=='Un-Auhorized'){
            alert(Data.message)
        }
    }catch(error){
        alert(error.message)
    }
    }

    return(
        <>
        <Navbar/>
        <div className="container Login-Page-Main ">
            <div className="row">
                <div className="col-lg-6">
                    <img className="login-page-img" src="https://media.licdn.com/dms/image/v2/D5603AQF1dnwzZXNqeg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1725296771590?e=1730937600&v=beta&t=8f1l8rnlNTWF40E8YD54NYPk_w9PdDD4PmAlNnRFVhs"/>

                </div>
                <div className="col-lg-6">
                    <form className="login-page-form" onSubmit={submitform}>
                    <div><h3>Login</h3></div>
                        <div><label>Email/Phone</label></div>
                        <div><input value={email} onChange={emailchange} name="email" type="email" placeholder="Enter your Email/Phone"/></div>
                        <div><label>Password</label></div>
                        <div><input value={password} onChange={passwordchange} name="password" type="password" placeholder="Enter Your Password"/></div>
                        <div><button type="submit">Login</button></div>
                    </form>

                </div>
            </div>
        </div>
        <Footer/>
       
        </>
    )
}