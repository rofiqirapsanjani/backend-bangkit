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
  // if(User.findById(newOrder.userId)){

     try {
      const savedOrder = await newOrder.save();
      res.status(200).json(savedOrder);
    } catch (err) {
       res.status(500).json(err);
    }
  }
  // else{
  //   res.status(404).json("user not found");
  // }
  // }
);

//UPDATE
// router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
//   try {
//     const updatedOrder = await Order.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body,
//       },
//       { new: true }
//     );
//     res.status(200).json(updatedOrder);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//DELETE
// router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
//   try {
//     await Order.findByIdAndDelete(req.params.id);
//     res.status(200).json("Order has been deleted...");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

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

// //GET ALL

// router.get("/", verifyTokenAndAdmin, async (req, res) => {
//   try {
//     const orders = await Order.find();
//     res.status(200).json(orders);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// GET MONTHLY INCOME

router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
