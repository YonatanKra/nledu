/*
Draws connector lines between passages.
*/
const Vue = require('vue');
const vuex = require('vuex');
const moment = require('moment');

require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {

   
        subjectId: {
			type: Number,
			required: true
        },
        
	},
	data: {

	},
	methods: {
		addLesson() {

		}
	},
	computed: {
		flatList: function () {
			const list = [];

			this.assignments.forEach(assignment => {
				const item = Object.assign({}, assignment);

				item.assignee_name = this.students.filter(s => s.id === assignment.assignee)
					.map(s => s.first_name + ' ' + s.surname)[0];

				item.assigner_name = this.students.filter(s => s.id === assignment.assigner)
					.map(s => s.first_name + ' ' + s.surname)[0]

				item.status_name = this.statuses[assignment.status];

				list.push(item);
			});

            debugger;


            var subjectsssss = Object.values(this.subjects).map(x=>x.sub_subjects).flat().reduce((a,b)=>{
                a[b.sub_subject_id] = b.subject_id;
                            return a;
            },{});

            var ssss = this.stories.map(x=>Object.assign({}, {id:x.id, subject:subjectsssss[x.sub_subject] }))
           var ls =  this.lessons.map(x=>Object.assign({}, {id:x.id, s:x.stories.map(m=>ssss.find(e=>m.story_id===e.id).subject)})).reduce((a,b)=>{
            a[b.id]  =b.s;
            return a
            },{});

            var sssgsd= list.filter(r=>r.assignee ==="bb7980ae-0da1-c985-c2c4-2054c80e75a4").map(l=>l.lessons).flat().filter(l=>ls[l.lesson_id].filter(r=>r===this.subjectId).length)
            return list.filter(l=>sssgsd.filter(t=>t.assignment_id===l.id).length)
			//return list;

		}
	},
	filters: {
		moment: function (date) {
			return date ? moment(date).format('DD/MM/YYYY') : '-';
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

	},

	vuex: {
		actions: {
			//createLesson
		},

		getters: {
			students: state => state.student.students,
			statuses: state => state.status.statuses,
            assignments: state => state.assignment.assignments,
            subjects: state => state.subject.subjects,
            stories: state => state.story.stories,
            lessons: state => state.lesson.lessons,
		}
	}

});
