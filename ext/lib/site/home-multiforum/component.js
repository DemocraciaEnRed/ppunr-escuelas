import React, { Component } from 'react'
import {Link} from 'react-router'
import config from 'lib/config'
import Anchor from 'ext/lib/site/anchor'
import BannerForoVecinal from 'ext/lib/site/banner-foro-vecinal/component'
import ThumbsVoto from 'ext/lib/site/thumbs-voto/component'
// import Barrios from 'ext/lib/site/barrios/component'
import Jump from 'ext/lib/site/jump-button/component'
import Footer from 'ext/lib/site/footer/component'
// import forumStore from 'lib/stores/forum-store/forum-store'
// import topicStore from 'lib/stores/topic-store/topic-store'
import textStore from 'lib/stores/text-store'
import escuelaStore from 'lib/stores/escuela-store'

export default class HomeMultiforumOverride extends Component {
  constructor (props) {
    super(props)

    this.state = {
      texts: {},
      escuelas: []
    }
  }

  componentWillMount () {
    textStore.findAllDict().then((textsDict) => {
      this.setState({
        texts: textsDict
      })
    }).catch((err) => {
      this.state = {
        texts: {}
      }
    })
  }

  componentDidMount () {
    this.goTop()
    escuelaStore.findAll().then(escuelas => this.setState({escuelas}))

  }

  goTop () {
    Anchor.goTo('container')
  }

  render () {
    return (
      <div className='ext-home-multiforum'>
        <Anchor id='container'>
          <BannerForoVecinal title="Presupuesto participativo - Escuelas" texts={this.state.texts} />
          <ThumbsVoto texts={this.state.texts} />
          <div className="banner-escuelas">
            <div className="container">
            {/* <h4>Participá subiendo ideas de tu escuela</h4> */}
            <h4>Votá los proyectos de tu escuela</h4>
              <div className="row" style={{width: '100%'}}>
                {this.state.escuelas.map(escuela => (
                  <div className="bloque-escuela col-md-4" key={escuela.id}>
                    {/* <p>Subí ideas para {escuela.abreviacion == 'IPS' ? 'el' : 'la'} <b>{escuela.tituloForo}</b></p> */}
                    <p>Votá los proyectos d{escuela.abreviacion == 'IPS' ? 'el' : 'e la'} <b>{escuela.tituloForo}</b></p>
                    <a className="foro-escuela-link"
                    href={`/propuestas?id=${escuela._id}`}>
                      <span className="glyphicon glyphicon-menu-right"></span>
                      Accedé a<br />
                      <span>{escuela.abreviacion == 'ESUPCOM' ? 'Superior' : escuela.nombre}</span> decide
                    </a>  
                  </div>
                ))}
              </div>
            </div>
            {/* {this.state.escuelas.length > 0 && this.state.escuelas.map(escuela => (
              <div
              key={escuela._id}
              className={`bloque-escuela bloque-escuela-${escuela.abreviacion}`}>
                <p>Votá los proyectos de {escuela.abreviacion == 'IPS' ? 'el' : 'la'} <b>{escuela.tituloForo}</b></p>
                <a className="foro-escuela-link"
                 href={`/propuestas?id=${escuela._id}`}>
                  <span className="glyphicon glyphicon-menu-right"></span>
                  Accedé al Foro<br />
                  <span>{escuela.abreviacion == 'ESUPCOM' ? 'Superior' : escuela.nombre}</span>
                </a>
              </div>
            ))} */}
          </div>
          {/* <Barrios /> */}
          <Jump goTop={this.goTop} />
          <Footer />
        </Anchor>
      </div>
    )
  }
}
