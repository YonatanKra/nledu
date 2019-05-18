
const loading = module.exports = {
	setLoadingState(store, props) {
		store.dispatch('SET_LOADING', props.data || props)
    },
    incrementSemaphore(store){
        store.dispatch('INCREMENT_SEMAPHORE')
    },
    decrementSemaphore(store){
        store.dispatch('DECREMENT_SEMAPHORE')
    }
};
