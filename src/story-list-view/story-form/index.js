const Vue = require('vue');
const vuex = require('vuex');
const {
	createStory, updateStory
} = require('../../data/actions/story');


require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {

	},
	data: () => ({
		subject: {},
		obj: {
			sub_subject: '',
			name: '',
			description: '',
			tags: '',
			status: 4,
			id :''
		},
		sbj :{}
	}),
	methods: {
		getData(obj) {
			debugger;
			Object.assign(obj, this.obj, {
				sub_subject_id: this.subject.sub_subject_id
			})
		},

		saveStory() {

			debugger;
		


			const props = {
				name: this.obj.name,
				sub_subject: this.subject.sub_subject_id,
				path: 'pathhhh',
				tags: this.obj.tags,
				description: this.obj.description,
				status: this.obj.status,
				isNew: this.obj.isNew
			};

			if(this.obj.isNew){
				this.createStory(props);
			}else{ 
				this.updateStory(this.obj.id, props);
			}
			

		},
		toggle(data) {
			if (data) {
				const sub_subject = Object.values(this.subjects).map(x=>x.sub_subjects).flat()
				.filter(x=>x.sub_subject_id===data.sub_subject)[0];

				Object.assign(this.obj, data, {isNew : false});

				this.sbj = this.subjects[sub_subject.subject_id];
				this.subject = {
					sub_subject_id: data.sub_subject
				}
			}else{
				this.obj.isNew = true;
				Object.assign(this.obj, {
					sub_subject: '',
					name: '',
					description: '',
					tags: '',
					status: 4,
					id :''
				})
			}

			this.$children.filter(x => x.toggle !== undefined)[0].toggle();

		}
	},
	computed: {


	},
	filters: {

	},
	components: {
		'subjects-selector': require('../../components/subjects-selector'),
		'tags-selector': require('../../components/tags-selector'),
		'status-selector': require('../../components/status-selector'),
		'slide-panel': require('../../components/slide-panel'),
	},
	ready() {
		window.FormModelStoryAPI = {
			getData: this.getData,
			setData: this.setData,
			saveStory: this.saveStory,
			toggle: this.toggle
		};
	},

	vuex: {
		actions: {
			createStory,
			updateStory


		},
		getters: {
			classes: function (state) {
				return state.class.classes;
			},
			subjects: state => state.subject.subjects,

		}
	}

});
