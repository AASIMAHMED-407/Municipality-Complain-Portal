import React, { useRef, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

function Login() {
    const [eData,eSetData] = useState({
        "email":"",
        "password":""
    })
    let [cData,setCData] = useState({
        email:"",
        password:""
    })
    let alertBox = useRef()
    let alertText = useRef()
    let navigation = useNavigate()

    let handleEmployeeLogin = async()=>{
        // console.log(eData);
        try{
            let data = await axios.post("http://127.0.0.1:5000/employee/login",eData)
            // console.log(data);
            if(data.data.length>0){
                AlertBoxELogin("alert-success","Employyee Login Successful",data.data[0][0],true)
                console.log("log successful;");
                // navigation("/ehome/"+data.data[0].employee_id)
            }else{
                console.log("log failed;");
                AlertBoxELogin("alert-danger","Login Failed",-0,false)
            }

        }catch(err){
            console.log(err);
        }
    }

    let handleCitizenLogin = async()=>{
        // console.log(cData);
        try{
            let data = await axios.post("http://127.0.0.1:5000/citizen/login",cData)
            // console.log(data.data);
            if(data.data.length>0){
                AlertBox("alert-success","Citizen Login Successful",data.data[0][0],true)
                // console.log("log successful;");
                // navigation("/chome/"+data.data[0].citizen_id)
            }else{
                // console.log("log failed;");
                AlertBox("alert-danger","Login Failed",-0,false)
            }

        }catch(err){
            console.log(err);
        }
    }

    let AlertBox = (color,text,cid,flag)=>{
        if(flag && cid>0){
            alertBox.current.classList.add(color)
            alertText.current.textContent = text
            alertBox.current.style.display="block"
            setTimeout(()=>{
                alertBox.current.style.display="none"
                navigation("/chome/"+cid)
        },2000)
        }else{
            alertBox.current.classList.add(color)
            alertText.current.textContent = text
            alertBox.current.style.display="block"
            setTimeout(()=>{
                alertBox.current.style.display="none"
        },2000)
        }
    }

    let AlertBoxELogin = (color,text,eid,flag)=>{
        if(flag && eid>0){
            alertBox.current.classList.add(color)
            alertText.current.textContent = text
            alertBox.current.style.display="block"
            setTimeout(()=>{
                alertBox.current.style.display="none"
                navigation("/ehome/"+eid)
        },2000)
        }else{
            alertBox.current.classList.add(color)
            alertText.current.textContent = text
            alertBox.current.style.display="block"
            setTimeout(()=>{
                alertBox.current.style.display="none"
        },2000)
        }
    }
  return (
<>
<div class="m-4"> 
    <div class="alert alert-success fade show" ref={alertBox} style={{display:"none"}}>
        <strong>Note: </strong> <p className='d-inline' ref={alertText}></p>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
</div>
<div class ="row mt-5 ">
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
              <input id="user" type="text" class="input"  placeholder="Enter your username" onChange={(e)=>{
                    setCData((prev)=>{
                        prev.email = e.target.value
                        return prev
                    })
              }}/>
          </div>
          <div class="group">
              <label for="pass" class="label">Password</label>
              <input id="pass" type="password" class="input" data-type="password" placeholder="Enter your password" onChange={(e)=>{
                    setCData((prev)=>{
                        prev.password = e.target.value
                        return prev
                    })
              }}/>
          </div>
          <div class="group">
              <Link to={"/cregister"} className='btn btn-link'>Create Account</Link>
          </div>

          <div class="group mt-4">
          <button className='btn btn-primary' onClick={handleCitizenLogin}>Login</button>
          </div>
          
      </div>
      <div class="sign-up-form">
          <div class="group">
              <label for="user" class="label">email</label>
              <input id="user" type="text" class="input" placeholder="employee email" onChange={(e)=>{
                    eSetData((prev)=>{
                        prev.email = e.target.value
                        return prev
                    })
              }}/>
          </div>
          <div class="group">
              <label for="pass" class="label">Password</label>
              <input id="pass" type="password" class="input" data-type="password" placeholder="employee password" onChange={(e)=>{
                    eSetData((prev)=>{
                        prev.password = e.target.value
                        return prev
                    })
              }}/>
          </div>
          {/* <div class="group">
              <Link to={"/eregister"} className='btn btn-link'>Create Account</Link>
          </div> */}
          <div class="group">
          <button className='btn btn-primary' onClick={handleEmployeeLogin}>Login</button>
          </div>
          <div class="hr"></div>
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

export default Login
