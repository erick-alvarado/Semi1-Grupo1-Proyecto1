
from flask import Flask,render_template,request,redirect,url_for
from flask import jsonify
from config import config
import boto3
from boto3.s3.transfer import S3Transfer
from werkzeug.utils import secure_filename
import string
import random
import os





def create_app(enviroment):
    app = Flask(__name__)
    app.config.from_object(enviroment)
    return app

enviroment = config['development']
app = create_app(enviroment)

#Credentials to S3
credentials = {
    'aws_access_key_id': app.config['S3_ACCESS_KEY_ID'],
    'aws_secret_access_key': app.config['S3_SECRET_ACCESS_KEY']
    
}

@app.route('/hola',methods=['GET'])
def holamundo():
    response = {'message': "Hola personitas"}
    return jsonify(response)


@app.route('/subirimage', methods=['POST'])
def uploadS3():

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
    f.save(upload_path)
  
    #Segundo se envía a S3

    client = boto3.client('s3',app.config['S3_BUCKET_REGION'],**credentials)
    transfer = S3Transfer(client)
    transfer.upload_file(upload_path,app.config['S3_BUCKET_NAME'],keyS3)

    file_url = '%s/%s/%s' % (client.meta.endpoint_url,app.config['S3_BUCKET_NAME'],keyS3)
    os.remove(upload_path)
    response = {'message': file_url}
    return jsonify(response)


if __name__ == '__main__':
    app.run(host='0.0.0.0',port=8080)
