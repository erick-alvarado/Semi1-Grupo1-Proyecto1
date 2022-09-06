
create database semi;

use semi;
CREATE TABLE usuario (
    id_usuario INTEGER NOT NULL AUTO_INCREMENT,
    correo    CHAR(100),
    contrasena CHAR(100),
    nombre     CHAR(100),
    url_foto   CHAR(200),
    PRIMARY KEY (id_usuario)
);
CREATE TABLE archivo (
    id_archivo  INTEGER NOT NULL AUTO_INCREMENT,
    id_usuario  INTEGER NOT NULL,
    nombre      CHAR(100),
    fecha       DATE,
    url_archivo CHAR(200),
    visibilidad CHAR(20),
    PRIMARY KEY (id_archivo),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE solicitud (
    id_solicitud      INTEGER NOT NULL AUTO_INCREMENT,
    id_usuario_envia  INTEGER NOT NULL,
    id_usuario_acepta INTEGER NOT NULL,
    estado            CHAR(20),
    PRIMARY KEY (id_solicitud),
    FOREIGN KEY (id_usuario_envia) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_usuario_acepta) REFERENCES usuario(id_usuario)
);