import './App.css'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import PrivateRoute from './routing/PrivateRoute'
import Index from './components/layout/Index'

// Developers Page
import Developers from './components/layout/Developers'

// Admin Routes
import AdminLogin from './components/layout/admin/Login'
import Dashboard from './components/layout/admin/Dashboard'

// Patient Routes
import PatientIndex from './components/layout/patient/Index'

// Hospital Route
import HospitalIndex from './components/layout/hospital/Index'

// Hospital Agent Route
import AgentIndex from './components/layout/agent/Index'

// Doctor Route
import DoctorIndex from './components/layout/doctor/Index'


// Third party plugins and libraries
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import 'sweetalert2/dist/sweetalert2.css'

// Redux
import { Provider } from 'react-redux'
import store from './redux/store'

toast.configure();


const App = () => {
  return (
    <>
      <div className="wrapper Fade">
        <Provider store={store}>
          <Router>
            <Route path="/" component={Index} exact />
            <Switch>
              <Route exact path="/developers" component={Developers} />
              <Route exact path="/admin/login" component={AdminLogin} />
              <PrivateRoute path="/admin/dashboard" component={Dashboard} />
              <Route path="/patient" component={PatientIndex} />
              <Route path="/hospital" component={HospitalIndex} />
              <Route path="/agent" component={AgentIndex} />
              <Route path="/doctor" component={DoctorIndex} />
            </Switch>
          </Router>
        </Provider>
      </div>
    </>
  );
}

export default App;
