
from flask import Flask,render_template,request,redirect,url_for
from flask import jsonify
from flask_cors import CORS
from config import config
import boto3
from boto3.s3.transfer import S3Transfer
from werkzeug.utils import secure_filename
from flask_mysqldb import MySQL
import string
import random
import os
import hashlib
import sys
from datetime import datetime


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
## CREAR USUARIO
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

    user = request.form['user']
    email = request.form['email']
    passmd5 = hashlib.md5(data['pass'].encode())
    urlfoto = file_url 

    query = "INSERT INTO usuario (correo, contrasena, nombre, url_foto) values('" + \
        email  + "', '" + str(passmd5.hexdigest()) + "', '" + user + "', '" + urlfoto + "')"
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
            response = {"data":data,"msg":"Credenciales incorrectas","Success":"false"}
            return jsonify(response)
        else:
            ##Segundo reviso que su contraseña ingresada sea la misma que la Base de datos
            if (passmd5 == resultado[2]):
                data['foto']=resultado[4]
                data['user']=resultado[0]
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
                response = {"data":data,"msg":"Bienvenido","Success":"false"}
                return jsonify(response)
            else:
                response = {"data":data,"msg":"Credenciales incorrectas","Success":"false"}
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
    passmd5 = hashlib.md5(contra.encode()).hexdigest()
    #VALIDAMOS LA CONTRASEÑA
    query = "SELECT id_usuario,correo,contrasena,nombre,url_foto from usuario WHERE id_usuario =\'" + str(user)+"\';"
    cur = mysql.connection.cursor()
    cur.execute(query)
    resultado = cur.fetchone()
    if resultado == None:
        response = {"msg":"Error, por favor contacte al administrador","Success":"false"}
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

            query = "INSERT INTO archivo (id_usuario , nombre, fecha, url_archivo, visibilidad) VALUES('" + \
            user + "', '" + namefile + "', '" + str(datetime.now()) + "', '" + file_url + "', '" + private + "')"
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
            response = {"msg":"Password incorrecto","Success":"false"}
            return jsonify(response)


@app.route('/api/deletefile')
def deletefile():
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        email = request.json['contrasena']
        contra = request.json['NombreArchivo']
        user = request.json['user']
        passmd5 = hashlib.md5(contra.encode()).hexdigest()

        query = "SELECT id_usuario,correo,contrasena,nombre,url_foto from usuario WHERE correo =\'" + str(email)+"\';"
        cur = mysql.connection.cursor()
        cur.execute(query)
        resultado = cur.fetchone()

    else:
        return 'Content-Type not supported!'

@app.route('/api/allusers', methods=['GET'])
def allusers():
    query = "SELECT u.id_usuario, u.nombre,u.url_foto, a.nombre from usuario u JOIN archivo a ON u.id_usuario = a.id_usuario WHERE a.visibilidad = 'true' GROUP BY a.id_archivo;"
    cur = mysql.connection.cursor()
    cur.execute(query)
    resultado = cur.fetchall()
    response = {"msg":resultado,"Success":"false"}
    return jsonify(response)

      


@app.route('/')
def CONNECT_DB():
    CS = mysql.connection.cursor()
    response = {'message': "Hola personitas"}
    return jsonify(response)


if __name__ == '__main__':
    app.run(host='0.0.0.0',port=8080)
