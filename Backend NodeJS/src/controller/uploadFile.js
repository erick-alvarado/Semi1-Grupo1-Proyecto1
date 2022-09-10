import Handler from "express";
import User from "../models/user.js"
import File from "../models/file.js"
import { uploadfile, getFileURL} from "./s3.js"
import md5 from "md5";


export const uploadFile = async(req, res) =>{

    try {
        uploadfile(req.files.file)
        let { nombre, Private, contrasena, user } = req.body
        let fileURL = await getFileURL(req.files.file.name)

        const tempUser = await User.findOne({
            where:{
                id_usuario:user,
            }
        }) 

        if(tempUser.contrasena == md5(contrasena)){
            const file = await File.create({
                id_usuario: user,
                nombre: nombre,
                fecha: new Date().toJSON().slice(0,10),
                url_archivo: fileURL,
                visibilidad: Private
            })

            return res.status(200).send({
                msg:'Archivo subido con exito',
                valid: true,
            })
        }else{
            return res.status(400).send({
                status:false,
                msg: 'Contrasena incorrecta',
            })
        }

        


    } catch (error) {
        return res.status(400).send({
            status:false,
            msg: error.message,
        })
    }
}