
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const fetchImageRouter = require('./routes/image.router');
const fetchTranslationRouter = require('./routes/translate.router');
const addWordRouter = require('./routes/addWord.router');
const cardListsRouter= require('./routes/cardLists.router');
const wordsRouter = require('./routes/words.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/image', fetchImageRouter);
app.use('/api/translate', fetchTranslationRouter);
app.use('/api/addWord', addWordRouter);
app.use('/api/cardLists', cardListsRouter);
app.use('/api/words', wordsRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
