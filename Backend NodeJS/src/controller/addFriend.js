import Handler from "express";
import User from "../models/user.js"
import File from "../models/file.js"
import friendRequest from "../models/friendRequest.js"
import md5 from "md5";

export const addFriend = async(req, res) => {
    try {

        const { user, amigo } = req.body

        const solicitud = await friendRequest.create({
            id_usuario_envia: user,
            id_usuario_acepta: amigo,
        })

        return res.status(200).send({
            msg:'Amigo agregado con exito',
            valid: true,
        })

    } catch (error) {
        return res.status(400).send({
            status: false,
            msg: error.message,
        })
    }
}