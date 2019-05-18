const Vue = require('vue');
const vuex = require('vuex');

require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {
        selectedStudents : []
    	},
	data: {
		
	},
	methods: {
		getStyle(lesson){
		
		}
	},
	computed: {
		students : function(){
			return this.persons.filter(p=>p.role===4);
		}
	},
	filters: {

	},
	ready() {
		componentHandler.upgradeDom();
	},

	vuex: {
		actions: {
			
		},

		getters: {
			persons: state => state.student.students,

		}
	}

});
