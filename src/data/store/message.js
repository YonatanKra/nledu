const messageStore = module.exports = {
	state: {
		messages: [],
		isLoading : false
	},
	mutations: {
		POST_MESSAGE(state, message) {
            if(message && message.id){
                state.messages.push(message);
            }
		},
		FETCH_MESSAGES(state, messages) {
			state.messages = Object.values(messages);
		},
		MARK_AS_READ(state, id) {
			let message = state.messages.find(mes => mes.id === id);

			Object.assign(message, {read : true});
        },
        MARK_AS_DONE(state, id) {
			let message = state.messages.find(mes => mes.id === id);

			Object.assign(message, {isDone : true});
		},
		SET_IS_LOADING_OFF(state) {
			state.isLoading = false;
		},
		SET_IS_LOADING_ON(state) {
			state.isLoading = true;
		},
	}
};