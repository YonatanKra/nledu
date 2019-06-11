/*
Draws connector lines between passages.
*/
const Vue = require('vue');
const vuex = require('vuex');

const d3 = require('d3');
const cloud = require('d3-cloud');

const colors =  ["rgb(244, 67, 54)", "rgb(233, 30, 99)", "rgb(156, 39, 176)", "rgb(103, 58, 183)", "rgb(63, 81, 181)", "rgb(33, 150, 243)", "rgb(3, 169, 244)", "rgb(0, 188, 212)", "rgb(0, 150, 136)", "rgb(76, 175, 80)", "rgb(139, 195, 74)", "rgb(205, 220, 57)", "rgb(255, 235, 59)", "rgb(255, 193, 7)", "rgb(255, 152, 0)", "rgb(255, 87, 34)", "rgb(121, 85, 72)", "rgb(158, 158, 158)", "rgb(96, 125, 139)"];


require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),
    
	props: {
        items : Array,
	},
	methods: {

	},
	computed: {

	},
	filters: {
	
	},
	ready() {
        const elem = this.$el;
        function draw(words) {
            d3.select(elem).append("svg")
                .attr("width", layout.size()[0])
                .attr("height", layout.size()[1])
              .append("g")
                .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
              .selectAll("text")
                .data(words)
              .enter().append("text")
                .style("font-size", function(d) { return d.size + "px"; })
                .style("font-family", "Impact")
                .style("fill",function(d){
                    return colors[ parseInt(Math.random()*colors.length)];
                })
                .attr("text-anchor", "middle")
                .attr("transform", function(d) {
                  return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; });
          }

      var layout = cloud()
    .size([500, 500])
    .words((this.items || []).map(function(d) {
      return {text: d, size: 10 + Math.random() * 90, test: "haha"};
    }))
    .padding(5)
    .rotate(function() { return ~~(Math.random() * 2) * 90; })
    .font("Impact")
    .fontSize(function(d) { return d.size; })
    .on("end", draw);

layout.start();

	},

	components: {

	//	'progress-story-indicator': require('./progress-story-indicator'),
	},

	vuex: {
		actions: {
			//createLesson
		},

		getters: {
     //       lessons: state => state.lesson.lessons,

		}
	}

});
