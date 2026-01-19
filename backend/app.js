require("dotenv").config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const cors = require('cors');
var app = express();
const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/authMiddleware");
const profileRoutes = require("./routes/profile");
const loanRoutes = require("./routes/loan");
const customerRoutes = require("./routes/customer");

// MongoDB connection
const mongoose = require("mongoose");
// mongoose.connect("mongodb://127.0.0.1:27017/khataBookDB")
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://kirana-book.vercel.app/"
  ],
  credentials: true,
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/customers", customerRoutes);
// app.use("/api/customers", require("./routes/customer"));
// app.use("/api/transactions", require("./routes/transaction"));
// app.use("/api/stock", require("./routes/stock"));

app.get('/', (req, res) => {
  res.json({
    status: "success",
    message: "KhataBook Backend Running 🚀"
  });
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
