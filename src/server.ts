import express from 'express';
import { Request, Response } from 'express';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';

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


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
})


const PORT: number = 8080;
app.listen(PORT, (): void => {
  console.log('servidor rodando na porta', PORT);
});