/* eslint-disable no-console */
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const app = require('./app');

const port = process.env.PORT || 3000;

process.on('uncaughtException', err => {
   console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  //console.log(err.name, err.message);
  process.exit(1);
});

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('connection initiated sucessfully with mongodb'))
  .catch(() => console.log('connection failed to mongodb'));

app.listen(port, () => {
  console.log(`server is listening  at port ${port}`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  //console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

 