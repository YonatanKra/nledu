/* The router managing the app's views. */

let Vue = require('vue');
const VueRouter = require('vue-router');
const LocaleView = require('../locale/view');
const StoryEditView = require('../story-edit-view');
const StoryListView = require('../story-list-view');
const WelcomeView = require('../welcome');
const HomeView = require('../home');

const {
	loadFormat
} = require('../data/actions/story-format');
const {
	publishStoryWithFormat
} = require('../data/publish');
const replaceUI = require('../ui/replace');
const store = require('../data/store');

Vue.use(VueRouter);

const PersonsManager = require('../components/tools/persons');
const PersonView = require('../components/tools/persons/person');
const AssetsManager = require('../components/tools/assets');
const ClassesManager = require('../components/tools/classes');
const LearnManager = require('../components/tools/learn');
const LessonsManager = require('../components/tools/lessons');
const LessonView = require('../components/tools/lessons/lesson');
const InsightsView = require('../components/tools/insights');
const AssignmentView = require('../components/tools/assignments');
const HomeManager = require('../components/tools/home');
const EditsManager = require('../components/edits-view');

const {startTrack} = require('./sessionTracker');

const UserProfile = {
	template: '<div>Profile</div>'
}
const UserPosts = {
	template: '<div>Posts</div>'
}

let TwineRouter = new VueRouter();

TwineRouter.map({
	/*  We connect routes with no params directly to a component. */

	'/locale': {
		component: LocaleView
	},

	'/welcome': {
		component: WelcomeView
	},

	'/home': {
		component: HomeView,
		subRoutes: {
			'/': {
				component: HomeManager
			},
			'/assets': {
				component: AssetsManager
			},
			'/persons': {
				component: PersonsManager
			},
			'/classes': {
				component: ClassesManager
			},
			'/insights': {
				component: InsightsView
			},
			'/lessons': {
				component: LessonsManager
			},
			'/learn': {
				component: LearnManager
			},
			'/assignment': {
				component: AssignmentView
			},
			'/lessons/:id': {
				component: {
					template: '<lesson-view :lesson-id="id"></lesson-view>',

					components: {
						'lesson-view': LessonView
					},

					data() {
						return {
							id: this.$route.params.id
						};
					}
				},
			},
			'/persons/:id': {
				component: {
					template: '<person-view :person-id="id"></person-view>',

					components: {
						'person-view': PersonView
					},

					data() {
						return {
							id: this.$route.params.id
						};
					}
				},
			},
			'/stories': {
				component: {
					template: '<div><story-list ' +
						':previously-editing="previouslyEditing"></story-list></div>',

					components: {
						'story-list': StoryListView
					},

					data() {
						return {
							previouslyEditing: this.$route.params ?
								this.$route.params.previouslyEditing : ''
						};
					},
				}
			},
			'/stories/:id/edits/:pid': {
				component: {
					template: '<edits-view :story-id="id" :passage-id="pid"></edits-view>',

					components: {
						'edits-view': EditsManager
					},

					data() {
						return {
							id: this.$route.params.id,
							pid: this.$route.params.pid
						};
					}
				},
			},
			'/stories/:id': {
				component: {
					template: '<div><story-edit :story-id="id"></story-edit></div>',

					components: {
						'story-edit': StoryEditView
					},

					data() {
						return {
							id: this.$route.params.id
						};
					}
				},
			},
			'/stories/:id/play': {
				component: {
					ready() {
					
						const state = this.$store.state;
						const story = state.story.stories.find(
							story => story.id === this.$route.params.id
						);
		
						loadFormat(
							this.$store,
							story.storyFormat,
							story.storyFormatVersion
						).then(format => {
							replaceUI(publishStoryWithFormat(
								state.appInfo,
								story,
								format
							));
							startTrack(this.$store, this.$route.params.id);
						});
					}
				}
			},
		
			'/stories/:id/proof': {
				component: {
					ready() {
						const state = this.$store.state;
						const story = state.story.stories.find(
							story => story.id === this.$route.params.id
						);
		
						loadFormat(
							this.$store,
							state.pref.proofingFormat.name,
							state.pref.proofingFormat.version
						).then(format => {
							replaceUI(publishStoryWithFormat(
								state.appInfo,
								story,
								format
							));
						});
					}
				}
			},
		
			'/stories/:id/test': {
				component: {
					ready() {
						const state = this.$store.state;
						const story = state.story.stories.find(
							story => story.id === this.$route.params.id
						);
		
						loadFormat(
							this.$store,
							story.storyFormat,
							story.storyFormatVersion
						).then(format => {
							replaceUI(publishStoryWithFormat(
								state.appInfo,
								story,
								format,
								['debug']
							));
						});
					}
				}
			},
		
			'/stories/:storyId/test/:passageId': {
				component: {
					ready() {
						const state = this.$store.state;
						const story = state.story.stories.find(
							story => story.id === this.$route.params.storyId
						);
		
						loadFormat(
							this.$store,
							story.storyFormat,
							story.storyFormatVersion
						).then(format => {
							replaceUI(publishStoryWithFormat(
								state.appInfo,
								story,
								format,
								['debug'],
								this.$route.params.passageId
							));
						});
					}
				}
			}
		}
	},

	/*
	For routes that take data objects, we create shim components which provide
	appropriate props to the components that do the actual work.
	*/
/*
	'/stories': {
		component: {
			template: '<div><story-list ' +
				':previously-editing="previouslyEditing"></story-list></div>',

			components: {
				'story-list': StoryListView
			},

			data() {
				return {
					previouslyEditing: this.$route.params ?
						this.$route.params.previouslyEditing : ''
				};
			},
		}
	},

	'/stories/:id': {
		component: {
			template: '<div><story-edit :story-id="id"></story-edit></div>',

			components: {
				'story-edit': StoryEditView
			},

			data() {
				return {
					id: this.$route.params.id
				};
			}
		},
	},*/

	/*
	These routes require special handling, because we tear down our UI when
	they activate.
	*/
/*
	'/stories/:id/play': {
		component: {
			ready() {
				const state = this.$store.state;
				const story = state.story.stories.find(
					story => story.id === this.$route.params.id
				);

				loadFormat(
					this.$store,
					story.storyFormat,
					story.storyFormatVersion
				).then(format => {
					replaceUI(publishStoryWithFormat(
						state.appInfo,
						story,
						format
					));
				});
			}
		}
	},

	'/stories/:id/proof': {
		component: {
			ready() {
				const state = this.$store.state;
				const story = state.story.stories.find(
					story => story.id === this.$route.params.id
				);

				loadFormat(
					this.$store,
					state.pref.proofingFormat.name,
					state.pref.proofingFormat.version
				).then(format => {
					replaceUI(publishStoryWithFormat(
						state.appInfo,
						story,
						format
					));
				});
			}
		}
	},

	'/stories/:id/test': {
		component: {
			ready() {
				const state = this.$store.state;
				const story = state.story.stories.find(
					story => story.id === this.$route.params.id
				);

				loadFormat(
					this.$store,
					story.storyFormat,
					story.storyFormatVersion
				).then(format => {
					replaceUI(publishStoryWithFormat(
						state.appInfo,
						story,
						format,
						['debug']
					));
				});
			}
		}
	},

	'/stories/:storyId/test/:passageId': {
		component: {
			ready() {
				const state = this.$store.state;
				const story = state.story.stories.find(
					story => story.id === this.$route.params.storyId
				);

				loadFormat(
					this.$store,
					story.storyFormat,
					story.storyFormatVersion
				).then(format => {
					replaceUI(publishStoryWithFormat(
						state.appInfo,
						story,
						format,
						['debug'],
						this.$route.params.passageId
					));
				});
			}
		}
	}*/
});

/* By default, show the story list. */

TwineRouter.redirect({
	'*': '/home/persons'
});

TwineRouter.beforeEach(transition => {
	/*
	If we are moving from an edit view to a list view, give the list view the
	story that we were previously editing, so that it can display a zooming
	transition back to the story.
	*/

	if(transition.to.path.indexOf('/stories') === 0){
		transition.redirect(transition.to.path.replace('/stories','/home/stories'));
	}

	if (transition.from.path && transition.to.path === '/stories') {
		const editingId =
			transition.from.path.match('^/stories/([^\/]+)$');

		if (editingId) {
			transition.to.params.previouslyEditing = editingId[1];
		}
	}

	/*
	If the user has never used the app before, point them to the welcome view
	first. This has to come below any other logic, as calling transition.next()
	or redirect() will stop any other logic in the function.
	*/

	const welcomeSeen = store.state.pref.welcomeSeen;

	if (transition.to.path === '/welcome' || welcomeSeen) {
		transition.next();
	} else {
		transition.redirect('/welcome');
	}
});

module.exports = TwineRouter;
