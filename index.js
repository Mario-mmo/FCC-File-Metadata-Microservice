var express = require('express');
var cors = require('cors');
const multer = require('multer');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(multer({
  dest: 'public/uploads'
}).single('upfile'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


// get filename, type and size
app.post('/api/fileanalyse', (req, res) => {
  const file = req.file;
  
  res.json({
    'name': file.originalname,
    'type': file.mimetype,
    'size': file.size
  })
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
