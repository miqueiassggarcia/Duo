require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local');
const sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./database.sqlite');

// configurações inciais
const app = express();
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.set('view engine', 'pug');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());



// endpoints
app.route('/').get((req, res) => {
    res.render(process.cwd() + '/views/pug/index.pug',
    {
        title: 'Hello',
        message: 'Please Login',
    });
})

app.post('/login', passport.authenticate('local', {failureRedirect: '/'}), (req, res) => {
    res.redirect('/profile');
})

app.get('/profile', ensureAuthenticated, (req, res) => {
    res.render(process.cwd() + '/views/pug/profile.pug', {
        username: req.user.username
    })
})

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

// Regra de negocio: busca usuario, se encontrar um usuario igual redireciona para /
// caso não exista esse usuario, é inserido no banco de dados e autenticado e redirecionado para /profile
app.post('/register', (req, res, next) => {
    db.get('SELECT * FROM users WHERE username = ?', [req.body.username], (err, user) => {
        if (err) { next(err); } 
        else if (user) { res.redirect('/'); } 
        else {
            db.run('INSERT INTO users (username, password) VALUES (?, ?)', [req.body.username, req.body.password], (err) => {
                if (err) return res.redirect('/');
                next();
            });
        }
    })},
    passport.authenticate('local', {failureRedirect: '/'}),
    (req, res, next) => {
        res.redirect('/profile');
    }
);

app.use((req, res, next) => {
    res.status(404).type('text').send('not found');
})




// autenticação de usuarios utilizando passport tem que ficar sempre abaixo dos end-points
passport.use(new LocalStrategy((username, password, done) => {
    db.get('SELECT * FROM users WHERE username=?', [username], (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false);
        if (password !== user.password) return done(null, false);
        return done(null, user);
    })
}))

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser((id, done) => {
    db.get('SELECT * FROM users WHERE _id = ?', [id], (err, doc) => {
        done(null, doc);
    });
})




// Middlewares artesenais
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/')
}





const PORT = process.env.PORT || 8080;
app.listen(PORT, (err) => {
    if (err) return console.log(err);
    console.log("Servidor rodando na porta " + PORT);
})