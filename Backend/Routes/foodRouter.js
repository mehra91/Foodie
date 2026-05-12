import express from 'express'
import {addFood,listFood , removeFood} from '../controllers/foodController.js' 
 import { upload } from '../config/cloudinary.js';



const foodRouter = express.Router();

//stores image in uploads folder 
//  const storage = multer.diskStorage({
//   destination:'uploads',
//   filename:(req,file,cb)=>{
//     return cb(null,`${Date.now()}${file.originalname}`)
//   }
//  })

//  const upload = multer({storage});
 // or const upload = multer({storage:storage})



 // middleware 
foodRouter.post('/add',upload.single("image"),addFood)
foodRouter.get('/list',listFood)
foodRouter.post('/remove',removeFood)

export default foodRouter;