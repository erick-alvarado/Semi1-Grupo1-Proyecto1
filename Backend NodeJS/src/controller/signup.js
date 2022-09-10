import Handler from "express"
import User from "../models/user.js"
import md5 from "md5"
import { uploadfile, getFileURL} from "./s3.js"

export const signup = async(req, res) =>{
    try {
        uploadfile(req.files.file)
        let { user, email, pass } = req.body
        let fileURL = await getFileURL(req.files.file.name)

        const newUser = await User.create({
            correo: email,
            contrasena: md5(pass),
            nombre: user,
            url_foto: fileURL,
        })

        return res.status(200).send({
            msg:'Usuario ingresado con exito',
           valid: true,
        })
    } catch (error) {
        return res.status(400).send({
            status:false,
            msg: error.message,
        })
    }
    
}