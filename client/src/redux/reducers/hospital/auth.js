import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  HOSPITAL_LOADED,
  HOSPITAL_LOAD_FAILED,
  HOSPITAL_LOGOUT
} from '../../actions/hospital/types'

import removeAuthToken from '../../../utils/removeAuthToken'

const initialState = {
  token: localStorage.getItem('hospitalToken'),
  loading: true,
  isAuthenticated: false,
  hospital: {}
}

const hospitalAuthReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('hospitalToken', payload.token);
      return {
        ...state, token: payload.token, isAuthenticated: true, loading: false
      }
    case HOSPITAL_LOADED:
      return {
        ...state, isAuthenticated: true, loading: false, hospital: payload
      }
    case HOSPITAL_LOAD_FAILED:
    case LOGIN_FAILED:
    case HOSPITAL_LOGOUT:
      removeAuthToken()
      localStorage.removeItem('hospitalToken')
      return {
        ...state, token: '', loading: false, isAuthenticated: false, hospital: {}
      }

    default:
      return state;
  }
}

export default hospitalAuthReducer;