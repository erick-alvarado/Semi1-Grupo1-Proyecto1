import React from 'react';
import { Nav } from '../page/Nav';
export const Principal = () => {
  return (
    <div className="principal">
      <Nav />
      <div className='public_file'>
        <div className='public_file_title'>
          <h3>ARCHIVOS PUBLICOS</h3>
          <div>
            {
	            window.public.map((index) =>  
              
               <img src={index.path} title = {index.name}
      
	            alt="Images" height="250" width="250" style={{border:"solid",backgroundColor:'gray'}}/>)
            }
        </div>
        </div>
      </div>
      <div className='private_file'>
        <div className='private_file_title'>
          <h3>ARCHIVOS PRIVADOS</h3>
          <div>
            {
	            window.private.map((index) =>
               <img src={index.path} title = {index.name}
	            alt="Images" height="250" width="250" style={{border:"solid",backgroundColor:'gray'}}/>)
            }
        </div>
        </div>
      </div>
    </div>
    
  )
}
