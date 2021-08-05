import { useEffect } from 'react'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'

const Alert = ({ alerts }) => {

    useEffect(() => {
        alerts.forEach(alert => {
            toast(alert.msg, {
                type: alert.type
            })
        })
    }, [alerts])

    return (
        null
    )
}

const mapStateToProps = (state) => {
    return {
        alerts: state.alert
    }
}

export default connect(mapStateToProps)(Alert)
