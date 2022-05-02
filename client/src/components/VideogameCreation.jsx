import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postVideogame, getGenres } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import style from './VideogameCreation.module.css';


function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = 'A name is required';
    }
    
    if(!input.description){
        errors.description = 'A description is required';
    }
    if(!input.img){
        errors.img = 'A link for an image is required';
    }
    if(!input.release){
        errors.release = 'A release date is required';
    }
    if(!input.rating || input.rating > 5 || input.rating < 1){
        errors.rating = 'A number from 1 to 5 is requiered';
    }
    return errors
}


export default function VideogameCreation(){
    const dispatch = useDispatch();
    const history = useHistory();
    const genres = useSelector((state) => state.genres)
    const videogames = useSelector((state) => state.videogames);
    const [ errors, setErrors ] = useState({});
    console.log(videogames)

    const [ input, setInput ] = useState({
        name: '',
        description: '',
        img:'',
        released: '',
        rating: '',
        plataform: [],
        genres: []
    });

    const getPlataforms = function ()  {
        let aux = videogames;
        let aux2 =  aux.map((e) => e.plataform).flat(5)
        let aux3 =  new Set(aux2)
        let plat =  [...aux3]
        return plat
    }
    const plataforms = getPlataforms();

    function handleGenre(e){
        
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
    } 


    function handlePlataforms(e){
        setInput({
            ...input,
            plataform: [...input.plataform, e.target.value]
        })
    } 

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value,

        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value,
        }))
        console.log(input)
    }
    function handleSubmit(e) {
        if (
            !input.name ||
            !input.description ||
            !input.img ||
            !input.rating ||
            !input.plataform ||
            !input.genres
          ) {
            e.preventDefault();
            alert("Complete todos los campos para poder continuar");
          } else {
            e.preventDefault();
            dispatch(postVideogame(input));
            alert("Tu videojuego a sido creado con exito!!!!");
            // Para volver a la pantalla principal
          
            // Reseteamos el input
            setInput({
              name: "",
              description: "",
              rating: "",
              plataform: [],
              genres: [],
              img:""
            });
          }
        
    
        history.push('/home')
      }

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch])

     function handleDelete(e) {
         setInput({
             ...input,
             genres: input.genres.filter((genero) => genero !== e)
         })
     }
     function handlePatform (e){
         setInput({
             ...input,
             plataform : input.plataform.filter((plataforms) => plataforms !== e)
         })
     }


    return(
        <div className={style.crea}>
            
            <Link to='/home'>
                <button className={style.btn}>Back</button>
            </Link>
            <div >
                    <h1 className={style.tit} >Create New Videogame</h1>
                    <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
                        <div >
                            <div >
                                <div>
                                    <label className={style.nam} >Name: </label>                                    
                                    <input
                                    type='text'
                                    value={input.name}
                                    name='name'
                                    onChange={handleChange}
                                    />                                                                                
                                    {errors.name && (
                                        <p >{errors.name}</p>
                                    )} 
                                </div>
                                <div>
                                    <label className={style.nam} >Description: </label>
                                    <input
                                    type='text'
                                    value={input.description}
                                    name='description'
                                    onChange={handleChange}
                                    />                                       
                                    {errors.description && (
                                        <p >{errors.description}</p>
                                    )}                                                                                                        
                                </div>
                                <div>
                                    <label className={style.nam}>Image: </label>
                                    <input
                                    type='text'
                                    value={input.img}
                                    name='img'
                                    onChange={handleChange}
                                    />                                    
                                    {errors.img && (
                                        <p >{errors.img}</p>
                                    )}                                                                        
                                </div>
                                <div>
                                    <label className={style.nam}>Release Date: </label>
                                    <input
                                    type='date'
                                    value={input.released}
                                    name='released'
                                    onChange={handleChange}
                                    />
                                    {errors.release && (
                                        <p >{errors.release}</p>
                                    )}
                                </div>
                                <div>
                                    <label className={style.nam} >Rating: </label>
                                    <input
                                    type='number'
                                    value={input.rating}
                                    name='rating'
                                    onChange={handleChange}
                                    />
                                    {errors.rating && (
                                        <p >{errors.rating}</p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <div >
   
                                    <select className={style.select} onChange={handleGenre}>
                                        {
                                            genres.map((e) => 
                                            <option value={e.name}>{e.name} </option>
                                            
                                            )
                                            
                                        }
                                     
                                    </select>
                                    <ul>{input.genres.map((e) =>( 
                                    <div>
                                    <li >{e}</li> 
                                    <button
                                    className={style.btnn}
                                    type='button'
                                    onClick={() => handleDelete(e)}
                                   
                                     >
                                    X
                                  </button>
                                  </div>
                                    ))}</ul>
                                    
                                </div>
                                <div >
                                
                                    <select  className={style.sele} onChange={handlePlataforms}>
                                        {
                                            plataforms.map((e) =>
                                                <option value={e}>{e}</option>
                                            )
                                        }
                                    </select>
                                    <ul >{input.plataform.map((e) =>(
                                        <div>
                                     <li >{e}</li>
                                     <button
                                     className={style.btnn}
                                    type='button'
                                    onClick={() => handlePatform(e)}
                                   
                                     >
                                    X
                                  </button>
                                  </div>
                                     ))}</ul>

                                </div>
                            </div>
                        </div>
                        <button className={style.btn} type='submit'>Create Videogame</button>
                    </form>
            </div>                        
        </div>
    )
}