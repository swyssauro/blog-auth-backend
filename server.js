const app = require('express')();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://user:password@cluster0-pkery.gcp.mongodb.net/test?retryWrites=true&w=majority",{
    useUnifiedTopology: true, useNewUrlParser: true }, () => console.log('mongoose running...'));

    require("./models/user");
    app.use(bodyParser.json());
    app.use("/api", require("./controllers/userController"));

app.listen(8080, () => console.log('express running...'));