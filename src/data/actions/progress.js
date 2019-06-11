
const progress = module.exports = {
loadProgress(store, props) {
		store.dispatch('SET_PROGRESS', props.data || props)
    },
    initProgress(store, props) {
		store.dispatch('INIT_PROGRESS', props.data || props)
    },
    incrementProgress(store, props) {
		store.dispatch('INCREMENT_PROGRESS', props.data || props)
	}
};
