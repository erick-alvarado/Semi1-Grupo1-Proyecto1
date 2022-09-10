import { DataTypes, Model } from "sequelize";
import { db } from "../database/db.js";

const User = db.define('usuario',{
    id_usuario:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    correo:{
        type: DataTypes.STRING,
    },
    contrasena:{
        type: DataTypes.STRING,
    },
    nombre:{
        type: DataTypes.STRING,
    },
    url_foto:{
        type: DataTypes.STRING
    },
})

export default User