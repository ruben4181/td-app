import React from "react";
import '../css/commons.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default function Home(){
  return(
    <div className="container-fuild">
      <Navbar/>
      <div className="container">
        <div className="row full-screen-height">
          <div className="col-12 col-lg-4 mt-3 mb-3">
            <div className="d-flex flex-column h-100 justify-content-center">
              <h1 className="title-primary-text">Inventario, punto de venta y tienda online:
                gratis y en un solo lugar</h1>
              <div className="d-flex flex-column mt-3">
                <span className="title-secondary-text">Administra tu inventario, catalogos,
                  menus y ofrece a domicilio. Todo en un solo lugar, totalmente personalizado, ¡Todo Gratis!</span>
              </div>
              <a className="btn btn-primary mt-4" href="/signup">Empieza ahora</a>
            </div>
          </div>
          <div className="col-12 col-lg-8 mt-3 mb-3 p-5">
            <div className="d-flex flex-column h-100 justify-content-center">
              <img className="img-fluid carousel-limit-height"
              src="/vectors/main_1.svg" alt="main"/>
            </div>
          </div>
        </div>
        <div className="row full-screen-height">
          <div className="col-12 col-lg-4 mt-3 mb-3 d-block d-lg-none">
            <div className="d-flex flex-column">
              <h1 className="title-primary-text">Todo tipo de negocios</h1>
              <div className="d-flex flex-column mt-3">
                <span className="title-secondary-text">Restaurantes, tiendas de ropa, tecnología, supermercados, libros.
                Tenemos soluciones para gran variedad de negocios</span>
              </div>
              <div className="btn btn-primary mt-4">Ver diseños</div>
            </div>
          </div>


          <div className="col-12 col-lg-8 mt-3 mb-3">
            

          <div className="d-flex flex-column h-100 justify-content-center">

          
            <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
              <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval="10000">
                  <img src="/vectors/home_carousel_1.svg" className="d-block w-100 carousel-limit-height" alt="..."/>
                </div>
                <div className="carousel-item" data-bs-interval="2000">
                  <img src="/vectors/home_carousel_2.svg" className="d-block w-100 carousel-limit-height" alt="..."/>
                </div>
                <div className="carousel-item">
                  <img src="/vectors/home_carousel_3.svg" className="d-block w-100 carousel-limit-height" alt="..."/>
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          </div>
          <div className="col-12 col-lg-4 mt-3 mb-3 d-none d-lg-block">
            <div className="d-flex flex-column h-100 justify-content-center">
              <h1 className="title-primary-text">Todo tipo de negocios</h1>
              <div className="d-flex flex-column mt-3">
                <span className="title-secondary-text">Restaurantes, tiendas de ropa, tecnología, supermercados, libros.
                Tenemos soluciones para gran variedad de negocios</span>
              </div>
              <div className="btn btn-primary mt-4">Ver diseños</div>
            </div>
          </div>
        </div>
        <div className="row full-screen-height">
          <div className="col-12 col-lg-4 mt-3 mb-3">
            <div className="d-flex flex-column h-100 justify-content-center">
              <h1 className="title-primary-text">Multiples plataformas de pago</h1>
              <div className="d-flex flex-column mt-3">
                <span className="title-secondary-text">¡No pierdas más ventas! Con TiendApp puedes recibir pagos
                de muchas formas, de acuerdo a tus necesidades y las de tus clientes</span>
              </div>
              <div className="btn btn-primary mt-4">Saber más</div>
            </div>
          </div>
          <div className="col-12 col-lg-8 mt-3 mb-3 p-5">
            <div className="d-flex flex-column h-100 justify-content-center">
              <div className="row">
                <div className="col-12 col-md-6 col-lg-4 mb-3">
                  <div className="card h-100 p-2">
                    <div className="d-flex flex-column h-100 justify-content-center">
                      <img className="card-img-top" src="/png/nequi.png" alt="Nequi Logo"/>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 mb-3">
                  <div className="card h-100 p-2">
                    <div className="d-flex flex-column h-100 justify-content-center">
                      <img className="card-img-top" src="/vectors/daviplata.svg" alt="Daviplata Logo"/>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 mb-3">
                  <div className="card h-100 p-2">
                    <div className="d-flex flex-column h-100 justify-content-center">
                      <img className="card-img-top" src="/png/cash.png" alt="Cash Logo"/>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 mb-3">
                  <div className="card h-100 p-4">
                    <div className="d-flex flex-column h-100 justify-content-center">
                      <img className="card-img-top" src="/png/pse.png" alt="PSE Logo"/>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 mb-3">
                  <div className="card h-100 p-2">
                    <div className="d-flex flex-column h-100 justify-content-center">
                      <img className="card-img-top" src="/vectors/visa.svg" alt="VISA Logo"/>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 mb-3">
                  <div className="card h-100 p-2">
                    <div className="d-flex flex-column h-100 justify-content-center">
                      <img className="card-img-top" src="/vectors/mastercard.svg" alt="MASTERCARD Logo"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row full-screen-height">
          <div className="col-12 col-lg-4 mt-3 mb-3 d-block d-lg-none">
            <div className="d-flex flex-column h-100 justify-content-center">
              <h1 className="title-primary-text">Maneja tu tienda de forma sencilla, donde quiera que estés</h1>
              <div className="d-flex flex-column mt-3">
                <span className="title-secondary-text">Lleva el ordén de tu inventario, menu, ordenes y contabilidad
                desde cualquier dispositivo computador, tablet o smartphone, donde quiera que estés y completamente facil</span>
              </div>
              <a className="btn btn-primary mt-4" href="/signup">Empieza ahora</a>
            </div>
          </div>
          <div className="col-12 col-lg-8 mt-3 mb-3 p-5">
            <div className="d-flex flex-column h-100 justify-content-center">
              <img className="img-fluid"
              src="/vectors/all_devices.svg" alt="main"/>
            </div>
          </div>
          <div className="col-12 col-lg-4 mt-3 mb-3 d-none d-lg-block">
            <div className="d-flex flex-column h-100 justify-content-center">
              <h1 className="title-primary-text">Maneja tu tienda de forma sencilla, donde quiera que estés</h1>
              <div className="d-flex flex-column mt-3">
                <span className="title-secondary-text">Lleva el ordén de tu inventario, menu, ordenes y contabilidad
                desde cualquier dispositivo computador, tablet o smartphone, donde quiera que estés y completamente facil</span>
              </div>
              <a className="btn btn-primary mt-4" href="signup">Empieza ahora</a>
            </div>
          </div>
        </div>
        
      </div>
      <Footer/>
    </div>
    
  );
}