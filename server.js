const express = require('express');
var cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const items = require('./routers/api/items');

const app = express();

app.use(cors());

app.use(express.json()); 

const db = require('./config/keys').mongoURI;

mongoose.connect(db,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err.response));

//use routes
app.use('/api/items',items);

//serve static assets if in production
if(process.env.NODE_ENV === 'production'){
  //set static folder
  app.use(express.static('client/build'));

  app.get('*', (req,res) => {
      res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, '0.0.0.0', () => console.log(`server started on port ${port}`));