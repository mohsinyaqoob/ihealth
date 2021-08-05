import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT
} from '../types'

import axios from 'axios'
import { toast } from 'react-toastify'
import setAuthToken from '../../../utils/setAuthToken'


export const loadUser = () => async dispatch => {

    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/admin/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
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

        const res = await axios.post('/api/admin/auth', body, config)
        console.log(res.data)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })

        dispatch(loadUser())
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => toast(error.msg, { type: 'error' }))
            dispatch({
                type: LOGIN_FAILED
            })
        }
    }
}

export const logout = () => dispatch => {
    dispatch({ type: LOGOUT })
}