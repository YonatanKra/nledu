/*
Draws connector lines between passages.
*/
const Vue = require('vue');
const vuex = require('vuex');
const $ = require('jquery');
const {upload} = require('../../common/servicePathes');
const {uploadImage} = require('../../common/fileUploader');
const uuid = require('tiny-uuid');

 

require('./froala_editor.min.js');
require('./froala_editor.min.less');


require('./froala_style.min.less');

require('froala-editor/js/plugins/align.min.js');
require('froala-editor/js/plugins/char_counter.min.js');
require('froala-editor/css/plugins/char_counter.min.css');
//require('froala-editor/js/plugins/code_beautifier.min.js');
//require('froala-editor/js/plugins/code_view.min.js');
require('froala-editor/js/plugins/colors.min.js');
require('froala-editor/css/plugins/colors.min.css');
require('froala-editor/js/plugins/draggable.min.js');
require('froala-editor/css/plugins/draggable.min.css');
require('froala-editor/js/third_party/embedly.min.js');
require('froala-editor/css/third_party/embedly.min.css');
require('froala-editor/js/plugins/emoticons.min.js');
require('froala-editor/css/plugins/emoticons.min.css');
require('froala-editor/js/plugins/entities.min.js');
require('froala-editor/js/plugins/file.min.js');
require('froala-editor/css/plugins/file.min.css');
//require('froala-editor/js/plugins/font_awesome.min.js');
require('froala-editor/js/plugins/font_family.min.js');
require('froala-editor/js/plugins/font_size.min.js');
require('froala-editor/js/plugins/fullscreen.min.js');
require('froala-editor/css/plugins/fullscreen.min.css');
require('froala-editor/js/plugins/image.min.js');
require('froala-editor/css/plugins/image.min.css');
require('froala-editor/js/plugins/image_manager.min.js');
require('froala-editor/css/plugins/image_manager.min.css');
require('froala-editor/js/third_party/image_tui.min.js');
require('froala-editor/css/third_party/image_tui.min.css');
require('froala-editor/js/plugins/inline_class.min.js');
require('froala-editor/js/plugins/inline_style.min.js');
require('froala-editor/js/plugins/line_breaker.min.js');
require('froala-editor/css/plugins/line_breaker.min.css');
require('froala-editor/js/plugins/line_height.min.js');
require('froala-editor/js/plugins/link.min.js');
require('froala-editor/js/plugins/lists.min.js');
require('froala-editor/js/plugins/paragraph_format.min.js');
require('froala-editor/js/plugins/paragraph_style.min.js');
require('froala-editor/js/plugins/print.min.js');
require('froala-editor/js/plugins/quick_insert.min.js');
require('froala-editor/css/plugins/quick_insert.min.css');
require('froala-editor/js/plugins/quote.min.js');
require('froala-editor/js/plugins/save.min.js');
require('froala-editor/js/plugins/special_characters.min.js');
require('froala-editor/css/plugins/special_characters.min.css');
//require('froala-editor/js/third_party/spell_checker.min.js');
//require('froala-editor/css/third_party/spell_checker.min.css');
require('froala-editor/js/plugins/table.min.js');
require('froala-editor/css/plugins/table.min.css');
require('froala-editor/js/plugins/url.min.js');
require('froala-editor/js/plugins/video.min.js');
require('froala-editor/css/plugins/video.min.css');
require('froala-editor/js/plugins/word_paste.min.js');



require('./index.less');

const TOOLBAR_BUTTONS = ["fullscreen", "bold", "italic", "underline", "strikeThrough", "subscript", "superscript", "|", "fontFamily", "fontSize", "color", "inlineClass", "inlineStyle", "paragraphStyle", "lineHeight", "|", "paragraphFormat", "align", "formatOL", "formatUL", "outdent", "indent", "quote", "-", "insertLink", "insertImage", "insertVideo", "embedly", "insertFile", "insertTable", "|", "emoticons", "fontAwesome", "specialCharacters", "insertHR", "selectAll", "clearFormatting", "|", "print", "getPDF", "spellChecker", "help", "html", "|", "undo", "redo"];


module.exports = Vue.extend({
	template: require('./index.html'),

	props: ['options', 'text', 'identifier'],

	data: {

	},
	methods: {

	},

	watch: {
		text() {
			// Only change CodeMirror if it's actually a meaningful change,
			// e.g. not the result of CodeMirror itself changing.

			if (this.text !== this.$froala.froalaEditor('html.get', true)) {
				this.$froala.froalaEditor('html.set', (this.text || '') + '');

			}
		},
	},

	compiled() {



	},

	computed: {


	},
	filters: {

	},
	ready() {
		this.$froala = $('.wysiwyg textarea');
		this.$froala.froalaEditor({
			toolbarButtons: TOOLBAR_BUTTONS


		});


		this.$froala.froalaEditor('html.set', (this.text || '') + '');




		this.$froala.on('froalaEditor.contentChanged', (e, editor) => {
			// Do something here.

			this.text = this.$froala.froalaEditor('html.get', true);
			this.$dispatch('f-change', this.text);
		});


		this.$froala.froalaEditor({
				// Set the image upload parameter.
				imageUploadParam: 'image_param',

				// Set the image upload URL.
				imageUploadURL: upload.uploadImage,

				// Additional upload params.
				imageUploadParams: {
					id: 'my_editor'
				},

				// Set request type.
				imageUploadMethod: 'POST',

				// Set max image size to 3MB.
				imageMaxSize: 3 * 1024 * 1024,

				// Allow to upload PNG and JPG.
				imageAllowedTypes: ['jpeg', 'jpg', 'png']
			})
			.on('froalaEditor.image.beforeUpload',  (e, editor, images)=> {
				const reader = new FileReader();
				const image = images[0];
				const identifier = this.identifier;
				
				reader.onloadend = async () => {
					const imageDataURL = reader.result;
					const fileType = image.type.split('/')[1];
					const path = 'images/stories/' + (identifier? (identifier + '/'):'') + uuid() + '.' + fileType;

					const result = await uploadImage(path, imageDataURL);

					const newPath  = 'https://firebasestorage.googleapis.com/v0' + result.metadata.ref.location.fullServerUrl()+'?alt=media';
					editor.image.insert(newPath);
				}

				reader.readAsDataURL(image); //reads the data as a URL

                return false;
				// Return false if you want to stop the image upload.
			})
			.on('froalaEditor.image.uploaded', function (e, editor, response) {
				debugger;
				// Image was uploaded to the server.
			})
			.on('froalaEditor.image.inserted', function (e, editor, $img, response) {
				debugger;
				// Image was inserted in the editor.
			})
			.on('froalaEditor.image.replaced', function (e, editor, $img, response) {
				debugger;
				// Image was replaced in the editor.
			})
			.on('froalaEditor.image.error', function (e, editor, error, response) {
				debugger;
				// Bad link.
				if (error.code == 1) {

				}

				// No link in upload response.
				else if (error.code == 2) {

				}

				// Error during image upload.
				else if (error.code == 3) {

				}

				// Parsing response failed.
				else if (error.code == 4) {

				}

				// Image too text-large.
				else if (error.code == 5) {

				}

				// Invalid image type.
				else if (error.code == 6) {

				}

				// Image can be uploaded only to same domain in IE 8 and IE 9.
				else if (error.code == 7) {

				}

				// Response contains the original server response to the request if available.
			});







	},

	vuex: {
		actions: {},

		getters: {

		}
	}

});
