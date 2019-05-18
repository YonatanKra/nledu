/*
Draws connector lines between passages.
*/
const Vue = require('vue');
const vuex = require('vuex');
const uuid = require('tiny-uuid');

require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {
        selectedRole : Number
	},
	data: () => ({

	}),
	methods: {
		selectRole(role) {
            this.selectedRole = role;
		},
		
	},
	computed: {
		rolesList: function () {
			return Object.keys(this.roles).map(key => ({
				key: parseInt(key),
				value: this.roles[key]
			}));
        },
  
	},
	filters: {
        imageSource: function (role) {
			switch (parseInt(role)) {
                case 1: //administrator
                case 'administrator':
					return require('../../../../person-image/images/administrator.svg');
                case 2: //instructor
                case 'instructor':
					return require('../../../../person-image/images/instructor.svg');
                case 3: //teacher
                case 'teacher':
					return require('../../../../person-image/images/teacher.svg');
                case 4: //student
                case 'student':
					return require('../../../../person-image/images/student.svg');
			}
		},
	},
	ready() {

	},

	components: {
		//'person-image': require('../../../../person-image/images/')	
	},

	vuex: {
		actions: {},

		getters: {
			roles: state => state.role.roles,
		}
	}

});
