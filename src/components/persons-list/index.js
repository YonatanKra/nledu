/*
Draws connector lines between passages.
*/

const Vue = require('vue');
const vuex = require('vuex');


require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {
	
	},
	methods: {
		expandCard: function (event) {
			event.currentTarget.classList.toggle('expand');
			event.currentTarget.parentElement.querySelectorAll('div[expandedable]').forEach(elem=>elem.classList.toggle('hidden'))

			
	}},   
	ready() {
      },

      vuex: {
		actions: {  }
		,

		getters: {
			students: function(state){
				return  state.student.students
			},
			roles: function(state){;
				return  state.role.roles
			},
			statuses: function(state){;
				return  state.status.statuses
			},
		}
	}

});
