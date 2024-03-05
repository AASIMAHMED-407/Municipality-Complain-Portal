import React from 'react'
import Navbar from './Navbar'
import {Link, useParams} from 'react-router-dom'

function EHome() {
  let eidx = useParams()
  let eid = eidx.id
  return (
    <>
      <Navbar/>
              <div class="row mt-5">
          <div class="w-50">
            <div class="card mt-4">
                <Link to={"/ecomplainreq/"+eid} class="btn btn-primary">Complaint Requset</Link>
             
            </div>
          </div>
          <div class="mt-3">
            <div class="card">
                <Link to={"/ecomplainhandling/"+eid} class="btn btn-primary">Handling</Link>
              
            </div>
          </div>
        </div>
    </>
  )
}

export default EHome
