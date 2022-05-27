const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")


dotenv.config();
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("DBconnection Successfull"))
.catch((err)=>{console.log("error")});

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

app.listen(5000, ()=>{
  console.log("the backend server is running")
})