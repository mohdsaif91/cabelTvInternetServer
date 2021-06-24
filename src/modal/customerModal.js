const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
	fullName: { type: String, required: true },
	email: {
		type: String,
		unique: true,
	},
	phoneNumber: {
		type: Number,
		unique: true,
		validate: {
			validator: (v) => {
				return /^\d{10}$/.test(v);
			},
			message: '{VALUE} is not a valid 10 digit number!',
		},
	},
	createdAt: {
		type: Date,
		default: new Date(),
	},
	planeTypeCommercial: {
		type: Boolean,
		required: true,
	},
	planeTypeResidential: {
		type: Boolean,
		required: true,
	},
	serviceTypeCableTv: {
		type: Boolean,
		required: true,
	},
	serviceTypeInternet: {
		type: Boolean,
		required: true,
	},
	serviceTypePhone: {
		type: Boolean,
		required: true,
	},
});

const CustomerModal = mongoose.model('customerModal', CustomerSchema);

module.exports = CustomerModal;
