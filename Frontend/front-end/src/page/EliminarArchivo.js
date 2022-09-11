import React, {useState} from "react";
import { Nav } from '../page/Nav';

export const EliminarArchivo = () => {
  const [value, setValue] = useState("");
  const [pas, setPas] = useState("");
  return (
    <div>
      <Nav/>
      <div className="container_ELA">
        <div className="conteiner_ela_text">
        <select onChange={ (event) => setValue( event.target.value ) }>
          <option value="1">Archivo 1</option>
          <option value="1">Archivo 2</option>
        </select>
        <div className="text_label_ELA">
          <label htmlFor="psw" style={{color:"white"}}><b>PASSWORD</b></label>
          <input type="password" placeholder="Enter Password" name="psw" onChange={ (e)=>setPas(e.target.value) }></  input>
        </div>
          <button className="button_ELA">Eliminar</button>

        </div>
      </div>
    </div>
  )
}
