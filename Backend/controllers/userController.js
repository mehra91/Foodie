import userModel from "../models/userModel.js";
import bcrypt from "bcrypt"; // encrypts passwords
import jwt from "jsonwebtoken"; // help in user authentication
import validator from "validator"; // check if input is correct


const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.json({ success: false, message: "user doesn't exists" });
    }
    const isMatchUser = await bcrypt.compare(password, user.password);
    if (!isMatchUser) {
      return res.json({success:false,message:"something went wrong"})
    }
    const token = createToken(user._id)
    res.json({success:true,token});
  } catch (error) {
    console.log("error is - ",error)
    res.json({success:false,message:"Error occur"});
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    const exists = await userModel.findOne({ email: email });
   

    if (exists) {
      return res.json({ success: false, message: "email already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Incorrect email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Password too weak" });
    }

    
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({ name, email, password: hashPassword });
    

    const user = await newUser.save();
    

    const token = createToken(user._id);
    res.json({ success: true, token });

  } catch (error) {
    console.log("❌ Error:", error);
    res.json({ success: false, message: "error found" });
  }
};

export { loginUser, registerUser };
