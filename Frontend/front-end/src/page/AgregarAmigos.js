import { Nav} from '../page/Nav';
import React, {useState} from "react";

export const AgregarAmigos = () => {
  const [pas, setPas] = useState("");


  return (
    <div>
    
      <div class="split left">
      <Nav/>
    </div>
    <div class="split right"></div>

      <div className="container_AA">
      <div className='AA_text_VA'>
      <label htmlFor="uname" style={{color:"BLACK" } }><b>BUSCAR USUARIO</b></label>
      <input type="text" placeholder="Ingres Username" name="uname" onChange={ (e)=>setPas(e.target.value)  } ></input>
      <div>
      <button className='AA_button_VA'>BUSCAR</button>
      </div>
      <div className='container_AA_view'>
        <h3>Todos los amigos</h3>
      <div className={"container3"} >
        {
              window.users.map((index)=>{
                  return(
                  <div className={"item"}>
                  <img className={"item-img"} src={index.foto} title = {index.user} alt="" />
                  <div className={"item-text"}>
                      <h3>{index.user}</h3>
                  </div>
                  </div>
                  )

              })
            }
    </div>
      </div>
      </div>
      </div>
    </div>
  )
}
