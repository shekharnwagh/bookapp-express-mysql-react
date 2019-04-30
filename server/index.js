const express        = require('express');
const app            = express();
const bodyParser = require('body-parser');
const cors       = require('cors'); 
const listRoutes = require('./controllers/listRoutes');
const bookController = require('./controllers/Books');

app.use(bodyParser.json()); // for parsing application/json
app.use(cors());

app.get('/', function(req, res) {
    res.send('Hi, Response !');
})

app.get('/all_books', bookController.getAllBooks);
app.get('/book/:id', bookController.getBook);
app.post('/book', bookController.upsertBook);
app.delete('/book/:id', bookController.deleteBook);

listRoutes.listAllRoutes(app._router.stack);

const port = 8080;
app.listen(port, () => {
  console.log('We are live on ' + port);
});