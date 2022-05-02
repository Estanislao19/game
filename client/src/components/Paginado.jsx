import React,{useState,useEffect} from "react";
import style from './Paginado.module.css'


export default function Paginado({ GamePerPage, allVideogames, paginado}) {
  const pageNumbers = [];

 
  
  for (let i = 1; i <= Math.ceil(allVideogames / GamePerPage); i++) {
    pageNumbers.push(i);//para que arranque en la pág 1, sino arrancaba en pág 0
  
  }
  
    

  return (
    
    <nav className={style.nav} >
      <ul >
    
        {pageNumbers &&
        
          pageNumbers.map((number) => ( 
                <button className={style.btn}  onClick={() => paginado(number)} >{number}</button>
                
          ))}
          
     </ul>
    </nav>
  );
}