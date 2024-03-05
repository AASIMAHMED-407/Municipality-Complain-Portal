import React from 'react'
import {NavLink} from 'react-router-dom'
function Navbar() {
  return (
//     <>
//         <nav class="navbar navbar-expand-lg navbar-light bg-light">
//   <a class="navbar-brand m-3" href="#">Department</a>
//   <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//     <span class="navbar-toggler-icon"></span>
//   </button>
//   <div class="collapse navbar-collapse" id="navbarNav">
//     <ul class="navbar-nav">
//       <li class="nav-item">
//         <NavLink to={"/ecomplain"} class="nav-link" href="#">Complaint Requset</NavLink>
//       </li>
//       <li class="nav-item">
//         <a class="nav-link" href="#">Handling</a>
//       </li>
//     </ul>
//   </div>
// </nav>
//     </>
      <>
      <nav class="navbar sticky-top navbar-light bg-light">
        <a class="navbar-brand" href="#">Sticky top</a>
      </nav>
      </>
  )
}

export default Navbar
