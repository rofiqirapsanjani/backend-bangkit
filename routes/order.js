const Order = require("../models/Order");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/:id", verifyTokenAndAuthorization, async (req, res) => {
  const newOrder = new Order(req.body);
  newOrder.userId = req.params.id;

     try {
      const savedOrder = await newOrder.save();
      res.status(200).json(savedOrder);
    } catch (err) {
       res.status(500).json(err);
    }
  }

);


//GET USER ORDERS
//pembeli ingin melihat daftar barang yang sudah di order
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  //id pembeli
  //userId = id pembeli
  try {
    const orders = await Order.find({ userId: req.params.id });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});


// penjual ingin melihat siapa saja yang membeli barangnya
router.get("/find/seller/:id", verifyTokenAndAuthorization, async (req, res) => {
//id penjual
//sellerId = id penjual
  try {
    const orders = await Order.find({ sellerId: req.params.id });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
