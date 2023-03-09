import React, { useState, useEffect } from 'react'
import FormInput from '../components/FormInput'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'

const initialState = {
  username: '',
  email: '',
  password: '',
  isMember: false,
}

const Register = () => {
  const [values, setValues] = useState(initialState)
  const [errors, setErrors] = useState({})
  const { registerUser, user, loginUser } = useAppContext()
  const navigate = useNavigate()

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const validate = (fieldValues = values) => {
    let tempErrors = {}

    if ('username' in fieldValues) {
      tempErrors.username = fieldValues.username ? '' : 'Username is required'
    }

    if ('email' in fieldValues) {
      tempErrors.email = fieldValues.email
        ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValues.email)
          ? ''
          : 'Invalid email address'
        : 'Email is required'
    }

    if ('password' in fieldValues) {
      tempErrors.password = fieldValues.password ? '' : 'Password is required'
    }

    setErrors(tempErrors)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    validate()

    if (Object.keys(errors).length !== 0) {
      return
    }

    const { username, email, password, isMember } = values

    const currentUser = { username, email, password }

    if (isMember) {
      loginUser(currentUser)
    } else {
      registerUser(currentUser)
    }
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 1000)
    }
  }, [user, navigate])

  return (
    <form onSubmit={handleSubmit}>
      <h1>{values.isMember ? 'Login' : 'Register'}</h1>
      {!values.isMember && (
        <FormInput
          type='email'
          value={values.email}
          name='email'
          labelText='Email'
          handleChange={handleChange}
          errorMessage={errors.email}
        />
      )}

      <FormInput
        type='text'
        value={values.username}
        name='username'
        labelText='Username'
        handleChange={handleChange}
        errorMessage={errors.username}
      />

      <FormInput
        type='password'
        value={values.password}
        name='password'
        labelText='Password'
        handleChange={handleChange}
        errorMessage={errors.password}
      />

      <button type='submit'>Submit</button>

      <p>{!values.isMember ? 'Already a member?' : 'Not a member yet?'}</p>
      <button type='button' onClick={toggleMember}>
        {!values.isMember ? 'Login' : 'Register'}
      </button>
    </form>
  )
}

export default Register
