const getSnackBar = () => document.getElementById('demo-toast-example')

const showMessage = (message, type) => {
	const element =getSnackBar();
	element && element.MaterialSnackbar.showSnackbar({
		message: message
	});
}

module.exports = {
	showMessage
}