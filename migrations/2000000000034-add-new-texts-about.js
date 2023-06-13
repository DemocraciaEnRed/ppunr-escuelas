const dbReady = require('lib/models').ready

const Text = require('lib/models').Text

const textsData = [
	{ "name": "about-bajada", "text": "Inscribirte para a sumarte como proyectista del Consejo Escolar este 2023." },
{ "name": "about-reglamento", "text": "<p>Podés leer el reglamento completo haciendo click <a href='https://presupuestoparticipativo.unr.edu.ar/reglamento/' rel='noopener noreferer' target='_blank'>aquí</a> </p>" },
]

/**
 * Make any changes you need to make to the database here
 */
class SaltearPromises { }
exports.up = function up (done) {
  dbReady()
    // Primero chequear si ya no hay cosas cargadas
    .then(() => {
      return new Promise((resolve, reject) => {
        Text.collection.count({}, (err, count) => {
          if (err) reject(new Error(err))
          
          resolve()
        })
      })
    })
    // Agregamos textos
    .then(() => Text.collection.insertMany(textsData))
    // Devolvemos al Migrator (de lib/migrations)
    .then(() => {
      console.log(`-- Agregados textos de portada`)
      done()
    })
    .catch((err) => {
      if (err instanceof SaltearPromises)
        done()
      else{
        console.log('-- Actualizacion de textos de portada no funcionó! Error: ', err)
        done(err)
      }
    })
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
exports.down = function down(done) {
  done();
};
