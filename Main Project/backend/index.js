const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require('body-parser'); 
// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURL = process.env.MONGO_URL;

if (!mongoURL) {
  console.error("MongoDB URL is not defined. Please check your environment variables.");
  process.exit(1);
}

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("DB connection successful"))
  .catch((err) => {
    console.error("Error connecting to database:", err);
    process.exit(1);
  });

// Routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

// Server setup
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// // Express.js route for deleting a product
// app.delete('http://localhost:5001/api/products/:id', async (req, res) => {
//   const productId = req.params.id;

//   try {
//     // Use your database logic to delete the product by ID
//     const deletedProduct = await Product.findByIdAndDelete(productId);

//     if (!deletedProduct) {
//       // If the product with the given ID was not found
//       return res.status(404).json({ error: 'Product not found' });
//     }

//     // Product successfully deleted
//     return res.status(200).json({ message: 'Product deleted successfully' });
//   } catch (error) {
//     // Handle other errors (e.g., database error)
//     console.error('Error deleting product:', error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// });
