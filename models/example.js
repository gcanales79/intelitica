module.exports = function (sequelize, DataTypes) {
  var Example = sequelize.define("Example", {
    cliente: DataTypes.STRING,
    local: DataTypes.STRING,
    fecha_visita: DataTypes.DATE,
    celular: DataTypes.STRING,
    pregunta_1: DataTypes.STRING,
    pregunta_2: DataTypes.STRING,
    pregunta_3: DataTypes.STRING,
    preguntas_completas: {
      type: DataTypes.INTEGER,
      defaultValue:0

    },
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });


  return Example;
};
