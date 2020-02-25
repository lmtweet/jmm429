async function drawLineChart() {
    const dataset = await d3.json("my_weather_data.json")
    console.log(dataset[0])

        const yAccessor = d => d.temperatureMax
        const dateParser = d3.timeParse ("%Y-%m-%d")
        const xAccessor = d => dateParser(d.date)

// making sure that the xAccessor function is reading the dates correctly
        console.log(xAccessor(dataset[5]))

//creating the container for the graph you have to define where you want it to go first and how big you want it to be

        let dimensions = {
            width: window.innerWidth * 0.9,
            height: 400,
            margin: {
                top: 15,
                right: 15,
                bottom: 40,
                left: 60,
            },
        }

        dimensions.boundedWidth = dimensions.width
            - dimensions.margin.left
            - dimensions.margin.right
        dimensions.boundedHeight = dimensions.height
            - dimensions.margin.top
            - dimensions.margin.bottom
//creating a wrapper constant that selected the div with the id "wrapper"
        const wrapper = d3.select("#wrapper")

//adding an svg element to the wrapper div
            .append("svg")

//the dimensions that we are now assigning to the scg were defined above in the
// "dimensions" section
                .attr("width", dimensions.width)
                .attr("height", dimensions.height)

//this line below adds a new group to the wrapper div and svg
        const bounds = wrapper.append("g")

//then we're editing the style of the new group we just created to fit within the bounds that
// were created in the "dimensions" section above
            .style("transform", `translate(${
                dimensions.margin.left
            }px, ${
                dimensions.margin.top
            }px)`)

// creating a scale that will take the data we want to be plotted on th y axis and
// evenly distribute it on the y axis
        const yScale = d3.scaleLinear()

    //domain is the min and max INPUT values
    //range is the min and max OUTPUT values
            .domain(d3.extent(dataset, yAccessor))

    //we use boundedHeight to make sure that we stay within the margins
            .range([dimensions.boundedHeight, 0])

        const freezingTemperaturePlacement = yScale(32)
        //adding a rectangle to the bounds and giving it specific attributes
        const freezingTemperatures = bounds.append("rect")
            .attr("x", 0) //putting it directly on the x axis
            .attr("width", dimensions.boundedWidth)
            .attr("y", freezingTemperaturePlacement)
            .attr("height", dimensions.boundedHeight
                - freezingTemperaturePlacement)
            .attr("fill", "#e0f3f3")
        
        //
        const xScale = d3.scaleTime()
            .domain(d3.extent(dataset, xAccessor))
            .range([0, dimensions.boundedWidth])

        //drawing a line with out data
        const lineGenerator = d3.line()
        //the generator needs information on how to find the x value and the y value
            .x(d => xScale(xAccessor(d)))
            .y(d => yScale(yAccessor(d)))
//this line of code is adding a "path" element to the bounds of the graph
        const line = bounds.append("path")
        //feeding our dataset into the line gerneator to create a line with the data
            .attr("d", lineGenerator(dataset))
            .attr("fill", "none")
            .attr("stroke","#af9358")
            .attr("stroke-width", 2)

        const yAxisGenerator = d3.axisLeft()
            .scale(yScale)

        const yAxis = bounds.append("g")
            .call(yAxisGenerator)

        const xAxisGenerator = d3.axisBottom()
            .scale(xScale)

        const xAxis = bounds.append("g")
            .call(xAxisGenerator)
                .style("transform", `translateY(${
                    dimensions.boundedHeight
                }px)`)

    // write your code here
   
  }
   
  drawLineChart()


  async function drawScatter() {
    // your code goes here

    let myData = await d3.json("my_weather_data.json")
        
        const xAccessor = d => d.dewPoint
        const yAccessor = d => d.humidity

    //using d3.min makes an array of data points and allows for an accessor function to get the value for each data point
        const width = d3.min([
            window.innerWidth * 0.9,
            window.innerHeight * 0.9,
        ])

        let dimensions = {
            width: width,
            height: width,
            margin: {
                top: 10,
                right: 10,
                bottom: 50,
                left: 50,
            },
        }
// DIMENSIONS
        dimensions.boundedWidth = dimensions.width
            - dimensions.margin.left
            - dimensions.margin.right
        dimensions.boundedHeight = dimensions.height
            - dimensions.margin.top
            - dimensions.margin.bottom
     
        const wrapper2 = d3.select("#wrapper2")
            .append("svg")
                .attr("width", dimensions.width)
                .attr("height", dimensions.height)

        const bounding = wrapper2.append("g")
            .style("transform", `translate(${
                dimensions.margin.left
            }px, ${
                dimensions.margin.top
            }px)`)

//creating the x axis
        const xScale = d3.scaleLinear()
    //extent will get the minimum and maximum values from the data to create the axis labels
            .domain(d3.extent(myData, xAccessor))
            .range([0, dimensions.boundedWidth])
            .nice()

//creating the yaxis
        const yScale = d3.scaleLinear()
        //extent will get the minimum and maximum values from the data to create the axis labels
                .domain(d3.extent(myData, yAccessor))
                .range([dimensions.boundedHeight, 0])
                .nice()

        const dots = bounding.selectAll("circle")
            .data(myData)
            .enter()
            .append("circle")
                .attr("cx", d => xScale(xAccessor(d)))
                .attr("cy", d => yScale(yAccessor(d)))
                .attr("r", 3)
                .attr("fill", "cornflowerblue")
        console.log(dots)
        
  }
  drawScatter()

  