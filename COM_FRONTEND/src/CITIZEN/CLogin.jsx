import axios from 'axios'
import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

function CLogin() {
	let [cData,setCData] = useState({
		name:"",
		email:"",
		password:""
	})
	let navigate = useNavigate()
	let handleCitizenRegister = async()=>{
			try{
				let data = await axios.post("http://localhost:6969/citizen/register",cData)
				// console.log(data.data.length);
				// console.log(data.data.affectedRows);
				if(data.data.affectedRows>0){
					navigate("/")
					console.log("created citizen successfultyy");
				}
				
			}catch (err){
				console.log("err");
			}
	}
  return (
   <>
    <div className ="row mt-5 ">
	<div className="col-md-6 mx-auto p-0">
		<div className="card ">
<div className="login-box ">
	<div className="login-snip">
		{/* <input id="tab-1" type="radio" name="tab" className="sign-in" checked/><label htmlFor="tab-1" className="tab">Login</label> */}
		<input id="tab-2" type="radio" name="tab" className="sign-up" defaultChecked/><label htmlFor="tab-2" className="tab">Sign Up</label>
		<div className="login-space">
			<div className="sign-up-form">
				<div className="group">
					<label htmlFor="user" className="label">Username</label>
					<input id="user" type="text" className="input" placeholder="Create your Username" onChange={(e)=>{
						setCData((prev)=>{
							prev.name= e.target.value
							return prev
						})
					}}/>
				</div>
			
				<div className="group">
					<label htmlFor="pass" className="label">Email Address</label>
					<input id="pass" type="text" className="input" placeholder="Enter your email address" onChange={(e)=>{
						setCData((prev)=>{
							prev.email= e.target.value
							return prev
						})
					}}/>
				</div>
        <div className="group">
					<label htmlFor="pass" className="label">Password</label>
					<input id="passc" type="password" className="input" data-type="password" placeholder="Create your password" onChange={(e)=>{
						setCData((prev)=>{
							prev.password= e.target.value
							return prev
						})
					}}/>
				</div>
				<div className="group">
        				<button className='btn btn-primary' onClick={handleCitizenRegister}>Create Account</button>
				</div>
				<div className="hr"></div>
				
			</div>
		</div>
	</div>
</div>   
</div>
</div>
</div>
   </>
  )
}

export default CLogin
