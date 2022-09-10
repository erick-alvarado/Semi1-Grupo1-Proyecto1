import Handler from "express";
import User from "../models/user.js"
import File from "../models/file.js"
import md5 from "md5";

export const login = async(req, res) => {
    try {
        
        let { email, pass } = req.body
        
        const usuario = await User.findOne({
            where:{
                correo: email
            },
        })
        console.log(usuario.id_usuario)
        if(usuario.contrasena == md5(pass)){
            //Correct password
            const files = await File.findAll({
                where:{
                    id_usuario: usuario.id_usuario,
                }
            })

            let filesprivate = []
            let filespublic = []
            files.forEach(file => {
                let tempFile = {
                    name: file.nombre,
                    path: file.url_archivo,
                }
                file.visibilidad == "true" || file.visibilidad == true ? filespublic.push(tempFile) : filesprivate.push(tempFile)
            });

            

            return res.status(200).send({
                data:{
                    foto: usuario.url_foto,
                    user: usuario.id_usuario,
                    filesprivate: filesprivate,
                    filespublic: filespublic,
                },
                msg: 'Success',
                valid: true,
            })
        }else{
            //Incorrect password
            return res.status(400).send({
                status: false,
                msg: 'Incorrect Password',
            })
        }

    } catch (error) {
        return res.status(400).send({
            status: false,
            msg: error.message,
        })
    }
}