import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AGENT_LOADED,
  AUTH_ERROR,
  LOGOUT
} from '../../actions/agent/types'
import removeAuthToken from '../../../utils/removeAuthToken'

const initialState = {
  token: localStorage.getItem('agentToken'),
  isAuthenticated: false,
  loading: true,
  agent: {}
}

const agentAuthReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('agentToken', payload);
      return {
        ...state, token: localStorage.getItem('agentToken'), isAuthenticated: true, loading: false
      }

    case AGENT_LOADED:
      return {
        ...state, loading: false, agent: payload, isAuthenticated: true
      }

    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      removeAuthToken()
      localStorage.removeItem('agentToken')
      return {
        ...state, isAuthenticated: false, loading: false, token: null, agent: null
      }

    default:
      return state;
  }
}

export default agentAuthReducer;