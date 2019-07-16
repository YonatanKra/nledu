window.Raphael = require('./src/vendor/raphael')
require('./src/Treant');

const Vue = require('vue');
const vuex = require('vuex');
const {getImage} = require('../person-image/service');

const classImages = [
    require('./class-images/1.jpg'),
    require('./class-images/2.jpg'),
    require('./class-images/3.jpg'),
    require('./class-images/4.jpg'),
    require('./class-images/5.jpg'),
    require('./class-images/6.jpg')
]

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
		classesDict: function () {
			return this.classes.reduce((a, b) => {
				a[b.id] = b;
				return a;
			}, {});
		},
		flatStudentsList: function () {
			const list = [];

			this.students.forEach(person => {
				const item = Object.assign({}, person);
				const personclass = this.classesDict[person.class] || {};

				item.role = this.roles[person.role];
				item.status = this.statuses[person.status];

				item.school = personclass.school;
				item.grade = personclass.grade;
				item.city = personclass.city;

				list.push(item);

			})

			return list;
		}
	},
	filters: {

	},
	ready() {

		const getPerson = per => {
			return {
                type : "person",
				id: per.id,
				text: {
					name: per.first_name + ' ' + per.surname,
					contact: per.email,
					phone: per.phone,
					title: per.role,
                },
                image : getImage(per)
			}
		}

		const administrator = this.flatStudentsList.find(x => x.role === 'administrator');
		let nodeStructure = Object.assign({}, getPerson(administrator), {
			children: []
		});

		this.flatStudentsList.filter(x => x.role === 'teacher').forEach(teacher => {
			nodeStructure.children.push(Object.assign({}, getPerson(teacher), {
				children: [],
				stackChildren: true
			}));
		});

		this.classes.forEach((cls,index) => {
			nodeStructure.children.find(i => cls.teacher === i.id).children.push(
				Object.assign({}, {
                    text:{
                        city : cls.city,
                        grade: cls.grade,
                        school : cls.school
                    },
                    image : classImages[index]
                }, {
					children: this.flatStudentsList.filter(x => x.role === 'student' && x.class === cls.id).map(getPerson),
					stackChildren: true
				})
			);
		});
	
		var chart_config = {
			chart: {
				container: "#basic-example",

				connectors: {
					type: 'step'
				},
				node: {
					HTMLclass: 'nodeExample1'
				}
			},
			nodeStructure: nodeStructure
	
		};

		new Treant(chart_config);
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
