/*
Draws connector lines between passages.
*/
const Vue = require('vue');
const vuex = require('vuex');
const uuid = require('tiny-uuid');
const  storagePath = require('../../../../common/servicePathes').storage

require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {


	},
	data: () => ({
		obj: {
			name: '',
			description: '',
			path: '',
			stories: [],
			goals: [],
			imageDataURL: '',
			status: 4,
		},
	}),
	methods: {
		uploadImageChange() {
			const preview = this.$el.querySelector('.upload-story-image');
			const file = this.$el.querySelector('.upload-story-image-file').files[0];

			const reader = new FileReader();

			reader.onloadend = () => {
				this.obj.imageDataURL = reader.result;
				this.obj.path = uuid();
				preview.src = reader.result;
			}

			if (file) {
				reader.readAsDataURL(file); //reads the data as a URL
			} else {
				preview.src = "";
				this.obj.imageDataURL = "";
				this.obj.path = "";
			}
		},
		uploadImage() {
			document.querySelector('.upload-story-image-file').click();
		}
	},
	computed: {


	},
	filters: {

	},
	ready() {
		if (this.obj && this.obj.path) {
			const preview = this.$el.querySelector('.upload-story-image');

			var newImg = new Image;
			newImg.onload = function () {
				preview.src = this.src;
			}

			const path = 'images/lessons/' + this.obj.id + '/' + this.obj.path + '.png';
			newImg.src = storagePath.storageURL +  encodeURIComponent(path) + storagePath.imageSuffix;
		}
	},

	components: {
		'stories-list-builder': require('./stories-list-builder'),
		'goals-list': require('../../../goals-list'),
		'status-selector' : require('../../../status-selector')
	},

	vuex: {
		actions: {},

		getters: {
			stories: state => state.story.stories,
		}
	}

});
