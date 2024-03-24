const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const crypto = require('crypto');
var x="(SIGN IN)";
var y="";
course="";
// Generate a random 32-byte string
const secretKey = crypto.randomBytes(32).toString('hex');

app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/login', { useNewUrlParser: true })
    .then(() => {
        console.log('mongodb connected');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

const idSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const User = mongoose.model('User', idSchema);

app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));



const paymentController = require('./controllers/paymentController');

app.get('/order/p', paymentController.renderBuyPage);
app.post('/payment', paymentController.payment);
app.get('/success', paymentController.success);
app.get('/failure', paymentController.failure);

app.post('/order/payment', (req, res) => {
  res.redirect('/index1');
});





app.get('/login', (req, res) => {
    x="(SIGN IN)";
    res.render('loginform.ejs');
});
app.get('/about', (req, res) => {
    res.render('aboutus.ejs',{x:x,y:y});
});
app.get('/live', (req, res) => {
    res.render('live.ejs');
});
app.get('/download', (req, res) => {
    res.render('download.ejs',{y:y,
    course:course});
});
app.get('/order', (req, res) => {
    res.render('order.ejs',{x:x});
});
app.get('/freetrial', (req, res) => {
    if (x == "(SIGN IN)") {
        res.send('<script>alert("Login first"); window.location="/login";</script>');
    } else {
        course = req.query.courseTitle || "Raja-Rani"; // Default title if courseTitle is not provided
        res.render('freetrial.ejs', { y: y });
    }
});
app.get('/', (req, res) => {
    res.render('index.ejs', { x: x ,y: y});
});
app.get('/instructor1', (req, res) => {
    res.render('instructor1.ejs', { x: x ,y: y});
});
app.get('/instructor2', (req, res) => {
    res.render('instructor2.ejs', { x: x ,y: y});
});
app.get('/instructor3', (req, res) => {
    res.render('instructor3.ejs', { x: x ,y: y});
});
app.get('/instructor4', (req, res) => {
    res.render('instructor4.ejs', { x: x ,y: y});
});
app.get('/instructor5', (req, res) => {
    res.render('instructor5.ejs', { x: x ,y: y});
});
app.get('/index1', (req, res) => {
    res.render('index1.ejs', { x: x ,y:y});
});
 
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    try {
        await newUser.save();
        res.redirect('/login');
    } catch (err) {
        console.error('Error registering user:', err);
        res.redirect('/');
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
       
        if (user) {
            y=user.username;
            x = "(logout)";
    
            /res.render('index.ejs', { x: x });/
            res.redirect('/');
        } else {
            res.send('<script>alert("User not found"); window.location="/login";</script>');
        }
    } catch (err) {
        console.error('Error logging in user:', err);
        res.redirect('/login');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
