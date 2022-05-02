import React from 'react';
import {Link} from 'react-router-dom';
import style from'./LandingPage.module.css';
export default function LandingPage () {
    return(
        <div className={style.dale}>
            <h1 className={style.tit}>BIENVENIDOS A MI PAGINA DE </h1>
            <Link to='/home'><button className={style.but}>INGRESAR</button></Link>
        </div>
    )
        
    
}