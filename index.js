const app = require('./app');

const PORT = process.env.PORT;

app.listen(PORT);

/*
app.listen(8080, () => {
  console.log('DEPLOYMENT SERVER');
  console.log('Running on port 8080');
  console.log('CTRL + C to stop');
});
*/
