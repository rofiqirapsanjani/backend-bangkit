const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    sellerId : { type: String, required: true},
    productId : {type: String, required : true},
    amount: { type: Number, required: true },
    address: { type: String, required: true },
    status: { type: String, default: "pending" },
    img : {type : String, required : true},
    title : {type : String, required : true}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
