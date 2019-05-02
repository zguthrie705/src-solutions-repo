'use strict';

require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const Octokit = require('@octokit/rest');

const simpleGit = require('simple-git')()
    .addConfig('user.name', process.env.GITHUB_USERNAME)
    .addConfig('user.email', process.env.GITHUB_EMAIL);

let authUser = null;
let currentUser = null;
let branchName = null;

const app = express();

// Creates API connection for private solution repo and gets authUser information.
const authOctokit = new Octokit({
    auth: process.env.GITHUB_OAUTH_TOKEN
});

authOctokit.users.getAuthenticated().then(({data, headers, status}) => {authUser = data;});

// Gets challenge repo and searches for user branch
async function getRepoAndUserBranch(next) {
    let recruitRepo = await authOctokit.repos.get({owner: authUser.login, repo: process.env.SOLUTIONS_REPO_NAME})
        .then(({data}) => {return data;})
        .catch(error => {console.log(error)});

    return await authOctokit.repos.getBranch({owner: authUser.login, repo: recruitRepo.name, branch: branchName})
        .then(({data}) => {
            return data;
        })
        .catch(error => {
            if (error.status === 404) {
                return null;
            } else {
                next(error);
            }

        });
}

async function createUserBranch(next) {
    try {
        await simpleGit.checkout(['--orphan', branchName])
            .rm(['-rf', '.'])
            .commit('Initial Commit')
            .push('origin', branchName, {'--set-upstream': null})
            .checkout('master')
            .deleteLocalBranch(branchName);
    } catch (e) {
        next(e);
    }
}

// Configure the GitHub Strategy for use by Passport
passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: '/login/github/callback'
    },
    function(accessToken, refreshToken, profile, cb) {
        currentUser = profile;
        app.locals.username = currentUser.username;
        branchName = currentUser.username + "-solution";
        return cb(null, profile);
    }));

// Configure Passport authenticated session persistence
passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(user, cb) {
    cb(null, user);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/views/stylesheets', express.static(__dirname + '/views/stylesheets'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

app.get('/',
    ensureLoggedIn(),
    (req, res, next) => {
        app.locals.rendFile = 'challenge-setup';
        getRepoAndUserBranch(next).then((data) => {
            data !== null ? res.redirect('/challenge-1') : res.render('challenge-setup', {error: req.query.error})
        });
    });

app.get('/login', function(req, res, next) {
    try {
        res.render('login', {error: req.query.error});
    } catch(e) {
        next(e);
    }
});

app.get('/challenge-1',
    ensureLoggedIn(),
    (req, res, next) => {
        app.locals.rendFile = 'challenge-1';
        try {
            res.render('challenge-1', {error: req.query.error});
        } catch(e) {
            next(e);
        }
    });

app.get('/create-branch',
    ensureLoggedIn(),
    (req, res, next) => {
        createUserBranch(next).then(() => {
            try {
                res.redirect('/');
            } catch(e) {
              next(e);
            }
        }).catch(e => {next(e)});
    });

app.get('/login/github', passport.authenticate('github'));

app.get('/login/github/callback', passport.authenticate('github', {failureRedirect: '/login'}),
    function(req, res, next) {
        // Successfully authenticated, return home
        try {
            res.redirect('/');
        } catch(e) {
            next(e);
        }
    });

app.get('/logout', function(req, res, next) {
    try {
        req.logout();
        res.redirect('/');
    } catch(e) {
        next(e);
    }
});

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
