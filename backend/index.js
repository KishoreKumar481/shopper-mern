require('dotenv').config();
const port = process.env.PORT || 4000;
const express = require('express');
const app = express();
app.set('trust proxy', true);
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const { v2: cloudinary } = require('cloudinary')
const { CloudinaryStorage } = require('multer-storage-cloudinary')

app.use(express.json());
app.use(cors());

// Database Connection with MongoDB
mongoose.connect(process.env.MONGODB_URI)

// API Creation
app.get('/', (req, res) => {
    res.send("Express app is running")
})

app.get('/_health', (req, res) => {
  res.status(200).send('OK');
});

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Storage adapter
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'shopper_products', // optional folder in your Cloudinary media library
        format: async(req, file) => file.mimetype.split('/')[1], // preserve extenstion
        public_id: (req, file) => `product_${Date.now()}`, // unique name
        transformation: [{ quality: "100"}],
    }
})

const upload = multer({ storage })

// Creating upload endpoint for images
app.post('/upload', upload.single('product'), (req, res) => {
    // req.file.path is the secure URL on Cloudinary
    res.json({
        success: 1,
        image_url: req.file.path,
        public_id: req.file.filename, // Cloudinary public_id
    })
})

// Schema for Crating products
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        require: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    }
})

// Creating API for adding products
app.post('/addproduct', async(req, res) => {
    let products = await Product.find({});
    let id;
    if(products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    } else {
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success: true,
        name: req.body.name,
    })
})

// Creating API for deleting products
app.post('/removeproduct', async(req, res) => {
    await Product.findOneAndDelete({id: req.body.id});
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name,
    })
})

// Creating API for getting all products
app.get('/allproducts', async(req, res) => {
    let products = await Product.find({});
    console.log("All products fetched")
    res.send(products)
})

// Creating Schema for User model
const Users = mongoose.model('Users', {
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

// Creating Endpoint for registering the user
app.post('/signup', async(req, res) => {
    let check = await Users.findOne({email: req.body.email});
    if (check) {
        return res.status(400).json({
            success: false, 
            errors: "existing user found with same email address"
        })
    }
    let cart = {}
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })
    await user.save();

    // JWT authentication
    const data = {
        user: {
            id: user.id
        }
    }

    const token = jwt.sign(data, process.env.JWT_SECRET);
    res.json({success: true, token})
})

// Creating endpoint for User Login
app.post('/login', async(req, res) => {
    let user = await Users.findOne({email: req.body.email});
    if (user) {
        const passCompare = req.body.password === user.password
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, process.env.JWT_SECRET);
            res.json({success: true, token})
        } else {
            res.json({success: false, errors: "Wrong password"})
        }
    } else {
        res.json({success: false, errors: "Wrong email address"})
    }
})

// Creating endpoint for new collection data
app.get('/newcollections', async(req, res) => {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8)
    console.log("New Collection Fetched");
    res.send(newcollection)
})

// Creating endpoint for popular in women section
app.get('/popularinwomen', async(req, res) => {
    let products = await Product.find({category: "women"})
    let popular_in_women = products.slice(0, 4);
    console.log("Popular in women fetched");
    res.send(popular_in_women);
})

// creating middleware to fetch user
const fetchUser = async(req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({errors: 'Please authenticate using a valid token'})
    } else {
        try {
            const data = jwt.verify(token, process.env.JWT_SECRET);
            req.user = data.user
            next();
        } catch (error) {
            res.status(401).send({errors: 'Please authenticate using a valid token'})
        }
    }
}

// creating endpoint for adding products in cartdata
app.post('/addtocart', fetchUser, async(req, res) => {
    console.log('Added', req.body.itemId)
    let userData = await Users.findOne({_id: req.user.id})
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData})
    res.send("Added")
})

// Creating endpoint to reduce product from cartdata
app.post('/reducefromcart', fetchUser, async(req, res) => {
    console.log('Reduced', req.body.itemId)
    let userData = await Users.findOne({_id: req.user.id})
    if (userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData})
    res.send("Reduced")
})

// Creating endpoint to remove product from cartdata
app.post('/removefromcart', fetchUser, async(req, res) => {
    console.log('Removed', req.body.itemId)
    let userData = await Users.findOne({_id: req.user.id})
    if (userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] = 0;
    await Users.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData})
    res.send("Removed")
})

// creating endpoint to get cartdata
app.post('/getcart', fetchUser, async(req, res) => {
    console.log("Get Cart");
    let userData = await Users.findOne({_id: req.user.id})
    res.json(userData.cartData);
})

app.listen(port, (err) => {
    if (!err) {
        console.log(`Server running on Port ${port}`)
    }
    else {
        console.log(`Error: ${err}`);
    }
})
