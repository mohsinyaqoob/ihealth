import {
  PATIENT_FETCH_SUCCESS,
  PATIENT_FETCH_FAIL,
  RESET_PATIENT
} from '../../actions/agent/types'

const initialState = {
  loading: true,
  patient: null
}


const checkInReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PATIENT_FETCH_SUCCESS:
      return {
        ...state, patient: payload, loading: false
      }

    case PATIENT_FETCH_FAIL:
    case RESET_PATIENT:
      return {
        ...state, loading: false, patient: null
      }

    default:
      return state;
  }
}


export default checkInReducer;