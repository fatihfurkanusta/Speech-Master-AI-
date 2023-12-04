const express = require('express');
const app = express();


// Import Routes
const indexRoutes = require("./routes/indexRoutes");
const chatRoutes = require("./routes/chatRoutes");

// App Config
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Routes Using
app.use(indexRoutes);
app.use(chatRoutes);

const server = app.listen(3000, (err) => {
    if(err){
        console.log(err);
    }
    console.log('App started. Port Number %d :',server.address().port); 
});

