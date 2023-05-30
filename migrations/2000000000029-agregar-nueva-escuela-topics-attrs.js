const dbReady = require("lib/models").ready;

const models = require("lib/models");
const Forum = models.Forum;
const Escuela = models.Escuela;

const nombreMigrationParaLog = "votación forum attrs";

const nuevasEscuelas = [];

const deepCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};
/**
 * Make any changes you need to make to the database here
 */
class SaltearPromises {}
exports.up = function up(done) {
  dbReady()
    // updatear
    .then(() => Escuela.find())
    .then((escuelas) => {
      // agregamos escuelas options
      escuelas.forEach((e) =>
        nuevasEscuelas.push({ name: e._id, title: e.abreviacion })
      );

      return new Promise((resolve, reject) => {
        Forum.findOne({ name: "proyectos" }, (err, forumProyecto) => {
          if (err) reject(new Error(err));
          if (!forumProyecto || !forumProyecto.topicsAttrs)
            reject(
              new Error("No forum proyectos or no topicAttrs in it found")
            );

          let fieldEscuela = forumProyecto.topicsAttrs.find(
            (el) => el.name === "escuela"
          );
          fieldEscuela.options = nuevasEscuelas;

          forumProyecto.markModified("topicsAttrs");

          Forum.collection.save(forumProyecto, (err) => {
            if (err) reject(new Error(err));
            resolve();
          });
        });
      });
    })

    // Todo OK
    .then(() => {
      console.log(`-- Migración ${nombreMigrationParaLog} exitosa`);
      done();
    })
    // Error
    .catch((err) => {
      console.log(
        `-- Migración ${nombreMigrationParaLog} no funcionó! Error: ${err}`
      );
      done(err);
    });
};

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
exports.down = function down(done) {
  done();
};
