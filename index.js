const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const { sequelize } = require('./api/models');
const errorHandler = require('./api/middleware/error');
require('dotenv').config()

const app = express()

// TODO: Restrict only to production url
const corsOptions = {
  origin: [
    'http://localhost:3000',
  ],
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'DELETE', 'HEAD', 'PATCH'],
  credentials: true
}
app.use(cors(corsOptions))

app.use(express.json());


require('./api/routes')(app)
app.use(morgan('dev'));
app.use(errorHandler);
const port = process.env.PORT || 3000
app.listen(port, async () => {
  // await init()
  await sequelize.sync(
    { alert: true }
  );
  console.log(`Server listening on port ${port}`)
})