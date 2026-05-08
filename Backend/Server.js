import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import connectDB from "./config/Db.js";
import foodRouter from "./Routes/foodRouter.js";
import userRouter from "./Routes/userRouter.js"
import cartRouter from "./Routes/cartRoute.js";

//accessing env files 
dotenv.config();

const app = express()
const port = 3002 

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// api endpoint
app.use('/api/food',foodRouter)
app.use('/images',express.static('uploads'))
app.use('/api/user',userRouter)
app.use('/api/cart',cartRouter)

app.get("/",(req,res)=>{
  res.send('server is running it means server chl rha h ');
});
 

 // Database connection
connectDB();

app.listen(port,()=>{
  console.log(`server started at http://localhost:${port}`);
  

});