const dbReady = require('lib/models').ready
const models = require('lib/models')

const nombreMigrationParaLog = 'cargar etiquetas y ejes'
const Tag = models.Tag

const tags = [

  { nombre: 'Espacio Comunes', color: '#0396A6' },

]

/**
 * Make any changes you need to make to the database here
 */
exports.up = function up(done) {
  // done() devuelve al Migrator de lib/migrations
  dbReady()

    // borramos data vieja
    .then(() => Tag.collection.find({}).toArray())
    // Agregamos data
    .then(tagsData => {
      tagsData.forEach(tag => {
        const data = tags.find(t => t.nombre === tag.name)
        if (data) {
          delete data.nombre
          Tag.collection.findOneAndUpdate(
            { _id: tag._id },
            { $set: data }
          )
        }
      })
    })

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