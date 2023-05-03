import React, { Component } from 'react'
import { Link } from 'react-router'
import BannerProyectistas from '../banner-proyectistas/component'
import forumStore from 'lib/stores/forum-store/forum-store'

import config from 'lib/config'

class Footer extends Component {
  constructor(){
    super()
    this.state={
      forum:null
    }
  }

  componentDidMount(){
    forumStore.findOneByName('proyectos')
      .then((forum) => {
        this.setState({
          forum: forum,
          name: name
        })
      })
      .catch((err) => {
        if (err.status === 404) {
          window.location = '/404'
          return
        }

        throw err
      })
  }
  
  
  render(){
    const { forum } = this.state
    return( <div>
    {
      forum && forum.config.mostrarFormulariosProyectistas && <BannerProyectistas />
    }
  <footer className='footer-static'>
    <div className='container'>
      <div className='contacto-detalles'>
        <h3>CONTACTO</h3>
        <p>
          <span>Coordinación y Secretaría Técnica PP UNR</span>
          <span>Maipú 1065</span>
          <span>Email para consultas: <a name='mail de contacto' role='link' href="mailto:presupuestoparticipativo@unr.edu.ar">presupuestoparticipativo@unr.edu.ar</a></span>
        </p>
      </div>
      <div className='mapa-box'>
        <div>
          <iframe className='mapa' src="https://www.google.com/maps/embed/v1/place?q=universidad+nacional+de+rosario&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8" frameBorder="0" allowFullScreen/>
        </div>
      </div>
      <div className='social-icon'>
        <a className='social-facebook' href='https://facebook.com/unroficial/ ' target="_blank"/>
        <a className='social-instagram' href='https://instagram.com/unroficial/' target="_blank" />
        <a className='social-twitter' href='https://twitter.com/unroficial/' target="_blank" />
        <a className='social-mail' href='mailto:presupuestoparticipativo@unr.edu.ar' target="_blank"/>
      </div>
      <div className='logos'>
        <a name='Desarrollado por, democracia en red link a la pagina' role='link' href="https://democraciaenred.org/" rel="noopener noreferer" target="_blank">
          <div className='logo-der'>
            <img src="/ext/lib/site/footer/logo-der.png" alt="logo Democracia en Red"/>
            <span>Desarrollado por<br /><b>Democracia en red</b></span>
          </div>
        </a>
        <div className='logo'>
          <a  name='Link a la universidad nacional de rosario' role='link' className='logo-unr'   href='https://www.unr.edu.ar/' rel="noopener noreferer" target="_blank" />
        </div>
        <div className="logo-access">
          <img name='logo acceso universal'  src="/ext/lib/site/footer/accesibility-logo.png" alt="logo acceso universal" />
        </div>
        <div className='logo-flor'>
          <img name='Diseño Grafico Flor Balestra.' role='' src="/ext/lib/site/footer/logo-flor.png" alt="Diseño Grafico Flor Balestra."/>
        </div>
        <div className='logo-universidad'>
          <img name='Logo la universidad que queremos ' role='img' src="/ext/lib/site/footer/logo-universidad-que-queremos.png" alt="Universidad que queremos"/>
        </div>
      </div>
      <div className='terminos'>
        <Link to='/s/terminos-y-condiciones'> Términos y condiciones
        </Link>
        <a href="https://presupuestoparticipativo.unr.edu.ar/?page_id=1551" rel="noopener noreferer" target="_blank"> Reglamento
        </a>
      </div>
    </div>
  </footer>
  </div>
)
}}

export default Footer
