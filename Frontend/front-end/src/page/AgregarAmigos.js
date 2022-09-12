import { Nav} from '../page/Nav';
import React, {useState} from "react";

export const AgregarAmigos = () => {
  const [pas, setPas] = useState("");
  const [amigo, setAmigo] = useState("")



  return (
    <div className='general_agre_fre'>
    
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
                        <button  onClick={()=>veamos(index.idUser)} className="bt_agre_fred"  >Agregar Amigo</button>
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


export const veamos = async(data) => {
console.log(data)
const res = await fetch("http://http://bala-1285632499.us-east-1.elb.amazonaws.com:8080/:8080/api/addfriend", {
        method: "POST",
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({ user: window.user, amigo: data}),
    }).then((res) => res.json());
    alert(JSON.stringify(`${res.msg}`));

    const res3 = await fetch("http://http://bala-1285632499.us-east-1.elb.amazonaws.com:8080/:8080/api/viewfiles/"+window.user, {
      method: "GET",
      headers: { 'Content-Type': 'application/json' },
  }).then((res3) => res3.json());


      window.filefriends = res3.msg


}