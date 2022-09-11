import React , {useState} from 'react';
import { Nav} from '../page/Nav';
import user from "../assets/user.png";
import { useForm } from "react-hook-form";

export const SubirArchivo = () => {
  const [filename, setfilename] = useState("");
  const [filesel, setfilesel] = useState("");
  const [tipo, setTipo] = useState(1);
  const [pas, setPas] = useState("");

  const {  register, handleSubmit } = useForm();
  const cambioRadio = (e) => {
    setTipo(e.target.value);
  }

  function nombrefilee(fileInput){
    var files = fileInput;
    console.log(files)
    
  }

  const onSubmit = async(data)=>{
    const formData = new FormData();
    formData.append("user", window.user);
    formData.append("contrasena", pas);
    formData.append("nombre", filename);
    formData.append("file", data.file[0]);
    formData.append("Private", tipo);

    const res = await fetch("http://3.83.13.128:8080/api/uploadfile", {
        method: "POST",
        body: formData,
    }).then((res) => res.json());
    alert(JSON.stringify(`${res.msg}`));

    const res2 = await fetch("http://3.83.13.128:8080/api/login", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: window.email, pass: pas}),
        }).then((res2) => res2.json());
        window.user = res2.data.user;
        window.foto = res2.data.foto;
        window.nombre = res2.data.name;
        window.public = res2.data.filespublic;
        window.private = res2.data.filesprivate;


  }
  return (
    <form className="formulario_SA" onSubmit={handleSubmit(onSubmit)}>
      <Nav />
      <div className="container_SA">
        <div className='container_text'>
          <label htmlFor="uname" style={{color:"Black"}}><b>NOMBRE DEL ARCHIVO</b></label>
          <input type="text" placeholder="Ingrese el nombre del archivo" name="uname" onChange={ (e)=>setfilename(e.target.value) }  />
          <label htmlFor="uname" style={{color:"Black"}}><b>ARCHIVO SELECIONADO</b></label>
          <input type="text" placeholder="" name="uname" />
          <br></br>
          <br></br>
          <h3>TIPO DE ARCHIVO</h3>
          <p>
            <input type="radio" name="tipo" value="true" checked={tipo === "true" ? true : false} onChange={cambioRadio} />Privado
            <input type="radio" name="tipo" value="false" checked={tipo === "false" ? true : false} onChange={cambioRadio} />Publico
          </p>
          <br></br>
          <br></br>
          <label htmlFor="uname" style={{color:"Black"}}><b>CONTRASEÑA</b></label>
          <input type="text" placeholder="Ingrese su contraseña" name="uname"  onChange={ (e)=>setPas(e.target.value)} />
        </div>
        <div className='container_imgSA'>
          <div className="imgcontainer_SA">
            <img src={user} alt="Avatar" className="avatar_SA"/>
            <label className="bt_SA">
              <span>ESCOGER ARCHIVO </span>
              <input  hidden type="file" {...register("file") } multiple  ></input>
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
