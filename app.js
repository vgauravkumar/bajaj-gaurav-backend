const express = require("express");

const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

function charIsLetter(str) {
    return /^[a-zA-Z]+$/.test(str);
  }

function isNumber(str) {
    if (typeof str != "string") return false;
    return !isNaN(str) && !isNaN(parseFloat(str))
}

function alphanumeric(str) {
    var code, i, len;
  
    for (i = 0, len = str.length; i < len; i++) {
      code = str.charCodeAt(i);
      if (!(code > 47 && code < 58) && // numeric (0-9)
          !(code > 64 && code < 91) && // upper alpha (A-Z)
          !(code > 96 && code < 123)) { // lower alpha (a-z)
        return false;
      }
    }
    return true;
  };

function num (array) {
    let arr = [];
    for( let i=0; i<array.length; i++) {
        if (isNumber(array[i])) {
            arr.push(array[i]);
        }
    }
    return arr;
}

function alpha (array) {
    let arr = [];
    for( let i=0; i<array.length; i++) {
        if (charIsLetter(array[i])) {
            arr.push(array[i]);
        }
    }
    return arr;
}

function countAlphaNum (array) {
    let count = 0;
    for( let i=0; i<array.length; i++) {
        if (alphanumeric(array[i])) {
            count++;
        }
    }
    return count;
}

app.post("/challenge", function (req, res) {
    try {
        console.log(req.body.data);
        
        let data = req.body.data;
        const numbers = num(data);
        const alphabets = alpha(data);
        const count = countAlphaNum(data);
        
        return res.status(200).json({
            is_success: true,
            user_id: "vgauravkumar",
            count: count,//TODO
            email: "19056530@kiit.ac.in",
            roll_number: "1905530",
            numbers: numbers, //["1","2","3"],
            alphabets: alphabets, //["A", "B"]
        });
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            is_success: false
        });
    }
});

app.all("*", (req, res) => {
    return res.status(400).json({
        is_success: false
    });
});

const port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log(`Server started at port ${port}.`);
});
