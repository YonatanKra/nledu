const firebase = require('./firebase');

module.exports.signUpWithEmailAndPassword = async (email, password) => {
	await firebase.auth().createUserWithEmailAndPassword(email, password);

	return firebase.auth().currentUser;
};

module.exports.signInWithEmailAndPassword = async (email, password) => {
	await firebase.auth().signInWithEmailAndPassword(email, password);

	return firebase.auth().currentUser;
};

module.exports.signOut = async () => {
	await firebase.auth().signOut();
};

module.exports.getCurrentUser = () => {
	return firebase.auth().currentUser;
};

module.exports.registerToOnAuthStateChanged = (success, error) => {
	return firebase.auth().onAuthStateChanged(
		authUser => {
			success(authUser)
		},
		() => {
			debugger;
			error();
		},
	);

}
