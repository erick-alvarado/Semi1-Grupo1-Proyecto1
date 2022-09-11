import React, {useState} from "react";
import { FormGroup } from "reactstrap";
import { Nav } from '../page/Nav';
import { useForm } from "react-hook-form";
import { useNavigate} from 'react-router-dom';

export const EditarArchivo = () => {

  const [pas, setPas] = useState("");
  const [value, setValue] = useState("");
  const [file, setFile] = useState("");
  const [tipo, setTipo] = useState(1);
  const {  handleSubmit } = useForm();
  const cambioRadio = (e) => {
    setTipo(e.target.value);
  }
  const navigate = useNavigate();
  const navigateToContacts = () => {
    navigate('/EditarArchivo');
    };


const onSubmit = async(data)=>{
  
  if(value == ""){
    file = value
  }
  console.log(JSON.stringify({ nombre: value, CambioNombre: file, contrasena:pas,Private:tipo }))


  const res = await fetch("http://3.83.13.128:8080/api/editfile/"+window.user,{
    method:"PUT",
    headers:{'Content-Type': 'application/json'},
    body:JSON.stringify({ nombre: value, CambioNombre: file, contrasena:pas,Private:tipo }),
  }).then((res) => res.json());

  if(res.valid){
    
    
}

const res2 = await fetch("http://3.83.13.128:8080/api/login", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: window.email, pass: pas}),
        }).then((res2) => res2.json());
        window.user = res2.data.user;
        window.foto = res2.data.foto;
        window.nombre = res2.data.name;
        window.public = res2.data.filespublic;


}



  return (
    <div className='edit_contener'>
      <div className="edit_contener_text">
      <h1 >Editar archivo</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="psw" style={{color:"Black"}}><b>SELECCIONA EL ARCHIVO A MODIFICAR</b></label>
      <br/>
      <br/>
      <Nav />
      <select onChange={ (event) => setValue( event.target.value ) } className="bt_edi">
      <option value="0">--Selecciona tu archivo</option>
          {
              window.public.map((index)=>{
                  return(
                  <option value={index.name}>{index.name}</option>
                  )
              })
            }  
            {
              window.private.map((index)=>{
                  return(
                  <option value={index.name}>{index.name}</option>
                  )
              })
            }  
      </select>
      <br/>
      <br/>
      <label htmlFor="psw" style={{color:"Black"}}><b>SI DESEA CAMBIAR EL NOMBRE ESCRIBA ABAJO DE LO CONTRARIO DEJE EN BLANCO</b></label>
      <div className="text_edit_file">
      <input type="text" placeholder="Enter Name File" name="psw" onChange={ (e)=>setFile(e.target.value) }></input>
      </div>
      <br/><br/><br/>  
      <br/>
      <label htmlFor="psw" style={{color:"Black"}}><b>VISIBILIDAD</b></label>
      <br/>
      <br/>
      <div className="radio_edit">

      <FormGroup>
       <label style={{color:"Black"}}><b>Privado</b></label>
        <input
          id="radio1"
          type="radio"
          value="true"
          checked={tipo === "true" ? true : false}
          onChange={cambioRadio}
          />
       </FormGroup>
       <FormGroup>
       <label style={{color:"Black"}}><b>Publico</b></label>
        <input
          id="radio2"
          type="radio"
          value="false"
          checked={tipo === "false" ? true : false}
          onChange={cambioRadio}
          />
       </FormGroup>
      </div>

       <br/>
       <br/>
       <br/>
        <br/>
         
      <label htmlFor="psw" style={{color:"Black"}}><b>PASSWORD</b></label>
      <div className="text_edit_pass">
        
      <input type="password" placeholder="Enter Password" name="psw" onChange={ (e)=>setPas(e.target.value) }></input>
      </div>
      <button type="submit" className="bt_edi_acep">Editar</button>
      </form>
      </div>

    </div>
  )
}
