window.onload = function(){

	var emotionCircleOffsets = {
		"angry": {x:25, y:25},
		"grief": {x:20,y:38},
		"vigilance": {x:25,y:50},
		"joy": {x:55, y:25},
		"terror": {x:60,y:38},
		"amazement": {x:55, y:50},
	}

	var svg = d3.select("svg");
	var timeFormatToWeek = d3.time.format("%w");
	var timeFormatToWeekCount = d3.time.format("%U");
	var timeFormatToText = d3.time.format("%e");
	var timeFormatISO = d3.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ");

	var year = 2014;
	var month = 2;
	var nextYear = 2014;
	var nextMonth = 3;
	var weekCountOffset = timeFormatToWeekCount(new Date(year, month-1, 1));

	var normalSize = 10;
	var hoverSize = 15;

	

	$("#test").on("click", function(e){
		// getJson("test.php?year=2014&month=2");
		getJson("sample");
	});	

	// emotion controller 
	$("body #controller div.uk-button")
		.on("mouseover", function(e){
			emotionFilteredView(this);
		})
		.on("mouseout", function(e){
			emotionNormalView(this);
		});
	var emotionFilteredView = function(e){
		var emotion = $(e).attr("data-emotion");
		onMouseOver(emotion);
	};
	var emotionNormalView = function(e){
		var emotion = $(e).attr("data-emotion");
		onMouseOut(emotion);
	};


	var onMouseOver = function(key){
		var sameClassCircle = d3.selectAll("."+key);
		var anotherClassCircle = d3.selectAll("circle:not(."+key+")");
		anotherClassCircle.transition()
			.attr("r", "0");
		sameClassCircle.transition()
			.attr("r", function(d){ 
				return d[key]*hoverSize; 
			})
			.attr("cx", function(d){ 
				return timeFormatToWeek(d["day"])*100+40; 
			})
			.attr("cy", function(d){ 
				return (timeFormatToWeekCount(d["day"])-weekCountOffset)*100+40; 
			});
		d3.selectAll("text").transition().attr("opacity", 0.9);
	};


	var onMouseOut = function(key){
		var sameClassCircle = d3.selectAll("."+key);
		var anotherClassCircle = d3.selectAll("circle:not(."+key+")");
		anotherClassCircle.each(function(d){
			this.__onreset();
		});
		sameClassCircle.transition()
			.attr("r", function(d){ 
				return d[key]*normalSize; 
			})
			.attr("cx", function(d){ 
				return timeFormatToWeek(d["day"])*100+emotionCircleOffsets[key]["x"]; 
			})
			.attr("cy", function(d){
				return (timeFormatToWeekCount(d["day"])-weekCountOffset)*100+emotionCircleOffsets[key]["y"];
			});
		d3.selectAll("text").transition().attr("opacity", 1);
	};

	var getJson = function(date){
		var url = date+".json";
		d3.json(url, function(error, data){
			if(error){
				alert("API Failed.");
			}else{
				data.map(function(d){
					var _date = timeFormatISO.parse(d["day"])
					d["day"] = _date;
					return d;
				});
				render(data);
			}
		});
	};

	var render = function(data){

		svg.selectAll("g").remove();
		svg.selectAll("text").remove();

		// target elemtns
		var element = svg.selectAll("g")
			.data(data);

		// update elements

		// enter elements
		element.enter()
			.append("g")
			.attr("title", function(d, i){
				console.log("enterElement g : "+i);
				return d["day"]; 
			});

		_.each(emotionCircleOffsets, function(value, key){
			element.append("circle")
				.attr("cx", function(d, i){
					console.log("enterElement circle : "+i);
					return timeFormatToWeek(d["day"])*100+value["x"]; 
				})
				.attr("cy", function(d){ 
					return (timeFormatToWeekCount(d["day"])-weekCountOffset)*100+value["y"]; 
				})
				.attr("r", "0")
				.attr("fill", "url(#"+key+")")
				.attr("opacity", "1")
				.attr("stroke", "#FFF")
				.attr("stroke-width", "2")
				.attr("class", function(d){ 
					return key; 
				})
				.on("mouseover", function(d){
					onMouseOver(key);
				})
				.on("mouseout", function(d){
					onMouseOut(key);
				})
				.on("click", function(d){
					console.log(d);
				})
				.on("reset", function(d){
					var self = d3.select(this);
					self.attr("fill", "url(#"+key+")")
						.transition()
						.attr("r", function(d){ 
							return d[key]*normalSize; 
						});
				})
				.transition()
				.duration(1300)
				.ease("bounce")
				.delay(function(d, i){ 
					return i*12; 
				})
				.attr("r", function(d){ 
					return d[key]*normalSize; 
				})
		});

		// day text
		element.enter()
			.append("text")
			.text(function(d){  
				return timeFormatToText(d["day"]); 
			})
			.attr("x", function(d){ 
				return timeFormatToWeek(d["day"])*100+40; 
			})
			.attr("y", function(d){ 
				return (timeFormatToWeekCount(d["day"])-weekCountOffset)*100+50; 
			})
			.attr("font-family", "Ubuntu Mono")
			.attr("font-size", "38")
			.attr("font-height", 0)
			.attr("fill", "#333")
			.attr("class", "shadow")
			.attr("text-anchor", "middle");

		
	}
	getJson("sample");


}
