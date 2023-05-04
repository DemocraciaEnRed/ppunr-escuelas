const dbReady = require('lib/models').ready
const models = require('lib/models')

const nombreMigrationParaLog = 'cargar escuela'
const Escuela = models.Escuela

const escuela = {
    nombre: 'Sociales',
    abreviacion: 'ESyH',
    urlCorta: 'Sociales',
    mailPadron: 'escuelamediasyh@unr.edu.ar',
    tituloForo: 'Escuela Media en Ciencias Sociales y Humanísticas',
  }

/**
 * Make any changes you need to make to the database here
 */
exports.up = function up (done) {
  // done() devuelve al Migrator de lib/migrations
  dbReady()

    // Primero chequear si ya no hay cosas cargadas
    .then(() => {
      return new Promise((resolve, reject) => {
        Escuela.collection.count({}, (err, count) => {
          if (err) reject(new Error(err))
          if (count) {
            console.log('Ya hay escuelas cargadas (%s), se agrega (%s) ', count, escuela.nombre)
          }
          resolve()
        })
      })
    })

    // Agregamos data
    .then(() => Escuela.collection.insertOne(escuela))

    // Todo OK
    .then(() => {
      console.log(`-- Migración ${nombreMigrationParaLog} exitosa`)
      done()
    })
    // Error
    .catch((err) => {
      console.log(`-- Migración ${nombreMigrationParaLog} no funcionó! Error: ${err}`)
      done(err)
    })
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
exports.down = function down(done) {
  done();
};
