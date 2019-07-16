/*
This emulates the persistence strategy used by Backbone's local storage adapter
as a Vuex middleware. This uses this basic pattern:

twine-[datakey]: a comma separated list of IDs
twine-[datakey]-[uuid]: JSON formatted data for that object

This pattern is emulated, even with structures (like prefs) that don't need
this, for compatibility.
*/


const pref = require('./pref');
const story = require('./story');
const storyFormat = require('./story-format');
const student = require('./student');
const role = require('./role');
const auth = require('./auth');
const city = require('./city');
const message = require('./message');
const assignment = require('./assignment');
const status = require('./status');
const subject = require('./subject');
const schoolClass = require('./class');
const lesson = require('./lessons');
const assetType = require('./assetType');
const goal = require('./goal');
const asset = require('./asset');
const storyComments = require('./story-comments');
const syncer = require('../data-sync');
const progress = require('./progress');

let enabled = true;
let previousStories;

module.exports = store => {
	enabled = false;
	pref.load(store);
	assetType.load(store);
	story.load(store);
	storyFormat.load(store);
	storyComments.load(store);
	status.load(store);
	role.load(store);
	message.load(store);
	city.load(store);
	assignment.load(store);
	student.load(store);
	subject.load(store);
	asset.load(store);
	schoolClass.load(store);
	lesson.load(store);
	goal.load(store);
	progress.load(store);


	previousStories = store.state.story.stories;
	enabled = true;
	syncer.startSync(store);


	store.subscribe((mutation, state) => {
		if (!enabled) {
			return;
		}

		switch (mutation.type) {
			case 'CREATE_STORY':
				story.update(transaction => {

					const storyToSave = state.story.stories.find(
						s => s.name === mutation.payload[0].name
					);


					if (mutation.payload[0].isNew) {
						delete mutation.payload[0].isNew;
						delete storyToSave.isNew;

						story.saveStoryMetaData({
							id: storyToSave.id,
							name: storyToSave.name,
							sub_subject: mutation.payload[0].sub_subject,
							path: mutation.payload[0].path,
							tags: mutation.payload[0].tags,
							description: mutation.payload[0].description,
						})
					}

					story.saveStory(
						transaction,
						storyToSave
					);

				});
				break;
			case 'INIT_PROGRESS':
				debugger;
				progress.updateProgress(store, mutation.payload[0].storyId, mutation.payload[0].passageId, 1);
				break;
			case 'INCREMENT_PROGRESS':
				progress.updateProgress(store, mutation.payload[0].storyId, mutation.payload[0].passageId,
					store.state.progress.progress[mutation.payload[0].storyId][mutation.payload[0].passageId] + 1);
				break;
			case 'SET_PROGRESS':
				break;
			case 'SET_STUDENTS':
				break;
			case 'SET_ROLES':
				break;
			case 'SET_STATUSES':
				break;
			case 'SET_CITIES':
				break;
			case 'SET_SUBJECTS':
				break;
			case 'SET_CLASSES':
				break;
			case 'SET_LESSONS':
				break;
			case 'SET_ASSIGNMENT':
				break;
			case 'SET_GOALS':
				break;
			case 'SET_ASSETS':
				break;
			case 'POST_MESSAGE':
				debugger;
				message.postMessage(store, mutation.payload[0]);
				break;
			case 'MARK_AS_DONE':
				const item = mutation.payload[0].isDone = true;
				message.updateMessage(store, item);
				break;
			case 'FETCH_MESSAGES':
				break;
			case 'SET_ASSETS_TYPES':
				break;
			case 'INCREMENT_SEMAPHORE':
				break;
			case 'DECREMENT_SEMAPHORE':
				break;
			case 'SET_CURRENT_USER':
				if (mutation.payload[0]) {
					auth.set(mutation.payload[0]);
				} else {
					auth.remove();
				}
				//auth.set(store, mutation.payload[0]);
				break;
			case 'CREATE_STUDENT':
				student.createStudent(store, mutation.payload[0])

				break;
			case 'UPDATE_STUDENT':
				student.updateStudent(store, mutation.payload[0])

				break;
			case 'CREATE_LESSON':
				lesson.createLesson(store, mutation.payload[0])

				break;
			case 'CREATE_ASSIGNMENT':
				assignment.createAssignment(store, mutation.payload[0])

				break;
			case 'CREATE_ASSETS':
				asset.createAsset(store, mutation.payload[0])

				break;
			case 'CREATE_GOAL':
				goal.createGoal(store, mutation.payload[0])

				break;
			case 'CREATE_CLASS':
				schoolClass.create(store, mutation.payload[0])
				/*	schoolClass.update(transaction => {
						schoolClass.saveClass(
							transaction,
							state.class.classes.find(
								s => s.school === mutation.payload[0].school &&
									s.class === mutation.payload[0].class &&
									s.town === mutation.payload[0].town
							)
						);
					});*/
				break;

			case 'UPDATE_STORY':
				story.update(transaction => {
					debugger;

					const storyToSave = state.story.stories.find(
						s => s.id === mutation.payload[0]
					)
					story.updateStoryMetaData({
						id: storyToSave.id,
						name: storyToSave.name,
						sub_subject: mutation.payload[1].sub_subject,
						path: mutation.payload[1].path,
						tags: mutation.payload[1].tags,
						description: mutation.payload[1].description,
						status: mutation.payload[1].status
					})

					story.saveStory(
						transaction,
						storyToSave
					);
				});
				break;

			case 'UPDATE_LESSON':

				const lessonToSave = state.lesson.lessons.find(
					s => s.id === mutation.payload[0]
				);

				debugger;

				lesson.updateLesson(store, {
					id: lessonToSave.id,
					name: mutation.payload[1].name,
					description: mutation.payload[1].description,
					goals: mutation.payload[1].goals,
					stories: mutation.payload[1].stories,
					path: mutation.payload[1].path,
					imageDataURL: mutation.payload[1].imageDataURL,
					status: mutation.payload[1].status
				});

				break;


			case 'UPDATE_ASSIGNMENT':

				const assignmentToSave = state.assignment.assignments.find(
					s => s.id === mutation.payload[0]
				);

				assignment.updateAssignment(store, {
					id: assignmentToSave.id,
					status: mutation.payload[1].status,
					end_date: mutation.payload[1].end_date,
					last_update_date: mutation.payload[1].last_update_date
				});

				break;


			case 'UPDATE_CLASS':
				schoolClass.update(transaction => {
					schoolClass.saveClass(
						transaction,
						state.class.classes.find(
							c => c.id === mutation.payload[0]
						)
					)
				});
				break;

			case 'DUPLICATE_STORY':
				story.update(transaction => {
					const dupe = state.story.stories.find(
						s => s.name === mutation.payload[1]
					);

					story.saveStory(transaction, dupe);

					dupe.passages.forEach(
						passage => story.savePassage(transaction, passage)
					);
				});
				break;

			case 'IMPORT_STORY':
				story.update(transaction => {
					const imported = state.story.stories.find(
						s => s.name === mutation.payload[0].name
					);

					story.saveStory(transaction, imported);

					imported.passages.forEach(
						passage => story.savePassage(transaction, passage)
					);
				});
				break;

			case 'DELETE_STORY': {
				/*
				We have to use our last copy of the stories array, because
				by now the deleted story is gone from the state.
				*/

				const toDelete = previousStories.find(
					s => s.id === mutation.payload[0]
				);

				story.update(transaction => {
					/*
					It's our responsibility to delete child passages first.
					*/

					toDelete.passages.forEach(
						passage => story.deletePassage(transaction, passage)
					);

					story.deleteStory(transaction, toDelete);
				});
				break;
			}

			case 'COMMENT_STORY':
				storyComments.save(store);
				break;

				/*
				When saving a passage, we have to make sure to save its parent
				story too, since its lastUpdate property has changed.
				*/

			case 'CREATE_PASSAGE_IN_STORY': {
				const parentStory = state.story.stories.find(
					s => s.id === mutation.payload[0]
				);
				const passage = parentStory.passages.find(
					p => p.name === mutation.payload[1].name
				);

				story.update(transaction => {
					story.saveStory(transaction, parentStory);
					story.savePassage(transaction, passage);
				});
				break;
			}

			case 'UPDATE_PASSAGE_IN_STORY': {
				/* Is this a significant update? */

				if (Object.keys(mutation.payload[2]).some(key => key !== 'selected')) {
					const parentStory = state.story.stories.find(
						s => s.id === mutation.payload[0]
					);
					const passage = parentStory.passages.find(
						p => p.id === mutation.payload[1]
					);

					story.update(transaction => {
						story.saveStory(transaction, parentStory);
						story.savePassage(transaction, passage);
					});
				}
				break;
			}

			case 'DELETE_PASSAGE_IN_STORY': {
				const parentStory = state.story.stories.find(
					s => s.id === mutation.payload[0]
				);

				/*
				We can't dig up the passage in question right now, because
				previousStories is only a shallow copy, and it's gone there at
				this point in time.
				*/

				story.update(transaction => {
					story.saveStory(transaction, parentStory);
					story.deletePassageById(transaction, mutation.payload[1]);
				});
				break;
			}

			case 'UPDATE_PREF':
				pref.save(store);
				break;

			case 'CREATE_FORMAT':
			case 'UPDATE_FORMAT':
			case 'DELETE_FORMAT':
				storyFormat.save(store);
				break;

			case 'LOAD_FORMAT':
				/* This change doesn't need to be persisted. */
				break;

			case 'CREATE_COMMENT':
				storyComments.save(store);
				break;

			default:
				throw new Error(
					`Don't know how to handle mutation ${mutation.type}`
				);
		}

		/*
		We save a copy of the stories structure in aid of deleting, as above.
		*/

		previousStories = state.story.stories;
	});
};
