const fs = require("fs");
//const index = fs.readFileSync("index.html", "utf-8");
//const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
//const products = data.products;
const model = require("../model/product");
const mongoose = require("mongoose");
const Product = model.Product;

//create

exports.createproduct = async (req, res) => {
  try {
    const product = new Product(req.body);

    const savedProduct = await product.save();
    console.log({ savedProduct });

    res.status(201).json(savedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create product" });
  }
};

exports.getAllproducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

exports.getproduct = async (req, res) => {
  const id = req.params.id;
  console.log({ id });
  const product = await Product.findById(id);
  res.json(product);
};

exports.replaceproduct = async (req, res) => {
  const id = req.params.id;
  const doc = await Product.findOneAndReplace({ _id: id }, req.body, {
    new: true,
  });
  res.status(201).json(doc);
};

exports.updateproduct = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Product.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json(doc);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.deleteproduct = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Product.findOneAndDelete({ _id: id });
    res.status(201).json(doc);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
