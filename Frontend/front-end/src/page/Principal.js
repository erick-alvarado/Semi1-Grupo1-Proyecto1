import React from 'react';
import { Nav } from '../page/Nav';
export const Principal = () => {
  return (
    <div className="principal">
      <Nav />
      <div className='public_file'>
        <div className='public_file_title'>
          <h3>ARCHIVOS PUBLICOS</h3>
        </div>
      </div>
      <div className='private_file'>
        <div className='private_file_title'>
          <h3>ARCHIVOS PRIVADOS</h3>
        </div>
      </div>
    </div>
    
  )
}
