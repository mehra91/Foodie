import foodModel from "../models/foodModel.js";
const addFood = async (req, res) => {
  try {
    // ✅ Check if file exists first
    if (!req.file) {
      return res.json({ success: false, message: "Image upload failed" });
    }

    const imageUrl = req.file.path; // ✅ Now safe inside try-catch

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price),
      category: req.body.category,
      image: imageUrl,
    });

    await food.save();
    res.json({ success: true, message: "Food add ho gya!" });

  } catch (err) {
     console.log("Error:", err.message);
    res.json({ success: false, message: err.message });
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
     console.log("Error:", err.message); 
    res.json({ success: false, message: err.message });
  }
};

export { addFood, listFood, removeFood };
