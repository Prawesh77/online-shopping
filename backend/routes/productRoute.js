const express = require("express");
const app = express.Router();
const Product = require("../models/product");
const multer = require("multer");
const path = require("path");

app.use(express.json());
app.use(express.static("public"));
//API endpoints

app.get("/", async (req, res) => {
  console.log("Products fetched from database");
  try {
    const products = await Product.find();
    res.json(products);
    console.log("product fetch responsed");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

app.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images"); // Save images in public/uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append current timestamp to filename
  },
});

const upload = multer({ storage: storage });

app.post("/addnewproduct", upload.single("image"), async (req, res) => {
  console.log(req);
  // const { category, details:{name, brand, price, size, watt, description}, instock } = req.body;
  const { category, details, instock } = req.body; //file nabhaye mathi ko jasari
  const parsedDetails =
    typeof details === "string" ? JSON.parse(details) : details; // file handle garera pathauda string jasto aauxa so parse it
  const { name, brand, price, size, watt, description } = parsedDetails;

  console.log(req.file);
  const imageUrl = req.file ? `/images/${req.file.filename}` : "";

  try {
    let product = await Product.findOne({
      "details.name": name,
      "details.brand": brand,
    });

    if (product) {
      product.instock += Number(instock);
      product.imageurl = imageUrl;
      // Aru pani change garna parey tala ko code
      // product.details.price = price;
      // product.details.size = size;
      // product.details.watt = watt;
      // product.details.description = description;
    } else {
      product = new Product({
        category,
        details: { name, brand, price, size, watt, description },
        instock: Number(instock),
        imageurl: imageUrl,
      });
    }
    await product.save();
    res.status(201).send("Product Added");
  } catch (error) {
    res.status(400).send("Error adding product");
    console.log(error);
  }
});

app.put("/update/:id", upload.single("image"), async (req, res) => {
  const { category, details, instock } = req.body;
  const parsedDetails =
    typeof details === "string" ? JSON.parse(details) : details;
  const { name, brand, price, size, watt, description } = parsedDetails;
  const imageUrl = req.file ? `/images/${req.file.filename}` : "";

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.category = category || product.category;
    product.details.name = name || product.details.name;
    product.details.brand = brand || product.details.brand;
    product.details.price = price || product.details.price;
    product.details.size = size || product.details.size;
    product.details.watt = watt || product.details.watt;
    product.details.description = description || product.details.description;
    product.instock = Number(instock) || product.instock;
    if (req.file) {
      product.imageurl = imageUrl;
    }

    await product.save();
    res.json({ message: "Product updated" });
  } catch (error) {
    res.status(400).json({ message: "Error updating product" });
    console.log(error);
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.instock > 1) {
      product.instock -= 1;
      await product.save();
      res.json({ message: "Product stock reduced by 1" });
    } else {
      await product.remove();
      res.json({ message: "Product deleted" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.log(error);
  }
});
// app.post('/addnewproduct', async (req, res) => {
//   const { category, details:{name, brand, price, size, watt, description}, instock } = req.body;
//   const newProduct = new Product({ category, details:{name, brand, price, size, watt, description}, instock });
//   try {
//       await newProduct.save();
//       res.status(201).send('Product Added');
//   } catch (error) {
//       res.status(400).send('Error adding product');
//       console.log(error);
//   }
// });

module.exports = app;
