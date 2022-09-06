
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


def create_app(enviroment):
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(enviroment)   
    return app

enviroment = config['development']
app = create_app(enviroment)

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
    #Reviso si la carpeta ya existe si no, la creo
    try:
        os.stat(os.path.dirname(__file__) + app.config['UPLOAD_PATH'])
    except:
        os.mkdir(os.path.dirname(__file__) + app.config['UPLOAD_PATH'])

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
        user + "', '" + str(passmd5.hexdigest()) + "', '" + email + "', '" + urlfoto + "')"
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
    


@app.route('/')
def CONNECT_DB():
    CS = mysql.connection.cursor()
    response = {'message': "Hola personitas"}
    return jsonify(response)


if __name__ == '__main__':
    app.run(host='0.0.0.0',port=8080)
