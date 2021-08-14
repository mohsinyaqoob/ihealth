import {
  PATIENT_REGISTRATION_SUCCESS,
  PATIENT_REGISTRATION_FAILED,
  PATIENT_LOADED,
  AUTH_ERROR,
  LOGOUT,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from '../../actions/patient/types'
import removeAuthToken from '../../../utils/removeAuthToken'

const initialState = {
  patientAuthToken: localStorage.getItem('patientAuthToken'),
  loading: true,
  isAuthenticated: false,
  patient: {}
}

const patientAuth = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {

    case PATIENT_LOADED:
      return {
        ...state, loading: false, isAuthenticated: true, patient: payload
      }

    case PATIENT_REGISTRATION_SUCCESS:
      localStorage.setItem('patientAuthToken', payload)
      return {
        ...state, patientAuthToken: payload, loading: false, isAuthenticated: true
      }

    case LOGIN_SUCCESS:
      localStorage.setItem('patientAuthToken', payload)
      return {
        ...state, loading: false, isAuthenticated: true, patientAuthToken: payload
      }

    case PATIENT_REGISTRATION_FAILED:
    case LOGOUT:
    case LOGIN_FAIL:
    case AUTH_ERROR:
      removeAuthToken()
      localStorage.removeItem('patientAuthToken')
      return {
        ...state, patientAuthToken: '', loading: false, isAuthenticated: false, patient: ''
      }
    default:
      return state
  }

}

export default patientAuth