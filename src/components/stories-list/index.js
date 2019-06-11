/*
Draws connector lines between passages.
*/
const Vue = require('vue');
const vuex = require('vuex');
const Sortable = require('sortablejs');

require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {
		storiesList: [],
		listType: '',
		excludedStoriesList: [],
		allowDrag: false,
		allowClick: false
	},
	data: {

	},
	methods: {
		play(story) {
			if(this.allowClick){
				window.open(
					'#/home/stories/' + story.id + '/play',
					'twinestory_play_' + story.id
				);
			}
		
		},
	},
	computed: {


	},
	filters: {
		storiesInLesson() {
			return (this.storiesList) ?
				this.storiesList.map(s => Object.assign({}, this.stories.find(ss => s.story_id === ss.id), {
					order: s.order
				})) :
				this.stories;
		},
		excludedStories(stories){
			return (this.excludedStoriesList && this.excludedStoriesList.length) ?
			this.stories.filter(s=>  this.excludedStoriesList.filter(m=>m.story_id===s.id).length===0 )
			:stories
		}
	},
	ready() {
		if (this.allowDrag) {
			var element = this.$el.querySelector('.stories-list .mdl-list');

			Sortable.create(element, {
				animation: 150,
				ghostClass: 'mdl-shadow--2dp',
				sort: this.listType === 'to' ? true : false,
				group: 'shared',
				onSort: evt => {
					if (this.storiesList) {
						this.storiesList.forEach((story, i) => delete this.storiesList[i]);
						this.storiesList.length = 0;

						Array.from(evt.srcElement.children).map((x, y) => {
							return Object.assign({}, {
								story_id: x.getAttribute('data-story-id'),
								order: y
							});
						}).forEach((story, i) => this.storiesList[i] = (story));
					}
				}
			});
		}
	},

	components: {

	},

	vuex: {
		actions: {},

		getters: {
			stories: state => state.story.stories,
		}
	}

});
