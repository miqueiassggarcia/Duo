import express from 'express';
import { Request, Response } from 'express';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
import sqlite from "sqlite3";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors({credentials: true}));
app.use(session({
  secret: 'SECRET',
  resave: true,
  saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.set('view engine', 'pug');


let db = new sqlite.Database("./database.sqlite");

// Middlewares artesenais
function ensureAuthenticated(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (req.isAuthenticated()) {
      return next();
  }
  res.redirect('/')
}

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
    req.logout((err: express.ErrorRequestHandler) => {
      if (err) {
        return console.log(err+"\nLogout falhou");
      }
      else {
        res.redirect("/")  ;
      }
    }
});

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
passport.use(new LocalStrategy.Strategy((username, password, done) => {
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



const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
server.on("error", e => console.error("Error", e));