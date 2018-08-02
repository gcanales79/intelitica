var db = require("../models");

module.exports = function (app) {
  // Get all examples
  app.get("/api/examples", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });


  app.get("/api/pregunta1", function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'exampledb',
      port: 8889
    });
    connection.connect();
    connection.query('SELECT AVG(pregunta_1) AS promedio_1,fecha_visita FROM Examples GROUP BY fecha_visita', function (error, results) {
      if (error) throw error;
      console.log('The solution is: ', results);
      res.json(results);
    });
    connection.end();
  });

  // Create a new example
  app.post("/api/clients", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });
};
