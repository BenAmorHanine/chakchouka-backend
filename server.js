const express= require('express');
const cors =require ('cors');// security feature to prevent web pages from making requests to a different domain than the one that served the web page
const bodyParser = require('body-parser');// handle JSON data in incoming requests.
const dotenv = require('dotenv');
dotenv.config();
const connectDB= require('./dbConnection');


const app = express();

app.use(express.json());//=app.use(bodyParser());
app.use(cors());
connectDB();

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });