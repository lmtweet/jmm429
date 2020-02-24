let x;
let y;
let z;

x = 27;
y = 'string';
z = true;

console.log(x + z);

console.log(x +y);

let myArray = [1, 'two', 3, 4, 5, 6, 7, 8, 9];


console.log(myArray);
console.log(myArray.length);

let fruit = {
    kind: 'orange',
    color: 'orange',
    quantity: 9,
    tasty: true,

};

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

console.log(fruit);

for (let index = 0; index < theFruits.length; index++){
        // for (start, end, inrement)
// check that we're going through the right number of things
    // console.log(index);

// get the kind of each fruit
    // console.log(theFruits[index].kind);

    if (theFruits[index].tasty == true) {
            // fruit is tasty so give me the name
        console.log(theFruits[index].kind);
    } else {
            //fruit is not tasty, ignore name
        console.log(`${theFruits[index].kind} is a bad fruit`);
    }
}
