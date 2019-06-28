const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/api/posts');

const PORT = process.env.PORT || 5000;


app.use('/api/posts', posts);
app.listen(PORT, () => console.log('Server started at port: ' + PORT));
