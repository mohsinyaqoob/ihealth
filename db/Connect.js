const mongoose = require('mongoose');
const config = require('config');

const Connect = async () => {
    try {
        await mongoose.connect(config.get('dbURI'), { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
        console.log('Database Server running on port 27017')
    } catch (err) {
        console.log('Database connection error.', err)
        process.exit(0);
    }
}

module.exports = Connect;