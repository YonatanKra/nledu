const Vue = require('vue');
const uuid = require('tiny-uuid');

require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: ['items', 'itemName', 'itemValue', 'selected', 'selectedItem', 'position'],
	data: {
        componentId : '',
      
    },
    
    
    created: function() {
        this.componentId  =  uuid();

        const noneObject = {        }
        noneObject[this.itemValue] = 0;
        noneObject[this.itemName] = 'None';

        this.items.push(noneObject);
        this.selectedItem = noneObject;
        this.selected = noneObject[this.itemValue];

        if(!this.position){
            this.position = 'top-left'
        }

    },
	methods: {
		select: function (item , event) {
			event.currentTarget.parentElement.querySelectorAll('.mdl-menu__item').forEach(element => {
				element.classList.remove('selected');
			});
			event.currentTarget.classList.toggle('selected');

            this.selectedItem = item;
            this.selected =  this.selectedItem[this.itemValue];
		}
	},
	computed: {


	},
	filters: {

	},
	ready() {
 
	}

});
