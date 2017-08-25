const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = now+':'+req.method+req.url;
	console.log(log);
	fs.appendFile('server log', log +'\n');
	next();
});

// app.use((req, res, next) => {
// 	res.render('maintance');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getcurrently', () => {
	return new Date().getFullYear();
});

app.get('/', (req, res) => {
	res.render('about', {
		Title: 'Page Home',
		Text: 'wellcome to home ...'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		Title: 'Page About',
		Text: 'this is text page about'
	});
});

app.get('/bed', (req, res) => {
	res.send({errorMessage : 'this is message error'});
});

app.listen(3000, () => {
	console.log('starting aplikasi port:3000');
});