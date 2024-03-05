import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'

function CMakeComplain() {
  let date = new Date()
  let cidx = useParams()
	let cid = cidx.id
  let cname = useRef()
  let navigate = useNavigate()
  let deptlocation = useRef()
  let alertBox = useRef()
  let alertText = useRef()
  let [location,setLocation] = useState("")
  let [employees,setEmployees] = useState([])
  let [complaintReq,setComplaintReq] = useState({
    cid:cid,
    cname:"",
    location:"",
    // date:`${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`,
    date:`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
    employee:"",
    eid:"",
    status:"request",
    desc:""
  })
	useEffect(()=>{
		let getCitizenName = async ()=>{
      let data = await axios.get("http://127.0.0.1:5000/citizen/"+cid)
      // console.log(data);
      // console.log(data.data[0][1]);
      cname.current.textContent = data.data[0][1]
      setComplaintReq((prev)=>{
        prev.cname = data.data[0][1]
        return prev
      })
    }
    getCitizenName()
	},[])

useEffect(()=>{
  // console.log(location);
  let getEmployees = async (did)=>{
    try{
        let data = await axios.get("http://127.0.0.1:5000/department/employee/"+did)
        // console.log(data);
        setEmployees(data.data)
  
    }catch(err){
      console.log(err);
    }
  }
  
  let getDepartment = async ()=>{
    try{
      if(location.length>0){
        let data = await axios.get("http://127.0.0.1:5000/department/location/"+location)
        // console.log(data.data[0][1]);
        deptlocation.current.textContent = data.data[0][1]
        setComplaintReq((prev)=>{
          prev.location = data.data[0][1]
          return prev
        })
        getEmployees(data.data[0][0])
      }
    }catch(err){
      console.log(err);
    }
  }
  getDepartment()
},[location])

  let handleMakeComplaint = async()=>{
    // console.log(complaintReq);
    // navigate("/chome/"+cid)
    let data = await axios.post("http://127.0.0.1:5000/citizen/make/complain",complaintReq)
      // console.log(data.data);
      if(data.data=="complain done"){
        // console.log("complain done");
        AlertBox("alert-success","Complain Successful",cid,true)
      }else{
        console.log("complain failed");
        AlertBox("alert-danger","Complain failed",-0,false)
      }
    }

    let AlertBox = (color,text,cid,flag)=>{
      if(flag && cid>0){
          alertBox.current.classList.add(color)
          alertText.current.textContent = text
          alertBox.current.style.display="block"
          setTimeout(()=>{
              alertBox.current.style.display="none"
              navigate("/chome/"+cid)
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

        	<div className ="row mt-5 ">
<div className="col-md-6 mx-auto p-0">
  <div className="card ">
<div className="login-box ">
<div className="login-snip">
  {/* <input id="tab-1" type="radio" name="tab" className="sign-in" checked/><label for="tab-1" className="tab">MAKE</label> */}
  <input id="tab-2" type="radio" name="tab" className="sign-up" defaultChecked/><label htmlFor="tab-2" className="tab" ref={cname} >USER NAME</label>
  <div className="login-space ">
     
      <div className="sign-up-form">
          {/* <div className="group">
              <label for="pass" className="label">Email Address</label>
              <input id="pass" type="text" className="input" placeholder="Enter your email address"/>
          </div> */}
          <div className="group mt-3">
          <select className="form-select" aria-label="Default select example" onChange={(e)=>{
            setLocation((prev)=>{
              prev = e.target.value
              return prev
            })
          }}>
                <option defaultValue>select location</option>
                <option value="pavoor">pavoor</option>
                <option value="kutnin">kutnin</option>  
                <option value="kuloor">kuloor</option>
            </select>
            </div>
          <div className="group mt-4">
          <select className="form-select" aria-label="Default select example">
                <option defaultValue ref={deptlocation}>select department</option>
                {/* <option value="1">Adminis</option>
                <option value="2">fin</option>  
                <option value="3">eng</option> */}
            </select>
            </div>

            <div className="group mt-4">
          <select className="form-select" aria-label="Default select example" onChange={(e)=>{
            setComplaintReq((prev)=>{
              prev.employee =  e.target.value
              prev.eid =  e.target.children[e.target.selectedIndex].children[0].value
              return prev
            })
            // console.log(e.target.selectedIndex)
            // console.log(e.target.children[e.target.selectedIndex].children[0].value)
            // console.log(e.target.value)
          }}>
                <option defaultValue>emp workihn on that dept</option>
                {
                  employees.map((emp,i)=>(
                    <option key={i} value={emp[1]}>{emp[1]}<input type='hidden' value={emp[0]}/></option>
                   
                  ))
                }
            </select>
            </div>
          
		  <div className="group mt-3">
              <label htmlFor="pass" className="label">Complain</label>
              <textarea placeholder="Enter your complian" cols={40} rows={10} onChange={(e)=>{
            setComplaintReq((prev)=>{
              prev.desc =  e.target.value
              return prev
            })
          }} style={{maxHeight:"250px",maxWidth:"600px",minHeight:"100px",minWidth:"100px"}}></textarea>
          </div>
          <div className="group">
              {/* <input type="submit" className="button" value="Make Complain"/> */}
              <button className='btn btn-primary align-self-center' onClick={handleMakeComplaint}>Make Complain</button>
              {/* <button className='btn btn-primary' onClick={handleMakeComplaint}>Make Complain</button> */}
          </div>
		  
		  {/* <div className="hr"></div> */}  
         
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

export default CMakeComplain
