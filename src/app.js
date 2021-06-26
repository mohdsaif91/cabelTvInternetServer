const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

// require('dotenv').config();
require('dotenv').config({ path: 'ENV_FILENAME' });

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	await mongoose
		.connect(process.env.mongoDBURL, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
		})
		.then((db, err) => {
			if (db) {
				console.log(
					`Listening: http://localhost:${port} connected`,
					process.env.mongoDBURL
				);
			} else {
				console.log(err, process.env.mongoDBURL);
			}
		})
		.catch((err) => {
			console.log(err, 'Mongo DB error->', process.env.mongoDBURL, err);
		});
	res.json({
		// message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
		message: err,
	});
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
