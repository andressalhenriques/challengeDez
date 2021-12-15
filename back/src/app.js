const express = require('express');
const bodyParser = require('body-parser');
const {sequelize } = require('./model')
const { urlencoded } = require('express')
const cors = require('cors')

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}))
app.set('sequelize', sequelize)
app.set('models', sequelize.models)

app.use(require('./routes/routes'))

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Listening on port ${port}...`))


module.exports = app;
