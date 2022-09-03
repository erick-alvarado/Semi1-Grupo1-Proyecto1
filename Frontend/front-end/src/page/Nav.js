import React from 'react'
import { NavLink } from 'react-router-dom';
import user from "../assets/user.png";
import { useState } from 'react';

export const Nav = () => {
  return (
    <div>
        <div className="container_perfil_nav">
            <div className='imag_perfil'>
                <img src={user} alt="Avatar" className="avatar_perfil"/>
                <p className='nom_usu'>Nombre</p>
            </div>
            <div className='nav_perfil'>
                <ul>
                    <li>
                        <NavLink to="/SubirArchivo">Subir archivo</NavLink>
                    </li>
                    <li>
                        <NavLink to="/EditarArchivo">Editar Archivo</NavLink>
                    </li>
                    <li>
                        <NavLink to="/EliminarArchivo">Eliminar Archivo</NavLink>
                    </li>
                    <li>
                        <NavLink to="/AgregarAmigos">Agregar Amigo</NavLink>
                    </li>
                    <li>
                        <NavLink to="/viewArchivos">Ver Archivos</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}
