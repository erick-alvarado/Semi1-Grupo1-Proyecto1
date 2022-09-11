import React from 'react';
import { Nav } from '../page/Nav';
export const Principal = () => {
  return (
<div>
      <Nav/>
      <div className="container_AA">
      <div className='AA_text_VA'>
      <label htmlFor="uname" style={{color:"BLACK" } }><b>ARCHIVOS PUBLICOS</b></label>  
      <div className={"container4"} >
      {
              window.public.map((index)=>{

                if ((index.path).includes(".jpg") == true || (index.path).includes(".png") == true || (index.path).includes(".svg") == true){
                  return(
                  <div className={"item"}>
                  <img className={"item-img"} src={index.path} title = {index.name} alt="" />
                  <div className={"item-text"}>
                      <h3>{index.name}</h3>
                    
                  </div>
                  </div>
                  )
                }else if ((index.path).includes(".pdf") == true){

                  return(
                    <div className={"item"}>
                    <img className={"item-img"} src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png" title = {index.name} alt="" />
                    <div className={"item-text"}>
                        <h3>{index.name}</h3>
                        
                    </div>
                    </div>
                    )
                
                }
                else if ((index.path).includes(".txt") == true){

                  return(
                    <div className={"item"}>
                    <img className={"item-img"} src="https://cdn-icons-png.flaticon.com/512/3022/3022200.png" title = {index.name} alt="" />
                    <div className={"item-text"}>
                        <h3>{index.name}</h3>
                        
                    </div>
                    </div>
                    )
                
                }
               
              })

            } 
    </div>
    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    <label htmlFor="uname" style={{color:"BLACK" } }><b>ARCHIVOS PRIVADOS</b></label> 
    <div className={"container5"}>

            {
              window.private.map((index)=>{

                if ((index.path).includes(".jpg")== true){
                  return(
                  <div className={"item"}>
                  <img className={"item-img"} src={index.path} title = {index.name} alt="" />
                  <div className={"item-text"}>
                      <h3>{index.name}</h3>
                    
                  </div>
                  </div>
                  )
                }else if ((index.path).includes(".pdf")== true){

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
