const express = require("express");
const app = express();


app.get('/', (req, res) => {
    res.send('Ola mundo')
})

app.listen(3000 , () => {
    console.log('Server init in:');
    console.log('http://localhost:3000');
})