import React,{useState}  from 'react'
import user from "../assets/user.png";

export const Registrar = () => {
  const [miLogin, setMiLogin] = useState("false");
  const [usu, setUsu] = useState("");
  const [name, setname] = useState("");
  const [pas, setPas] = useState("");
  const [rpas, setrpas] = useState("");
  return (
    <form class="formulario_reg">
        <div class="imgcontainer_reg">
            <img src={user} alt="Avatar" class="avatar"/>
            <label className="bt_file">
              <span>Subir Foto </span>
              <input hidden type="file" multiple ></input>
            </label>
        </div>
        <div class="container_reg">
            <label for="uname" style={{color:"white"}}><b>NOMBRE</b></label>
            <input type="text" placeholder="Ingrese su nombre" name="uname" onChange={ (e)=>setname(e.target.value) }></input>
            <label for="uname" style={{color:"white"}}><b>CORREO ELECTRONICO</b></label>
            <input type="email" placeholder="Ingrese su Correo electronico" name="uname" onChange={ (e)=>setname(e.target.value) }></input>
            <label for="uname" style={{color:"white"}}><b>USUARIO</b></label>
            <input type="text" placeholder="Ingrese su usuario" name="uname" onChange={ (e)=>setUsu(e.target.value) } />
            <label for="uname" style={{color:"white"}}><b>CONTRASEÑA</b></label>
            <input type="text" placeholder="Ingrese su constraseña" name="uname" onChange={ (e)=>setPas(e.target.value) }></input>
            
            
            <button  className='bt_reg'>REGISTRARME</button>
        </div>
    </form>
  )
}
