import { Nav} from '../page/Nav';
import React, {useState} from "react";

export const AgregarAmigos = () => {
  const [pas, setPas] = useState("");


  return (
    <div>
    
      <div class="split left">
      <Nav/>
    </div>
    <div class="split right">
      <div className="container_AA">
      <div className='AA_text_VA'>
      <label htmlFor="uname" style={{color:"BLACK" } }><b>BUSCAR USUARIO</b></label>
      <input type="text" placeholder="Ingres Username" name="uname" onChange={ (e)=>setPas(e.target.value)  } ></input>
      <div>
      <button className='AA_button_VA'>BUSCAR</button>
      </div>
      
        <h3>Todos los amigos</h3>
      <div className={"container3"} >
        {
              window.users.map((index)=>{
                if(window.user != index.idUser){
                  return(
                    <div className={"item"}>
                    <img className={"item-img"} src={index.foto} title = {index.user} alt="" />
                    <br/>
                    <div className={"item-text"}>
                        <h4>{index.user}</h4>
                        <h5>{index.filespublic} archivos publicos </h5>
                        <button type='submit'>Agregar Amigo</button>
                    </div>
                    </div>
                    )
                }
              })
            }
    
    </div>
      </div>
      </div>
      </div>
    </div>
  )
}
