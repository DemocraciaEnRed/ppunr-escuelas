import React, { Component } from 'react'
import { Link } from 'react-router'
import Footer from 'ext/lib/site/footer/component'
import Jump from 'ext/lib/site/jump-button/component'
import Anchor from 'ext/lib/site/anchor'
// https://github.com/glennflanagan/react-responsive-accordion
import Accordion from 'react-responsive-accordion';

export default class Page extends Component {
  componentDidMount () {
    const u = new window.URLSearchParams(window.location.search)
    if (u.get('scroll') === 'cronograma') return Anchor.goTo('cronograma')
    this.goTop()
  }

  goTop () {
    window.scrollTo(0,0)
  }

  render () {
    return (
      <div>
        <section className="banner-static">
          <div className="banner"></div>
          <div className='contenedor'>
            <div className='fondo-titulo'>
              <h1>Presupuesto Participativo UNR</h1>
            </div>
          </div>
        </section>
        <div id='container' className="container-imagen-acerca-de">
          <div className='ext-acerca-de container'>
            <div className="filas">
              <div className="fila faq text-left">
                <p className='p-padding'>Podés leer el reglamento completo haciendo click <a href="https://presupuestoparticipativo.unr.edu.ar/?page_id=1551" rel="noopener noreferer" target="_blank">aquí</a></p>

                <Accordion>
                  <div data-trigger="+ ¿Quiénes pueden participar del PP Escuelas?">
                    <p className='p-padding'>
                      Pueden participar docentes, nodocentes, estudiantes, graduados y graduadas de cada Escuela: Agrotécnica, Superior y Politécnico.
                    </p>
                  </div>

                  <div data-trigger="+ ¿Cuántos proyectos puedo elegir?">
                    <p className='p-padding'>
                      Podés votar uno, dos o tres proyectos.
                    </p>
                  </div>

                  <div data-trigger="+ ¿Qué pasa si no puedo registrarme?">
                    <p className='p-padding'>
                      Te invitamos a que nos mandes un correo con todos tus datos (nombre completo, DNI, Escuela, claustro, mail o forma de contacto) a presupuestoparticipativo@unr.edu.ar 
                    </p>
                  </div>

                  <div data-trigger="+ Si no participé de una etapa anterior, ¿puedo sumarme?">
                    <p className='p-padding'>
                      Podés sumarte en cualquier etapa del proceso aunque no hayas participado de las anteriores. Es decir, podés no haber propuesto o comentado ideas pero interesarte en sumar tu aporte como proyectista en el marco del Consejo Escolar. Tampoco será requisito haber participado de las etapas anteriores para votar.
                    </p>
                  </div>

                  <div data-trigger="+  ¿Cuál es el monto asignado al PPUNR edición 2021?">
                    <p className='p-padding'>
                      Cada Escuela tendrá disponible un millón trescientos mil pesos para discutir en el marco de su comunidad.
                    </p>
                  </div>

                  <div data-trigger="+ ¿Cómo elegimos los proyectos a ejecutarse en 2022?">
                    <p className='p-padding'>
                      Se realizarán jornadas de votación desde el 24/11 a las 10hs hasta el 03/12 a las 23hs, previa difusión de los proyectos elegibles, para que toda la comunidad de cada Escuela pueda decidir cuáles serán ejecutados hasta alcanzar el total de la partida presupuestaria afectada al PP Escuelas.  Como ningún proyecto puede exceder el 70% del límite presupuestario, al menos dos proyectos resultarán ganadores.
                    </p>
                  </div>

                </Accordion>

              </div>
            </div>
          </div>
        </div>
        <Jump goTop={this.goTop} />
        <Footer />
      </div>
    )
  }
}
