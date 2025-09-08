const express = require('express');

const app = express();


// =========== data Array ==============
  const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

    const shoes = [
      { name: "Birkenstocks", price: 50, type: "sandal" },
      { name: "Air Jordans", price: 500, type: "sneaker" },
      { name: "Air Mahomeses", price: 501, type: "sneaker" },
      { name: "Utility Boots", price: 20, type: "boot" },
      { name: "Velcro Sandals", price: 15, type: "sandal" },
      { name: "Jet Boots", price: 1000, type: "boot" },
      { name: "Fifty-Inch Heels", price: 175, type: "heel" }
  ];


//-------- Routes -------------

// 1. Be Polite, Greet the User
app.get('/greetings/:userName', (req, res) => {
    res.send(`<h1>Hello there, ${req.params.userName}</h1>`)
})


//2. Rolling the Dice
app.get('/roll/:number', (req, res) => {
    const numbers = parseInt(req.params.number, 10)
    if (isNaN(numbers)) {
        res.send('<h1>you must specify a number</h1>')
        return;
    } 
    const randomNumber = Math.floor(Math.random() * (numbers + 1));
    res.send(`<h1>you rolled ${randomNumber}</h1>`)
})


//3. I Want THAT One!
app.get('/collectibles/:index', (req, res) => {
    const index = parseInt(req.params.index, 10)
    if (isNaN(index) || index < 0 || index >= collectibles.length) {
        res.send('<h1>This item is not yet in stock, Check back soon!</h1>')
        return;
    }
    res.send(`So, you want the ${collectibles[index].name}? for ${collectibles[index].price}, it can be yours!`)
} )


//4. Filter Shoes by Query Parameters
app.get('/shoes', (req, res) => {
    const minPrice = parseInt(req.query['min-price']);
    const maxPrice = parseInt(req.query['max-price']);
    const type = req.query.type;
    
    

    let foundShoes = [];

    for (let i = 0; i < shoes.length; i++) {
        const shoe = shoes[i];

        // filters manually
        const minValue = isNaN(minPrice) || shoe.price >= minPrice;
        const maxValue = isNaN(maxPrice) || shoe.price <= maxPrice;
        const typeValue = !type || shoe.type === type;

        if (minValue && maxValue && typeValue) {
            foundShoes.push(shoe);
        }
    }

    res.json(foundShoes)
})



const port = 3000;
app.listen(port, () => {
    console.log(`listen to ${port}`);
    
})