/*
Draws connector lines between passages.
*/
const Vue = require('vue');
const vuex = require('vuex');
const uuid = require('tiny-uuid');
const  storagePath = require('../../../../common/servicePathes').storage

require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {


	},
	data: () => ({
		obj: {
			first_name: '',
			surname: '',
			birth_date: '',
			email: '',
			phone: '',
			role: '',
			class: '',
			profile_img: ''			
		},
	}),
	methods: {
		async selectImage(){
			document.getElementById('upload-person-image-file-form').click();
		},
		async uploadPersonImageChange(){
			const preview = document.getElementById('upload-person-image-form');
			const file = document.getElementById('upload-person-image-file-form').files[0];

			const reader = new FileReader();

			reader.onloadend = () => {
				preview.src = reader.result;
				
				this.obj.imageDataURL =  reader.result;
				this.obj.profile_img = 'image';
			}

			if (file) {
				reader.readAsDataURL(file); //reads the data as a URL
			} else {
				delete 	obj.imageDataURL;
				//preview.src = "";
			}
		},
		
	},
	computed: {

		rolesList: function () {
			return Object.keys(this.roles).map(key => ({
				key,
				value: this.roles[key]
			}));
		},
		classesList: function () {
			return Object.values(this.classes).map(cls => ({
				key: cls.id,
				value: cls.grade + ', ' + cls.school + ', ' + cls.city
			}))
		}
	},
	filters: {

	},
	ready() {
	
	},

	components: {
		'drop-down': require('../../../drop-down'),
		'role-selector': require('./role-selector'),
		'class-selector': require('./class-selector'),
		'person-image': require('../../../person-image'),

		//'stories-list-builder': require('./stories-list-builder'),
	
	},

	vuex: {
		actions: {},

		getters: {
			stories: state => state.story.stories,
			roles: state => state.role.roles,
			statuses: state => state.status.statuses,
			cities: state => state.city.cities,
			classes: state => state.class.classes,

		}
	}

});
