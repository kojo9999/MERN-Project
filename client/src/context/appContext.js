import React, {useState, useReducer,useContext, createContext} from "react";
import reducer from './reducers'
import{REGISER_USER_BEGIN,REGISER_USER_SUCCESS,REGISER_USER_ERROR,LOGIN_USER_BEGIN,LOGIN_USER_ERROR,LOGIN_USER_SUCCESS} from './actions'
import axios from "axios";


const initalState ={
user:null,
token:null
}

const AppContext = React.createContext()

const AppProvider = ({children}) =>{

    const [state,dispatch] = useReducer(reducer,initalState)

    const registerUser = async (currentUser) => {
        dispatch({ type: REGISER_USER_BEGIN })
        try {
          const response = await axios.post('/api/auth/register', currentUser)
          console.log('Response:', response)
          const { user, accessToken, refreshToken } = response.data
          dispatch({
            type: REGISER_USER_SUCCESS,
            payload: {
              user,
              accessToken,
              refreshToken
            }
          })
        } catch (err) {
          dispatch({
            type: REGISER_USER_ERROR,
            payload: { msg: err.response }
          })
        }
      }

    return(
        <AppContext.Provider value={{...state,registerUser}}>
            {children}
        </AppContext.Provider>
    )
}


const useAppContext = () =>{
    return useContext(AppContext)
}

export {AppProvider,useAppContext,initalState}