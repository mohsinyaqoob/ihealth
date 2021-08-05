import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Navbar from './Navbar'
import Aside from './Aside'
import MainContent from './MainContent'
import AgentsIndex from './Agents/Index'
import DoctorsIndex from './Doctors/Index'
import NursesIndex from './Nurses/Index'
import LabsIndex from './Labs/Index'
import Footer from './Footer'
import CreateBirthEvent from './CreateBirthEvent'
import CreateDeathEvent from './CreateDeathEvent'
import BirthVerifications from './BirthVerifications'
import LifeEvents from './LifeEvents'
import CreateUser from './CreateUser'
import Users from './Users'

const Dashboard = ({ loading, hospitalName }) => {

    return (

        <>
            {console.log(loading, hospitalName)}
            <Navbar loading={loading} hospitalName={hospitalName} />
            <Aside loading={loading} hospitalName={hospitalName} />
            <Switch>
                <Route exact path="/hospital/dashboard" component={MainContent} />
                <Route exact path="/hospital/dashboard/agents" component={AgentsIndex} />
                <Route exact path="/hospital/dashboard/doctors" component={DoctorsIndex} />
                <Route exact path="/hospital/dashboard/nurses" component={NursesIndex} />
                <Route exact path="/hospital/dashboard/labs" component={LabsIndex} />
                <Route exact path="/hospital/dashboard/createUser" component={CreateUser} />
                <Route exact path="/hospital/dashboard/users" component={Users} />
                <Route exact path="/hospital/dashboard/birthVerifications" component={BirthVerifications} />
                <Route exact path="/hospital/dashboard/createBirthEvent" component={CreateBirthEvent} />
                <Route exact path="/hospital/dashboard/createDeathEvent" component={CreateDeathEvent} />
                <Route exact path="/hospital/dashboard/lifeEvents" component={LifeEvents} />

            </Switch>
            <Footer />
        </>
    )
}

const mapStateToProps = state => ({
    loading: state.hospitalAuthReducer.loading,
    hospitalName: state.hospitalAuthReducer.hospital.name
})

export default connect(mapStateToProps)(Dashboard)
