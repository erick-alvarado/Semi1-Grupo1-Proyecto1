import React from 'react';
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import { Login } from '../page/Login';
import { Registrar } from '../page/Registrar';
import { Nav } from '../page/Nav';
import { Principal } from '../page/Principal';
import { SubirArchivo } from '../page/SubirArchivo';
import { EditarArchivo } from '../page/EditarArchivo';
import { EliminarArchivo } from '../page/EliminarArchivo';
import { AgregarAmigos } from '../page/AgregarAmigos';
import { ViewArchivos } from '../page/ViewArchivos';

export const RouterPrincipal = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/registrar" element={<Registrar />} />
            <Route path="/Nav" element={<Nav />} />
            <Route path="/Principal" element={<Principal />} />
            <Route path="/SubirArchivo" element={<SubirArchivo />} />
            <Route path="/EditarArchivo" element={<EditarArchivo />} />
            <Route path="/EliminarArchivo" element={<EliminarArchivo />} />
            <Route path="/AgregarAmigos" element={<AgregarAmigos />} />
            <Route path="/ViewArchivos" element={<ViewArchivos />} />
        </Routes>
    </BrowserRouter>
  )
}
