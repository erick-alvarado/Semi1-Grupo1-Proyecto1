import React from 'react';
import { Nav} from '../page/Nav';
import user from "../assets/user.png";

export const SubirArchivo = () => {
  
  return (
    <form class="formulario_SA">
      <Nav />
      <div className="container_SA">
        <div className='container_text'>
          <label for="uname" style={{color:"Black"}}><b>NOMBRE DEL ARCHIVO</b></label>
          <input type="text" placeholder="Ingrese el nombre del archivo" name="uname"  />
          <label for="uname" style={{color:"Black"}}><b>ARCHIVO SELECIONADO</b></label>
          <input type="text" placeholder="" name="uname"  />
          <br></br>
          <br></br>
          <p>
            <h3>TIPO DE ARCHIVO</h3>
            <input type="radio" name="tipo" value="1" />Publico
            <input type="radio" name="tipo" value="2" />Privado
          </p>
          <br></br>
          <br></br>
          <label for="uname" style={{color:"Black"}}><b>CONTRASEÑA</b></label>
          <input type="text" placeholder="Ingrese su contraseña" name="uname"  />
        </div>
        <div className='container_imgSA'>
          <div className="imgcontainer_SA">
            <img src={user} alt="Avatar" class="avatar_SA"/>
            <label className="bt_SA">
              <span>ESCOGER ARCHIVO </span>
              <input hidden type="file" multiple ></input>
            </label>
            <div className='bt_aceptarSA'>
              <button type="submit" className='button_login'>SUBIR</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
