import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    HOSPITAL_LOADED,
    HOSPITAL_LOAD_FAILED,
    HOSPITAL_LOGOUT
} from './types'
import axios from 'axios'
import { toast } from 'react-toastify'
import setAuthToken from '../../../utils/setAuthToken'

export const loadHospital = () => async dispatch => {
    if (localStorage.hospitalToken) {
        setAuthToken(localStorage.hospitalToken)
    }

    try {
        const res = await axios.get('/api/hospital/auth/loadHospital');
        dispatch({
            type: HOSPITAL_LOADED,
            payload: res.data.hospital
        })
    } catch (err) {
        console.log(err)
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => toast(error.msg, { type: 'error' }))
        }
        dispatch({
            type: HOSPITAL_LOAD_FAILED
        })
    }
}


export const login = formData => async dispatch => {
    const body = JSON.stringify({ hospitalId: formData.hospital.value, password: formData.password })
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    try {
        const res = await axios.post('/api/hospital/auth/login', body, config)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })

        dispatch(loadHospital())

    } catch (err) {
        //diapatch here
        dispatch({
            type: LOGIN_FAILED
        })
        const errors = err.response.data.errors;
        errors.forEach(error => toast(error.msg, { type: 'error' }))
    }
}

export const logout = () => async dispatch => {
    dispatch({
        type: HOSPITAL_LOGOUT
    })
}