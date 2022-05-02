import axios from 'axios';

export function getVideogames(){
    return async function(dispatch){
        var json = await axios.get("/videogames")
        return dispatch({
            type: 'GET_VIDEOGAMES',
            payload: json.data
        })
    }
}





export function createdGame (payload){
    return{
        type:'CREATED_GAME',
        payload
    }
}

export function filterByGenre(payload){
    return{
        type: 'FILTER_BY_GENRE',
        payload
    }
}
export function filterVideogames (payload) {
    return {
        type:'FILTER_VIDEOGAMES',
        payload
    }
 }

export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
}
export function getreleased (payload){
    return{
        type: 'GET_RELEASED',
        payload
    }
}

export function orderByRating(payload){
    return{
        type: 'ORDER_BY_RATING',
        payload
    }
}

export function getSearch(name){
    return async function(dispatch){
        try{
            var json = await axios.get("/videogames?name=" + name);
            return dispatch({
                type: 'GET_SEARCH',
                payload: json.data
            })
        }catch(error) {
            alert('no se encuentra el videojuego que estas buscando')
        }
    }
}



export function getGenres(){
    return async function(dispatch) {
        let genres = await axios.get("/genres", {

        })
        return dispatch({
            type: 'GET_GENRES',
            payload: genres.data
        })
    }
}

export function resetDetail (payload) {
    return{
        type:'RESET_DETAIL',
        payload
    }
    
    }

export function postVideogame(payload){
    return async function(dispatch){
        const response = await axios.post("/videogames", payload)
        return response;
    }
}

export function getDetail(id){
    return async function(dispatch){
       
            var json = await axios.get("/videogames/" + id);
            return dispatch({
                type: 'GET_DETAIL',
                payload: json.data
            })
                      
    }
}

