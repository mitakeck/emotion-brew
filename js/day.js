
window.onload = function(){

	var emotions = {
		"angry": 1,
		"grief": 2,
		"amazement": 3,
		"terror": 4,
		"joy": 5,
		"vigilance": 6,
	};

	var Day = Backbone.Model.extend({
		defaults: {
			"year": undefined,
			"month": undefined,
			"day": undefined,

			"angry": 0,
			"grief": 0,
			"amazement": 0,
			"terror": 0,
			"joy": 0,
			"vigilance": 0,
		},
		initialize: function(args){
			console.debug("initialize: Day");
		}
	});

	var Month = Backbone.Collection.extend({
		model: Day,
	});

	var DayView = Backbone.View.extend({
		tagName: "li",
		className: "day",
		initialize: function(){
			console.debug("initialize: DayView");

			this.d3 = d3.select(this.el);
			console.log(this.d3);

			_.bindAll(this, "render", "frame");

			this.collection.bind("reset", this.frame);
			this.collection.bind("change", this.render);
		},
		render: function(){

		},
		frame: function(){

		},
	});

	var day = new Day();
}