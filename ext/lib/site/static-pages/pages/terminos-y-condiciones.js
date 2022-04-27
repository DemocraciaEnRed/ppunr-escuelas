import React, {Component} from 'react'
import Footer from   'ext/lib/site/footer/component'
import Jump from 'ext/lib/site/jump-button/component'
import Anchor from 'ext/lib/site/anchor'

export default class Page extends Component {
  componentDidMount () {
    this.goTop()
  }

  goTop () {
    Anchor.goTo('container')
  }

  render () {
    return (
      <div>
        {/* <section className="banner-static">
          <div className="banner"></div>
          <div className='contenedor largo'>
            <div className='fondo-titulo'>
              <h1>Términos y Condiciones</h1>
            </div>
          </div>
        </section> */
      }
      <section className="banner-static-2022">
        <h1>Términos y condiciones</h1>
      </section>
      <Anchor id='container'>
        <div className='container'>
            <h2><span>Descripción</span></h2>
            <p>Los siguientes Términos y Condiciones regulan el uso de la Plataforma UNR Presupuesto Participativo.<br />
              El registro y uso de la plataforma por parte de usuarios/as indica la aceptación absoluta de los Términos y Condiciones presentes y de la Política de Privacidad.<br />
              La plataforma UNR Presupuesto Participativo es un sitio web que promueve la democracia interna de la Universidad. Esta herramienta favorece la generación de espacios de colaboración para co-diseñar y co-producir valor público.
            </p>

            <h2><span>Registro en la plataforma web</span></h2>
            <p>
              El ingreso a UNR Presupuesto Participativo no requiere registro online previo, el mismo será requerido si la/el usuaria/o desea publicar contenidos o interactuar con otros/as usuarios/as.<br />
              Esperamos que te registres usando tu nombre. Las cuentas de "bots" u otros registros automáticos no están permitidas. Los/as usuarios/as son responsables de preservar la privacidad de su cuenta protegiendo el acceso a sus contraseñas.<br /> Por favor, ante cualquier ingreso indebido en tu cuenta, comunicate inmediatamente a través de  <a href="mailto:presupuestoparticipativo@unr.edu.ar">presupuestoparticipativo@unr.edu.ar</a>.</p>

            <h2><span>Validación de usuarios</span></h2>
            <p>UNR Presupuesto Participativo se reserva el derecho de validar la información brindada por la/el usuaria/o al momento de la inscripción. En caso de que la información brindada no pueda validarse, Presupuesto Participativo se reserva el derecho de no dar de alta a ese usuario/a. Por su parte, Presupuesto Participativo deslinda su responsabilidad en el caso de no ser veraz la información suministrada al respecto.<br />
              Al momento de la inscripción el/la usuario/a asume el compromiso y la responsabilidad de:</p>
            <ul>
              <li>No proporcionar información personal falsa ni crear cuentas a nombre de terceras personas sin autorización.</li>
              <li>No crear más de una cuenta personal.</li>
              <li>No compartir la contraseña ni permitir que otra persona acceda a su cuenta.</li>
              <li>Los/as usuarios/as se comprometen a notificar a UNR Presupuesto Participativo del uso no autorizado de su clave.</li>
              <li>UNR Presupuesto Participativo se reserva el derecho de rechazar cualquier solicitud de inscripción o de cancelar un registro previamente aceptado.</li>
            </ul>

            <h2><span>Usuarios, obligaciones y condiciones</span></h2>
            <p>
              La/El usuaria/o deberá respetar estos Términos y Condiciones de Uso. Las infracciones por acción u omisión de estos Términos y Condiciones de Uso generarán el derecho a favor de Presupuesto Participativo de suspender al/la usuario/a que las haya realizado.<br />
              La/El usuaria/o es responsable del contenido que suba, publique o muestre en UNR Presupuesto Participativo, garantizando que el mismo no infringe derechos de terceras personas ni los Términos y Condiciones de Uso ni viola ninguna ley, reglamento u otra normativa. <br />Los/as usuarios/as entienden y aceptan que el material y/o contenido que suba y/o publique podría ser utilizado por otros/as usuarios/as de la plataforma web y/o por terceras personas ajenas, y que UNR Presupuesto Participativo no será responsable en ningún caso por tales utilizaciones.<br />
              La/El usuaria/o debe usar UNR Presupuesto Participativo en forma correcta y lícita. En caso contrario, UNR Presupuesto Participativo podrá retirar el contenido y/o suspender la cuenta de aquellos/as usuarios/as que incurran en actitudes contrarias a estos términos y condiciones y/o de la política de privacidad, ofensivas, ilegales, violatorias de derechos de terceras personas, contrarias a la moral y buenas costumbres y/o amenaza para la seguridad de otros usuarios.<br />
              En relación a los aportes, colaboraciones y comentarios que los/as usuarios/as realicen con respecto a las iniciativas propuestas, las mismas no son de carácter vinculante, obligatorio y/o impositivo sobre las acciones de la Universidad Nacional de Rosario.
            </p>

            <h2><span>Actividades Prohibidas</span></h2>
            <p>Las siguientes actividades, sean lícitas o ilícitas, se encuentran expresamente vedadas, sin perjuicio de las prohibiciones generales expuestas anteriormente:</p>
            <ul>
              <li>Hostigar, acosar, amenazar, acechar, realizar actos de vandalismo hacia otros/as Usuarios/as.</li>
              <li>Infringir los derechos a la intimidad de otros/as Usuarios/as.</li>
              <li>Solicitar información personal identificable de otros/as Usuarios/as con el propósito de hostigar, atacar, explotar, violar la intimidad de personas</li>
              <li>Publicar de manera intencionada o con conocimiento injurias o calumnias</li>
              <li>Publicar, con el intento de engañar, contenido que es falso o inexacto</li>
              <li>Intentar usurpar la identidad de otro/a Usuario/a, representando de manera falsa su afiliación con cualquier individuo o entidad, o utilizar el nombre de otro/a Usuario/a con el propósito de engañar</li>
              <li>Promover, defender o mostrar pornografía, obscenidad, vulgaridad, blasfemia, odio, fanatismo, racismo y/o violencia. En caso de sufrir alguna de estas situaciones, comunicarse con el Administrador a través de UNR Presupuesto Participativo</li>
              <li>Vulnerar los derechos establecidos en la Ley N° 25.326 de Protección de Datos Personales. ​</li>
            </ul>
            <p>En caso de sufrir alguna de estas situaciones, comunicarse con Presupuesto Participativo a través de  <a href="mailto:presupuestoparticipativo@unr.edu.ar">presupuestoparticipativo@unr.edu.ar</a>.</p>

            <h2><span>Moderación de la actividad en Presupuesto Participativo</span></h2>
            <p>La actividad en esta plataforma web contará con moderadores/as responsables de hacer cumplir estos Términos y Condiciones de Uso. Los/as mismos/as serán designados/as por la  Universidad Nacional de Rosario en pos de fomentar un diálogo franco y abierto que evite afrentas a personas o instituciones, material comercial no relacionado (SPAM) u otros desvíos de la intención original de Presupuesto Participativo.</p>
            <ul>
              <li>Rechazar o eliminar contenido que no cumpla con estos términos de uso o que, de alguna forma, sea cuestionable.</li>
              <li>Quitar el acceso a quien no cumpliera, de alguna forma, con estos términos de uso.</li>
            </ul>

            <h1><span>Políticas de Privacidad</span></h1>
            <p>
              La recolección y tratamiento de los datos personales tiene como finalidad conocer sobre el uso de Presupuesto Participativo y mejorar la propuesta.<br />
              Universidad Nacional de Rosario no cederá a ninguna otra persona ni organismo los datos personales de los participantes, salvo orden judicial. Los datos recabados tienen por único objeto verificar que las propuestas sean presentadas por personas legalmente habilitadas para hacerlo y evitar abusos en el uso de la plataforma. Esta información será utilizada exclusivamente para obtener estadísticas generales de los/as usuarios/as.</p>

            <h3><span>Información proporcionada por los usuarios:</span></h3>
            <p>
              Las interacciones en UNR Presupuesto Participativo requiere que los/as usuarios/as se registren. En ese caso, se solicitará información personal, como nombre y apellido, documento, dirección legal y dirección de correo electrónico. El perfil que es visible públicamente puede incluir el nombre y la foto seleccionada.<br />
              Asimismo, si un/a usuario/a se pone en contacto con UNR Presupuesto Participativo, es posible que guardemos constancia de la comunicación para poder resolver más fácilmente cualquier incidencia que se haya producido.<br />
              Las direcciones de correo electrónico o cuenta de Facebook sólo se utilizarán para enviar notificaciones sobre el uso de la plataforma, avisos sobre futuras votaciones o consultas y otra información sobre el Presupuesto Participativo. No obstante, cada usuario/a podrá darse de baja en cualquier momento si así lo desea.</p>

            <h2><span>Información obtenida a partir del uso de la plataforma:</span></h2>
            <p>
              UNR Presupuesto Participativo puede recopilar información sobre la forma en que los/as usuarios/as usan la plataforma. Entre la información obtenida de esta forma, se incluye el tipo de navegador utilizado, la preferencias de lenguaje y, por ejemplo, los comentarios que ha realizado.<br />
              UNR Presupuesto Participativo podrá compartir información de manera agregada, y en carácter no personal, con el público en general (por ejemplo, mostrar tendencias sobre el uso del sitio).<br />
              UNR Presupuesto Participativo garantiza la debida protección de los datos personales almacenados en esta plataforma web así como también el acceso a la información registrada en el mismo, de conformidad a lo establecido en el artículo 43, párrafo tercero de la Constitución Nacional y la Ley N° 25.326 de Protección de los Datos Personales.<br />
            </p>

            <p><span></span></p>
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
