require('dotenv').config();
const massive = require('massive'),
      session = require('express-session'),
      express = require('express'),
      ctrl = require('./controller'),
      app = express(),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
      port = SERVER_PORT;

app.use(express.json());

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 365}
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db)
    console.log('db connected')
})

app.post('/api/register', ctrl.register)
app.post('/api/login', ctrl.login)

app.get('/api/posts/:id', ctrl.getPosts)

app.listen(port, () => console.log(`Server running on port ${port}`))