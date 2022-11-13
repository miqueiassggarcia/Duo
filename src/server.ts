import express from 'express';
import { Request, Response, NextFunction } from "express";
import passport from 'passport';
import LocalStrategy from 'passport-local';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
import sqlite from "sqlite3";

let db = new sqlite.Database("./database.sqlite");

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


app.post('/login', passport.authenticate('local', {failureRedirect: '/'}), (req: Request, res: Response) => {
    res.redirect('/profile');
})

app.get('/logout', (req: Request, res: Response) => {
    req.logout((err: express.ErrorRequestHandler) => {
        if (err) { return console.log(err+"\nLogout falhou"); }
        res.redirect("/");
    });
});

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).type('text').send('not found');
})



// autenticação de usuarios utilizando passport tem que ficar sempre abaixo dos end-points
passport.use(new LocalStrategy.Strategy((username: string, password: string, done) => {
    db.get('SELECT * FROM users WHERE username=?', [username], (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false);
        if (password !== user.password) return done(null, false);
        return done(null, user);
    })
}))

passport.serializeUser((user: any, done) => {
    done(null, user._id);
})

passport.deserializeUser((id, done) => {
    db.get('SELECT * FROM users WHERE _id = ?', [id], (err, doc) => {
        done(null, doc);
    });
})


// Middlewares artesenais
function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/')
  }


const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
server.on("error", e => console.error("Error", e));