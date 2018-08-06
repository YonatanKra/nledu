/* An editor for adding and removing tags from a passage. */

const Vue = require('vue');
const { updatePassage } = require('../../../data/actions/passage');
const uniq = require('lodash.uniq');

module.exports = Vue.extend({
	data: () => ({
		newVisible: false
	}),

	computed: {
		assets() {
			return [
			    { 
			        "type":"videos", 
			        "options": [{
			                        "name":"Types of Chemical Reactions", 
			                        "link":'<iframe width="400" height="300" src="https://www.youtube.com/embed/M96tUDiZ5DQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'
			                    }]
			    },
			    { 
			        "type":"articles", 
			        "options": [{
			                        "name":"laboratory rules and safety", 
			                        "link":'<a href="https://sites.google.com/a/ualberta.ca/organic-chemistry-laboratory-website/home/laboratory-rules-and-safety">laboratory rules and safety</a>'
			                    },
			                    {
			                        "name":"modern art ideas", 
			                        "link":'<a href="https://www.coursera.org/learn/modern-art-ideas">modern art ideas</a>'
			                    },
			                    {
			                        "name":"modern art", 
			                        "link":'<a href="https://en.wikipedia.org/wiki/Modern_art">modern art</a>'
			                    }]
			    },
			    { 
			        "type":"pictures", 
			        "options": [{
			                        "name":"Periodic Table", 
			                        "link":'<img width="800" height="600" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Simple_Periodic_Table_Chart-en.svg/1200px-Simple_Periodic_Table_Chart-en.svg.png"></img>'
			                    },
			                    {
			                        "name":"starry night", 
			                        "link":'<img width="800" height="600" src="https://d3f1iyfxxz8i1e.cloudfront.net/courses/course_image/28feb7a52009.png"></img>'
			                    },
			                    {
			                        "name":"the scream", 
			                        "link":'<img width="800" height="600" src="https://www.highbrowmagazine.com/sites/default/files/styles/large/public/field/image/mediumthescream.jpg?itok=B0MWyxWX"></img>'
			                    }]
			    },
			    { 
			        "type":"passages", 
			        "options": []
			    },
			    { 
			        "type":"games", 
			        "options": []
			    }
			]
		}
	},

	props: {
		passage: {
			type: Object,
			required: true
		},
		storyId: {
			type: String,
			required: true
		}
	},

	template: require('./index.html'),

	methods: {
		showNew() {
			this.newVisible = true;
			this.$nextTick(() => this.$els.newName.focus());
		},

		hideNew() {
			this.newVisible = false;
		}
	},

	vuex: {
		getters: {
			allStories: state => state.story.stories
		},
		actions: { updatePassage }
	},

	components: {
		'assets-menu': require('./asset-menu')
	}
});