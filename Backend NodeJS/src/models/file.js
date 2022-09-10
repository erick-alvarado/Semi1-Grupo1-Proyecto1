import { DataTypes, Model } from "sequelize";
import { db } from "../database/db.js";

const File = db.define('archivo',{
    id_archivo:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_usuario:{
        type: DataTypes.INTEGER,
    },
    nombre:{
        type: DataTypes.STRING,
    },
    fecha:{
        type: DataTypes.DATE,
    },
    url_archivo:{
        type: DataTypes.STRING,
    },
    visibilidad:{
        type: DataTypes.STRING,
    },
})

export default File