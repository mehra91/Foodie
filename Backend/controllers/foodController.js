import foodModel from "../models/foodModel.js";
import fs from "fs";


const addFood = async (req,res)=>{

    console.log('Body:', req.body);    // add this
    console.log('File:', req.file);    // add this
 let image_filename = req.file ? req.file.filename : "";

  const food = new foodModel({
    name:req.body.name,
    description: req.body.description,
    price:Number(req.body.price),
    category:req.body.category,
    image:image_filename
  })
  try{
    await food.save();
    res.json({success:true,message:"Food add ho gya "})
  }catch(err){
        console.log(err)
        res.json({success:false,message:err})
  }

}

export default addFood;