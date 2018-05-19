var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var cors = require('cors')
var bodyParser = require("body-parser");
var app = express();
const Clarifai = require('clarifai');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

const capp = new Clarifai.App({
  apiKey: 'd1b7bc4b46f84e6d94c15d9d74430474'
})

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  capp.models.predict("aaa03c23b3724a16a56b629203edc62c", "https://samples.clarifai.com/metro-north.jpg").then(
    function(response) {
      console.log(response)
      res.send(response['rawData']['outputs']['0']['data']['concepts'])
    },
    function(err) {
    }
  );
});

app.post('/getLabels', (req, res) => {
  const image = req.body.image;

  capp.models.predict("aaa03c23b3724a16a56b629203edc62c", image).then(
    function(response) {
      console.log(response)
      res.send(response['rawData']['outputs']['0']['data']['concepts'])
    },
    function(err) {
      res.send('There was an error')
    }
  );
})

app.post('/search/:label', function(req, res) {
  var food = req.params.label;
  var label, nutrition, servingSize, calories, fat, carbs, protein, foodInfo; 

  function removeLast(string) {
    string = string.substring(0, string.length - 1);
    return string;
  }
 
  request(`https://www.myfitnesspal.com/food/search?search=${food.split(' ').join('+')}`, function(error, response, body) {
    var $ = cheerio.load(body);
    labelSelector = 'li.odd:nth-child(1) > div:nth-child(2) > div:nth-child(1) > a:nth-child(1)';
    label = $(labelSelector).text();
   
    nutritionSelector = 'li.odd:nth-child(1) > div:nth-child(2) > div:nth-child(2)'; 
    nutrition = $(nutritionSelector).contents(); 
    
    servingSize = nutrition[2].data.trim();
    servingSize = removeLast(servingSize);

    calories = nutrition[4].data.trim();
    calories = removeLast(calories);

    fat = nutrition[6].data.trim();
    fat = removeLast(fat);
    
    carbs = nutrition[8].data.trim();
    carbs = removeLast(carbs);
    
    protein = nutrition[10].data.trim();
    protein = removeLast(protein);
    
    foodInfo = {"label": label,
              "servingSize": servingSize,
              "calories": calories,
              "fat": fat,
              "carbs": carbs,
              "protein": protein}
  
    res.json(foodInfo);
  });
});

app.get('/search/:label', function(req, res) {
  res.send(`Nutrition for ${req.params.label}`)
});

app.listen(process.env.PORT || 3000, function(){
  console.log('Server started');
});
