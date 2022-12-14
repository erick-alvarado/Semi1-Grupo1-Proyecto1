import '../css/Login.css';
import React, {useState} from "react";
import user from "../assets/user.png";
import { useForm } from "react-hook-form";
import { Principal } from './Principal';
import {Routes, Route, useNavigate} from 'react-router-dom';
import { NavLink } from 'react-router-dom';


export const Login = () => {
    const navigate = useNavigate();
    const navigateToContacts = () => {
    navigate('/Principal');
    };
    const [miLogin, setMiLogin] = useState("false");
    const [usu, setUsu] = useState("");
    const [pas, setPas] = useState("");

    const {  handleSubmit } = useForm();

    const onSubmit = async (data) => {
        const res = await fetch("http://bala-1285632499.us-east-1.elb.amazonaws.com:8080/api/login", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: usu, pass: pas }),
        }).then((res) => res.json());
        if(res.valid == "true"){
            window.user = res.data.user;
            window.foto = res.data.foto;
            window.nombre = res.data.name;
            window.public = res.data.filespublic;
            window.private = res.data.filesprivate;
            window.email = usu
            window.passs=pas
        

            const res2 = await fetch("http://bala-1285632499.us-east-1.elb.amazonaws.com:8080/api/allusers", {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        }).then((res2) => res2.json());

            window.users = res2.msg

            const res3 = await fetch("http://bala-1285632499.us-east-1.elb.amazonaws.com:8080/api/viewfiles/"+window.user, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        }).then((res3) => res3.json());


            window.filefriends = res3.msg
         
            navigateToContacts();
        }else{
            alert(JSON.stringify(`${res.msg}`));
        }

    };
    return ( 
    <form className="formulario" onSubmit={handleSubmit(onSubmit)}>
        <div className="imgcontainer">
            <img src={user} alt="Avatar" className="avatar"/>
        </div>
        <div className="container">
            <label for="uname" style={{color:"white"}}><b>USERNAME</b></label>
            <input type="text" placeholder="Enter Username" name="uname" onChange={ (e)=>setUsu(e.target.value) } />
            <label htmlfor="psw" style={{color:"white"}}><b>PASSWORD</b></label>
            <input type="password" placeholder="Enter Password" name="psw" onChange={ (e)=>setPas(e.target.value) }></input>
            <button type="submit" className='button_login'>Login</button>
        </div>
        <div class="container">
  
                <NavLink to="/Registrar" style={{color:"white"}}>??Aun no te has registrado?</NavLink>
        
        </div>
        <h1></h1>
    </form>
    
    );
}
 