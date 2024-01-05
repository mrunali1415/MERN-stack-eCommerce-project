const mongoose = require("mongoose");
// //E-Commerce-App database
// mongoose.connect("mongodb+srv://<mrunalichogule9>:<6rSH8fQgcKaeorwl>@test-db.tbpjf6e.mongodb.net/Ecommerce-App", {
//    useNewUrlParser: true,
//    useUnifiedTopology: true
// })

mongoose.connect("mongodb://localhost:27017/Ecommerce-App", {
   useNewUrlParser: true,
   useUnifiedTopology: true
})
.then(() => {
   console.log("Connected to the 'Ecommerce-App' database");
})
.catch(error => {
   console.error("Error connecting to the 'Ecommerce-App' database:", error);
});

