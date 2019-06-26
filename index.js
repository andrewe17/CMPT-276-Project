const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express();

const { Pool } = require('pg');


var pool = new Pool({
  connectionString : process.env.DATABASE_URL//connecting the database
})

app.use(express.static(path.join(__dirname, 'public')))//joining the files public and current folder
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set('views', path.join(__dirname, 'views'))// joining the files views and current folder
app.set('view engine', 'ejs')//using ejs
app.get('/', (req, res) => res.render('pages/index'))

app.use(express.static(path.join(__dirname, 'node_modules')))

app.get('/db', async (req, res) => {//seting the database
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM login');//sql query
      const results = { 'results': (result.rows[0].id) ? result.rows : [] };
      res.status(200);

      res.send(results);
      client.release();
    } catch (err) {
      res.send("Error " + err);
    }
  })



  app.post('/signin', async (req, res) => {//this updates the form when the form from login is submited
      try {
        const que = 'SELECT count(1) as pers FROM login WHERE username = $1 AND password = $2'
        const value =[req.body.user,req.body.password]
        const client = await pool.connect()
        const result = await client.query(que,
        value);
        if (result.Value = 1){
          console.log("it matchs");
        }
        else {
           console.log("it doesn't match");
        }
      } catch (err) {
          res.send("Error " + err);
      }
    })


    app.post('/signup', async (req, res) => {//this updates the form when the form from login is submited
        try {
          const client = await pool.connect()
          const value =[Math.floor(Math.random() * (100)),req.body.userup,req.body.psw,req.body.emailup]
          const result = await client.query('insert into login (id,username,password,email) values ($1,$2,$3,$4)',
          value);
          res.redirect('/login.html');
          client.release();
        } catch (err) {
          res.send("Error " + err);
        }
      })


app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
