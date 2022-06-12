const Product = require("../models/Product");
const User = require("../models/User");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const  router = require("express").Router();

//CREATE

router.post("/:id", verifyTokenAndAuthorization, async (req, res) => {
  const newProduct = new Product(req.body);
  
 try {
      const savedProduct = await newProduct.save();
      res.status(200).json(savedProduct);
    } catch (err) {
       res.status(500).json(err);
    } 
  }

);

//UPDATE
router.put("/:id/:productId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id/:productId", verifyTokenAndAuthorization, async (req, res) => {

  try {
    await Product.findByIdAndDelete(req.params.productId);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});




//GET USER Product
// menampilkan produk yang dijual berdasarkan userId(atau toko)
router.get("/find/:sellerId", verifyToken, async (req, res) => {
  try {
    const products = await Product.find({ sellerId: req.params.sellerId });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET PRODUCT
// pas di klik
router.get("/find/product/:id", verifyToken, async (req, res) => {
  // id = objectId
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS
// halaman homepage untu menampilkan semua produk
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 });
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
