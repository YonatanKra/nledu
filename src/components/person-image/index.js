const Vue = require('vue');
const vuex = require('vuex');
const storagePath = require('../../common/servicePathes').storage

require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {
		person: {},
		imageClass: String
	},
	data: {},
	methods: {

	},
	computed: {
        
		imageSource: function () {
          
            if(this.person && this.person.profile_img==='image'){
                const path = 'images/persons/' + this.person.id + '.png';
                return  storagePath.storageURL +  encodeURIComponent(path) + storagePath.imageSuffix;
                

            }
			switch (this.person.role) {
                case 1: //administrator
                case 'administrator':
					return require('./images/administrator.svg');
                case 2: //instructor
                case 'instructor':
					return require('./images/instructor.svg');
                case 3: //teacher
                case 'teacher':
					return require('./images/teacher.svg');
                case 4: //student
                case 'student':
					return require('./images/student.svg');
			}
		},
	},
	filters: {},
	ready() {},

	vuex: {
		actions: {},

		getters: {
			roles: state => state.role.roles,
		}
	}
});
