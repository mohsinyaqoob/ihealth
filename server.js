const express = require('express');
const app = express();

app.use(express.json())

const rootRouter = require('./routes');
const Connect = require('./db/Connect')

// Connect to DB Server
Connect();

// Init root router that holds all other routes, just to keep this space tidy
rootRouter(app);


const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, console.log(`Node Web Server running on Port ${PORT}`));

