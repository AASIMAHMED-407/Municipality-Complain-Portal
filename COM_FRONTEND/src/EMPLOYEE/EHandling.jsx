import React, { useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function EHandling() {
  let eidx = useParams()
  let eid = eidx.id 
  let cname = useRef()
  let nocom = useRef()
  let alertBox = useRef()
  let alertText = useRef()
  let [reqData,setReqData] = useState([])
  useEffect(()=>{
    let getEmployeeName = async ()=>{
			let data = await axios.get("http://127.0.0.1:5000/employee/"+eid)
			cname.current.style.color = "red"
      // console.log(data);
			cname.current.textContent = data.data[0][1].toUpperCase()
		  }
		  getEmployeeName();

      let getAllHandling = async ()=>{
        let data = await axios.get("http://127.0.0.1:5000/employee/handling/"+eid)
        // console.log(data);
        if(data.data.length<=0){
          nocom.current.style.display = "block"
        }else{
          nocom.current.style.display = "none"
          setReqData(data.data)
        }
      }
      getAllHandling()
  },[])
  let handleComplainFinishh = async(cid)=>{
    // console.log(cid);
    let data = await axios.get("http://127.0.0.1:5000/employee/finish/complain/"+cid)
    if(data.data[1]=="finished successfully"){
      AlertBox("alert-success","finished Successful",true)
      console.log(data.data[1]);
      
      // navigation("/ehome/"+data.data[0].employee_id)
  }else{
      console.log("finished failed;");
      AlertBox("alert-danger","finished Failed",false)
  }
  }
  let AlertBox = (color,text,flag)=>{
    if(flag ){
        alertBox.current.classList.add(color)
        alertText.current.textContent = text
        alertBox.current.style.display="block"
        setTimeout(()=>{
            alertBox.current.style.display="none"
            // navigation("/ehome/"+eid)
            window.location.reload()
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
    <nav class="navbar sticky-top navbar-light bg-light">
        <p class="navbar-brand m-3">EMPLOYEE: <span ref={cname}>NAME</span></p>
      </nav>

        {/* aletr  */}
        <div class="m-4"> 
        <div class="alert alert-success fade show" ref={alertBox} style={{display:"none"}}>
            <strong>Note: </strong> <p className='d-inline' ref={alertText}></p>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    </div>

      <p className='m-5 h1' ref={nocom} style={{display:"none"}}>YOU ARE NOT HANDLING ANY COM YET</p>
      <div className=' d-flex flex-wrap'>
      {
        reqData.map((complain, i)=>(
                  <div class="card bg-light mb-3 m-3" key={i} style={{
                maxWidth:"20rem",
              }}>
                <div class="card-header">{complain.location + " - " }</div>
                <div class="card-body">
                  <h5 class="card-title">{complain.datein.substring(0,10)} </h5>
                  <p class="card-text">Resson: {complain.desc}</p>
                  <button className='btn btn-success' onClick={()=>handleComplainFinishh(complain.id)}>Finish</button>
                </div>
              </div>
      
        ))
       }
            
                </div>
    </>
  )
}

export default EHandling
