import {
  NURSE_LOGIN_SUCCESS,
  NURSE_LOGIN_FAIL,
  NURSE_LOADED,
  NURSE_AUTH_ERROR,
  NURSE_LOGOUT
} from './types'

import axios from 'axios'
import { toast } from 'react-toastify'

import setAuthToken from '../../../utils/setAuthToken'

export const loadNurse = () => async dispatch => {
  if (localStorage.nurseAuthToken) {
    setAuthToken(localStorage.nurseAuthToken)
  }

  // Load user
  try {
    const res = await axios.get('/api/nurse/auth')
    dispatch({
      type: NURSE_LOADED,
      payload: res.data.nurse
    })
  } catch (err) {
    console.log(err.message)
    const errors = err.response.data.errors;
    errors.forEach(error => toast(error.message, { type: 'error' }))
    dispatch({
      type: NURSE_AUTH_ERROR
    })
  }

}

export const login = ({ username, password }) => async dispatch => {
  try {
    const body = JSON.stringify({ username, password })
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }
    const res = await axios.post('/api/nurse/auth', body, config)
    dispatch({
      type: NURSE_LOGIN_SUCCESS,
      payload: res.data.token
    })
    dispatch(loadNurse())
  } catch (err) {
    dispatch({
      type: NURSE_LOGIN_FAIL
    })
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => toast(error.msg, { type: 'error' }))
    }
  }
}

export const logout = () => dispatch => {
  dispatch({
    type: NURSE_LOGOUT
  })
}