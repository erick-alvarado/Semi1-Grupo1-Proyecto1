import React,{useState}  from 'react'
import user from "../assets/user.png";
import { useForm } from "react-hook-form";


export const Registrar = () => {
  const [miLogin, setMiLogin] = useState("false");
  const [usu, setUsu] = useState("");
  const [name, setname] = useState("");
  const [pas, setPas] = useState("");
  const [pas2, setPas2] = useState("");
  const [img, setImg]   = useState("");
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("user", usu);
    formData.append("pass", pas);
    formData.append("email", name);
    formData.append("file", data.file[0]);


    if(pas == pas2){

      if(data.file[0] != null){
        const res = await fetch("http://http://bala-1285632499.us-east-1.elb.amazonaws.com:8080/:8080/api/registro", {
          method: "POST",
          body: formData,
      }).then((res) => res.json());
      alert(JSON.stringify(`${res.msg}`));
      }else{
        alert("Por favor seleccione una imagen de perfil");
      }


      
    }else{
      alert("Las contraseñas no coinciden");
    }

    
};
  return (
    <form className="formulario_reg" onSubmit={handleSubmit(onSubmit)}>
      <div className="imgcontainer_reg">
            <img src={user} alt="Avatar" className="avatar"/>
            <div >
              <input type="file" {...register("file")}/>
            <img src={img} alt="" />
    </div>

        </div>
        <div className="container_reg">
            <label htmlFor="uname" style={{color:"white"}}><b>USUARIO</b></label>
            <input type="text" placeholder="Ingrese su usuario" name="uname" onChange={ (e)=>setUsu(e.target.value) } />
            <label htmlFor="uname" style={{color:"white"}}><b>CONTRASEÑA</b></label>
            <input type="password" placeholder="Ingrese su constraseña" name="uname" onChange={ (e)=>setPas(e.target.value) }></input>
            <label htmlFor="uname" style={{color:"white"}}><b>REPETIR CONTRASEÑA</b></label>
            <input type="password" placeholder="Ingrese su constraseña" name="uname" onChange={ (e)=>setPas2(e.target.value) }></input>
            <label htmlFor="uname" style={{color:"white"}}><b>CORREO ELECTRONICO</b></label>
            <input type="email" placeholder="Ingrese su Correo electronico" name="uname" onChange={ (e)=>setname(e.target.value) }></input>


            
            
            <button  className='bt_reg' type='submit'>REGISTRARME</button>
        </div>
    </form>
  )
}
