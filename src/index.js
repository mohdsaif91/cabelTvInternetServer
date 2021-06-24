const app = require('./app');
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;
app.listen(port, () => {
	mongoose
		.connect(process.env.mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
		.then((db, err) => {
			if (db) {
				console.log(`Listening: http://localhost:${port} connected`);
			} else {
				console.log(err);
			}
		});

	/* eslint-enable no-console */
});
