const functions = require('firebase-functions');

const cors = require('cors')({origin: true});
const { Pool, Client } = require('pg')
/*
const pool = new Pool({
  user: 'ztuqhnkbhhwcgl',
  host: 'ec2-54-228-243-238.eu-west-1.compute.amazonaws.com',
  database: 'd3lhr997fs4s47',
  password: '76bbecf6b927b8c80c00b0701f1b18b5a7cc9af29da5796945629ea230a243ad',
  port: 5432,
  ssl: true
})
*/
const clientConne = 
{
	user: 'ztuqhnkbhhwcgl',
	host: 'ec2-54-228-243-238.eu-west-1.compute.amazonaws.com',
	database: 'd3lhr997fs4s47',
	password: '76bbecf6b927b8c80c00b0701f1b18b5a7cc9af29da5796945629ea230a243ad',
	port: 5432,
	ssl: true
  }
  ;

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

const dbQueryGet = (query,delegate)=>{
const client = new Client(clientConne);

client.connect()
return client.query(query)
	.then(result => delegate(result))
	.catch(e => console.error(e.stack))
	.then(() => client.end());
}

exports.getAssets =  functions.https.onRequest((req, res) => {
	dbQueryGet('SELECT * FROM public.tbl_assets', (result=>{
		cors(req, res, () => {});

		res.send(result.rows);
	}));	
});

exports.getStatuses =  functions.https.onRequest((req, res) => {
	dbQueryGet('SELECT * FROM public.lov_statuses', (result=>{
		cors(req, res, () => {});
		let statuses = {};

		result.rows.forEach(status => {
			statuses[status.id] = status.name;
		});

		res.send(statuses);
	}));	
});

exports.getRoles =  functions.https.onRequest((req, res) => {
	dbQueryGet('SELECT * FROM public.lov_roles', (result=>{
		cors(req, res, () => {});
		let roles = {};

		result.rows.forEach(role => {
			roles[role.id] = role.name;
		});

		res.send(roles);
	}));	
});

exports.getStudents =  functions.https.onRequest((req, res) => {
	dbQueryGet('SELECT * FROM public.tbl_persons', (result=>{
		cors(req, res, () => {});

		res.send(result.rows);
	}));	
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
