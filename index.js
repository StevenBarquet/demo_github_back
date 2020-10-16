//--------------------------------------IMPORTS------------------------------------  
// Dependencies
const express = require('express');  
const app = express();
// Routes
const reposRoutes = require('./routes/repos')
// Middlewares
const helmet = require('helmet');
const cors = require('cors');
// Configs
const startLogs = require('./configs/startLogs')

//-----------------------------------CONFIG-------------------------------
const port = process.env.PORT || 4000
startLogs(port);

//-----------------------------------MIDDLEWARES-------------------------------
app.use(express.json());// needed to read req.body
app.use(helmet()); // for security
app.use(cors()); // for security
// Routes
app.use('/api/bookmarks', reposRoutes)
//-----------------------------------SERVER-------------------------------
app.listen(port, ()=>{
    console.log('Listening to port ' + port + '...');
})

