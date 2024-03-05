import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function EComplain() {
  let eidx = useParams()
  let eid = eidx.id 
  let cname = useRef()
  let nocom = useRef()
  let alertBox = useRef()
  let alertText = useRef()
  let [reqData,setReqData] = useState([])
  useEffect( ()=>{
    let getEmployeeName = async ()=>{
			let data = await axios.get("http://127.0.0.1:5000/employee/"+eid)
			cname.current.style.color = "red"
      // console.log(data);
			cname.current.textContent = data.data[0][1].toUpperCase()
		  }
		  getEmployeeName();

      let getAllRequest = async ()=>{
        let data = await axios.get("http://127.0.0.1:5000/employee/request/"+eid)
        // console.log(data);
        if(data.data.length<=0){
          nocom.current.style.display = "block"
        }else{
          nocom.current.style.display = "none"
          setReqData(data.data)
        }
      }
      getAllRequest()
  },[])

  let handleComplainReq = async(cid)=>{
    // console.log(cid);
    let data = await axios.get("http://127.0.0.1:5000/employee/handle/complain/"+cid)
    // console.log(data.data[1]=="handling successfully");
    // data.data[1]=="handling successfully"
    if(data.data[1]=="handling successfully"){
      AlertBoxELogin("alert-success","handling Successful",true)
      console.log("handling Successful");
      window.location.reload()
      // navigation("/ehome/"+data.data[0].employee_id)
  }else{
      console.log("log failed;");
      AlertBoxELogin("alert-danger","handling Failed",false)
  }
    
  }

  let AlertBoxELogin = (color,text,flag)=>{
    if(flag ){
        alertBox.current.classList.add(color)
        alertText.current.textContent = text
        alertBox.current.style.display="block"
        setTimeout(()=>{
            alertBox.current.style.display="none"
            // navigation("/ehome/"+eid)
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
        <p class="navbar-brand m-3">EMPLOYEE: <span ref={cname}></span></p>
      </nav>

      <p className='m-5 h1' ref={nocom} style={{display:"none"}}>YOU HAVENT GOT ANY COM YET</p>

        {/* aletr  */}
      <div class="m-4"> 
        <div class="alert alert-success fade show" ref={alertBox} style={{display:"none"}}>
            <strong>Note: </strong> <p className='d-inline' ref={alertText}></p>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    </div>

       <div className=' d-flex flex-wrap'>
       {
        reqData.map((complain, i)=>(
                  <div class="card bg-light mb-3 m-3" key={i} style={{
                maxWidth:"20rem",
              }}>
                <div class="card-header">{complain.location + " - " }</div>
                <div class="card-body">
                  <h5 class="card-title">{complain.datein.substring(0,17)} </h5>
                  <p class="card-text">Resson: {complain.desc}</p>
                  <button className='btn btn-success' onClick={()=>handleComplainReq(complain.id)}>Accept</button>
                </div>
              </div>
      
        ))
       }
      
       </div>


      </>

  )
}

export default EComplain
