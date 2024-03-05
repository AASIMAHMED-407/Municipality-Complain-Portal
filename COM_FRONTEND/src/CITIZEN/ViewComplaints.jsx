import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../EMPLOYEE/Navbar'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function ViewComplaints() {
  let cidx = useParams()
	let cid = cidx.id
  let cname = useRef()
  let nocom = useRef()
  let [complains,setComplains]=useState([])
	useEffect(()=>{
		let getCitizenName = async ()=>{
			let data = await axios.get("http://127.0.0.1:5000/citizen/"+cid)
			cname.current.style.color = "red"
			cname.current.textContent = data.data[0][1].toUpperCase()
		  }
		  getCitizenName();

      let getAllComplains = async()=>{
          let data = await axios.get("http://127.0.0.1:5000/citizen/complains/"+cid)
          // console.log(data.data);
          if(data.data.length<=0){
            nocom.current.style.display = "block"
          }else{
            nocom.current.style.display = "none"
            setComplains(data.data)
          }
          
      }
      getAllComplains();
	},[])
  return (
    <>
        <nav class="navbar sticky-top navbar-light bg-light">
        <p class="navbar-brand m-3">CITIZEN: <span ref={cname}></span></p>
        </nav>
        <div className=' mt-5 d-flex flex-wrap'>

        <p className='m-5 h1' ref={nocom} style={{display:"none"}}>YOU HAVENT MADE ANY COM YET</p>

            
                {
                  complains.map((item,i)=>(
                      <div class="card m-2 shadow-sm p-3 mb-5 bg-white rounded" key={i} style={{maxWidth:"18rem"}}>
                    <div class="card-body" >
                          <h5 class="card-title">{item.location}</h5>
                          <h6 class="card-subtitle mb-2 text-muted">{item.datein.substring(0,17)}</h6>
                          <p class="card-text">{item.desc}</p>
                          <p  class="btn btn-info">{item.status}</p>
                    </div>
                    </div>
                  ))
                }
            

            
        </div>
    </>
  )
}

export default ViewComplaints
