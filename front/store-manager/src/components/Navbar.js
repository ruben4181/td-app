import React from "react";

class Navbar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      options : props.options,
      authToken : localStorage.getItem("authToken")
    }
  }
  render(){
    return(
      <>
      {
        this.state.authToken===null
        ?
        <nav className="navbar navbar-light bg-light navbar-expand-lg">
          <div className="container">
            <a className="navbar-brand mb-0 h1" href="/">TD</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <a className="nav-link active" aria-current="page" href="/">Inicio</a>
                <a className="nav-link" href="/">Aprende</a>
                <a className="nav-link" href="/">Planes</a>
              </div>
              <div className="navbar-nav ms-auto">
                <a className="nav-link me-2" href="/login">Iniciar Sesión</a>
                <a className="btn btn-primary" href="/signup">Registrate</a>
              </div>
            </div>
          </div>
        </nav>
        :
        <nav className="navbar navbar-light bg-light navbar-expand-lg">
          <div className="container">
            <a className="navbar-brand mb-0 h1" href="/">TD</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <a className="nav-link active" aria-current="page" href="/">Inicio</a>
                <a className="nav-link" href="/">Aprende</a>
                <a className="nav-link" href="/">Planes</a>
              </div>
              <div className="navbar-nav ms-auto">
                <a className="nav-link me-2" href="/login">Mis tiendas</a>
                <a className="nav-link me-2" href="/" onClick={()=>{this.logOut()}}>Cerrar sesión</a>
              </div>
            </div>
          </div>
        </nav>
      }
      </>
    )
  }
  logOut(){
    localStorage.removeItem('authToken');
  }
}

export default Navbar;