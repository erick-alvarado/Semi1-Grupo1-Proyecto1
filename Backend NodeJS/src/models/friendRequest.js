import { DataTypes, Model } from "sequelize";
import { db } from "../database/db.js";

const friendRequest = db.define('solicitud',{
    id_solicitud:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_usuario_envia:{
        type: DataTypes.INTEGER,
    },
    id_usuario_acepta:{
        type: DataTypes.INTEGER,
    },
})

export default friendRequest