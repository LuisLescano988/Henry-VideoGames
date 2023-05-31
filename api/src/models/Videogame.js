const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    releaseDate:{
      type: DataTypes.STRING
    },
    rating:{
      type: DataTypes.FLOAT
    },
    platforms:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    img:{
      type: DataTypes.TEXT,
      defaultValue:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvQW8GFsXXIhXaXKOM_MfcHp3DKtsBjeKEuA&usqp=CAU'
    },    
    dbCreated:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {timestamps: false}
  );
};
