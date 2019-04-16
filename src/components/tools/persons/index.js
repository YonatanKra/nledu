/*
Draws connector lines between passages.
*/

const Vue = require('vue');
const vuex = require('vuex');
const moment = require('moment');
const _ = require('lodash');


const {
	createStudent
} = require('../../../data/actions/student');

require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),
	data: {
		insert_first_name: '',
		insert_surname: '',
		insert_birth_date: '',
		insert_email: '',
		insert_phone: '',
		insert_class: '',
		insert_profile_img_stream: ''
	},
	props: {

	},
	methods: {
		createStudentDelegate(e) {
			let b = moment(this.insert_birth_date, 'dd/mm/yyy');

			const data = {
				first_name: this.insert_first_name,
				surname: this.insert_surname,
				birth_date: b.toDate(),
				email: this.insert_email,
				phone: this.insert_phone,
				role: parseInt(this.insert_role),
				class: this.insert_class,
				profile_img: this.insert_profile_img_stream
			}

			this.createStudent(data);
		},
		selectCityDelegate(e) {
			this.insert_city = e.currentTarget.getAttribute('data-city-name')
		},
		selectImage(e) {
			const fileInput = document.getElementById('insert_profile_img');

			if (fileInput.files.length) {
				const reader = new FileReader();

				var _this = this;

				reader.onload = function (e) {
					var binaryData = e.target.result;
					//Converting Binary Data to base 64
				//	var base64String = window.btoa(binaryData);

					_this.insert_profile_img_stream = binaryData;
				};
				reader.readAsDataURL(fileInput.files[0]);
			}
		}
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
	components: {
		'persons-list': require('../../persons-list'),
		'expanding-card': require('../../expanding-card'),
		'drop-down': require('../../drop-down')
	},
	vuex: {
		actions: {
			createStudent
		},
		getters: {
			statuses: function (state) {
				return state.status.statuses
			},
			classes: function (state) {
				return state.class.classes;
			},
			roles: function (state) {
				return state.role.roles;
			},
		}
	}

});
