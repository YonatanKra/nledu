// The main app running the show.

'use strict';
const Vue = require('vue');
const ui = require('../../ui');
const WOW = require('wow.js');
require('wow.js/css/libs/animate.css');
const { repairFormats } = require('../../data/actions/story-format');
const { repairStories } = require('../../data/actions/story');
const { handleOnAuthStateChanged } = require('../../data/actions/auth');
const store = require('../../data/store');

module.exports = Vue.extend({
	template: `<div>
	<loading v-if="currentSemaphore>0"></loading>
	<router-view v-if="currentUser && currentSemaphore===0"></router-view>
	<sign-in-view v-if="!currentUser"></sign-in-view>
	<snackbar></snackbar></div>`,

	components: {
		'snackbar': require('../../components/snackbar'),
		'loading': require('../../components/loading'),
		'sign-in-view': require('../../components/authentication/sign-in-view')
	},
	ready() {
		this.handleOnAuthStateChanged()
		ui.init();
		this.repairFormats();
		this.repairStories();
		document.body.classList.add(`theme-${this.themePref}`);
		new WOW().init();
		componentHandler.upgradeDom();
	/*	var wow = new WOW(
			{
			  boxClass:     'wow',      // animated element css class (default is wow)
			  animateClass: 'animated', // animation css class (default is animated)
			  offset:       0,          // distance to the element when triggering the animation (default is 0)
			  mobile:       true,       // trigger animations on mobile devices (default is true)
			  live:         true,       // act on asynchronously loaded content (default is true)
			  callback:     function(box) {
				// the callback is fired every time an animation is started
				// the argument that is passed in is the DOM node being animated
			  },
			  scrollContainer: null,    // optional scroll container selector, otherwise use window,
			  resetAnimation: true,     // reset animation on end (default is true)
			}
		  );
		  wow.init();*/


	},

	watch: {
		themePref(value, oldValue) {
			document.body.classList.remove(`theme-${oldValue}`);
			document.body.classList.add(`theme-${value}`);
		}
	},

	vuex: {
		actions: { repairFormats, repairStories,handleOnAuthStateChanged },
		getters: {
			themePref: state => state.pref.appTheme,
			currentUser: state => state.auth.currentUser,
			currentSemaphore : state=> state.loading.currentSemaphore
		}
	},

	store
});
