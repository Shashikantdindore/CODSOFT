import React from 'react';
import {Link} from "react-router-dom";


const NotFound = () => {
  return (

    <section className= "notfound">
      <div className="content">
        <img src="/d.webp" alt="notfound" />
        <Link to={"/"} >Return To Home</Link>
        
      </div>


    </section>
    
  )
}

export default NotFound