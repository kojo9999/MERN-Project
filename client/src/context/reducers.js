import{REGISER_USER_BEGIN,REGISER_USER_SUCCESS,REGISER_USER_ERROR,LOGIN_USER_BEGIN,LOGIN_USER_ERROR,LOGIN_USER_SUCCESS} from './actions'

const reducer =(state,action) =>{


    if(action.type === REGISER_USER_BEGIN){
        return {...state}
    }

    if(action.type===REGISER_USER_SUCCESS){
        return{
            ...state,
            user:action.payload.user,
            token:action.payload.accessToken
        }
    }

    if(action.type===REGISER_USER_ERROR){
        return{
            ...state,
        }
    }

    if(action.type === LOGIN_USER_BEGIN){
        return {...state}
    }

    if(action.type===LOGIN_USER_SUCCESS){
        return{
            ...state,
            user:action.payload.user,
            token:action.payload.accessToken
        }
    }

    if(action.type===LOGIN_USER_ERROR){
        return{
            ...state,
        }
    }

    throw new Error(`no such action : ${action.type}`)
}

export default reducer