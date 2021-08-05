import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Navbar from './Navbar'
import Aside from './Aside'
import Content from './Content'
import Footer from './Footer'
import Agents from './Agents'

const Dashboard = (props) => {
    return (
        <div className="wrapper">
            <Router>
                <Navbar />
                <Aside />
                <Switch>
                    <Route exact path="/admin/dashboard" component={Content} />
                    <Route exact path="/admin/dashboard/agents" component={Agents} />
                </Switch>
                <Footer />
            </Router>
        </div>
    )
}

export default Dashboard
