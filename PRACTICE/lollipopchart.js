let dimensions = {
	width: window.innerWidth * 0.9,
	height: 600,
	margin: {
		top: 20,
		right: 80,
		bottom: 30,
		left: 80,
	},
};

dimensions.boundedWidth = dimensions.width 
    - dimensions.margin.left 
    - dimensions.margin.right;
dimensions.boundedHeight = dimensions.height 
    - dimensions.margin.top 
    - dimensions.margin.bottom;

var svg = d3.select("figure#lollipop")
	.append("svg")
	// .attr("width", dimensions.width)
	// .attr("height", dimensions.height)
	.attr("viewBox", `0 0 ${dimensions.width} ${dimensions.height}`)
	.append("g")
	.attr("transform", `translate(${dimensions.margin.left},${dimensions.margin.top})`);


// Think of this scale as a function: F(x) = something.
var xScale = d3.scaleLinear()
	.range([0, dimensions.boundedWidth]);

var yScale = d3.scaleBand()
	.range([0, dimensions.boundedHeight])
	.padding(0.3);

var rowConverter = function(d) {
	return {
		genre: d.genre,
		votes: +d.count
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
d3.csv("data.csv", rowConverter)
.then(
	// our chart goes here!
	function(data) {
		// console.log(data);

		// we can update the domain of the xScale with d3.extent
		// xScale.domain(d3.extent(data, function(d) {return d.votes}));
		xScale.domain([0, d3.max(data, d => d.votes)]);

		yScale.domain(data.map(d => d.genre));

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
                        .attr("y", d => yScale(d.genre))
                        .attr("width", d => xScale(d.votes))
                        .attr("height", "10")
                        .attr("fill", "#bada");

        var yAxis = svg.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(yScale));
            
        var yAxisText = yAxis.selectAll("text")
            .attr("class", "axis_text");

		
	}
);