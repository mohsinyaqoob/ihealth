import {
  AADHAAR_VALID,
  AADHAAR_INVALID,
  AADHAAR_FORM_RESET,
  OTP_VALID,
  OTP_INVALID
} from '../../actions/patient/types'

const initialState = {
  aadhaarValid: false,
  loading: true,
  phone: '',
  aadhaarNumber: '',
  registrationToken: ''
}

const PatientRegister = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case AADHAAR_VALID:
      return {
        ...state, aadhaarValid: true, loading: false, phone: payload.phone, aadhaarNumber: payload.aadhaarNumber
      }

    case OTP_VALID:
      return {
        ...state, registrationToken: payload
      }

    case OTP_INVALID:
      return {
        ...state, registrationToken: ''
      }

    case AADHAAR_INVALID:
    case AADHAAR_FORM_RESET:
      return {
        ...state, aadhaarValid: false, loading: false
      }

    default:
      return state
  }

}


export default PatientRegister