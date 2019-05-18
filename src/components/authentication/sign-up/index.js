/*
Draws connector lines between passages.
*/
const Vue = require('vue');
const vuex = require('vuex');
const moment = require('moment');
const {signUpWithEmailAndPassword} = require('../../../common/auth');
const {setCurrentUser} = require('../../../data/actions/auth');
const {createStudent} = require('../../../data/actions/student');
const {showMessage} = require('../../../components/snackbar/snackbar')
require('./index.less');


module.exports = Vue.extend({
	template: require('./index.html'),

	props: {
	},
	data: {
		firstName: '',
        surname : '',
		password : '',
		email: '',
		birthDate : '',
		phone: ''
	},
	methods: {
        async signUpDelegate(){
            try{
				let b = moment(this.birthDate, 'dd/mm/yyy');

				const personData = {
					first_name: this.firstName,
					surname: this.surname,
					birth_date: b.toDate(),
					email: this.email,
					phone: this.phone,
					role: 4,
					password : this.password
					//class: this.insert_class,
					//profile_img: this.insert_profile_img_stream
				};
	
			//	const result = await signUpWithEmailAndPassword(this.email, this.password);

				this.createStudent(personData);
				
			//	this.setCurrentUser(result);
				
			}catch (error){
				showMessage(error.message);
			}
        
        }
	},
	computed: {
		isDisabled(){
			return Array.from(document.querySelectorAll('[form-required]')).filter(x=>!x.validity.valid || x.value ==='').length>0;
		}

	},
	filters: {

	},
	ready() {
	
	},

	vuex: {
		actions: {setCurrentUser, createStudent},

	}

});
