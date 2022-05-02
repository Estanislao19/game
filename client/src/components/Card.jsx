import React from 'react';
import { Link } from 'react-router-dom';
import style from './Card.module.css'
export default function Card({name, img, genres, id, rating,released }){
    return(
        <div className={style.Card} >
            <Link  to={`/home/${id}`}>
                <h3 className={style.name} >{name}</h3>
            </Link>
        <h5 className={style.genres}>{genres}</h5>
        <h5 className={style.rating}>{rating}</h5>
       
      
        <img className={style.img}  src={img} alt="Img not found" width = '200px' height = '250px' />

            
            
        </div>
    )

}