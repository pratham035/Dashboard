var createError         = require('http-errors');
var express             = require('express');
var path                = require('path');
var cookieParser        = require('cookie-parser');
var logger              = require('morgan');
var indexRouter         = require('./routes/index');
var usersRouter         = require('./routes/users');
var app                 = express();
var mongoose            = require('mongoose');
var url                 = 'mongodb://localhost/BootCamp';         
const port              = 3000;


mongoose.connect(url, {
	useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => {
	console.log('Connected to DB!');
}).catch(err => {
	console.log('ERROR:', err.message);
});

const PostSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const Post = mongoose.model("Dashboard", PostSchema);

app.get('/', async (req, res) => {
 let post = await Post.create({title: 'Test', description: 'This is a test for Dashboard'});
 res.send(post);
});

app.listen(port, () => console.log(`Express app listening on port ${port}!`));