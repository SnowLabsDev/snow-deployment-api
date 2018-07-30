const app = require('./app');

// for heroku deployment
const PORT = process.env.PORT;

app.listen(PORT);

/* for local testing only
app.listen(8080, () => {
  console.log('DEPLOYMENT SERVER');
  console.log('Running on port 8080');
  console.log('CTRL + C to stop');
});
*/
