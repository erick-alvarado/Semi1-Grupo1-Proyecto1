import React, {useState} from "react";
import { Nav } from '../page/Nav';
import { useForm } from "react-hook-form";

export const EliminarArchivo = () => {
  const [value, setValue] = useState("");
  const [pas, setPas] = useState("");
  const {  handleSubmit } = useForm();

  const onSubmit = async(data)=>{
    const res = await fetch("http://bala-1285632499.us-east-1.elb.amazonaws.com:8080/api/deletefile/"+window.user,{
      method:"DELETE",
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify({ contrasena: pas, NombreArchivo: value}),
    }).then((res) => res.json());
    alert(JSON.stringify(`${res.msg}`));
      
    
      const res2 = await fetch("http://bala-1285632499.us-east-1.elb.amazonaws.com:8080/api/login", {
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
    <div>
      <div className="container_ELA">
        <Nav/>
        <div className="conteiner_ela_text">
        <h1 >Eliminar archivo</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
        <select onChange={ (event) => setValue( event.target.value ) } className="bt_edi_elim">
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
        <div className="text_label_ELA">
          <label htmlFor="psw" style={{color:"white"}}><b>PASSWORD</b></label>
          <input type="password" placeholder="Enter Password" name="psw" onChange={ (e)=>setPas(e.target.value) }></  input>
        </div>
          <button type="submit" className="button_ELA">Eliminar</button>
          </form>
        </div>
      </div>
    </div>
  )
}
