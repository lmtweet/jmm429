var dataset = [5, 10, 15, 20, 25];
let theFruits = [
    {
            kind: 'orange',
            color: 'orange',
            quantity: 9,
            tasty: true,
    },
    {
            kind: 'grapes',
            color: 'purple',
            quantity: 100,
            tasty: true,
    },
    {
            kind: 'durian',
            color: 'orangey-yellow',
            quantity: 1,
            tasty: false,
    },
];

var body = d3.select('body');

body.selectAll('future-paragraph')
    .data(dataset)
    .enter()
    .append('p')
    .text(function(d){
        return `I can count up to ${d}`;

    })
    .style('color', function(d){
        if (d > 15) {
            return 'red';
        }
    });