import React, {useState, useReducer,useContext, createContext} from "react";
import reducer from './reducers'
import{REGISER_USER_BEGIN,REGISER_USER_SUCCESS,REGISER_USER_ERROR,LOGIN_USER_BEGIN,LOGIN_USER_ERROR,LOGIN_USER_SUCCESS} from './actions'
import axios from "axios";


const accessToken = localStorage.getItem('accessToken')
const refreshToken = localStorage.getItem('refreshToken')
const user = localStorage.getItem('user')


const initalState ={
user:user?JSON.parse(user):null,
accessToken:accessToken,
refreshToken:refreshToken
}

const AppContext = React.createContext()

const AppProvider = ({children}) =>{

    const [state,dispatch] = useReducer(reducer,initalState)

    const addUserToLocal = ({user,accessToken,refreshToken}) =>{
        localStorage.setItem('user',JSON.stringify(user))
        localStorage.setItem('accessToken',JSON.stringify(accessToken))
        localStorage.setItem('refreshToken',JSON.stringify(refreshToken))

    }

    const removeUser = () =>{
        localStorage.remove('user')
        localStorage.remove('accessToken')
        localStorage.remove('refreshToken')


    }

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

          addUserToLocal({user,accessToken,refreshToken})
        } catch (err) {
          dispatch({
            type: REGISER_USER_ERROR,
            payload: { msg: err.response }
          })
        }
      }

      const loginUser = async(currentUser) =>{
        dispatch({ type: LOGIN_USER_BEGIN })
        try {
          const response = await axios.post('/api/auth/login', currentUser)
          console.log('Response:', response)
          const { user, accessToken, refreshToken } = response.data
          dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: {
              user,
              accessToken,
              refreshToken
            }
          })

          addUserToLocal({user,accessToken,refreshToken})
        } catch (err) {
          dispatch({
            type: LOGIN_USER_ERROR,
            payload: { msg: err.response }
          })
        }
      }

    return(
        <AppContext.Provider value={{...state,registerUser,loginUser}}>
            {children}
        </AppContext.Provider>
    )
}


const useAppContext = () =>{
    return useContext(AppContext)
}

export {AppProvider,useAppContext,initalState}