const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Dog",
    {
      id: {
        type: DataTypes.UUID, //UUID es para que genere un número random con letras/números y único, habilitado en sql
        defaultValue: DataTypes.UUIDV4,
        allowNull: false, //no permito que esté vacío
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      life_span: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
      createInDb: {
        //lo creo por si quiero acceder solo a lo que creé en base de datos
        type: DataTypes.BOOLEAN, //para que sea true en los creados
        allowNull: false,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};
