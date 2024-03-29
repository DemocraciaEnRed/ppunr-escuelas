import React, { Component } from 'react'
import { Link } from 'react-router'
import userConnector from 'lib/site/connectors/user'
import config from 'lib/config'
import NanoModal from 'nanomodal';

let modalRef = null

class BannerProyectistas extends Component {
  constructor (props) {
    super(props)
    this.state = {
      buttonPressed: false,
    }
  }

  componentDidMount() {
    // Crea una instancia de NanoModal y asigna su referencia al ref del componente
    modalRef = NanoModal("¿Querés inscribirte como proyectista?", {
      classes:'modalContent',
      overlayClose: true, // Can't close the modal by clicking on the overlay.
      buttons: [{
          text: "SI",
          handler: (modal) => {
              // do something...
              this.onButtonPressed()
              modal.hide();
          },
          classes:'boton boton-primary',
      }, {
          text: "NO",
          classes:'boton boton-error',
          handler: "hide"
      }],
  });
  modalRef.customShow = function(defaultShow, modalAPI) {
    modalAPI.overlay.el.style.position = 'fixed'
    modalAPI.overlay.el.style.display = 'block';
    modalAPI.modal.el.style.display = 'block';
};
  }
  
  openModal = () => {
    modalRef.customShow(modalRef.show, modalRef);
    // Abre el modal cuando se hace clic en el botón
  }

  onButtonPressed = () => {
    // send a post to /api/settings/proyectistas/join using fetch
    let obj = {apa: 'apa'}
    window.fetch(`/api/settings/proyectistas/join`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then((res) => {
      if (res.status === 200) {
        this.setState({
          buttonPressed: true
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }

  scrollToProyectistas = () => {
    let element = document.getElementById('proyectistas')
    element.scrollIntoView({
      block: 'center',
      behavior: 'smooth'
    })
  }

  render () {
  const { user } = this.props
  const { buttonPressed } = this.state

   return (
    <div id="proyectistas" className="banner-proyectistas">
      {
        (this.props.user.state.rejected || (this.props.user.state.fulfilled && !this.props.user.state.value.proyectista && !buttonPressed)) &&
        <div className="follow-container" onClick={this.scrollToProyectistas}>
          <a className="follow-proyectistas">
            <span className="follow-text"> 
              <img src="/ext/lib/site/banner-proyectistas/proyectistas.png" alt="Icono proyectistas"/>
              Quiero ser proyectista</span>
          </a>
        </div>
      }
      <img src="/ext/lib/site/banner-proyectistas/proyectistas.png" className="image-large" alt="Icono proyectistas"/>
      <p className="title"><strong>¡Sumate como Proyectista!</strong></p>
      <p className="subtitle">Te invitamos a sumarte como proyectista del Consejo Escolar este {config.currentEdition}</p>
      {
        (() => {
          if (this.props.user.state.fulfilled && (this.props.user.state.value.proyectista || buttonPressed)) {
            return (
              <div className="boton-soy-proyectista">¡SOY PROYECTISTA!</div>
            )
          }
          if (this.props.user.state.fulfilled && !this.props.user.state.value.proyectista && !buttonPressed) {
            return (
              <button type="button" onClick={this.openModal} className="boton-ser-proyectista">QUIERO SER PROYECTISTA</button>
            )
          }
        })()
      }
      {
        buttonPressed && <div>
          <p className="thanks"><i>¡Gracias por sumarte a ser proyectista!</i></p>
        </div>
      }
      {this.props.user.state.rejected && (
        <div>
          <p><i>Para sumarte como proyectista tenés que iniciar sesión</i></p>
          <Link to={'/signin'} className="boton-iniciar-sesion">Iniciar Sesión</Link>
        </div>
      )}
      <div>
      <p className="help-text"><i className="icon-info icon-large"></i> <u>Ser proyectista</u> implica transformar las ideas en proyectos. <br/>Podes informarte más acerca de que es ser proyectista en la sección de <Link href="/acerca-de">Información</Link></p>      </div>
    </div>

   )
  }
}

export default userConnector(BannerProyectistas)