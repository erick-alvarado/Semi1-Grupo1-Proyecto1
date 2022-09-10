import Handler from "express";
import User from "../models/user.js"
import File from "../models/file.js"
import md5 from "md5";


export const editFile = async(req, res) =>{

    try {

        let { nombre, CambioNombre, contrasena, Private } = req.body

        const file = await File.findOne({
            where:{
                nombre: nombre,
            }
        })

        const user = await User.findOne({
            where:{
                id_usuario: file.id_usuario,
            }
        })

        if(user.contrasena == md5(contrasena)){
            console.log(Private)
            await File.update({
                nombre: CambioNombre,
                visibilidad: Private.toString() ,
            },{
                where:{
                    nombre: nombre,
                }
            })

            return res.status(200).send({
                msg:'Archivo modificado exitosamente',
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