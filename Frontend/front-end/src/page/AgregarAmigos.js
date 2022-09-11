import { Nav} from '../page/Nav';
import React, {useState} from "react";

export const AgregarAmigos = () => {
  const [pas, setPas] = useState("");
  return (
    <div>
      <Nav/>
      <div className="container_AA">
      <label for="psw" style={{color:"white"}}><b>PASSWORD</b></label>
      <input type="password" placeholder="Enter Password" name="psw" onChange={ (e)=>setPas(e.target.value) }></input>
        
      </div>
    </div>
  )
}
