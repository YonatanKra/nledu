const functions = require('firebase-functions');

const cors = require('cors')({
	origin: true
});
const {
	Pool,
	Client
} = require('pg')
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
const clientConne = {
	user: 'ztuqhnkbhhwcgl',
	host: 'ec2-54-228-243-238.eu-west-1.compute.amazonaws.com',
	database: 'd3lhr997fs4s47',
	password: '76bbecf6b927b8c80c00b0701f1b18b5a7cc9af29da5796945629ea230a243ad',
	port: 5432,
	ssl: true
};

//const admin = require('firebase');
const admin = require('firebase-admin');

admin.initializeApp();



exports.addMessage = functions.https.onRequest((req, res) => {
	// Grab the text parameter.
	const original = req.query.text;
	// Push the new message into the Realtime Database using the Firebase Admin SDK.
	return admin.database().ref('/messages').push({
		original: original
	}).then((snapshot) => {
		// Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
		return res.redirect(303, snapshot.ref.toString());
	});
});

exports.saveStory = functions.https.onRequest((req, res) => {
	// Grab the text parameter.
	// Push the new message into the Realtime Database using the Firebase Admin SDK.
	return admin.database().ref('/stories').update({
		[JSON.parse(req.body).id]: JSON.parse(req.body)
	}).then(() => {
		// Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
		cors(req, res, () => {});

		return res.send('OK');
		//return snapshot.exportVal();
	});

});


exports.saveStories = functions.https.onRequest((req, res) => {
	// Grab the text parameter.
	const original = req.query.text;
	console.log(req.body);
	// Push the new message into the Realtime Database using the Firebase Admin SDK.
	return admin.database().ref('/stories_meta').update({
		storyIds: req.body
	}).then(() => {
		// Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
		//console.log('MM ' +  snapshot.ref.toString());
		cors(req, res, () => {});

		return res.send('OK');
		//return snapshot.exportVal();
	});
});

exports.savePassages = functions.https.onRequest((req, res) => {
	// Grab the text parameter.
	const original = req.query.text;
	console.log(req.body);
	// Push the new message into the Realtime Database using the Firebase Admin SDK.
	return admin.database().ref('/stories_meta').update({
		passageIds: req.body
	}).then((snapshot) => {
		// Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
		//console.log('MM ' +  snapshot.ref.toString());
		cors(req, res, () => {});

		return res.send('OK');
		//return snapshot.exportVal();
	});
});

exports.getStory = functions.https.onRequest((req, res) => {
	// Grab the text parameter.
	const id = req.query.storyID;
	console.log(req.body);
	// Push the new message into the Realtime Database using the Firebase Admin SDK.
	return admin.database().ref('/stories').once("value", (snapshot) => {
		// Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
		console.log('MM ' + snapshot.val());
		cors(req, res, () => {});

		return res.send(snapshot.val()[id]);
		//return snapshot.exportVal();
	});
});


exports.getStories = functions.https.onRequest((req, res) => {
	// Grab the text parameter.
	const original = req.query.text;
	console.log(req.body);
	// Push the new message into the Realtime Database using the Firebase Admin SDK.
	return admin.database().ref('/stories_meta').once("value", (snapshot) => {
		// Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
		console.log('MM ' + snapshot.val());
		cors(req, res, () => {});

		return res.send(snapshot.val().storyIds);
		//return snapshot.exportVal();
	});
});

const dbQueryGet = (query, delegate, error) => {
	const client = new Client(clientConne);

	client.connect()
	return client.query(query)
		.then(result => delegate(result))
		.catch(e => error && error(e.stack))
		.then(() => client.end());
}

exports.getAssets = functions.https.onRequest((req, res) => {
	dbQueryGet('SELECT * FROM public.tbl_assets', (result => {
		cors(req, res, () => {});

		res.send(result.rows);
	}));
});

exports.getSubjects = functions.https.onRequest((req, res) => {
	dbQueryGet('select lss.id sub_subject_id, lss.name sub_subject_name, ls.name subject_name, ls.image , ls.id subject_id from public.lov_sub_subjects lss ' +
		' right join public.lov_subjects ls ' +
		' on ls.id = lss.subject_id', (result => {

			let subjects = result.rows.reduce((a, b) => {
				if (!a[b.subject_id]) {
					a[b.subject_id] = {
						name: b.subject_name,
						sub_subjects: [],
						image: b.image,
						subject_id: b.subject_id
					};
				}

				a[b.subject_id].sub_subjects.push({
					sub_subject_id: b.sub_subject_id,
					subject_id: b.subject_id,
					sub_subject_name: b.sub_subject_name
				})
				return a;
			}, {})

			cors(req, res, () => {});

			res.send(subjects);
		}));
});

exports.getStatuses = functions.https.onRequest((req, res) => {
	dbQueryGet('SELECT * FROM public.lov_statuses', (result => {
		cors(req, res, () => {});
		let statuses = {};

		result.rows.forEach(status => {
			statuses[status.id] = status.name;
		});

		res.send(statuses);
	}));
});

exports.getRoles = functions.https.onRequest((req, res) => {
	dbQueryGet('SELECT * FROM public.lov_roles', (result => {
		cors(req, res, () => {});
		let roles = {};

		result.rows.forEach(role => {
			roles[role.id] = role.name;
		});

		res.send(roles);
	}));
});

exports.getStudents = functions.https.onRequest((req, res) => {
	dbQueryGet('SELECT * FROM public.tbl_persons', (result => {
		cors(req, res, () => {});

		res.send(result.rows);
	}));
});

const validateStudentObj = obj => {
	return obj && obj.first_name && obj.surname && obj.birth_date && obj.email && obj.phone && obj.class && obj.role;
}

exports.addStudent = functions.https.onRequest((req, res) => {
	cors(req, res, () => {});

	if (validateStudentObj(req.body)) {

		var message = req.body.profile_img;
		var storageRef = storage.ref();

		storageRef.child('profile_images/mountains.jpg').putString(message, 'data_url').then(function (snapshot) {
			console.log('Uploaded a data_url string!');
		});


		const query = {
			text: 'INSERT INTO public.tbl_persons(first_name,surname,birth_date,role,email, phone,class,profile_img) ' +
				'VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
			values: [req.body.first_name, req.body.surname, req.body.birth_date,
				req.body.role, req.body.email, req.body.phone,
				req.body.class, 'pppppp'
			]
		}
		//	dbQueryGet(query, result => res.send(result.rows), err => res.status(500).send(err));
	} else {
		res.status(422).send('Missing fields');
	}
});

exports.getClasses = functions.https.onRequest((req, res) => {
	dbQueryGet('SELECT * FROM public.tbl_classes', (result => {
		cors(req, res, () => {});

		res.send(result.rows);
	}));
});


const validateClassObj = obj => {
	return obj && obj.grade && obj.school && obj.city;
}

exports.addClass = functions.https.onRequest((req, res) => {
	cors(req, res, () => {});

	if (validateClassObj(req.body)) {
		const query = {
			text: 'INSERT INTO public.tbl_classes(grade,school,city) VALUES($1, $2, $3) RETURNING *',
			values: [req.body.grade, req.body.school, req.body.city]
		}
		dbQueryGet(query, result => res.send(result.rows), err => res.status(500).send(err));
	} else {
		res.status(422).send('Missing fields');
	}
});

const validateStoryMetaDataObj = obj => {
	return obj && obj.id && obj.name && obj.sub_subject;

}

exports.addStoryMetaData = functions.https.onRequest((req, res) => {
	cors(req, res, () => {});

	if (validateStoryMetaDataObj(req.body)) {
		const query = {
			text: 'INSERT INTO public.tbl_stories(id, name, sub_subject, path, tags, description) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
			values: [req.body.id, req.body.name, req.body.sub_subject, req.body.path, req.body.tags, req.body.description]
		}
		dbQueryGet(query, result => res.send(result.rows), err => res.status(500).send(err));
	} else {
		res.status(422).send('Missing fields');
	}
});

exports.updateStoryMetaData = functions.https.onRequest((req, res) => {
	cors(req, res, () => {});

	if (validateStoryMetaDataObj(req.body)) {
		const query = {
			text: 'UPDATE public.tbl_stories SET(name, sub_subject, path, tags, description) = ($2, $3, $4, $5, $6) WHERE id = $1 RETURNING *',
			values: [req.body.id, req.body.name, req.body.sub_subject, req.body.path, req.body.tags, req.body.description]
		}
		dbQueryGet(query, result => res.send(result.rows), err => res.status(500).send(err));
	} else {
		res.status(422).send('Missing fields');
	}
});



exports.updateClass = functions.https.onRequest((req, res) => {
	cors(req, res, () => {});

	if (validateClassObj(req.body) && req.body.id) {
		const query = {
			text: 'UPDATE public.tbl_classes SET(grade,school,city) = ($1, $2, $3) WHERE id = $4 RETURNING *',
			values: [req.body.grade, req.body.school, req.body.city, req.body.id]
		}
		dbQueryGet(query, result => res.send(result.rows), err => res.status(500).send(err));
	} else {
		res.status(422).send('Missing fields');
	}
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

exports.getData = functions.https.onRequest((req, res) => {
	// Grab the text parameter.
	const original = req.query.text;
	console.log(req.body);
	// Push the new message into the Realtime Database using the Firebase Admin SDK.
	return admin.database().ref('/stories').once("value", (stories) => {
		// Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
		return admin.database().ref('/passages').once("value", (passages) => {
		cors(req, res, () => {});

		return res.send({
			stories : stories.val(),
			passages : passages.val()}
			);
	
	});
	});
});

exports.syncData = functions.https.onRequest((req, res) => {
	cors(req, res, () => {});

	const stories = req.body.stories.map(JSON.parse).reduce((a, b) => {
		a[b.id] = b;
		return a
	}, {});

	const passages = req.body.passages.map(JSON.parse).reduce((a, b) => {
		a[b.id] = b;
		return a
	}, {});


	return admin.database().ref('/stories').update(stories).then((a,b,c) => {
		return admin.database().ref('/passages').update(passages).then((d,e,f) => {
			// Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
			cors(req, res, () => {});

			return res.send({
				a:a,
				b:b,
				c:c,
				d:d,
				e:e,
				f:f
			});
			//return snapshot.exportVal();
		});
	});
});