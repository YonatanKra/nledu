const Vue = require('vue');
const vuex = require('vuex');
const moment = require('moment');
const {selectEdit} = require('../../../data/local-storage/story');
const {
	postMessage
} = require('../../../data/actions/message');


require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),
	props: {
		editItem: {
			type: Object,
			required: true
        }
	},
	data: {

	},

	methods: {
        async select() {
            await selectEdit(this.editItem.id,this.editItem.passage);
            this.$parent.editsList.forEach(f=>f.status = 2);
            this.editItem.status = 1;
            
            const itemKey = 'twine-passages-' + this.editItem.passage;
            const p = JSON.parse(localStorage.getItem(itemKey))
            p.text = this.editItem.textHTML;
          
            localStorage.setItem(itemKey, JSON.stringify(p));

            const lp = this.stories.find(s=>s.id===this.editItem.story).passages.find(p=>p.id===this.editItem.passage)
            lp.text = this.editItem.textHTML;
		},
	
	},
	computed: {
		subSubjects: function () {
			return [];
        },
        modified : function(){
            return moment(this.editItem.modified).fromNow();
        },
        person : function(){
            const per = this.students.find(x=>x.id===this.editItem.person);

            if (per){
                return per.first_name + per.surname;
            }else{
                return ''
            }

        }
	
	},
	filters: {
		momentFormat: function (date) {
			return moment(date).fromNow();
		}
	},
	async ready() {
       
        this.$el.querySelector('.viewport').innerHTML = this.editItem.textHTML;
        
        

    },
	components: {
		//	'contact-list': require('./contact-list'),
	},

	vuex: {
		actions: {
			postMessage
		},

		getters: {
			students: state => state.student.students,
			roles: state => state.role.roles,
			statuses: state => state.status.statuses,
			cities: state => state.city.cities,
			classes: state => state.class.classes,
			currentUser: state => state.auth.currentUser,
            messages: state => state.message.messages,
            stories: state => state.story.stories,
		}
	}
});
