const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

const port = process.env.PORT || 5000;
app.listen(port, async () => {
	console.log(process.env.PORT, '<>', process.env.mongoDBURL);
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

	/* eslint-enable no-console */
});
