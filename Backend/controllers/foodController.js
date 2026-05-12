import foodModel from "../models/foodModel.js";
const addFood = async (req, res) => {
  // let image_filename = req.file ? req.file.filename : "";
   const imageUrl = req.file.path; //cloudinary url

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: Number(req.body.price),
    category: req.body.category,
    image: imageUrl,
  });
  try {
    await food.save();
    res.json({ success: true, message: "Food add ho gya " });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err });
  }
};

// showing list from DB
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(" listFood error is - ", error);
    res.json({ success: false, message: "something went wrong" });
  }
};

//removing data from DB

const removeFood = async (req, res) => {
  try {
    // const foods = await foodModel.findById(req.body.id);
    // fs.unlink(`uploads/${foods.image}`, () => {});
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Deleted from DB and Local storage" });
  } catch (error) {
    console.log("removing food error is : ", error);
    res.json({ success: false, message: error });
  }
};

export { addFood, listFood, removeFood };
