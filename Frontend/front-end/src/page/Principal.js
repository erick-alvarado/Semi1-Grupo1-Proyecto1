import React from 'react';
import { Nav } from '../page/Nav';
export const Principal = () => {
  return (
    

<div className='general_agre_fre'>
    <div class="split left">
      <Nav/>
    </div>
    <div class="split right">

    <div className={"container2"}>
            <h3>ARCHIVOS PUBLICOS</h3>
            {
              window.public.map((index)=>{

                if ((index.path).includes(".jpg") == true){
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
               
              })

            }  

  </div>
  <div className={"container2"}>
            <h3>ARCHIVOS PRIVADOS</h3>
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
    
  )
}
