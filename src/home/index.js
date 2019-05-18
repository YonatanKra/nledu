/**
 Manages showing the user a quick set of intro information, and then
 records that it's been shown.

 @class WelcomeView
 @extends Backbone.Marionette.ItemView
**/

'use strict';
const Vue = require('vue');

const {signOut} = require('../common/auth')
require('./index.less');

const {
	updateStudent
} = require('../data/actions/student');

let tools = [];

const initTools = ()=>{
	tools.push({
		name: 'Home',
		order: 1,
		icon: 'home',
		path: '#!/home'
	});
/*
	tools.push({
		name: 'Inbox',
		order: 2,
		icon: 'inbox',
		path: '/inbox'
	});
*/



	tools.push({
		name: 'Persons',
		order: 2,
		icon: 'person',
		path: '#!/home/persons'
	});

	tools.push({
		name: 'Lessons',
		order: 2,
		icon: 'dns',
		path: '#!/home/lessons'
	});

	tools.push({
		name: 'Stories',
		order: 2,
		icon: 'extension',
		path: '#!/home/stories'
	});

	tools.push({
		name: 'Learn',
		order: 2,
		icon: 'pets',
		path: '#!/home/learn'
	});

	tools.push({
		name: 'Assignment',
		order: 2,
		icon: 'assignment',
		path: '#!/home/assignment'
	});
}
initTools();
module.exports = Vue.extend({
	template: require('./index.html'),

	data: () => ({
		/* How many sections are currently visible. */
		shown: 1,
		tools : tools,
		displayChat : false
	}),

	ready() {
		componentHandler.upgradeDom();
	},
	components: {
		'person-image': require('../components/person-image'),
		'chat' : require('../components/chat')
	},
	computed: {
		personsDict: function () {
			return this.students.reduce((a, b) => {
				a[b.id] = b;
				return a;
			}, {});
		}
	},
	filters: {
		
	},
	methods: {
		toggleChatWindow(){
			this.displayChat = !this.displayChat;
		},
		async signOut(){
			await signOut();
		},
		async selectImage(){
			document.getElementById('upload-person-image-file').click();
		},
		async uploadPersonImageChange(){
			const preview = document.getElementById('upload-person-image');
			const file = document.getElementById('upload-person-image-file').files[0];

			const reader = new FileReader();
			const user = this.personsDict[this.currentUser.uid];

			reader.onloadend = () => {
				preview.src = reader.result;
				
				user.imageDataURL =  reader.result;
				user.profile_img = 'image';

				this.updateStudent(user);

			}

			if (file) {
				reader.readAsDataURL(file); //reads the data as a URL
				delete 	user.imageDataURL;
			} else {
				//preview.src = "";
			}
		}
	},

	vuex: {
		actions: {
			updateStudent
		},
		getters: {
			currentUser: state => state.auth.currentUser,
			students: state => state.student.students,
		}
	}
});
