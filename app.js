const express = require('express');
const bcryptjs = require('bcryptjs');
const bodyParser = require('body-parser')
const mysql = require('mysql2');
const dotenv = require('dotenv');
const app = express();
const port = 3000;

app.use(bodyParser.json());
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DB,
  password: process.env.MYSQL_PASSWORD
});


app.get('/healthcheck', (req, res) => {
  res.send('OK');
});

app.post('/users', async (req, res) => {
  // only accept json request
  if (req.headers['content-type'] !== 'application/json') {
    res.status(400).send({
      "data": {
        "error": "Invalid Content-Type"
      }
    });
    return;
  }
  
  if (!req.body.name || !req.body.email || !req.body.password) {
    res.status(400).send({
      "data": {
        "error": "Request body incomplete"
      }
    });
    return;
  }
  // validate data using regex
  if (!req.body.name.match(/^[a-zA-Z0-9]+$/)) {
    res.status(400).send({
      "data": {
        "error": "Invalid name"
      }
    });
    return;
  }
  // should be email format
  if (!req.body.email.match(/^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z0-9.]+$/)) {
    res.status(400).send({
      "data": {
        "error": "Invalid email"
      }
    });
    return;
  }
  if (!req.body.password.match(/^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])|(?=.*\d)(?=.*[a-z])(?=.*[-~`!@#$%\[\]{}?\\/()^_+|])|(?=.*[a-z])(?=.*[A-Z])(?=.*[-~`!@#$%\[\]{}?\\/()^_+|])).{8,}$/)) {
    res.status(400).send({
      "data": {
        "error": "Invalid password"
      }
    });
    return;
  }
  // hashing password
  var salt_rounds = parseInt(process.env.SALT_ROUNDS);
  var password = await bcryptjs.hash(req.body.password, salt_rounds);
  // inserting data
  var id = null;
  sql_string = `INSERT INTO user (name, email, password) VALUES ('${req.body.name}', '${req.body.email}', '${password}');`;
  connection.query(sql_string, function (err, result) {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') 
        res.status(409).send({
          "data": {
            "error": "Email already exists",
          }
        });
      else
        res.status(400).send({
          "data": {
            "error": "Failed to insert data"
          }
        });
      return;
    }
    id = result.insertId;
    res.status(200).send({
      "data": {
        "user": {
          "id": id,
          "name": req.body.name,
          "email": req.body.email,
        },
        "request-date": new Date().toUTCString()
      }
    });

  });
  
});

app.get('/users', (req, res) => { 
  var id = req.query.id;
  if (!id) {
    res.status(400).send({
      "data": {
        "error": "Request body incomplete"
      }
    });
    return;
  }
  sql_string = `SELECT * FROM user where id=${id};`;
  connection.query(sql_string, function (err, result) {
    if (result && result.length === 0) {
      res.status(400).send({
        "data": {
          "error": "User not exist"
        }
      });
    }
    else if (err){
      console.log(err);
      res.status(400).send({
        "data": {
          "error": "Failed to get data"
        }
      });
    }
    else {
      res.status(200).send({
        "data": {
          "user": {
            "id": result[0].id,
            "name": result[0].name,
            "email": result[0].email,
          },
          "request-date": new Date().toUTCString()
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});