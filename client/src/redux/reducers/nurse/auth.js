import {
  NURSE_LOGIN_SUCCESS,
  NURSE_LOGIN_FAIL,
  NURSE_LOADED,
  NURSE_AUTH_ERROR,
  NURSE_LOGOUT
} from '../../actions/nurse/types'

import removeAuthToken from '../../../utils/removeAuthToken'

const initialState = {
  token: localStorage.getItem('nurseAuthToken'),
  loading: true,
  isAuthenticated: false,
  nurse: {}
}

const nurseAuthReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {

    case NURSE_LOADED:
      return {
        ...state, loading: false, nurse: payload, isAuthenticated: true,
      }

    case NURSE_LOGIN_SUCCESS:
      localStorage.setItem('nurseAuthToken', payload)
      return {
        ...state, loading: false, isAuthenticated: true, token: payload
      }

    case NURSE_LOGIN_FAIL:
    case NURSE_AUTH_ERROR:
      localStorage.removeItem('nurseAuthToken')
      removeAuthToken()
      return {
        ...state, loading: false, isAuthenticated: false, token: "", nurse: {}
      }

    case NURSE_LOGOUT:
      localStorage.removeItem('nurseAuthToken')
      removeAuthToken()
      return {
        ...state, isAuthenticated: false, loading: false, token: "", nurse: {}
      }

    default:
      return state;
  }
}

export default nurseAuthReducer;