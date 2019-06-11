/*
Draws connector lines between passages.
*/

const Vue = require('vue');
const vuex = require('vuex');
const moment = require('moment');


const groupBy = key => array =>
	array.reduce((objectsByKeyValue, obj) => {
		const value = obj[key];
		objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
		return objectsByKeyValue;
	}, {});

require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),


	props: {
	},
	data: () => ({
		groupByField: '',
		availableGroupFields: ['role', 'status', 'class', 'grade', 'none']
	}),
	methods: {
		openPersonDelegate : function(personId, p){
			window.location.hash += '/' + personId;
		},
		expandCard: function (event) {
			event.currentTarget.classList.toggle('expand');
			event.currentTarget.parentElement.querySelectorAll('div[expandedable]').forEach(elem => elem.classList.toggle('hidden'))
		},
		setGroupByField: function (field) {
			this.groupByField = field;
		},
		editPersonDelegate : function(person){
		
		}
	},
	computed: {
		classesDict: function () {
			return this.classes.reduce((a, b) => {
				a[b.id] = b;
				return a;
			}, {});
		},
		flatStudentsList: function () {
			const list = [];

			this.students.forEach(person=>{
				const item = Object.assign({},person);
				const personclass = this.classesDict[person.class] || {};

				item.role= this.roles[person.role];
				item.status= this.statuses[person.status];

				item.school = personclass.school;
				item.grade = personclass.grade;
				item.city = personclass.city;

				list.push(item);

			})

			return list;
		},
		groupByList: function () {
			return groupBy(this.groupByField)(this.flatStudentsList);
		}
	},
	
	filters: {
		moment: function (date) {
			return moment(date).format('DD/MM/YYYY');
		},
		statusIcon: function (s) {
			switch (s) {
				case "active":
					return 'how_to_reg';
				case "archived":
					return 'archive';
				case "resolved":
					return 'done';
				case "pending":
					return 'access_time';
				case "visible":
					return 'visible';
				case "editing":
					return 'insert_drive_file';
			}
		}
	},
	ready() {
		componentHandler.upgradeDom();
	},
	components: {
		'class-row': require('../../components/rows/class-row'),
		'person-image': require('../../components/person-image'),
	},
	vuex: {
		actions: {},

		getters: {
			students: state => state.student.students,
			roles: state => state.role.roles,
			statuses: state => state.status.statuses,
			cities: state => state.city.cities,
			classes: state => state.class.classes,
		}

	}

});
