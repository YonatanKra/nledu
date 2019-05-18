const {getCurrentUser, registerToOnAuthStateChanged} = require('../../common/auth');

const auth = module.exports = {
	setCurrentUser(store, props){
		const normalizedProps = Object.assign({currentUser : getCurrentUser()}, props.data || props);
		store.dispatch('SET_CURRENT_USER',normalizedProps);
	},
	handleOnAuthStateChanged(store, props){
		registerToOnAuthStateChanged(user=>{
			store.dispatch('SET_CURRENT_USER',user);
		},()=>{
			store.dispatch('SET_CURRENT_USER',null);
		})
	}
};
