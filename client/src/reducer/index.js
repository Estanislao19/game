const initialState = {
    videogames : [],
    allVideogames: [],
    genres: [],
    detail: [],
    
}

function rootReducer(state = initialState, action){
    switch (action.type) {
        case 'GET_VIDEOGAMES':
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload,
            }
        
        case 'FILTER_BY_GENRE':
            const allVideogames = state.videogames;
            const filteredGen = action.payload === 'all' ? allVideogames : allVideogames.filter(el=>el.genres.includes(action.payload)) 
            
            return {
                ...state,
                videogames: filteredGen
            }   
            case 'GET_RELEASED':
                const dale = action.payload === 'desc' ?
                state.videogames.sort(function(a,b){
                    if(a.released > b.released){
                        return 1;
                    }
                    if(a.released < b.released){
                        return -1;
                    }
                    return 0;
                }):
                state.videogames.sort(function(a,b){
                  if(a.released > b.released){
                      return -1;
                  }
                  if(a.released < b.released){
                      return 1;

                  }
                  return 0;
                })
                return{
                    ...state,
                    videogames:dale
                }
        
            case 'CREATED_GAME':
                       const juego = state.allVideogames
                       const seee = action.payload === 'created' ? juego.filter(el=>el.createdInDb) : juego.filter(el=>!el.createdInDb)
                       return {
                           ...state,
                           videogames:seee
                       }
        case 'ORDER_BY_NAME':
            let sortedAlpha = action.payload === 'asc' ?
            state.videogames.sort(function(a, b){
                if(a.name > b.name){
                    return 1;
                }
                if(b.name > a.name){
                    return -1;
                }
                return 0;
            }) : 
            state.videogames.sort(function(a, b){
                if(a.name > b.name){
                    return -1;
                }
                if(b.name > a.name){
                    return 1;
                }
                return 0;
            }) 
            return {
                ...state,
                videogames: sortedAlpha
            }
        case 'ORDER_BY_RATING':
            let sortedRating = action.payload === 'rdesc' ?
            state.videogames.sort(function(a, b){
                if(a.rating > b.rating){
                    return 1;
                }
                if(b.rating > a.rating){
                    return -1;
                }
                return 0;
            }) : 
            state.videogames.sort(function(a, b){
                if(a.rating > b.rating){
                    return -1;
                }
                if(b.rating > a.rating){
                    return 1;
                }
                return 0;
            }) 
            return {
                ...state,
                videogames: sortedRating
            }
        case 'GET_SEARCH':
            return{
                ...state,
                videogames: action.payload
            }
            
                
        case 'GET_GENRES':
            return{
                ...state,
                genres: action.payload
            }        
        case 'POST_VIDEOGAME':
            return{
                ...state
            }
        case 'GET_DETAIL':
            return{
                ...state,
                detail: action.payload
            }   
            case 'RESET_DETAIL':
                 return{
               ...state,
                  detail:[]
                 }    
            case 'FILTER_VIDEOGAMES':
                            const eso = state.allVideogames
                            const vemos = action.payload === 'all' ? eso : eso.filter(el=>el.name.includes(action.payload));
                            return{
                                ...state,
                                videogames:vemos
                            }
                        
                          

        default:
            return state;    
    }

}

export default rootReducer;