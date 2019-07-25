const Vue = require('vue');
const vuex = require('vuex');
const moment = require('moment');
const {getAllEdits} = require('../../data/local-storage/story');
const {
	postMessage
} = require('../../data/actions/message');


require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),
	props: {
		passageId: {
			type: String,
			required: true
        },
        storyId: {
			type: String,
			required: true
        },
        editsList :[]

	},
	data: {

	},

	methods: {
		selectTo(toItem) {
			this.toItem = toItem;
		}
	},
	computed: {
		subSubjects: function () {
			return [];
		},
	
	},
	filters: {
		momentFormat: function (date) {
			return moment(date).fromNow();
		}
	},
	async ready() {
        const data = await getAllEdits();
        const edits = data.filter(x=>x.story===this.storyId && x.passage === this.passageId);
       
        this.editsList = edits;

    },
	components: {
			'edit-preview': require('./edit-preview'),
	},

	vuex: {
		actions: {
			postMessage
		},

		getters: {
			students: state => state.student.students,
			roles: state => state.role.roles,
			statuses: state => state.status.statuses,
			cities: state => state.city.cities,
			classes: state => state.class.classes,
			currentUser: state => state.auth.currentUser,
			messages: state => state.message.messages,
		}
	}
});
