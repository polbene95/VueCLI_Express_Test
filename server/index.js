const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/api/posts');

//Handle production

if (process.env.NODE_ENV == 'production') {
    //Static Folder
    app.use(express.static(__dirname + '/public/'));
    
    //Handle SPA
    app.get('/.*/', (req,res) => res.sendFile(__dirname + '/public/index.html'));
}

const PORT = process.env.PORT || 5000;


app.use('/api/posts', posts);
app.listen(PORT, () => console.log('Server started at port: ' + PORT));
