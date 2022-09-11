import { Nav} from '../page/Nav';
import React, {useState} from "react";

export const AgregarAmigos = () => {
  const [pas, setPas] = useState("");
  return (
    <div>
      <Nav/>
      <div className="container_AA">
      <div className='AA_text_VA'>
      <label htmlFor="uname" style={{color:"BLACK" } }><b>BUSCAR USUARIO</b></label>
      <input type="text" placeholder="Ingres Username" name="uname" onChange={ (e)=>setPas(e.target.value)  } ></input>
      <div>
      <button className='AA_button_VA'>BUSCAR</button>
      </div>
      <div className='container_AA_view'>

      </div>
      </div>
      </div>
    </div>
  )
}
