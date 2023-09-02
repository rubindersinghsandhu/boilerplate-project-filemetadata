var express = require('express');
var cors = require('cors');
const multer = require('multer');


require('dotenv').config()

var app = express();



app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage});

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  console.log("In the API call");
  const file = req.file;
  
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  // File details
  const filename = file.originalname;
  const size = file.size;
  const mimetype = file.mimetype;

  res.send({
    name: filename,
    type: mimetype,
    size: size
  });
});




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
