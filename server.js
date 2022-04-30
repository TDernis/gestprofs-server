const express = require('express')
const config = require('config')
const app = express()

const cors = require('cors');
const bodyParser = require('body-parser');

const expressConfig = config.get('express')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/exam', require('./controllers/exam'))
app.use('/mark', require('./controllers/mark'))
app.use('/user', require('./controllers/user'))

app.listen(expressConfig.port, () => {
  console.log('Server listening on ' + expressConfig.url + ':' + expressConfig.port);
});

module.exports = this
