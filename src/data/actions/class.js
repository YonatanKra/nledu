const actions = module.exports = {
	createClass(store, props) {
		const normalizedProps = Object.assign({}, props.data || props);

		store.dispatch('CREATE_CLASS', normalizedProps);
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
	}
};
