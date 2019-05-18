const loadingStore = module.exports = {
	state: {
		showLoading: false,
		currentSemaphore: 0
	},
	mutations: {
		SET_LOADING(state, showLoading) {
			state.showLoading = showLoading
		},
		INCREMENT_SEMAPHORE(state) {
			state.currentSemaphore++;
		},
		DECREMENT_SEMAPHORE(state) {
			state.currentSemaphore--;
		}
	}
};