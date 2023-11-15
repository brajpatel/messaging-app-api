require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const passport = require('passport');
const session = require('passport-session');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// connect to database
const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_CONNECTION_STRING;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongoDB);
}

// authenticate users
const User = require('./models/user');

passport.use(
  new LocalStrategy(async (email, password, done) => {
    try {
      const user = await User.findOne({ email: email });
      const match = await bcrypt.compare(password, user.password);

      if(!user) {
        return done(null, false, { message: 'Email not found' });
      }
      
      if(!match) {
        return done(null, false, { message: 'Incorrect password' });
      }

      res.json({ user: user });
      
      return done(null, user);
    }
    catch(err) {
      return done(err);
    }
  })
)

passport.serializeUser(function(user, done) {
  done(null, user.id);
})

passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  }
  catch(err) {
    done(err);
  }
})

const authRouter = require('./routes/auth');
const userProfileRouter = require('./routes/userProfile');
const friendRouter = require('./routes/friend');
const chatRouter = require('./routes/chat');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', authRouter);
app.use('/profile', userProfileRouter);
app.use('/friend', friendRouter);
app.use('/chat', chatRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
