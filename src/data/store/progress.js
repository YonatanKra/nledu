const progressStore = module.exports = {
	state: {
		progress: {}
	},
	mutations: {
		SET_PROGRESS(state, progress) {
			state.progress = progress
        },
    
        INIT_PROGRESS(state, props){
			const {
				storyId,
				passageId,
			} = props;

			state.progress[storyId] = state.progress[storyId] || {};
			state.progress[storyId][passageId] = 1;
        },
		INCREMENT_PROGRESS(state, props) {
			const {
				storyId,
				passageId,
            } = props;
            
            if(state.progress[storyId]){
                state.progress[storyId][passageId]++;
            }else{
                state.progress[storyId] = {};
                state.progress[storyId][passageId] = 1;
            }
		}
	}
};