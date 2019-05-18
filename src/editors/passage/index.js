/*
A modal dialog for editing a single passage.
*/

const Vue = require('vue');
const locale = require('../../locale');
const { thenable } = require('../../vue/mixins/thenable');
const { changeLinksInStory, updatePassage } = require('../../data/actions/passage');
const { loadFormat } = require('../../data/actions/story-format');
const { passageDefaults } = require('../../data/store/story');



require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	data: () => ({
		passageId: '',
		storyId: '',
		oldWindowTitle: '',
		userPassageName: '',
		saveError: '',
		origin: null
	}),

	computed: {
		parentStory() {
			return this.allStories.find(story => story.id === this.storyId);
		},

		passage() {
			return this.parentStory.passages.find(
				passage => passage.id === this.passageId
			);
		},

		userPassageNameValid() {
			return !(this.parentStory.passages.some(
				passage => passage.name === this.userPassageName &&
					passage.id !== this.passage.id
			));
		},
		
		autocompletions() {
			return this.parentStory.passages.map(passage => passage.name);
		}
	},

	methods: {
		autocomplete() {

			},

		saveText(text) {
			debugger;
			this.updatePassage(
				this.parentStory.id,
				this.passage.id,
				{ text: text }
			);
		},

		saveTags(tags) {
			this.updatePassage(
				this.parentStory.id,
				this.passage.id,
				{ tags: tags }
			);
		},

		dialogDestroyed() {
			this.$destroy();
		},

		canClose() {
			if (this.userPassageNameValid) {
				if (this.userPassageName !== this.passage.name) {
					this.changeLinksInStory(
						this.parentStory.id,
						this.passage.name,
						this.userPassageName
					);

					this.updatePassage(
						this.parentStory.id,
						this.passage.id,
						{ name: this.userPassageName }
					);
				}

				return true;
			}

			return false;
		}
	},

	ready() {
		this.userPassageName = this.passage.name;

		/* Update the window title. */

		this.oldWindowTitle = document.title;
		document.title = locale.say('Editing \u201c%s\u201d', this.passage.name);


		if (this.$options.storyFormat) {
			this.loadFormat(
				this.$options.storyFormat.name,
				this.$options.storyFormat.version
			).then(format => {
				let modeName = format.name.toLowerCase();

				/* TODO: Resolve this special case with PR #118 */

				if (modeName === 'harlowe') {
					modeName += `-${/^\d+/.exec(format.version)}`;
				}

		
			});
		}

		this.$el.nextElementSibling.classList.toggle('open')
	},

	destroyed() {
		document.title = this.oldWindowTitle;
	},

	components: {
		'modal-dialog': require('../../ui/modal-dialog'),
		'tags-selector' : require('../../components/tags-selector'),
		'froala' : require('../../components/froala'),
		'slide-panel' : require('../../components/slide-panel')
	},

	vuex: {
		actions: {
			changeLinksInStory,
			updatePassage,
			loadFormat
		},

		getters: {
			allStories: state => state.story.stories
		}
	},

	mixins: [thenable]
});
