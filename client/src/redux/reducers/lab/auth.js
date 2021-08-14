import {
  LAB_LOGIN_SUCCESS,
  LAB_LOGIN_FAIL,
  LAB_LOADED,
  LAB_AUTH_ERROR,
  LAB_LOGOUT
} from '../../actions/lab/types'
import removeAuthToken from '../../../utils/removeAuthToken'

const initialState = {
  token: localStorage.getItem('labAuthToken'),
  loading: true,
  isAuthenticated: false,
  lab: {}
}

const labAuthReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {

    case LAB_LOADED:
      return {
        ...state, loading: false, lab: payload, isAuthenticated: true
      }

    case LAB_LOGIN_SUCCESS:
      localStorage.setItem('labAuthToken', payload)
      return {
        ...state, loading: false, isAuthenticated: true, token: payload
      }

    case LAB_LOGIN_FAIL:
    case LAB_AUTH_ERROR:
      removeAuthToken()
      localStorage.removeItem('labAuthToken')
      return {
        ...state, loading: false, isAuthenticated: false, token: "", lab: {}
      }

    case LAB_LOGOUT:
      localStorage.removeItem('labAuthToken')
      removeAuthToken()
      return {
        ...state, isAuthenticated: false, loading: false, token: ''
      }

    default:
      return state;
  }
}

export default labAuthReducer;