import { combineReducers } from 'redux'

import auth from './admin/auth'
import patientRegister from './patient/register'
import patientAuth from './patient/auth'
import hospitalAuthReducer from './hospital/auth'
import agentAuthReducer from './agent/auth'
import checkInReducer from './agent/checkin'
import doctorAuthReducer from './doctor/auth'
import labAuthReducer from './lab/auth'
import nurseAuthReducer from './nurse/auth'

const rootReducer = combineReducers({
    // Admin
    auth,

    // Patient Registration
    patientRegister,

    // Patient Auth
    patientAuth,

    // Hospital
    hospitalAuthReducer,

    // Agent
    agentAuthReducer,

    // Agent Check-in
    checkInReducer,

    // Doctor auth reducer
    doctorAuthReducer,

    // Lab auth reducer
    labAuthReducer,

    // Nurse auth reduder
    nurseAuthReducer


});

export default rootReducer;