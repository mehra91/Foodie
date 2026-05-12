import 'dotenv/config'; 
import express from "express"
import cors from "cors"
import connectDB from "./config/Db.js";
import foodRouter from "./Routes/foodRouter.js";
import userRouter from "./Routes/userRouter.js"
import cartRouter from "./Routes/cartRoute.js";
import orderRouter from "./Routes/orderRoute.js";

//accessing env files 
  // ← loads .env instantly at import time

const app = express()
const port = process.env.PORT || 3002;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
  "https://foodie-ten-tau.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(null, true); // IMPORTANT: do NOT throw error
  },
  credentials: true
}));

app.options("*splat", cors());

// api endpoint
app.use('/api/food',foodRouter)
app.use('/images',express.static('uploads'))
app.use('/api/user',userRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get("/",(req,res)=>{
  res.send('server is running it means server chl rha h ');
});
 

 // Database connection
connectDB();

app.listen(port,()=>{
  console.log(`server started at http://localhost:${port}`);
  

});