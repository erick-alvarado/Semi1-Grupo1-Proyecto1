import React, {useState} from "react";
import { Nav} from '../page/Nav';
export const ViewArchivos = () => {
  const [file, setFile] = useState("");
  return (
    <div>
      <Nav/>
      <div className="container_AA">
      <div className='AA_text_VA'>
      <label htmlFor="uname" style={{color:"BLACK" } }><b>NOMBRE DEL ARCHIVO</b></label>
      <input type="text" placeholder="Ingres el nombre del archivo" name="uname" onChange={ (e)=>setFile(e.target.value)  } ></input>
      <div>
      <button className='AA_button_VA'>VER ARCHIVO</button>
      </div>
      <div className='container_AA_view'>
      </div>
      </div>
      </div>
    </div>
  )
}
