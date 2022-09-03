import '../css/Login.css';
import React, {useState} from "react";
import user from "../assets/user.png";


export const Login = () => {
    const [miLogin, setMiLogin] = useState("false");
    const [usu, setUsu] = useState("");
    const [pas, setPas] = useState("");
    
    return ( 
    <form class="formulario">
        <div class="imgcontainer">
            <img src={user} alt="Avatar" class="avatar"/>
        </div>
        <div class="container">
            <label for="uname" style={{color:"white"}}><b>USERNAME</b></label>
            <input type="text" placeholder="Enter Username" name="uname" onChange={ (e)=>setUsu(e.target.value) } />
            <label for="psw" style={{color:"white"}}><b>PASSWORD</b></label>
            <input type="password" placeholder="Enter Password" name="psw" onChange={ (e)=>setPas(e.target.value) }></input>
            <button type="submit" className='button_login'>Login</button>
        </div>
        <div class="container">
            <a href="/Registrar" style={{color:"white"}}>¿Aun no te has registrado?</a>    
        </div>
    </form>
    
    );
}
 