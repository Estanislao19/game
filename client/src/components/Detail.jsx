import React,{useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getDetail, resetDetail } from '../actions';
import {useParams} from 'react-router';
import { Link } from 'react-router-dom';
import style from './Detail.module.css'

export default function Detail () {
const dispatch = useDispatch();
const myVgame = useSelector((state) => state.detail);
const {id} = useParams();


useEffect(() => {
    dispatch(getDetail(id));
    return ()=>{
   dispatch(resetDetail())
}
}, [dispatch , id] )


return (
    <div >
      <body   >
        
      
      <div  className={style.div}>
        <h1 className={style.h1}> {myVgame.name}</h1> 
        <img className={style.img} src={ myVgame.img || myVgame.background_image} alt= 'Img Not Found' width='400px' height='500px'/>
         <h3 className={style.h3}>Rating:{myVgame.rating}</h3>
        <h3 className={style.gen}>Generos:{ myVgame.genres?.map(el => el.name).join('-')}</h3>
        <h3 className={style.fe}>Fecha de Lanzamiento:{myVgame.released }</h3>
        <h4 className={style.h3} >Plataformas:</h4>
          <ul className={style.fe}>{myVgame.plataform ? myVgame.plataform.map((e) => <li >{e}</li>) : ""}</ul>
          <ul className={style.fe}> {myVgame.id?.length   ? myVgame.platforms?.map(el => el.name)
        :myVgame.platforms?.map(el=> el.platform.name).join(' || ')}</ul>  
        <h3 className={style.h3}> Descripción:</h3><p className={style.Detail}><strong> {myVgame.description_raw || myVgame.description }</strong> </p> 
        
        <Link to='/home'><button className={style.btn}>HOME</button></Link>
      </div >
      </body>
    </div>
)
}