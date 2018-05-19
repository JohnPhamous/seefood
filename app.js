var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.send('Home page');
});

app.get('/search/:label', function(req, res) {
  var food = req.params.label;
  var label, nutrition, servingSize, calories, fat, carbs, protein; 
 
  request(`https://www.myfitnesspal.com/food/search?search=${food.split(' ').join('+')}`, function(error, response, body) {
    var $ = cheerio.load(body);
    label = $('li.odd:nth-child(1) > div:nth-child(2) > div:nth-child(1) > a:nth-child(1)').text();
    
    nutrition = $('li.odd:nth-child(1) > div:nth-child(2) > div:nth-child(2)').contents(); 
    
    servingSize = nutrition[2].data.trim();
    servingSize = servingSize.substring(0, servingSize.length - 1);
    console.log('Serving Size:', servingSize);

    calories = nutrition[4].data.trim();
    calories = calories.substring(0, calories.length - 1);
    console.log('Calories:', calories);

    fat = nutrition[6].data.trim();
    fat = fat.substring(0, fat.length - 1);
    console.log('Fat:', fat);
    
    carbs = nutrition[8].data.trim();
    carbs = carbs.substring(0, carbs.length - 1);
    console.log('Carbohydrates:', carbs);
    
    protein = nutrition[10].data.trim();
    protein = protein.substring(0, protein.length);
    console.log('Protein:', protein);
  });
  res.send(`Nutrition for ${food}`);
    
});

app.listen(process.env.PORT || 3000, function(){
  console.log('Server started');
});
