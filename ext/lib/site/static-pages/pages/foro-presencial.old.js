import React, {Component} from 'react'
import { Link } from 'react-router'
import Footer from   'ext/lib/site/footer/component'
import Jump from 'ext/lib/site/jump-button/component'
import Anchor from 'ext/lib/site/anchor'
import userConnector from 'lib/site/connectors/user'

class Page extends Component {
  constructor (props) {
    super(props)

    this.state = {
      agenda: [],
      futureEvents: [],
      pastEvents: [],
      buttonPressed: [],
      isLoading: true
    }
  }

  componentDidMount () {
    this.goTop()
    this.getAgenda()
  }

  getAgenda = () => {
    window.fetch(`/api/agenda/all`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then((res) => {
      if (res.status === 200) {
        return res
      }
    })
    .then((res) => res.json())
    .then((res) => {
      // filter past events from future events with today datetime
      let today = new Date()
      res.forEach((event) => {
        event.fechaInicio = new Date(`${event.fecha}T${event.hora}:00-0300`)
        // add an hour to event.fechaInicio
        event.fechaFin = new Date(`${event.fecha}T${event.hora}:00-0300`)
        event.fechaFin.setHours(event.fechaFin.getHours() + 1)
        event.calendarURL = `https://www.google.com/calendar/render?action=TEMPLATE&text=PP+UNR%3A+Foro+presencial+-+${event.nombre}&details=Te+invitamos+a+ser+parte+del+foro+para+sumar+tu+idea&location=${event.lugar}&dates=${event.fechaInicio.toISOString().replaceAll('-','').replaceAll(':','').replaceAll('.000','')}%2F${event.fechaFin.toISOString().replaceAll('-','').replaceAll(':','').replaceAll('.000','')}`
      })
      let futureEvents = res.filter((item) => {
        let date = new Date(item.datetime)
        return date > today
      })
      let pastEvents = res.filter((item) => {
        let date = new Date(item.datetime)
        return date < today
      })
      this.setState({
        agenda: res,
        futureEvents: futureEvents,
        pastEvents: pastEvents,
        isLoading: false
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  onButtonPressed = (agendaId) => {
    // send a post to /api/settings/proyectistas/join using fetch
    let obj = {
      id: agendaId
    }
    window.fetch(`/api/agenda/assist`, {
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
        // alert('¡Te has anotado al evento! ¡Muchas gracias!')
        // add agendaId to buttonPressed array
        let buttonPressed = this.state.buttonPressed
        buttonPressed.push(agendaId)
        this.setState({
          buttonPressed: buttonPressed
        })
      } else {
        alert('Ups! Por favor, intentelo otra vez.')
      }
    })
    .catch((err) => {
      alert('Ups! Por favor, intentelo otra vez.')
      console.log(err)
    })
  }

  goTop () {
    Anchor.goTo('container')
  }

  render () {
    let { agenda, futureEvents, pastEvents, buttonPressed, isLoading } = this.state
    return (
      <div id="foro-presencial">
        <section className="the-banner">
          Votación presencial
        </section>
        <div className="the-subbanner-container">
          <div className="the-subbanner">
          {/* Finalizó la etapa de los Foros.<br />¡Ingresá para conocer las ideas! */}
          En estos puntos UNR Decide podrás votar de manera presencial. Te esperamos!
          </div>
        </div>
        <div className="the-content">
          <div className="container">
            <h3 className="text-center">Eventos pasados</h3>
            <div className="row" style={{ justifyContent: 'center' }}>
              {
                !isLoading && pastEvents.length > 0 && pastEvents.map((item, index) => (
                  <div className="col-md-4" key={index}>
                    <div className="past-event panel panel-default">
                      <div className="panel-body text-center">
                        <p className="past-title"><b>{item.nombre}</b></p>
                        <p className="past-date">{item.dia} de {item.mes} de {item.ano} - {item.hora}</p>
                        <p className="past-place"><small>{item.lugar}
                        {
                          this.props.user.state.fulfilled && item.asistentes.includes(this.props.user.state.value.id) && (
                            <span>&nbsp;-&nbsp;Asistiré&nbsp;<span className="glyphicon glyphicon-ok-sign"></span></span>
                          )
                        }
                        </small></p>
                      </div>
                    </div>
                  </div>
                ))
              }
              {
                isLoading && 
                <div className="col-md-12">
                  <p className="h6 text-center">Cargando eventos...</p>
                </div>
              }
              {
                !isLoading && pastEvents.length === 0 && (
                <div className="col-md-12">
                  <p className="h6 text-center">No hay eventos pasados para listar</p>
                </div>
                )
              }
            </div>
          </div>
        </div>
        <Jump goTop={this.goTop} />
        <Footer />
      </div>
    )
  }
}

export default userConnector(Page)
