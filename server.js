const express = require('express');
const app = express();

const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Socket Integration
const server = app.listen(process.env.PORT || 3009);
const io = require('socket.io')(server);

const hbs = exphbs.create({});
const routes = require('./controllers/');
const sequelize = require('./config/connection');
const path = require('path');
const multer = require('multer');
const { User } = require('./models');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, './public/uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const sess = {
  secret: 'Super secret cats',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

const PORT = process.env.PORT || 3009;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Add socket
app.set('socketio', io);

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/profile', upload.single('avatar'), async function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log('req.file', req.file);
  if (req.session.user_id) {
    const user = await User.update({ profile_picture: req.file.originalname }, { where: { id: req.session.user_id } });
    res.redirect('/survey');
  } else {
    res.redirect('/login');
  }
});

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  // server();
  console.log('Sequelize is starting');
});

io.on('connection', (socket) => {
  console.log('New socket connected!!!');
  socket.on('create', (room) => {
    socket.join(room);
  });

  socket.on('welcome-message', (data) => {
    console.log('Data Socket: ', data);
  });

  socket.on('new-message', (data) => {
    console.log('New Data Socket: ', data);
    socket.emit('broadcast-message', data);
  });
});
