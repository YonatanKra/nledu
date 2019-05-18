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
        selectedClass : String
	},
	data: () => ({

	}),
	methods: {
		selectClass(cls) {
            this.selectedClass = cls;
		},
		
	},
	computed: {
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
		//'person-image': require('../../../../person-image/images/')	
	},

	vuex: {
		actions: {},

		getters: {
            classes: state => state.class.classes,
		}
	}

});
