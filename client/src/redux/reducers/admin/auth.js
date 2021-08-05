import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT
} from '../../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null
}

const auth = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {

        case USER_LOADED:
            return {
                ...state, isAuthenticated: true, loading: false, user: payload
            }

        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case LOGIN_FAILED:
        case AUTH_ERROR:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        default:
            return state;
    }
}

export default auth;