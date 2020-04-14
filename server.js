const express = require('express');
const fs = require('fs');
var hbs  = require('express-handlebars');
var app = express();

app.use(express.static(__dirname + '/public'));
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    // next();


    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.writeFileSync('server.log', log);
    next();
});


app.use((req, res, next) => {
    res.render('offline.hbs', {
        layout: false
    });
});



app.get('/', (req, res) => {
    res.render('home', {
        title: 'My Site',
        pageTitle: 'صفحه اصلی سایت',
        welcomeMessage: 'به سایت ما خوش آمدید',
        currentYear: new Date().getFullYear()
    })
});


app.get('/about', (req, res) => {
   res.render('about', {
       title: 'My Site',
       pageTitle: 'درباره ما',
       currentYear: new Date().getFullYear()
   });
});


app.get('/bad', (req, res) => {
   res.send({Error : 'Unable to fetch data'});
});


app.listen(3000, () => {
    console.log('Server run on port 3000');
});