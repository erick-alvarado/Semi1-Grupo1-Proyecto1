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
      <div className={"container3"} >
        {
              window.filefriends.map((index)=>{
                if ((index.archivo).includes(".jpg") == true){
                  return(
                  <div className={"item"}>
                  <img className={"item-img"} src={index.archivo} title = {index.name} alt="" />
                  <div className={"item-text"}>
                      <h5>Nombre: {index.nombre}</h5>
                      <h5>Propietario: {index.propietario}</h5>
                      <h5>fecha: {index.fecha}</h5>
                    
                  </div>
                  </div>
                  )
                }else if ((index.archivo).includes(".pdf") == true){

                  return(
                    <div className={"item"}>
                    <img className={"item-img"} src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png" title = {index.name} alt="" />
                    <div className={"item-text"}>
                        <h3>{index.name}</h3>
                        
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
  )
}
