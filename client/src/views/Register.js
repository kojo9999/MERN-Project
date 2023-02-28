import { formToJSON } from 'axios'
import React, {useState,useEffect}from 'react'
import FormInput from '../components/FormInput'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'

const initalState={
    username:'',
    email:'',
    password:'',
    isMember: false,
}


const Register = () => {

    const [values,setValues] =useState(initalState)

    const {registerUser,user,loginUser} = useAppContext()
    const navigate = useNavigate()

    const toggleMember = () => {
        setValues({...values,isMember:!values.isMember})
    }

    const handleChange = e =>{
        setValues({...values,[e.target.name]:e.target.value})
    }

    const handleSubmit = e =>{
        e.preventDefault()
        

        const {username,email,password,isMember} = values;

        if(!username||!password||(!isMember&&!username)){
            return
        }

        const currentUser = {username,email,password}
        if(isMember){
            loginUser(currentUser)
        }else{
            registerUser(currentUser)
        }

    }

    useEffect(()=>{

        if(user){
            setTimeout(()=>{
                
                navigate('/')

            },3000)
        }

    },[user,navigate])

  return (
    <form onSubmit={handleSubmit}>

    <h1>{values.isMember?'Login':'Register'}</h1>
    
    {!values.isMember && (

<FormInput


type='email'
value={values.email}
name='email'
handleChange={handleChange}

/>

    )}

   

<FormInput

type='text'
value={values.username}
name='username'
handleChange={handleChange}

/>

<FormInput

type='password'
value={values.password}
name='password'
handleChange={handleChange}

/>

    <button type='submit'>Submit</button>

    <p>{!values.isMember ? 'Already a member?':'Not a member yet?'}</p>
    <button type='button' onClick={toggleMember}>{!values.isMember ? 'Login':'Register'}</button>

    </form>
  )
}
export default Register