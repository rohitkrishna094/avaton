const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const YAML = require('yamljs');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = YAML.load('./documentation/api-spec.yaml');

// Connected to database
mongoose.connect(config.database);

// On database connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + config.database);
});

// On database error
mongoose.connection.on('error', err => {
  console.log('Database error ' + err);
});

const app = express();

// Port Number
const port = process.env.PORT || 8085;

// Cors Middleware
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const auth = require('./routes/auth');
const profile = require('./routes/profile');
app.use('/api/auth', auth);
app.use('/api/profile', profile);

app.get('/test', (req, res) => {
  res.send({ data: '' });
});

app.get('*', (req, res) => {
  // res.sendFile(path.join(__dirname, 'public/index.html'));
  res.send('Invalid Endpoint');
  res.end();
});

// Start Server
app.listen(port, () => {
  console.log('Server started on port ' + port);
});
