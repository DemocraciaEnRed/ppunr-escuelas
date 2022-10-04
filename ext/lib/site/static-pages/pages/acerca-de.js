import React, { Component } from 'react'
import { Link } from 'react-router'
import Footer from 'ext/lib/site/footer/component'
import Jump from 'ext/lib/site/jump-button/component'
import Anchor from 'ext/lib/site/anchor'
// https://github.com/glennflanagan/react-responsive-accordion
import Accordion from 'react-responsive-accordion';

export default class Page extends Component {
  constructor (props) {
    super(props)

    this.state = {
      openSection: this.props.location.query.q === 'proyectista' ? 12 : 0
    }
  }

  componentDidMount () {
    this.goTop(this.props.location.query.q || 'container')
  }

  goTop (anchorId) {
    Anchor.goTo(anchorId)
  }

  render () {
    let { openSection } = this.state
    return (
      <div>
        <section className="banner-static-2022">
          <h1>Acerca de</h1>
        </section>
        <div className="post-banner-static-2022 container">
          <span>Inscribirte para a sumarte como proyectista del Consejo Escolar este 2022.</span>
        </div>
        <Anchor id='container' startPosition={openSection}>
          <div className="container">
          <div className="">
              <div className="">
                <p className='h4 text-center'>Podés leer el reglamento completo haciendo click <a href="https://presupuestoparticipativo.unr.edu.ar/reglamento/" rel="noopener noreferer" target="_blank">aquí</a></p>
                <br />
                <br />

                <Accordion>
                  <div data-trigger="+ ¿Quiénes pueden participar del PP Escuelas?">
                    <p className='p-padding'>
                    Pueden participar docentes, nodocentes, estudiantes y graduados/as de cada Escuela: Agrotécnica, Superior y Politécnico.
                    </p>
                  </div>
                  {/* <div data-trigger="+ ¿En qué se basa la etapa de Foros del PP Escuelas?">
                    <p className='p-padding'>
                    Cada Escuela tiene su propio Foro con el objetivo de que los/as integrantes de la comunidad propongan ideas que aporten en la construcción de la Escuela. Estarán abiertos desde el 10 de mayo al 24 de mayo. También podrás ahora sumarte para ser proyectista.
                    </p>
                  </div>
                  <div data-trigger="+ ¿Cómo participo?">
                    <p className='p-padding'>
                      Te invitamos a <Link href="/signup" className="text-primary">registrarte aquí</Link> para sumar ideas y comentar las ideas de otros/as participantes.  Podrás también expresar tu interés en apoyar y sumarte a alguna de las propuestas. Es muy importante que fomentemos el diálogo informado y respetuoso.
                    </p>
                    <p className='p-padding'>
                      También podrás inscribirte para ser proyectista del Consejo Escolar. No es necesario presentar una idea para ser proyectista.
                    </p>
                  </div>
                  <div data-trigger="+ ¿Cuáles son los temas para proponer ideas?">
                    <p className='p-padding'>
                    Vas a encontrar en el formulario una serie de etiquetas que refieren a diversos temas:
                    </p>
                    <p className='p-padding'>
                      <ul>
                      <li>Bienestar universitario</li>
                      <li>Deporte y Cultura</li>
                      <li>Espacios comunes</li>
                      <li>Ambiente y Sustentabilidad</li>
                      <li>Tecnologías e innovación</li>
                      </ul>
                    </p>
                    <p className='p-padding'>
                    Sólo podrás elegir una, la que te parezca define más y mejor tu idea. La misma luego será retomada por el área temática respectiva dentro del Consejo Escolar pudiendo ser reasignada por parte del equipo el PPUNR.
                    </p>
                  </div>
                  <div data-trigger="+ ¿Cómo subo una idea?">
                    <p className='p-padding'>
                    Encontrarás aquí el espacio para colocar tu idea: incluí un título y escribí un breve párrafo explicándola. Agregá una etiqueta  para clasificar tu idea. Podes usar emoticones y subir imágenes que ilustren la propuesta.
                    </p>
                    <p className='p-padding'>
                      <ul>
                      <li>Bienestar universitario</li>
                      <li>Deporte y Cultura</li>
                      <li>Espacios comunes</li>
                      <li>Ambiente y Sustentabilidad</li>
                      <li>Tecnologías e innovación</li>
                      </ul>
                    </p>
                    <p className='p-padding'>
                    Sólo podrás elegir una, la que te parezca define más y mejor tu idea. La misma luego será retomada por el área temática respectiva dentro del Consejo Escolar pudiendo ser reasignada por parte del equipo el PPUNR.
                    </p>
                  </div>
                  <div data-trigger="+ ¿Qué pasa si no puedo registrarme?">
                    <p className='p-padding'>
                    Te invitamos a que nos mandes un correo con todos tus datos (nombre completo, DNI, Escuela, claustro, mail o forma de contacto) a: <a href="mailto:presupuestoparticipativo@unr.edu.ar">presupuestoparticipativo@unr.edu.ar</a>
                    </p>
                  </div>
                  <div data-trigger="+ ¿Cuántas ideas puedo subir?">
                    <p className='p-padding'>
                    Podés subir todas las ideas que quieras, cada una en un formulario independiente. 
                    </p>
                  </div>
                  <div data-trigger="+ ¿Qué tipo de ideas esperamos que subas al Foro?">
                    <p className='p-padding'>
                    Las ideas tienen que beneficiar a la comunidad de tu escuela.
                    </p>
                  </div>
                  <div data-trigger="+ ¿Puedo modificar mi idea una vez que fue enviada?">
                    <p className='p-padding'>
                    Si, puedes modificar tu idea tantas veces como quieras mientras el Foro esté abierto.
                    </p>
                  </div>
                  <div data-trigger="+ ¿Cuándo se cierra el Foro?">
                    <p className='p-padding'>
                    El Foro se cerrará el 24 de mayo. Hasta entonces tenés tiempo para modificar tu idea, intercambiar sobre las ideas de otros/as participantes y sumarte como proyectista
                    </p>
                  </div>
                  <div data-trigger="+ ¿Qué pasará con mi idea?">
                    <p className='p-padding'>
                    Otros/as participantes pueden comentar tu idea o apoyarla. Te invitamos a entrar en diálogo con otros/as participantes. Luego haremos una sistematización de ideas por temas y serán desarrolladas por quienes se inscriban para ser proyectistas de cada Consejo Escolar. 
                    </p>
                  </div> */}
                  <div data-trigger="+ Si no participé de una etapa anterior, ¿puedo sumarme?">
                    <p className='p-padding'>
                    Podés sumarte en cualquier etapa del proceso aunque no hayas participado de las anteriores. Es decir, podés no haber propuesto o comentado ideas pero interesarte por sumar tu aporte como proyectista o elegir en la votación tus proyectos favoritos para ser ejecutados. 
                    </p>
                  </div>
                  {/* <div data-trigger="+ ¿Qué implica ser proyectista?">
                    <Anchor id='proyectista'>
                      <p className='p-padding'>
                      Luego de los Foros, la segunda etapa del PP es la conformación de los Consejos Escolares. Los mismos estarán integrados por todas las personas que se hayan propuesto para transformar las ideas en proyectos. Tendremos algunos encuentros, inclusive con técnicos de la Universidad que contribuirán a darle factibilidad a los proyectos, que serán elegidos por la comunidad y serán ejecutados en 2023.
                      </p>
                    </Anchor>
                  </div> */}
                  <div data-trigger="+ ¿Qué condiciones deben respetar los proyectos?">
                    <p className='p-padding'>
                      <ul>
                        <li>Ser elaborados por integrantes de más de un claustro. </li>
                        <li>No exceder el límite presupuestario (1 millón y medio de pesos).</li>
                        <li>El monto de cada proyecto no puede superar el 70% de la partida asignada</li>
                        <li>No exceder el ámbito de la Universidad.</li>
                        <li>No afectar partidas presupuestarias de años posteriores.</li>
                        <li>Ser factibles técnicamente para poder ser ejecutados en caso de ser elegido.</li>
                      </ul>
                    </p>
                  </div>
                  <div data-trigger="+ ¿Cuál es el monto asignado para cada Escuela en el PPUNR 2022?">
                    <p className='p-padding'>
                    Cada Escuela tendrá disponible un millón y medio de pesos para discutir en el marco de su comunidad.
                    </p>
                  </div>
                  <div data-trigger="+ ¿Cómo elegiremos los proyectos a ejecutarse en 2023?">
                    <p className='p-padding'>
                    Se realizarán jornadas de votación (del 12 al 21 de octubre de 2022), previa difusión de los proyectos elegibles, para que toda la comunidad de la Escuela pueda decidir cuáles serán ejecutados hasta alcanzar el total de la partida presupuestaria disponible.
                    </p>
                  </div>
                </Accordion>

              </div>
            </div>
            <br />
            <br />
            <br />
          </div>
        </Anchor>
        <Jump goTop={this.goTop} />
        <Footer />
      </div>
    )
  }
}
