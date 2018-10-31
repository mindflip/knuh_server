const express = require('express');
var bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
 
let users = [
  {
    id: 1,
    name: 'alice'
  },
  {
    id: 2,
    name: 'bek'
  },
  {
    id: 3,
    name: 'chris'
  }
]
 
 app.get('/users', (req, res) => {
   console.log('who get in here/users');
   res.json(users)
 });

function appendObjTo(thatArray, newObj) {
    const frozenObj = Object.freeze(newObj);
    return Object.freeze(thatArray.concat(frozenObj));
};

app.post('/posttest', function(req, res){
  console.log('who get in here post /users');
  var title = req.body.id;
  var description = req.body.name;
  users = appendObjTo(users, {id: title, name: description});
  
  console.log(title + ',' +description);
  res.json(users);
  // res.send("pt" + title + ',' + description);
});
 
app.post('/post', (req, res) => {
  console.log('who get in here post /users');
  var inputData;

  req.on('data', (data) => {
    inputData = JSON.parse(data);
  });

  req.on('end', () => {
    console.log("user_id : "+inputData.user_id + " , name : "+inputData.name);
  });

  res.write("OK!");
  res.end();
});
 
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});