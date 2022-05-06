var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session=require('express-session');
var connection  = require('./database.js');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');  
var productRouter=require('./routes/product');
var productdescRouter=require('./routes/prodesc');
var contactRouter=require('./routes/contact');
var aboutRouter=require('./routes/about');
const router = require('./routes/prodesc');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req,res,next)=>{
  console.log(req.path);
  next()
})
app.use(session({
  secret:'secret',
}))
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(productRouter);
app.use(productdescRouter);
app.use(contactRouter);
app.use(aboutRouter);
// app.use(submitr);
app.use(express.static(__dirname+"/images"));
app.use(express.static(__dirname+"/views"));


//signup module
app.post('/submit', function(req, res, next) {
  console.log("hello");
var name = req.body.name;
var phone = req.body.phno;
var email = req.body.email1;
var password = req.body.psw1;
var type=req.body.type;
var adhaar_no=req.body.adhar;
var photos=req.body.pic;
var address=req.body.add;

var sql = `INSERT INTO users (name,phone, email, password,type,adhaar_no,photos,address) VALUES ("${name}", "${phone}", "${email}", "${password}","${type}","${adhaar_no}","${photos}","${address}");`
connection.query(sql, function(err, result) {
  if (err) throw err;
  console.log('record inserted');
  //req.flash('success', 'Data added successfully!');
  res.redirect('/product#signup=true');
});
});

//login module
app.post('/login',(req,res)=>
    {
        console.log("Entered the login module");
        var e = req.body.email;
        var ps = req.body.pass;
        console.log(e);
        console.log(ps);
        var data=req.body;
        var query=connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [e, ps], function(err, results, fields) {
            if(err) throw error;
            if (results.length > 0) {
				// Authenticate the user
        console.log("Logged in successfully!!");
        req.session.loggedin=true;
        req.session.e=e;
        req.session.save();
				// Redirect to home page
				res.redirect('/product#login=true');
			} else {
				console.log('Incorrect Username and/or Password!');
                res.redirect('/index');
			}			
        });
        
    })

//Logout user
router.get('/logout',function(req,res)
{
  req.session.destroy();
  res.redirect('/login');
});

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals = err;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen('3001', () => {
  console.log('Server started on port 3001');
});
module.exports = app;
