import React, {useState} from "react";
import { FormGroup } from "reactstrap";
import { Nav } from '../page/Nav';

export const EditarArchivo = () => {

  const [pas, setPas] = useState("");
  const [value, setValue] = useState("");
  const [file, setFile] = useState("");
  const [tipo, setTipo] = useState(1);
  const cambioRadio = (e) => {
    setTipo(e.target.value);
  }
  return (
    <div className='edit_contener'>
      <Nav />
      <select onChange={ (event) => setValue( event.target.value ) }>
          <option value="1">Archivo 1</option>
      </select>
      <label htmlFor="psw" style={{color:"white"}}><b>NOMBRE DEL Archivo</b></label>
      <input type="text" placeholder="Enter Name File" name="psw" onChange={ (e)=>setFile(e.target.value) }></input>
       <FormGroup>
        <input
          id="radio1"
          type="radio"
          value="true"
          checked={tipo === "true" ? true : false}
          onChange={cambioRadio}
          />
       </FormGroup>
       <FormGroup>
        <input
          id="radio2"
          type="radio"
          value="false"
          checked={tipo === "false" ? true : false}
          onChange={cambioRadio}
          />
       </FormGroup>
         
      <label htmlFor="psw" style={{color:"white"}}><b>PASSWORD</b></label>
      <input type="password" placeholder="Enter Password" name="psw" onChange={ (e)=>setPas(e.target.value) }></input>
      <button type="submit">Editar</button>
      {console.log(tipo)}
    </div>
  )
}
