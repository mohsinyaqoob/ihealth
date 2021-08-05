import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  DOCTOR_LOADED,
  AUTH_ERROR
} from './types'

import axios from 'axios'
import { toast } from 'react-toastify'
import setAuthToken from '../../../utils/setAuthToken'

export const loadDoctor = () => async dispatch => {

  if (localStorage.doctorToken) {
    setAuthToken(localStorage.doctorToken)
  }

  try {
    const res = await axios.get('/api/doctor/auth');
    dispatch({
      type: DOCTOR_LOADED,
      payload: res.data.doctor
    })

  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    })
  }
}

export const login = ({ username, password }) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }
    const body = JSON.stringify({ username, password })
    const res = await axios.post('/api/doctor/auth', body, config)

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.token
    })

    dispatch(loadDoctor())


  } catch (err) {
    dispatch({
      type: LOGIN_FAIL
    })
    const errors = err.response.data.errors;
    errors.forEach(error => toast(error.msg, { type: 'error' }))
  }
}

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  })
}