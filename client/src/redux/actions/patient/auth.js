import {
  PATIENT_LOADED,
  AUTH_ERROR,
  LOGOUT,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from './types'

import axios from 'axios'
import { toast } from 'react-toastify'
import setAuthToken from '../../../utils/setAuthToken'

const loadPatient = () => async dispatch => {
  if (localStorage.patientAuthToken) {
    setAuthToken(localStorage.patientAuthToken)
  }

  try {
    const res = await axios.get('/api/patient/auth');
    dispatch({
      type: PATIENT_LOADED,
      payload: res.data.patient
    })
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    })
    // const errors = err.response.data.errors;
    // errors.forEach(error => toast(error.msg, { type: 'error' }))
  }





}

const login = ({ aadhaarNumber, password }) => async dispatch => {
  const body = JSON.stringify({ aadhaarNumber, password })
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  }
  try {
    const res = await axios.post('/api/patient/auth', body, config)
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.token
    })
    dispatch(loadPatient())
    toast('You are logged in', { type: 'success' })
  } catch (err) {

    dispatch({
      type: LOGIN_FAIL
    })

    const errors = err.response.data.errors
    errors.forEach(error => toast(error.msg, { type: 'error' }))
  }
}

const logout = () => async dispatch => {
  dispatch({
    type: LOGOUT
  })
}


export { loadPatient, login, logout }