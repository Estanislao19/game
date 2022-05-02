import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, getGenres, filterByGenre, orderByName, orderByRating, filterVideogames, createdGame } from '../actions';
import Paginado from './Paginado';
import Card from './Card';
import SearchBar from './SearchBar';
import style from './Home.module.css';



export default function Home(){
    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.videogames);
    console.log('dalle', allVideogames)
    const genres = useSelector((state) => state.genres);
    const [ order, setOrder ] = useState('');
    
    const [currentPage, setCurrentPage] = useState(1); // siempre empeza en la página n1
    const [GamePerPage, setGamePerPage] = useState(15); //
    const indexOfLastGame = currentPage * GamePerPage;
    const indexOfFirstGame = indexOfLastGame - GamePerPage;
    const currentGame = allVideogames.slice(indexOfFirstGame, indexOfLastGame);
    
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    
    useEffect(() => {
        dispatch(getVideogames());
    }, [dispatch])

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getVideogames());
    }
    
    

    function handlecreatedGame(e){
        dispatch(createdGame(e.target.value))
        setCurrentPage(1)
      
    }
  
   
  

    function handleFilterByGenre(e){
        dispatch(filterByGenre(e.target.value))
        setCurrentPage(1)
    }

    function handleordenAlfabetico(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1)
        setOrder(`Ordenado ${e.target.value}`)
    }
   
    function handleRatingSort(e){
        e.preventDefault();
        dispatch(orderByRating(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`)
    }
    function handlefilterVideogames (e){
        dispatch(filterVideogames(e.target.value))
        setCurrentPage(1)
      }
      let todogames = allVideogames.map(e =>{
        let re = e.name.split('').join('');
        let perr = re
        return perr
    })
    const allgamer = [...new Set(todogames)]

    return(
    <div className={style.div}>
         <div>
         <Link to='/games' className={style.da}>Vamos a crear un nuevo videojuego</Link>
            <h1 className={style.tit}>PAGINA DE VIDEOGAMES</h1>
            <SearchBar/>
                <div >
                    <div >
                    <h4 className={style.h3}>Ordenamiento alfabetico de los videojuego</h4>
                        <select className={style.select} onChange={e => handleordenAlfabetico(e)}>
                            <option value='asc'>A-Z</option>
                            <option value='desc'>Z-A</option>
                        </select>
                    </div>
                    <div >
                    <h4 className={style.h3}>Ordenamiento alfabetico de rating</h4>
                        <select className={style.select} onChange={e => handleRatingSort(e)} >
                            <option value='rasc'>higher rating</option>
                            <option value='rdesc'>lower rating</option>
                        </select>
                    </div>
                </div>
                <div  >
                    
                    <div >
                    <h4 className={style.h3}>Videojuegos existentes o agregado por nosotros </h4>
                    <select className={style.select} onChange={(e)=>handlecreatedGame(e)}>
                    <option value="all">Videojuegos existentes</option>
                    <option value="created">Videojuegos creados por nosotros</option>
                </select>
                
                
                <h4 className={style.h3}>Videojuegos </h4>
                        <select className={style.select} onChange={(e)=>handlefilterVideogames(e)}>
                <option value="all">Filtro de videojuegos</option>
            {allgamer.map((e)=> 
            <option name={e}>{e}</option>)}
                </select>
                    </div>
                </div>
                <div >
                    
                    <div >
                        <h4 className={style.h3}>Genero</h4>
                        <select className={style.select}  onChange={e => handleFilterByGenre(e)}>
                            <option value='all'>Filtro por generos</option>
                            {
                                genres.map((e) => 
                                <option value={e.name}>{e.name}</option>
                                )
                            }
                        </select>  
                    </div>
        
        <div >
            <div >   
                
          
            
            <Paginado
            
          GamePerPage={GamePerPage}
          allVideogames={allVideogames.length}
          paginado={paginado}
        />
       
        <button  className={style.button} onClick={e => {handleClick(e)}}>Volver a cargar los videojuegos</button>
         
                    <ul >
                        {
                            currentGame?.map(e => {
                                return(
                                    <li >
                                <Card name={e.name}  img={e.img} genres={!currentGame[0].createdInDb? e.genres.join(','): 
                  currentGame[0].genres.map((el)=>el.name).join(' - ')} rating={e.rating}  id= {e.id} createdInDb={e.createdInDb} />                            
                                    </li>
                                )
                            })
                        }
                    </ul>
               
                
            </div>

           
                </div>
            </div>    
        </div>
    </div>    
    )
}