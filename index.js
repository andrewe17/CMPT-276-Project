const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 5000
const app = express();
const { Pool } = require('pg');

var http = require('http').createServer(app);
var io = require('socket.io')(http);

var players = {};

// var pool = new Pool({
//   user: 'postgres',
//   password: 'root',
//   host: 'localhost',
//   database: 'postgres'
// });

var pool = new Pool({
  connectionString : process.env.DATABASE_URL//connecting the database
})

app.use(express.static(path.join(__dirname, 'public')))//joining the files public and current folder
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set('views', path.join(__dirname, 'views'))// joining the files views and current folder
app.set('view engine', 'ejs')//using ejs

//app.get('/', (req, res) => res.render('pages/index'))
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.sockets.on('connection', function(socket){
  // playercount++;
  console.log('A user connected');

  // create a new player and add it to our players object
  players[socket.id] = {
    x: Math.floor(Math.random() * 700) + 50,
    y: Math.floor(Math.random() * 500) + 50,
    playerId: socket.id,
  };
  // send the players object to the new player
  socket.emit('currentPlayers', players);
  // update all other players of the new player
  socket.broadcast.emit('newPlayer', players[socket.id]);

  // user connect (chat)
  socket.on('username', function(username){
    socket.username = username;
    io.emit('is_online', '🔵 <i>' + socket.username + ' has connected.</i>');
  });

  // when a player disconnects, remove them from our players object
  socket.on('disconnect', function(){ //on reload or exit
    console.log('A user disconnected');
    // remove this player from our players object
    delete players[socket.id];
    // emit a message to all players to remove this player
    io.emit('disconnect', socket.id);
  });

  socket.on('playerMovement', function (movementData) {
    players[socket.id].x = movementData.x;
    players[socket.id].y = movementData.y;
    // emit a message to all players about the player that moved
    socket.broadcast.emit('playerMoved', players[socket.id]);
    console.log(movementData.x);
    console.log(movementData.y);
  });

  //show chat messages
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message',socket.username + ': ' + msg);
  });
});

app.use(express.static(path.join(__dirname, 'node_modules')))

app.post('/signin', async (req, res) => {//this updates the form when the form from login is submited
  try {
    const que = 'SELECT username, password FROM login WHERE EXISTS (SELECT username, password FROM login WHERE login.username = $1 AND login.password = $2);'
    const value =[req.body.user,req.body.password]
    const client = await pool.connect()
    const result = await client.query(que,
    value);
    // res.send(result.rowCount);

    if (result.rowCount > 0){//I noticed that if the queue returns true the rowCount is larger than 0
      res.redirect('/game.html');
    }
    else {
       res.redirect('/wrong.html');
    }
  } catch (err) {
      res.send("Error " + err);
  }
})


app.post('/signup', async (req, res) => {//this updates the form when the form from login is submited
  try {
    const client = await pool.connect()
    const value =[Math.floor(Math.random() * (100)),req.body.userup,req.body.psw,req.body.emailup]//randomly generated ID
    const result = await client.query('insert into login (id,username,password,email) values ($1,$2,$3,$4)',
    value);
    res.redirect('/login.html');
    client.release();
  } catch (err) {
    res.send("Error " + err);
  }
})

//app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
http.listen(PORT, () => console.log(`Listening on ${ PORT }`))
