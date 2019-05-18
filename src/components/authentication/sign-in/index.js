/*
Draws connector lines between passages.
*/
const Vue = require('vue');
const vuex = require('vuex');
const {signInWithEmailAndPassword} = require('../../../common/auth');
const {setCurrentUser} = require('../../../data/actions/auth');

require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {


	},
	data: {
        name : '',
        password : ''
	},
	methods: {
        async signInDelegate(){
            const result = await signInWithEmailAndPassword(this.email, this.password);

            this.setCurrentUser(result);

        }
	},
	computed: {


	},
	filters: {

	},
	ready() {
	
	},

	vuex: {
		actions: {setCurrentUser},

	}

});
