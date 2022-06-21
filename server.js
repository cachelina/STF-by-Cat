const express = require('express');
const MongoStore = require('connect-mongo');
const app = express();
const path = require('path')
const cors = require('cors')
const logger = require('morgan')
let methodOverride = require('method-override');
let bodyParser = require('body-parser')
require('./database/connection')
require('./config/passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const routes = require('./routes');

app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
app.use(methodOverride('_method'))
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
}))

app.use(passport.initialize());
app.use(passport.session())

app.use('/', routes)

app.listen(app.get('port'), () => {
  console.log(`PORT: ${app.get('port')}😚`)
}) 