module.exports = rootRouter = (app) => {
    // Routes associated with Administrator
    app.use('/api/admin/auth', require('./admin/auth'));

    // Patient Routes
    app.use('/api/patient/register', require('./patient/register'))
    app.use('/api/patient/auth', require('./patient/auth'))
    app.use('/api/patient/data', require('./patient/data'))

    app.use('/api/hospital/data', require('./hospital/data'))
    app.use('/api/hospital/auth', require('./hospital/auth'))
    app.use('/api/hospital/users', require('./hospital/users'))

    // Agent Routes
    app.use('/api/agent/auth', require('./agent/auth'))
    app.use('/api/agent/data', require('./agent/data'))
    app.use('/api/agent/checkin', require('./agent/checkin'))

    // Doctor Routes
    app.use('/api/doctor/auth', require('./doctor/auth'))
    app.use('/api/doctor/data', require('./doctor/data'))
    app.use('/api/doctor/treatment', require('./doctor/treatment'))

    // Lab Routes
    app.use('/api/lab/auth', require('./lab/auth'))
    app.use('/api/lab/data', require('./lab/data'))

    // Nurse Routes
    app.use('/api/nurse/auth', require('./nurse/auth'))
    app.use('/api/nurse/data', require('./nurse/data'))
    app.use('/api/nurse/treatment', require('./nurse/treatment'))



}