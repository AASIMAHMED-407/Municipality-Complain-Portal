import React, { useEffect, useRef } from 'react'
import {Link, useParams} from 'react-router-dom'
import axios from 'axios'

function CHome() {
	let cidx = useParams()
	let cid = cidx.id
	let cname = useRef()
	useEffect(()=>{
		let getCitizenName = async ()=>{
			let data = await axios.get("http://127.0.0.1:5000/citizen/"+cid)
			cname.current.textContent = data.data[0][1]
		  }
		  getCitizenName()
	},[])
  return (
    <>
	<div class ="row mt-5 ">
<div class="col-md-6 mx-auto p-0">
  <div class="card ">
<div class="login-box ">
<div class="login-snip">
  {/* <input id="tab-1" type="radio" name="tab" class="sign-in" checked/><label for="tab-1" class="tab">MAKE</label> */}
  <input id="tab-2" type="radio" name="tab" class="sign-up" defaultChecked/><label for="tab-2" class="tab" ref={cname}></label>
  <div class="login-space">
      <div class="sign-up-form" style={{position:"relative",top:"60px"}}>
	  <div class="group">
		  <Link to={"/cmakecomplain/"+cid} className='btn btn-danger w-100 ' style={{height:"100px",textAlign:"center",fontSize:"45px"}}>Make Complain</Link>
       </div>
	   <div class="group">
		  <Link to={"/cviewcomplain/"+cid} className='btn btn-primary w-100 align-middle mt-3' style={{height:"100px",fontSize:"45px"}}>View Complains</Link>
       </div>
	     
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

export default CHome

{/* <div class ="row mt-5 ">
	<div class="col-md-6 mx-auto p-0">
		<div class="card ">
<div class="login-box ">
	<div class="login-snip">
		<input id="tab-1" type="radio" name="tab" class="sign-in" checked/><label for="tab-1" class="tab">CITIZEN</label>
		<input id="tab-2" type="radio" name="tab" class="sign-up"/><label for="tab-2" class="tab">EMPLOYEE</label>
		<div class="login-space">
			<div class="login mt-5">
				<div class="group">
					<label for="user" class="label">Username</label>
					<input id="user" type="text" class="input"  placeholder="Enter your username"/>
				</div>
				<div class="group">
					<label for="pass" class="label">Password</label>
					<input id="pass" type="password" class="input" data-type="password" placeholder="Enter your password"/>
				</div>
                <div class="group">
                    <Link to={"/clogin"} className='btn btn-link'>Create Account</Link>
                </div>

				<div class="group mt-4">
                <Link to={"/chome"} className='btn btn-primary'>Login</Link>
				</div>
				
			</div>
			<div class="sign-up-form">
				<div class="group">
					<label for="user" class="label">Username</label>
					<input id="user" type="text" class="input" placeholder="Create your Username"/>
				</div>
				<div class="group">
					<label for="pass" class="label">Password</label>
					<input id="pass" type="password" class="input" data-type="password" placeholder="Create your password"/>
				</div>
				<div class="group">
					<label for="pass" class="label">Repeat Password</label>
					<input id="pass" type="password" class="input" data-type="password" placeholder="Repeat your password" />
				</div>
				<div class="group">
					<label for="pass" class="label">Email Address</label>
					<input id="pass" type="text" class="input" placeholder="Enter your email address"/>
				</div>
				<div class="group">
					<input type="submit" class="button" value="Sign Up"/>
				</div>
				<div class="hr"></div>
			</div>
		</div>
	</div>
</div>   
</div>
</div>
</div> */}