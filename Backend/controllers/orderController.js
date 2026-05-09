import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";

// ✅ Correct initialization
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,      // ✅ matches .env
  key_secret: process.env.RAZORPAY_SECRET_KEY // ✅ matches .env
});

const placeOrder = async (req, res) => {
  try {
    // 1. Save order to DB
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // 2. Calculate total amount (in paise)
    const totalAmount = req.body.amount * 100; // Razorpay needs paise (₹1 = 100 paise)

    // 3. Create Razorpay order ✅
    const razorpayOrder = await razorpay.orders.create({
      amount: totalAmount,
      currency: "INR",
      receipt: `receipt_${newOrder._id}`,
    });

    // 4. Send order details to frontend
    res.json({
      success: true,
      order_id: razorpayOrder.id,       // send to frontend
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      orderId: newOrder._id,            // your DB order id
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
  try {
    const crypto = await import('crypto');
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.default
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      const order = await orderModel.findById(orderId); // ✅ fetch full order
      res.json({ success: true, order });               // ✅ send to frontend
    } else {
      await orderModel.findByIdAndUpdate(orderId, { payment: false });
      res.json({ success: false });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { placeOrder ,verifyOrder };