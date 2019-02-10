const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const http = require('http');
const path = require('path');

const { mongoose } = require('./database');
const server = http.createServer(app);
const hand = require('./socket.hanlder')

// Settings
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname,'public')))

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));
app.use(express.static(__dirname+'public'));

// Routes
app.use('/api/users',require('./routes/user.routes'));
app.use('/api/projects', require('./routes/project.routes'));
app.use('/api/activities', require('./routes/activity.routes'));
app.use('/api/crypto', require('./routes/crypto.routes'));
app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname,'public/index.html'));
});

// Starting the server
server.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
    const socketIO = require('socket.io');
    const io = socketIO(server);
    hand(io);
});