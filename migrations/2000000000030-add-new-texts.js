const dbReady = require('lib/models').ready

const Text = require('lib/models').Text

const textsData = [
	{ "name": "home-nombre", "text": "Presupuesto participativo - Escuelas" },
	{ "name": "evento-titulo", "text": "Presupuesto participativo - Escuelas" },
	{ "name": "evento-bajada", "text": "En estos puntos UNR Decide podrás votar de manera presencial. Te esperamos!" },
    { "name": "evento-pestaña", "text": "votación presencial" },
    { "name": "reglamento-link", "text": "https://presupuestoparticipativo.unr.edu.ar/?page_id=1551" },



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
