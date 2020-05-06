let dimensions = {
	width: window.innerWidth * 0.3,
	height: 150,
	margin: {
		top: 20,
		right: 80,
		bottom: 30,
		left: 80,
	},
};

var svg = d3.select("figure#ageco")
	.append("svg")
	// .attr("width", dimensions.width)
	// .attr("height", dimensions.height)
	.attr("viewBox", `0 0 300 350`)
	.append("g")
	;

var tooltip = d3.select('body').append('div')
// position over the bar
    .style('font-family', 'Numans, sans-serif')
    .style('position', 'absolute')
    .style('background', '#white')
    .style('padding', '5 15px')
    .style('border', '1px #333 solid')
    .style('border-radius', '5px')
    .style('opacity', '0')


// Think of this scale as a function: F(x) = something.
var xScale = d3.scaleLinear()
    .range([0, dimensions.boundedWidth]);
    

var yScale = d3.scaleBand()
	.range([0, dimensions.boundedHeight])
	.padding(0.3);

var rowConverter = function(d) {
	return {
		population: d.population,
		Age: +d.Age
	}
};

// var rowConverter2 = (d) => {
// 	return {
// 		genre: d.genre,
// 		count: +d.count
// 	}
// }

// loading data in d3v4
// d3.csv("https://raw.githubusercontent.com/lennymartinez/jmmx29/master/_work/examples/bar/data.csv", rowConverter, function(data) {
// 	// do stuff with data
// })

// loading data in d3v5
d3.csv("Arizona_age.csv", rowConverter)
.then(
	// our chart goes here!
	function(data) {
		// console.log(data);

		// we can update the domain of the xScale with d3.extent
		// xScale.domain(d3.extent(data, function(d) {return d.votes}));
		xScale.domain([0, d3.max(data, d => d.population)]);

		yScale.domain(data.map(d => d.Age));

		var xAxis = svg.append("g")
			.attr("class", "x axis")
			.call(d3.axisBottom(xScale))
			.attr("transform", `translate(0,${dimensions.boundedHeight})`);
		
		var xAxisText = xAxis.selectAll("text")
			.attr("class", "axis_text");
		
		
            
        var candy = svg.selectAll("circle")
        //assigning the data to the rectangles that we have yet to actually draw
            .data(data)
            //entering into the rectangles to add data to them
            .enter()
                

                var bars = svg.selectAll("rect")
                //assigning the data to the rectangles that we have yet to actually draw
                    .data(data)
                    //entering into the rectangles to add data to them
                    .enter()
                        .append("rect")
                        //takes the word and gives it a pixel value and assigns it a location along the y axis
                        .attr("y", d => yScale(d.Age))
                        .attr("width", d => xScale(d.population))
                        .attr("height", "5")
                        .attr("padding", "2px")
                        .attr("fill", "#5F1A16")

                    .on('mouseover', function(data){
                        tooltip.transition()
                            .style('opacity', 1)
                        tooltip.html(data)
                            .style('left', (d3.event.pageX) + 'px')
                            .style('top', (d3.event.pageY + 'px'))
                            
                        d3.select(this).style('opacity', 0.5)
                    })

                    .on('mouseout', function(data){
                        tooltip.transition()
                            .style('opcaity', 0)
                        d3.select(this).style('opacity', 1)
                    })

                    svg.transition()
                        .attr('height', function(data){
                            return yScale(d);
                        })
                        .attr('y', function(data){
                            return height - yScale(d)
                        })
                        .duration(animateDuration)
                        .delay(function(d, i){
                            return i * animateDelay
                        })
                        .ease('elastic')
                    

        var yAxis = svg.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(yScale));
            
        var yAxisText = yAxis.selectAll("text")
            .attr("class", "axis_text");

		
	}
);

