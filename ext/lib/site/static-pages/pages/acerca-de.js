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
                    <p className='p-padding'>Pueden participar docentes, nodocentes, estudiantes, graduados y graduadas de cada Escuela: Agrotécnica, Superior y Politécnico.</p>
                  </div>

                  <div data-trigger="+ ¿En qué se basa la etapa de Foros del PP Escuelas?">
                    <p className='p-padding'>Cada Escuela tendrá su propio Foro que tiene por objetivo que quienes integran la comunidad propongan ideas que aporten en la construcción de la Escuela que quieran hacer realidad. También podrán inscribirse como proyectistas de cada Consejo Escolar respectivo. El Foro estará abierto desde el 23 de junio al 7 de julio. 
</p>
                  </div>

                  <div data-trigger="+ ¿Cómo participo?">
                    <p className='p-padding'>  Te invitamos a registrarte <Link to='/signup'>aquí</Link> para sumar ideas y comentar las ideas de otros/as participantes. Podrás también expresar tu interés (me gusta) y comentar las mismas. Es muy importante que fomentemos el diálogo informado y respetuoso. Además podrás inscribirte como proyectista del Consejo Escolar. No es necesario presentar ideas para ser proyectista. </p>
                  </div>

                  <div data-trigger="+ ¿Cuáles son los temas para proponer ideas?">
                    <p className='p-padding'> Vas a encontrar en el formulario <Link to='/formulario-idea'>(link)</Link> una serie de etiquetas que refieren a diversas áreas temáticas, pudiéndose reasignar por parte del equipo el PPUNR.  Sólo podrás elegir una, la que te parezca engloba más y mejor tu idea. La misma será retomada luego por el Consejo de tu Escuela.
                    <ul className='p-padding'>
                          <li>Ambiente y Sustentabilidad</li>
                          <li>Género, DDHH y Accesibilidad</li>
                          <li>Infraestructura</li>
                          <li>Académica y Aprendizajes </li>
                          <li>Vinculación con el medio</li>
                    </ul>
                    </p>
                  </div>

                  <div data-trigger="+  ¿Cómo subo una idea?">
                    <p className='p-padding'>Encontrarás aquí el espacio para proponer tu idea: incluí un título y escribí un breve párrafo explicándola. Agregá el área temática. Eso ayudará a agruparlas por afinidad para la próxima etapa: los Consejos Escolares. Recordá que te podés inscribir como proyectista para participar del Consejo de tu escuela. </p>
                  </div>

                  <div data-trigger="+ ¿Qué pasa si no puedo registrarme?">
                    <p className='p-padding'>Te invitamos a que nos mandes un correo con todos tus datos (nombre completo, DNI, Facultad, claustro, mail o forma de contacto) al mail de tu escuela:
                      <ul>
                        <li>Agrotécnica: <a href="mailto:presupuestoparticipativoagro@gmail.com">presupuestoparticipativoagro@gmail.com</a></li>
                        <li>Superior: <a href="mailto:superiorparticipativo@unr.edu.ar">superiorparticipativo@unr.edu.ar</a></li>
                        <li>Politécnico: <a href="mailto:presupuestoparticipativo@ips.edu.ar">presupuestoparticipativo@ips.edu.ar</a></li>
                      </ul>
                    </p>
                  </div>

                  <div data-trigger="+ ¿Cuántas ideas puedo subir?">
                    <p className='p-padding'>Podés subir todas las ideas que quieras aunque cada una en un formulario independiente.  Pueden ser de áreas temáticas diferentes. </p>
                  </div>

                  <div data-trigger="+ ¿Qué tipo de ideas esperamos que subas al Foro?">
                    <p className='p-padding'>Las ideas tienen que beneficiar a la comunidad de tu escuela</p>
                  </div>

                  <div data-trigger="+ ¿Puedo modificar mi idea una vez que fue enviada?">
                    <p className='p-padding'>Si, podés modificar tu idea todas las veces que quieras mientras el Foro esté abierto.</p>
                  </div>

                  <div data-trigger="+ ¿Cuándo se cierra el Foro?">
                    <p className='p-padding'>El Foro se cerrará el 7 de Julio. Hasta entonces tenés tiempo para modificar tu idea, intercambiar sobre las ideas de otros/as participantes e inscribirte para ser proyectista. </p>
                  </div>

                  <div data-trigger="+ ¿Qué pasará con mi idea?">
                    <p className='p-padding'>Otros/as participantes pueden comentar tu idea o darle like. Te invitamos a entrar en diálogo con otros/as participantes. Cerrado el Foro haremos una sistematización de ideas por temas. Las que sean aptas en el marco del PP, se retomarán en los Consejo Escolares, donde serán transformadas en proyectos elegibles para participar de la etapa de votación del PPUNR. </p>
                  </div>

                  <div data-trigger="+ Si no participé de una etapa anterior, ¿puedo sumarme?">
                    <p className='p-padding'>Podés sumarte en cualquier etapa del proceso aunque no hayas participado de las anteriores. Es decir, podés no haber propuesto o comentado ideas pero interesarte en sumar tu aporte como proyectista en el marco del Consejo Escolar. Tampoco será requisito haber participado de las etapas anteriores para votar.</p>
                  </div>

                  <div data-trigger="+ ¿Qué implica ser proyectista?">
                    <p className='p-padding'>Luego de los Foros, la segunda etapa del PP es la conformación del Consejo Escolar. El mismo estará integrado por todas las personas que se hayan propuesto para transformar las ideas en proyectos de cada Escuela. Funcionará durantes dos meses (agosto- septiembre) en el marco de encuentros con técnicos de la Universidad que contribuirán a darle factibilidad a los proyectos que serán elegidos por la comunidad y se ejecutarán en 2022</p>
                  </div>

                  <div data-trigger="+ ¿Qué condiciones deben respetar los proyectos?">
                    <p className='p-padding'>
                    <ul className='p-padding'>
                          <li>Ser elaborados por integrantes de más de un claustro.</li>
                          <li>No exceder el 70% del límite presupuestario. (1 millón 300 mil pesos).</li>
                          <li>No exceder el ámbito de la Escuela.</li>
                          <li>No afectar partidas presupuestarias de años posteriores. </li>
                          <li>Ser factibles técnicamente para poder ser ejecutados en caso de ser elegido.  </li>
                    </ul>
                    </p>
                  </div>


                  <div data-trigger="+ ¿Cuál es el monto asignado para cada Escuela en el PPUNR 2021?">
                    <p className='p-padding'>Cada Escuela tendrá disponible un millón trescientos mil pesos para discutir en el marco de su comunidad.</p>
                  </div>

                  

                  <div data-trigger="+ ¿Cómo elegiremos los proyectos a ejecutarse en 2022?">
                    <p className='p-padding'>Se realizarán jornadas de votación en el mes de octubre previa difusión de los proyectos elegibles, para que toda la comunidad de cada Escuela pueda decidir cuáles serán ejecutados hasta alcanzar el total de la partida presupuestaria afectada al PP Escuelas.  Como ningún proyecto puede exceder el 70% del límite presupuestario, al menos dos proyectos resultarán ganadores</p>
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
