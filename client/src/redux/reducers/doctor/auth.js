import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  DOCTOR_LOADED,
  AUTH_ERROR,
  LOGOUT
} from '../../actions/doctor/types'

const initialState = {
  token: localStorage.getItem('doctorToken'),
  isAuthenticated: false,
  loading: true,
  doctor: {}
}

const doctorAuthReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('doctorToken', payload);
      return {
        ...state, token: localStorage.getItem('doctorToken'), isAuthenticated: true, loading: false
      }

    case DOCTOR_LOADED:
      return {
        ...state, doctor: payload, loading: false, isAuthenticated: true
      }

    case LOGOUT:
    case LOGIN_FAIL:
    case AUTH_ERROR:
      localStorage.removeItem('doctorToken')
      return {
        ...state, isAuthenticated: false, loading: false, token: null, doctor: null
      }


    default:
      return state;
  }
}

export default doctorAuthReducer;