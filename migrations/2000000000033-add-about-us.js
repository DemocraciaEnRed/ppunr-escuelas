const dbReady = require('lib/models').ready

const aboutUs = require('lib/models').aboutUs

const aboutUsData = [
  {
    order:0,
    question: '+ ¿Quiénes pueden participar del PP Escuelas?',
    answer: 'Pueden participar docentes, nodocentes, estudiantes y graduados/as de cada Escuela: Agrotécnica, Sociales, Superior y Politécnico.'
  },
  {
    order:1,
    question: '+ Si no participé de una etapa anterior, ¿puedo sumarme?',
    answer: 'Podés sumarte en cualquier etapa del proceso aunque no hayas participado de las anteriores. Es decir, podés no haber propuesto o comentado ideas pero interesarte por sumar tu aporte como proyectista o elegir en la votación tus proyectos favoritos para ser ejecutados. '
  },
  {
    order:2,
    question:"+ ¿Qué implica ser proyectista?",
    answer:'Luego de los Foros, la segunda etapa del PP es la conformación de los Consejos Escolares. Los mismos estarán integrados por todas las personas que se hayan propuesto para transformar las ideas en proyectos. Tendremos algunos encuentros, inclusive con técnicos de la Universidad que contribuirán a darle factibilidad a los proyectos, que serán elegidos por la comunidad y serán ejecutados en 2023.'
  },
  {
    order:3,
    question: '+ ¿Qué condiciones deben respetar los proyectos?',
    answer: `<ul>
              <li>Ser elaborados por integrantes de más de un claustro. </li>
              <li>No exceder el límite presupuestario (1 millón y medio de pesos).</li>
              <li>El monto de cada proyecto no puede superar el 70% de la partida asignada</li>
              <li>No exceder el ámbito de la Universidad.</li>
              <li>No afectar partidas presupuestarias de años posteriores.</li>
              <li>Ser factibles técnicamente para poder ser ejecutados en caso de ser elegido.</li>
            </ul>`
  },
  {
    order:4,
    question: '+ ¿Cuál es el monto asignado para cada Escuela en el PPUNR 2022?',
    answer: 'Cada Escuela tendrá disponible un millón y medio de pesos para discutir en el marco de su comunidad.'
  },
  {
    order:5,
    question: '+ ¿Cómo elegiremos los proyectos a ejecutarse en 2023?',
    answer: 'Se realizarán jornadas de votación (del 12 al 21 de octubre de 2022), previa difusión de los proyectos elegibles, para que toda la comunidad de la Escuela pueda decidir cuáles serán ejecutados hasta alcanzar el total de la partida presupuestaria disponible.'
  },
]

/**
 * Make any changes you need to make to the database here
 */
exports.up = function up(done) {
  dbReady()
    // Primero chequear si ya no hay cosas cargadas
    .then(() => {
      return new Promise((resolve, reject) => {
        aboutUs.collection.count({}, (err, count) => {
          if (err) reject(new Error(err))
          if (count) {
            console.log('Ya hay (%s) preguntas y respuestas cargadas', count)
            reject(new SaltearPromises())
          }
          resolve()
        })
      })
    })
    // Agregamos preguntas y respuestas
    .then(() => aboutUs.collection.insertMany(aboutUsData))
    // Devolvemos al Migrator (de lib/migrations)
    .then(() => {
      console.log(`-- Agregadas las preguntas y respuestas de la seccion "acerca de"`)
      done()
    })
    .catch((err) => {
      if (err instanceof SaltearPromises) {
        done()
      } else {
        console.log('-- Actualizacion de acerca de no funcionó! Error: ', err)
        done(err)
      }
    })
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
exports.down = function down(done) {
  done()
}