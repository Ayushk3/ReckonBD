const express =  require('express');
const app = express();
const cors = require("cors")

require("dotenv").config();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({
    origin: 'https://mediped.netlify.app'
}))
require("./Config/database").connect()

// route import and mount 
const user = require("./Routes/routes");
app.use("",user);

// Activate 
app.listen(PORT,() => {
    console.log("Server Run at ",PORT);
})

app.get("/", (req,res) => {
    res.send("<h1>SERVER SIDE IS READY</h1>")
})