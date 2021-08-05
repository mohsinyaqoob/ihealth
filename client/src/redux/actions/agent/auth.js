import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AGENT_LOADED,
  AUTH_ERROR,
  LOGOUT
} from './types'

import axios from 'axios'
import { toast } from 'react-toastify'
import setAuthToken from '../../../utils/setAuthToken'



export const loadAgent = () => async dispatch => {

  if (localStorage.agentToken) {
    setAuthToken(localStorage.agentToken)
  }

  try {
    const res = await axios.get('/api/agent/auth');
    dispatch({
      type: AGENT_LOADED,
      payload: res.data.agent
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
    const res = await axios.post('/api/agent/auth', body, config)

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.token
    })

    dispatch(loadAgent())


  } catch (err) {
    console.log(err.message)

    dispatch({
      type: LOGIN_FAIL
    })

    const errors = err.response.data.errors;
    errors.forEach(error => toast(error.msg, { type: 'error' }))
    console.log('Here')

  }
}


export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  })
}