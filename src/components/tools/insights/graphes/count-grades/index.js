const Vue = require('vue');
const vuex = require('vuex');
const moment = require('moment');
const c3 = require('c3');
require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {


	},
	data: {

	},
	methods: {

	},
	computed: {


	},
	filters: {

	},

	ready() {

		const groupBy = (xs, key) => {
			return xs.reduce((rv, x) => {
				(rv[x[key]] = rv[x[key]] || []).push(x);
				return rv;
			}, {});
		};

		const grades = [...new Set(this.classes.map(c=>c.grade))].sort();

		const groupByCity = groupBy(this.classes.map(x => Object.assign({}, {
			students: this.students.filter(s => s.class == x.id).length,
			city: x.city,
			grade: x.grade
		})), 'city');

		const data = [];

		for (cityAgg in groupByCity){
			const arr = [cityAgg];
			grades.forEach(grade=>{
				const match = groupByCity[cityAgg].find(g=>g.grade===grade);
				arr.push(match ? match.students : 0);
			});

			data.push(arr);
		}


		const chartElement = this.$el.querySelector('.chart');

		var chart = c3.generate({
			bindto: chartElement,
			data: {
				columns: data,
				type: 'bar'
			},
			axis: {
				x: {
					type: 'grade',
					categories:grades
				}
			}
		});

	},

	components: {

	},

	vuex: {
		actions: {
			//createAssignment
		},

		getters: {
			currentUser: state => state.auth.currentUser,
			stories: state => state.story.stories,
			subjects: state => state.subject.subjects,
			classes: state => state.class.classes,
			students: state => state.student.students,

		}
	}
});
