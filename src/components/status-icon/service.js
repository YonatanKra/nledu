module.exports.getImagePath = (status) => {
	switch (status) {
		case 1:
		case 'active':
			return require('./images/success.svg');
		case 2:
		case 'archived':
			return require('./images/garbage.svg');
		case 3:
		case 'resolved':
			return require('./images/success.svg');
		case 4:
		case 'pending':
			return require('./images/stopwatch.svg');
		case 5:
		case 'visible':
			return require('./images/success.svg');
		case 6:
		case 'editing':
			return require('./images/notebook.svg');
	}
}
