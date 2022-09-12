
import json
from pydoc import resolve
from flask import Flask,render_template,request,redirect,url_for
from flask import jsonify
from flask_cors import CORS
from config import config
import boto3
from boto3.s3.transfer import S3Transfer
from botocore.exceptions import ClientError
import logging
from werkzeug.utils import secure_filename
from flask_mysqldb import MySQL
import string
import random
import os
import hashlib
import sys
from datetime import datetime
from boto3 import Session
from pprint import pprint



def create_app(enviroment):
    
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(enviroment)   
    return app

enviroment = config['development']
app = create_app(enviroment)
#Reviso si la carpeta files2 ya existe si no, la creo
try:
    os.stat(os.path.dirname(__file__) + app.config['UPLOAD_PATH'])
except:
    os.mkdir(os.path.dirname(__file__) + app.config['UPLOAD_PATH'])

mysql = MySQL(app)

#Credentials to S3
credentials = {
    'aws_access_key_id': app.config['S3_ACCESS_KEY_ID'],
    'aws_secret_access_key': app.config['S3_SECRET_ACCESS_KEY']
    
}
@app.route('/api/registro', methods=['POST'])
def newuser():
    data = request.form


    ##ESTA PARTE ES EL S3
    keyS3 = ''.join(random.SystemRandom().choice(string.ascii_letters + string.digits) for _ in range(16))

    #Primero se sube el archivo

    f = request.files['file']
    basepath = os.path.dirname(__file__) # La ruta donde se encuentra el archivo actual
    upload_path = os.path.join (basepath, app.config['UPLOAD_PATH'].replace("/",""), secure_filename (f.filename)) #Nota: Si no hay una carpeta, debe crearla primero, de lo contrario se le preguntará que no existe tal ruta
    extension = "." +upload_path.split('.')[-1]
    f.save(upload_path)


    #Segundo se envía a S3

    client = boto3.client('s3',app.config['S3_BUCKET_REGION'],**credentials)
    transfer = S3Transfer(client)
    transfer.upload_file(upload_path,app.config['S3_BUCKET_NAME'],keyS3+extension)

    file_url = '%s/%s/%s%s' % (client.meta.endpoint_url,app.config['S3_BUCKET_NAME'],keyS3,extension)
    os.remove(upload_path)


    ses = Session(aws_access_key_id=app.config['S3_ACCESS_KEY_ID'],
              aws_secret_access_key=app.config['S3_SECRET_ACCESS_KEY'],
              region_name=app.config['S3_BUCKET_REGION'])

    s3_client = ses.client('s3')

    s3_bucket_name = app.config['S3_BUCKET_NAME']
    object_name = keyS3+extension

    def file_download():
        response = s3_client.generate_presigned_url(
            'get_object',
            Params={
                'Bucket': s3_bucket_name,
                'Key': object_name
            },
            ExpiresIn=432000
        )
        return response

    urlfoto = file_download()


    user = request.form['user']
    email = request.form['email']
    passmd5 = hashlib.md5(data['pass'].encode())
    
    query = "INSERT INTO usuario (correo, contrasena, nombre, url_foto) values('" + \
        email  + "', '" + str(passmd5.hexdigest()) + "', '" + user + "', '" + str(urlfoto) + "')"
    cur = mysql.connection.cursor()
    cur.execute(query)
    try:
        mysql.connection.commit()
        response = { "msg": 'Usuario registrado con exito', "valid":"true"}
        cur.close()
        return jsonify(response)
    except:
        response = {"msg": 'Hubo un error al registrar usuario',"valid":"false"}
        return jsonify(response)

## LOGIN
@app.route('/api/login', methods=['POST'])
def login():
    data = {}
    dataprivate={}
    datapublic={}
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        json = request.json
        email = request.json['email']
        contra = request.json['pass']
        passmd5 = hashlib.md5(contra.encode()).hexdigest()
        filesprivate = []
        filespublic = []

        query = "SELECT id_usuario,correo,contrasena,nombre,url_foto from usuario WHERE correo =\'" + str(email)+"\';"
        cur = mysql.connection.cursor()
        cur.execute(query)
        resultado = cur.fetchone()
        ##Primero reviso que si haya un usuario con ese correo
        if resultado == None:
            response = {"data":data,"msg":"Credenciales incorrectas","valid":"false"}
            return jsonify(response)
        else:
            ##Segundo reviso que su contraseña ingresada sea la misma que la Base de datos
            if (passmd5 == resultado[2]):
                data['foto']=resultado[4]
                data['user']=resultado[0]
                data['name']=resultado[3]
                query = "SELECT * from archivo WHERE id_usuario = '"+str(resultado[0])+"' AND visibilidad ='true';"
                cur = mysql.connection.cursor()
                cur.execute(query)
                resultado2 = cur.fetchall()
                for x in resultado2:
                    datapublic['name']=x[2]
                    datapublic['path']=x[4]
                    filespublic.append(datapublic)
                    datapublic ={}

                query = "SELECT * from archivo WHERE id_usuario = '"+str(resultado[0])+"' AND visibilidad ='false';"
                cur = mysql.connection.cursor()
                cur.execute(query)
                resultado3 = cur.fetchall()
                for x in resultado3:
                    dataprivate['name']=x[2]
                    dataprivate['path']=x[4]
                    filesprivate.append(dataprivate)
                    dataprivate ={}

                data['filesprivate']=filesprivate
                data['filespublic']=filespublic
                response = {"data":data,"msg":"Bienvenido","valid":"true"}
                return jsonify(response)
            else:
                response = {"data":data,"msg":"Credenciales incorrectas","valid":"false"}
                return jsonify(response)

    else:
        return 'Content-Type not supported!'

@app.route('/api/uploadfile', methods=['POST'])
def uploadfile():
    data = request.form
    user = request.form['user']
    contra = request.form['contrasena']
    namefile = request.form['nombre']
    private = request.form['Private']

    if private == "true":
        private = "false"
    elif private == "false":
        private = "true"

    passmd5 = hashlib.md5(contra.encode()).hexdigest()
    #VALIDAMOS LA CONTRASEÑA
    query = "SELECT id_usuario,correo,contrasena,nombre,url_foto from usuario WHERE id_usuario =\'" + str(user)+"\';"
    cur = mysql.connection.cursor()
    cur.execute(query)
    resultado = cur.fetchone()
    if resultado == None:
        response = {"msg":"Error, por favor contacte al administrador","valid":"false"}
        return jsonify(response)
    else:
        ##Segundo reviso que su contraseña ingresada sea la misma que la Base de datos
        if (passmd5 == resultado[2]):
            keyS3 = ''.join(random.SystemRandom().choice(string.ascii_letters + string.digits) for _ in range(16))
        #Primero se sube el archivo

            f = request.files['file']
            basepath = os.path.dirname(__file__) # La ruta donde se encuentra el archivo actual
            upload_path = os.path.join (basepath, app.config['UPLOAD_PATH'].replace("/",""), secure_filename (f.filename)) #Nota: Si no hay una carpeta, debe crearla primero, de lo contrario se le preguntará que no existe tal ruta
            extension = "." +upload_path.split('.')[-1]
            f.save(upload_path)

            #Segundo se envía a S3
            client = boto3.client('s3',app.config['S3_BUCKET_REGION'],**credentials)
            transfer = S3Transfer(client)
            transfer.upload_file(upload_path,app.config['S3_BUCKET_NAME'],keyS3+extension)

            file_url = '%s/%s/%s%s' % (client.meta.endpoint_url,app.config['S3_BUCKET_NAME'],keyS3,extension)
            os.remove(upload_path)


            ses = Session(aws_access_key_id=app.config['S3_ACCESS_KEY_ID'],
              aws_secret_access_key=app.config['S3_SECRET_ACCESS_KEY'],
              region_name=app.config['S3_BUCKET_REGION'])

            s3_client = ses.client('s3')

            s3_bucket_name = app.config['S3_BUCKET_NAME']
            object_name = keyS3+extension

            def file_download():
                response = s3_client.generate_presigned_url(
                    'get_object',
                    Params={
                        'Bucket': s3_bucket_name,
                        'Key': object_name
                    },
                    ExpiresIn=432000
                )
                return response
            
            linksubido = file_download()

            query = "INSERT INTO archivo (id_usuario , nombre, fecha, url_archivo, visibilidad) VALUES('" + \
            user + "', '" + namefile + "', '" + str(datetime.now()) + "', '" + str(linksubido) + "', '" + private + "')"
            cur = mysql.connection.cursor()
            cur.execute(query)

            try:
                mysql.connection.commit()
                response = {"msg":"Archivo subido con éxito ","valid":"true"}
                cur.close()
                return jsonify(response)
            except:
                response = {"msg": 'Hubo un error al subir el archivo',"valid":"false"}
                return jsonify(response)


        else:
            response = {"msg":"Password incorrecto","valid":"false"}
            return jsonify(response)

@app.route('/api/deletefile/<id>', methods=['DELETE'])
def deletefile(id):
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        print(request.json)
        contra = request.json['contrasena']
        nombre = request.json['NombreArchivo']
        user = id
        passmd5 = hashlib.md5(contra.encode()).hexdigest()
        #VALIDAMOS LA CONTRASEÑA
        query = "SELECT contrasena from usuario WHERE id_usuario =\'" + str(user)+"\';"
        cur = mysql.connection.cursor()
        cur.execute(query)
        resultado = cur.fetchone()
        if (passmd5 == resultado[0]):
            query ="DELETE FROM archivo WHERE id_usuario="+ user+ " AND nombre='"+ nombre +"';"
            print(query)
            cur = mysql.connection.cursor()
            cur.execute(query)
            mysql.connection.commit()
            response = {"msg":"Archivo eliminado ","valid":"true"}
            return jsonify(response)
        else:
            response = {"msg":"Password incorrecto","valid":"false"}
            return jsonify(response)
    else:
        return 'Content-Type not supported!'

@app.route('/api/editfile/<id>', methods=['PUT'])
def editfile(id):
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        print(request.json)
        contra = request.json['contrasena']
        nombre = request.json['nombre']
        newname = request.json['CambioNombre']
        visi = request.json['Private']
        if visi == "true":
            visi = "false"
        elif visi == "false":
            visi = "true"

        user = id
        passmd5 = hashlib.md5(contra.encode()).hexdigest()
        #VALIDAMOS LA CONTRASEÑA
        query = "SELECT contrasena from usuario WHERE id_usuario =\'" + str(user)+"\';"
        cur = mysql.connection.cursor()
        cur.execute(query)
        resultado = cur.fetchone()
        if (passmd5 == resultado[0]):
            query ="UPDATE archivo SET nombre='"+str(newname)+"', visibilidad='"+str(visi)+"' WHERE nombre='"+str(nombre)+"';"
            print(query)
            cur = mysql.connection.cursor()
            cur.execute(query)
            mysql.connection.commit()
            response = {"msg":"Archivo modificado exitosamente ","valid":"true"}
            return jsonify(response)
        else:
            response = {"msg":"Password incorrecto","valid":"false"}
            return jsonify(response)
    else:
        return 'Content-Type not supported!'

@app.route('/api/allusers', methods=['GET'])
def allusers():
    datausers={}
    datapublic={}
    datausu=[]
    filespublic =[]
    # query = "SELECT u.id_usuario, u.nombre,u.url_foto, a.nombre from usuario u JOIN archivo a ON u.id_usuario = a.id_usuario WHERE a.visibilidad = 'true' GROUP BY a.id_archivo;"
    query = "SELECT * FROM usuario ;"
    cur = mysql.connection.cursor()
    cur.execute(query)
    resultado = cur.fetchall()
    for x in resultado:
        datausers['idUser']=x[0]
        datausers['user']=x[3]
        datausers['foto']=x[4]
        query = "SELECT * from archivo WHERE id_usuario = '"+str(x[0])+"' AND visibilidad ='true';"
        cur = mysql.connection.cursor()
        cur.execute(query)
        resultado2 = cur.fetchall()
        for x in resultado2:
            datapublic['name']=x[2]
            datapublic['path']=x[4]
            filespublic.append(datapublic)
        datausers['filespublic'] = len(filespublic)
        datausu.append(datausers)
        datausers={}
        datapublic={}
        filespublic =[]


    response = {"msg":datausu,"valid":"true"}
    return jsonify(response)

@app.route('/api/addfriend', methods=['POST'])
def addfriend():
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        user = request.json['user']
        friend = request.json['amigo']

        query = "INSERT INTO solicitud(id_usuario_envia, id_usuario_acepta) VALUES (" +str(user) + ","+ str(friend)+");"
        cur = mysql.connection.cursor()
    
        try:
            cur.execute(query)
            mysql.connection.commit()
            response = { "msg": 'Has agregado un amigo con exito', "valid":"true"}
            cur.close()
            return jsonify(response)
        except:
            response = {"msg": 'Hubo un error al agregar amigo',"valid":"false"}
            return jsonify(response)
    else:
        response = {"msg":"Error fuerte","Success":"false"}
        return jsonify(response)

@app.route('/api/viewfiles/<id>', methods=['GET'])
def viewfiles(id):
    data = []
    files = {}
    query = "SELECT id_usuario_envia, id_usuario_acepta from solicitud WHERE id_usuario_envia="+ id+";"
    cur = mysql.connection.cursor()
    cur.execute(query)
    resultado = cur.fetchall()
    

    for x in resultado:
        print(x[1])
        query = "SELECT  u.nombre, a.fecha,a.nombre,a.url_archivo  from archivo a JOIN usuario u  ON a.id_usuario = u.id_usuario WHERE a.id_usuario ="+ str(x[1])+"  AND a.visibilidad ='true';"
        cur = mysql.connection.cursor()
        cur.execute(query)
        resultado2 = cur.fetchall()
        for z in resultado2:
            files['propietario'] = z[0]
            files['archivo'] = z[3]
            files['fecha'] = z[1]
            files['nombre'] = z[2]
            data.append(files)
            files = {}
        
    
    response = {"msg":data, "data":id}
    return jsonify(response)



@app.route('/', methods=['GET'])
def main():
    response = {"msg":"todo bien", "data":"true"}
    return jsonify(response)
if __name__ == '__main__':
    app.run(host='0.0.0.0',port=8080)
