// The side toolbar of a story list.

const Vue = require('vue');
const AboutDialog = require('../../dialogs/about');
const FormatsDialog = require('../../dialogs/formats');
const ImportDialog = require('../../dialogs/story-import');
const { createStory } = require('../../data/actions/story');
const locale = require('../../locale');
const { prompt } = require('../../dialogs/prompt');
const { publishArchive } = require('../../data/publish');
const saveFile = require('../../file/save');
const {createStudent} = require('../../data/actions/student');
const {createClass} = require('../../data/actions/class');
const store = require('../../data/store');

module.exports = Vue.extend({
	template: require('./index.html'),

	methods: {
		createStoryPrompt(e) {
			// Prompt for the new story name.

			prompt({
				message: locale.say(
					'What should your story be named?<br>(You can change this later.)'
				),
				buttonLabel: '<i class="fa fa-plus"></i> ' + locale.say('Add'),
				buttonClass: 'create',
				validator: name => {
					if (this.existingStories.find(
							story => story.name === name
						)) {
						return locale.say(
							'A story with this name already exists.'
						);
					}
				},

				origin: e.target
			}).then(name => {
				this.createStory({ name });

				/* Allow the appearance animation to complete. */

				window.setTimeout(() => {
					this.$dispatch(
						'story-edit',
						this.existingStories.find(
							story => story.name === name
						).id
					);
				}, 300);
			});
		},

		createStudentPrompt(e) {
			prompt({
				message: locale.say(
					'תלמיד חדש'
				),
				buttonLabel: '<i class="fa fa-plus"> ' + locale.say('הוסף'),
				buttonClass: 'create',
				origin: e.target,
				customClass: 'rtl',
				fields: [
					{
						label: 'שם',
						type: 'text',
						name: 'name'
					},
					{
						label: 'כיתה',
						type: 'select',
						name: 'class',
						options: store.state.class.classes
					},
					{
						label: 'E-mail',
						type: 'text',
						name: 'email'
					}
				],
				validator: data => {
					if (data && data.class) {
						return true;
					}

					return 'אנא מלא את כל השדות';
				}
			}).then(data => {
				const studentData = {email: data.email, name: data.name, class: data.class.id};
				this.createStudent(studentData);
			});
		},

		createClassPrompt(e) {
			prompt({
				message: locale.say(
					'כיתה חדשה'
				),
				buttonLabel: '<i class="fa fa-plus"> ' + locale.say('הוסף'),
				buttonClass: 'create',
				origin: e.target,
				customClass: 'rtl',
				fields: [
					{
						label: 'בית ספר',
						type: 'text',
						name: 'school'
					},
					{
						label: 'שכבת גיל',
						type: 'text',
						name: 'class'
					},
					{
						label: 'יישוב',
						type: 'text',
						name: 'town'
					}
				],
				validator: data => data
			}).then(data => {
				this.createClass({data});
			});
		},

		importFile(e) {
			new ImportDialog({
				store: this.$store,
				data: { origin: e.target }
			}).$mountTo(document.body);
		},

		saveArchive() {
			const timestamp = new Date().toLocaleString().replace(/[\/:\\]/g, '.');

			saveFile(
				publishArchive(this.existingStories, this.appInfo),
				`${timestamp} ${locale.say('Twine Archive.html')}`
			);
		},

		showAbout(e) {
			new AboutDialog({
				store: this.$store,
				data: { origin: e.target }
			}).$mountTo(document.body);
		},

		showFormats(e) {
			new FormatsDialog({
				store: this.$store,
				data: { origin: e.target }
			}).$mountTo(document.body);
		},

		showHelp() {
			window.open('https://twinery.org/2guide');
		},

		showLocale() {
			window.location.hash = 'locale';
		}
	},

	components: {
		'quota-gauge': require('../../ui/quota-gauge'),
		'theme-switcher': require('./theme-switcher')
	},

	vuex: {
		actions: {
			createStory,
			createStudent,
			createClass
		},

		getters: {
			appInfo: state => state.appInfo,
			existingStories: state => state.story.stories
		}
	}
});
