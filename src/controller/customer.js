const customerModal = require('../modal/customerModal');
const nodeMailer = require('nodemailer');

const createCustomer = async (req, res) => {
	try {
		console.log(req.data);
		await customerModal.create(req.body, (err, data) => {
			console.log(data);
			if (err) {
				throw err;
			}
			const transporter = nodeMailer.createTransport({
				host: 'smtpout.secureserver.net',
				secure: true,
				secureConnection: false, // TLS requires secureConnection to be false
				requireTLS: true,
				port: 465,
				auth: {
					user: process.env.emailId,
					pass: process.env.password,
				},
			});
			const mailOptions = {
				from: process.env.emailId, //replace with your email
				to: process.env.emailId, //replace with your email
				subject: `New Inquery for Supports360 `,
				html: `<h1>Contact details</h1>
                       <h2> name:${req.body.fullName}</h2><br>
                       <h2> email:${req.body.email}</h2><br>
                       <h2> phonenumber:${req.body.phoneNumber}</h2><br>
                       <h2> message:This is Trial Message</h2>
                       <br>`,
			};
			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					console.log(error, '<>', info);
					// res.send('error'); // if error occurs send error as response to client
				} else {
					console.log('Email sent: ' + info.response);
					// res.send('Sent Successfully'); //if mail is sent successfully send Sent successfully as response
				}
			});
		});
	} catch (error) {
		console.log('----------------------- catch block');
		console.log(error);
	}
};

module.exports = { createCustomer };
