var express = require('express');
var wagner = require('wagner-core');

 require('./models')(wagner);
var app = express();
wagner.invoke(require('./auth'), { app: app });

app.use('/selectdine_api/v1', require('./api_restaurants')(wagner));
app.use('/selectdine_api/v1', require('./api_categories')(wagner));
app.use('/selectdine_api/v1', require('./api_users')(wagner));

 app.listen(3000);
 console.log('Listening on port 3000!');
