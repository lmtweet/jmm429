async function drawMap() {
  // your code goes here
  const florida = await d3.json("florida.geojson.json")
        console.log(florida)
  const dataset = await d3.csv("primaries.csv")
      console.log(dataset)

    //const countryNameAccessor = d => d.properties["name"]
  //const countryIdAccessor = d => d.properties[]

  const metric = "Primary"

    let metricDatabyState = {}
      dataset.forEach(d => {
      if (d["date"] != metric) return
      metricDataByState[d["Abbreviation"]] = +d["State"] || 0
    })

  let dimensions = {
      width: window.innerWidth * 0.9,
      margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
      },
  }
  dimensions.boundedWidth = dimensions.width
    - dimensions.margin.left
    - dimensions.margin.right

  dimensions.boundedHeight = dimensions.height
  dimensions.height = dimensions.boundedHeight
    + dimensions.margin.top
    + dimensions.margin.bottom

  const fflorida = d3.select("#fflorida")
    .append("svg")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)

    const bounds = fflorida.append("g")

//then we're editing the style of the new group we just created to fit within the bounds that
// were created in the "dimensions" section above
            .style("transform", `translate(${
                dimensions.margin.left
            }px, ${
                dimensions.margin.top
            }px)`)

    const metricValues = Object.values(metricDatabyState)

    const metricValueExtent = d3.extent(metricValues)

    const maxChange = d3.max([-metricValueExtent[0], metricValueExtent[1]
    ])
    const colorScale = d3.scaleLinear()
      .domain([-maxChange, 0, maxChange])
      .range(["indigo", "white", "darkgreen"])


    const states = bounds.selectAll(".fflorida")
      .data(countryShapes.features)
      .enter()
        .append("path")
          .attr("class", "state")
          .attr("d", pathGenerator)
          .attr("fill", d => {
            const metricValue = metricDatabyState[countryIdAccessor(d)]
            if (typeof metricValue == "undefined")
              return "#e2e6e9"
            return colorScale(metricValue)
          })




}
drawMap()