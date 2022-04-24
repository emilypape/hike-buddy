const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const hbs = exphbs.create({});
const path = require('path');
const routes = require('./controllers/');

const sess = {
    secret: 'Super secret cats',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore ({
      db: sequelize
    })
  };

const app = express();
const PORT = process.env.PORT || 3009;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});