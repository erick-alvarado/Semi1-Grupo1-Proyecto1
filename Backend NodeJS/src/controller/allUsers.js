import Handler from "express";
import User from "../models/user.js"
import File from "../models/file.js"
import md5 from "md5";

export const allUsers = async(req, res) => {
    try {
        const users = await User.findAll()

        let usersList = []
        const files = await File.findAll({
            where:{
                visibilidad: "true"||true
            }
        })
        
        users.forEach(user => {
            //counting the amount of public files for each user
            let contador = 0
            files.forEach(file => {
                if(file.id_usuario == user.id_usuario)contador++
            });
            
            usersList.push({
                idUser: user.id_usuario,
                user: user.nombre,
                foto: user.url_foto,
                filespublic: contador
            })
        });
        return res.status(200).send({
            resulta: usersList
        })

    } catch (error) {
        return res.status(400).send({
            status: false,
            msg: error.message,
        })
    }
}