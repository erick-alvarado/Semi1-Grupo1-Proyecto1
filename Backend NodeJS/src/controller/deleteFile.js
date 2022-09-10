import Handler from "express";
import User from "../models/user.js"
import File from "../models/file.js"
import md5 from "md5";


export const deleteFile = async(req, res) =>{

    try {

        let { contrasena, NombreArchivo } = req.body

        const file = await File.findOne({
            where:{
                nombre: NombreArchivo,
            }
        })

        const user = await User.findOne({
            where:{
                id_usuario: file.id_usuario,
            }
        })

        if(user.contrasena == md5(contrasena)){
            await File.destroy({
                where:{
                    nombre: NombreArchivo,
                }
            })

            return res.status(200).send({
                msg:'Archivo eliminado',
                valid: true,
            })
        }else{
            return res.status(400).send({
                msg:'Contrasena incorrecta',
                valid: true,
            })
        }
        

    } catch (error) {
        return res.status(400).send({
            status:false,
            msg: error.message,
        })
    }
}