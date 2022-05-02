import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import {getSearch} from '../actions';
import style from './SearchBar.module.css'


export default function SearchBar () {
    const dispatch = useDispatch();
    const [name,setName] = useState('');
    
    
    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);

    }
    function handleSubmit (e){
        e.preventDefault();
        dispatch(getSearch(name))
        setName({
            name:""
        })
    }
    return (
        <div className={style.sea}>
            <input
              type='text'
              value={name.name}
              placeholder='...buscar videojuego' 
              onChange={(e)=>handleInputChange(e)}
              className={style.inp}
           />
           <button className={style.btn} onClick={(e)=>handleSubmit(e)} type='submit'>BUSCAR</button>
        </div>
    )
}