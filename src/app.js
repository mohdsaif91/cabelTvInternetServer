const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

// require('dotenv').config();
require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
	console.log('staring connecting');
	await mongoose
		.connect(process.env.mongoDBURL, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
		})
		.then((db, err) => {
			console.log('in Then');
			if (db) {
				console.log(process.env.mongoDBURL);
			} else {
				console.log('in ERROR ', err, process.env.mongoDBURL);
				res.json({
					// message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
					message: err,
				});
			}
		})
		.catch((err) => {
			res.json({
				// message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
				message: err,
			});
			console.log(err, 'Mongo DB error->', process.env.mongoDBURL, err);
		});
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
