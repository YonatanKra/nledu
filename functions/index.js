const functions = require('firebase-functions');

const cors = require('cors')({origin: true});


const admin = require('firebase-admin');
admin.initializeApp();

exports.addMessage = functions.https.onRequest((req, res) => {
	// Grab the text parameter.
	const original = req.query.text;
	// Push the new message into the Realtime Database using the Firebase Admin SDK.
	return admin.database().ref('/messages').push({original: original}).then((snapshot) => {
		// Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
		return res.redirect(303, snapshot.ref.toString());
	});
});

exports.saveStory = functions.https.onRequest((req, res) => {
	// Grab the text parameter.
	// Push the new message into the Realtime Database using the Firebase Admin SDK.
	return admin.database().ref('/stories').update({[JSON.parse(req.body).id]: JSON.parse(req.body)}).then(() => {
		// Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
		cors(req, res, () => {});

		return res.send(  'OK');
		//return snapshot.exportVal();
	});
});


exports.saveStories = functions.https.onRequest((req, res) => {
	// Grab the text parameter.
	const original = req.query.text;
	console.log(req.body);
	// Push the new message into the Realtime Database using the Firebase Admin SDK.
	return admin.database().ref('/stories_meta').update({storyIds: req.body}).then(() => {
		// Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
		//console.log('MM ' +  snapshot.ref.toString());
		cors(req, res, () => {
		});

		return res.send('OK');
		//return snapshot.exportVal();
	});
});

exports.savePassages = functions.https.onRequest((req, res) => {
	// Grab the text parameter.
	const original = req.query.text;
	console.log(req.body);
	// Push the new message into the Realtime Database using the Firebase Admin SDK.
	return admin.database().ref('/stories_meta').update({passageIds: req.body}).then((snapshot) => {
		// Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
		//console.log('MM ' +  snapshot.ref.toString());
		cors(req, res, () => {
		});

		return res.send('OK');
		//return snapshot.exportVal();
	});
});

exports.getStory = functions.https.onRequest((req, res) => {
	// Grab the text parameter.
	const id = req.query.storyID;
	console.log(req.body);
	// Push the new message into the Realtime Database using the Firebase Admin SDK.
	return admin.database().ref('/stories').once("value",(snapshot) => {
		// Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
		console.log('MM ' +  snapshot.val());
		cors(req, res, () => {});

		return res.send(  snapshot.val()[id]);
		//return snapshot.exportVal();
	});
});


exports.getStories = functions.https.onRequest((req, res) => {
	// Grab the text parameter.
	const original = req.query.text;
	console.log(req.body);
	// Push the new message into the Realtime Database using the Firebase Admin SDK.
	return admin.database().ref('/stories_meta').once("value",(snapshot) => {
		// Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
		console.log('MM ' +  snapshot.val());
		cors(req, res, () => {});

		return res.send(  snapshot.val().storyIds);
		//return snapshot.exportVal();
	});
});

exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
	.onCreate((snapshot, context) => {
		// Grab the current value of what was written to the Realtime Database.
		const original = snapshot.val();
		console.log('Uppercasing', context.params.pushId, original);
		const uppercase = original.toUpperCase();
		// You must return a Promise when performing asynchronous tasks inside a Functions such as
		// writing to the Firebase Realtime Database.
		// Setting an "uppercase" sibling in the Realtime Database returns a Promise.
		return snapshot.ref.parent.child('uppercase').set(uppercase);
	});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
