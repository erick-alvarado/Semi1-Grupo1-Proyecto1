
create database semi;
use semi;
CREATE TABLE archivo (
    id_archivo  INTEGER NOT NULL,
    id_usuario  INTEGER NOT NULL,
    nombre      CHAR(100),
    fecha       DATE,
    url_archivo CHAR(200),
    visibilidad CHAR(20)
);

ALTER TABLE archivo ADD CONSTRAINT archivo_pk PRIMARY KEY ( id_archivo );

CREATE TABLE solicitud (
    id_solicitud      INTEGER NOT NULL,
    id_usuario_envia  INTEGER NOT NULL,
    id_usuario_acepta INTEGER NOT NULL,
    estado            CHAR(20)
);

ALTER TABLE solicitud ADD CONSTRAINT solicitud_pk PRIMARY KEY ( id_solicitud );

CREATE TABLE usuario (
    id_usuario INTEGER NOT NULL,
    usuario    CHAR(100),
    contrasena CHAR(100),
    nombre     CHAR(100),
    url_foto   CHAR(200)
);

ALTER TABLE usuario ADD CONSTRAINT usuario_pk PRIMARY KEY ( id_usuario );

ALTER TABLE archivo
    ADD CONSTRAINT archivo_usuario_fk FOREIGN KEY ( id_usuario )
        REFERENCES usuario ( id_usuario );

ALTER TABLE solicitud
    ADD CONSTRAINT solicitud_usuario_fk FOREIGN KEY ( id_usuario_acepta )
        REFERENCES usuario ( id_usuario );

ALTER TABLE solicitud
    ADD CONSTRAINT solicitud_usuario_fkv2 FOREIGN KEY ( id_usuario_envia )
        REFERENCES usuario ( id_usuario );

