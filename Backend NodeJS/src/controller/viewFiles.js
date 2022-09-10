import Handler from "express";
import User from "../models/user.js"
import File from "../models/file.js"
import friendRequest from "../models/friendRequest.js"
import md5 from "md5";

export const viewFiles = async(req, res) => {
    try {

        const { id } = req.params

        const requestSended = await friendRequest.findAll({
            attributes:["id_usuario_acepta"],
            where:{
                id_usuario_envia: id,
            }
        })

        const requestReceived = await friendRequest.findAll({
            attributes:["id_usuario_envia"],
            where:{
                id_usuario_acepta: id,
            }
        })

        //Merge both lists to get all friends
        let friends = []
        requestSended.forEach(request => {
            friends.push(parseInt(request.id_usuario_acepta))
        });

        requestReceived.forEach(request => {
            friends.push(parseInt(request.id_usuario_envia))
        });

        //Cleaning repeated ids
        let uniqIds = [...new Set(friends)];

        //Looking for all public files
        const publicFiles = await File.findAll({
            where:{
                visibilidad:'true',
            }
        })
        //All users
        const allUsers = await User.findAll()

        let friendsFiles = []

        //Getting friends files with ids list and public files
        uniqIds.forEach(id => {
            publicFiles.forEach(file => {
                if(id == file.id_usuario){
                    allUsers.forEach(user => {
                        if(id == user.id_usuario){
                            friendsFiles.push({
                                propietario: user.nombre,
                                archivo: file.url_archivo,
                                fecha: file.fecha,
                            })
                        }
                    });
                }
            });
        });
        return res.status(200).send({
            resulta: friendsFiles
        })

    } catch (error) {
        return res.status(400).send({
            status: false,
            msg: error.message,
        })
    }
}