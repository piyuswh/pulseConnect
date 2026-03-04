import React from "react"
import axios from "axios"
import {useState} from 'react'
import "../pages/Login1.css"

export default function Login1(){
    const [logData,setlogData]=useState({
        email:'',
        password:''
    })
    async function subHandler(e){
        e.preventDefault()
        try{
        const res=await axios.post("http://localhost:8800/pulseConnect-Login",logData,{withCredentials:true})
        console.log(res.data);
        }catch(err){
            console.log(err.message);
       
        }
    }
    return (
        <div className="auth-page">

            <div className="auth-card">
                <h1 className="title">Login to <span>Pulses🩸</span></h1>

                <form className="auth-form" onSubmit={subHandler}>

                    <div className="input-group">
                        <input type="email" required name="email" onChange={(e)=>{setlogData({...logData,email:e.target.value})}} />
                        <label>Email Address</label>
                    </div>

                    <div className="input-group">
                        <input type="password" required name="password" onChange={(e)=>{setlogData({...logData,password:e.target.value})}}/>
                        <label>Password</label>
                    </div>

                    <div className="row">
                        <a className="forgot">Forgot password?</a>
                    </div>

                    <button className="login-btn">Login</button>

                </form>
            </div>

        </div>
    )
}