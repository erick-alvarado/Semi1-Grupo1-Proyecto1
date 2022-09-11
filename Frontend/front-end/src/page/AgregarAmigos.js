import { Nav} from '../page/Nav';
import React, {useState} from "react";

export const AgregarAmigos = () => {
  const [pas, setPas] = useState("");
  return (
    <div>
      <Nav/>
      <div className="container_AA">
      <div className='AA_text'>
      <label htmlFor="uname" style={{color:"BLACK" } }><b>USUARIO</b></label>
      <input type="text" placeholder="Ingres el  Username" name="uname" onChange={ (e)=>setPas(e.target.value)  }></input>
      </div>
      </div>
    </div>
  )
}
