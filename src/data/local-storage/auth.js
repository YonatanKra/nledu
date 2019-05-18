
const auth = module.exports = {
	set(authUser) {
        window.localStorage.setItem('authUser', JSON.stringify(authUser));
    },
    remove(){
        window.localStorage.removeItem('authUser');
    },
    get(){
        return  JSON.parse( window.localStorage.getItem('authUser'));
    }
};
