const actions = module.exports = {
	createClass(store, props) {
		store.dispatch('CREATE_CLASS', props.data || props);
	},
	linkLesson(store, props) {
		const normalizedProps = Object.assign({}, props.class);

		if (normalizedProps.lessons) {
			normalizedProps.lessons.push(props.lessonId);
		}
		else {
			normalizedProps.lessons = [props.lessonId];
		}

		store.dispatch('UPDATE_CLASS', normalizedProps.id, normalizedProps);
	},
	loadClasses(store, props) {
		store.dispatch('SET_CLASSES', props.data || props)
	},
};
