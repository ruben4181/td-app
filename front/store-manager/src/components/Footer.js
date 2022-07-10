import React from "react";
import "../css/commons.css";

class Footer extends React.Component{
  render(){
    const now = new Date();
    const year = now.getFullYear();

    return(
      <div className="container-fluid bg-dark p-4">
        <div className="container text-center">
          <span className="text-light">
            © {year} BenchOS Ware. All rights reserved. 
          </span>
        </div>
      </div>
    )
  }
}

export default Footer;