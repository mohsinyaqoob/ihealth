import {
  LAB_LOGIN_SUCCESS,
  LAB_LOGIN_FAIL,
  LAB_LOADED,
  LAB_AUTH_ERROR,
  LAB_LOGOUT
} from './types'

import axios from 'axios'
import { toast } from 'react-toastify'

import setAuthToken from '../../../utils/setAuthToken'


export const loadLab = () => async dispatch => {
  if (localStorage.labAuthToken) {
    setAuthToken(localStorage.labAuthToken)
  }

  // Load user
  try {
    const res = await axios.get('/api/lab/auth')
    dispatch({
      type: LAB_LOADED,
      payload: res.data.lab
    })
  } catch (err) {
    console.log(err.message)
    const errors = err.response.data.errors;
    errors.forEach(error => toast(error.message, { type: 'error' }))
    dispatch({
      type: LAB_AUTH_ERROR
    })
  }

}

export const login = formData => async dispatch => {
  try {
    const body = JSON.stringify({ username: formData.username, password: formData.password })
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }
    const res = await axios.post('/api/lab/auth', body, config)
    const payload = res.data.token
    dispatch({
      type: LAB_LOGIN_SUCCESS,
      payload
    })
    dispatch(loadLab())
  } catch (err) {
    dispatch({
      type: LAB_LOGIN_FAIL
    })
    dispatch(loadLab())
    const errors = err.response.data.errors;
    console.log('Errors array: ', errors)
    if (errors) {
      errors.forEach(error => toast(error.msg, { type: 'error' }))
    }
  }
}


export const logout = () => dispatch => {
  dispatch({
    type: LAB_LOGOUT
  })
}